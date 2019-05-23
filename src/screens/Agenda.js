import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList
} from "react-native"
import moment from "moment"
import "moment/locale/pt-br"
import todayImage from "../../assets/imgs/today.jpg"
import commonStyles from "../commonStyles"
import Task from "../components/Task"

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
        estimateAt: new Date((new Date).setMonth((new Date).getMonth() + 1)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Construir um app poquera",
        estimateAt: new Date((new Date).setMonth((new Date).getMonth() + 3)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Ficar rico",
        estimateAt: new Date((new Date).setMonth((new Date).getMonth() + 6)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Construir outro app poquera",
        estimateAt: new Date((new Date).setMonth((new Date).getMonth() + 9)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Ficar mais rico ainda",
        estimateAt: new Date((new Date).setMonth((new Date).getMonth() + 12)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Comprar uma casa beira rio",
        estimateAt: new Date((new Date).setMonth((new Date).getMonth() + 15)),
        doneAt: null
      },
      {
        id: Math.random(),
        description: "Se aponsentar!",
        estimateAt: new Date((new Date).setMonth((new Date).getMonth() + 15)),
        doneAt: null
      },
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage}
          style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>
              {moment().locale("pt-br").format("ddd, D [de] MMMM")}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList data={this.state.tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Task {...item} />} />
        </View>
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
  }
})