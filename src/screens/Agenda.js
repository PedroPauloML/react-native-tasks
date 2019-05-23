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
import moment from "moment"
import "moment/locale/pt-br"
import todayImage from "../../assets/imgs/today.jpg"
import commonStyles from "../commonStyles"
import Task from "../components/Task"
import Icon from "react-native-vector-icons/FontAwesome"
import ActionButton from "react-native-action-button"
import AddTask from "./AddTask"

export default class Agenda extends Component {
  state = {
    tasks: [
      {
        id: Math.random(),
        description: "Comprar o curso React Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        description: "Concluir o curso React Native",
        estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 1)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Construir um app poquera",
        estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 3)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Ficar rico",
        estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 6)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Construir outro app poquera",
        estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 9)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Ficar mais rico ainda",
        estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 12)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Comprar uma casa beira rio",
        estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 15)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Se aponsentar!",
        estimateAt: new Date((new Date()).setMonth((new Date()).getMonth() + 15)),
        doneAt: null
      },
    ],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false,
  }

  addTask = task => {
    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      description: task.desc,
      estimateAt: task.date,
      doneAt: null,
    })
    this.setState({ tasks, showAddTask: false }, this.filterTasks)
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
    this.setState({ visibleTasks }, () => {
      if (sleep && taskIdToSleep !== null)  {
        setTimeout(this.filterTasks, 200)
      }
    })
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }
      , this.filterTasks)
  }

  toggleTask = (id) => {
    const tasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task = {...task}
        task.doneAt = task.doneAt ? null : new Date()
      }
      return task
    })
    callback = () => {
      this.state.showDoneTasks ?
        this.filterTasks() : this.filterTasks(true, id)
    }
    this.setState({ tasks }, callback)
  }

  componentDidMount = () => {
    this.filterTasks()
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
            renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
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