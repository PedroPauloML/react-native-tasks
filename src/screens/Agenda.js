import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native"
// import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment"
import "moment/locale/pt-br"
import todayImage from "../../assets/imgs/today.jpg"
import commonStyles from "../commonStyles"
import Task from "../components/Task"
import Icon from "react-native-vector-icons/FontAwesome"
import ActionButton from "react-native-action-button"
import AddTask from "./AddTask"
import axios from "axios"
import { server, showError } from "../common"

export default class Agenda extends Component {
  state = {
    tasks: [
      // {
      //   id: Math.random(),
      //   description: "Comprar o curso React Native",
      //   estimateAt: new Date(),
      //   doneAt: new Date()
      // },
      // {
      //   id: Math.random(),
      //   description: "Concluir o curso React Native",
      //   estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 1)),
      //   doneAt: null
      // },
      // {
      //   id: Math.random(),
      //   description: "Construir um app poquera",
      //   estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 3)),
      //   doneAt: null
      // },
      // {
      //   id: Math.random(),
      //   description: "Ficar rico",
      //   estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 6)),
      //   doneAt: null
      // },
      // {
      //   id: Math.random(),
      //   description: "Construir outro app poquera",
      //   estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 9)),
      //   doneAt: null
      // },
      // {
      //   id: Math.random(),
      //   description: "Ficar mais rico ainda",
      //   estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 12)),
      //   doneAt: null
      // },
      // {
      //   id: Math.random(),
      //   description: "Comprar uma casa beira rio",
      //   estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 15)),
      //   doneAt: null
      // },
      // {
      //   id: Math.random(),
      //   description: "Se aponsentar!",
      //   estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 15)),
      //   doneAt: null
      // },
    ],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false,
  }

  addTask = async task => {
    try {
      await axios.post(`${server}/tasks`, {
        desc: task.desc,
        estimateAt: task.date,
      })

      this.setState({ showAddTask: false }, this.loadTasks)
    } catch (err) {
      showError(err)
    }
  }

  deleteTask = async id => {
    try {
      await axios.delete(`${server}/tasks/${id}`)
      await this.loadTasks(true, id)
    } catch (err) {
      showError(err)
    }
  }

  filterTasks = (sleep = false, taskIdToSleep = null) => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
        || (sleep && taskIdToSleep !== null && task.id == taskIdToSleep)
      visibleTasks = this.state.tasks.filter(pending)
    }
    if (sleep && taskIdToSleep !== null)  {
      console.debug("sleeping...")
      console.debug(visibleTasks)
      setTimeout(this.filterTasks, 200)
    }
    this.setState({ visibleTasks })
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }
      , this.filterTasks)
  }

  onToggleTask = async id => {
    try {
      await axios.put(`${server}/tasks/${id}/toggle`)
      if (this.state.showDoneTasks) {
        await this.loadTasks()
      } else {
        await this.loadTasks(true, id)
      }
    } catch (err) {
      showError(err)
    }
  }

  componentDidMount = async () => {
    this.loadTasks()
  }

  loadTasks = async (sleep = false, taskIdToSleep = null) => {
    try {
      // const maxDate = moment().format("YYYY-MM-DD 23:59")
      const maxDate = moment().format("2019-12-31 23:59")
      const res = await axios.get(`${server}/tasks?date=${maxDate}`)
      this.setState({ tasks: res.data }, () =>
        this.filterTasks(sleep, taskIdToSleep))
    } catch (err) {
      showError(err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTask}
          onSave={this.addTask}
          onCancel={() => this.setState({ showAddTask: false })} />
        <ImageBackground source={todayImage}
          style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? "eye" : "eye-slash"}
                size={20} color={commonStyles.colors.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>
              {moment().locale("pt-br").format("ddd, D [de] MMMM")}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList data={this.state.visibleTasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) =>
              <Task {...item} onToggleTask={this.onToggleTask}
                onDelete={this.deleteTask} />} />
        </View>
        <ActionButton buttonColor={commonStyles.colors.today}
          onPress={() => { this.setState({ showAddTask: true }) }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  taskContainer: {
    flex: 7,
  },
  iconBar: {
    marginTop: Platform.OS == "ios" ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
})