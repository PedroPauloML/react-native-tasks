import React, { Component } from "react"
import { 
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native"
import commonStyles from "../commonStyles"
import backgroundImage from "../../assets/imgs/login.jpg"

export default class Auth extends Component {
  state = {
    stageNew: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      Alert.alert("Sucesso!", "Criar conta")
    } else {
      Alert.alert("Sucesso!", "Logar")
    }
  }

  render() {
    return (
      <ImageBackground source={backgroundImage}
        style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ?
              "Crie a sua conta" : "Inform seus dados"}
          </Text>
          {this.state.stageNew &&
            <TextInput placeholder="Nome" style={styles.input}
              value={this.state.name}
              onChangeText={name => this.setState({ name })} />}
          <TextInput placeholder="E-mail" style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({ email })} />
          <TextInput placeholder="Senha" style={styles.input}
            value={this.state.password}
            onChangeText={password => this.setState({ password })} />
          {this.state.stageNew &&
          <TextInput placeholder="Confirmação de senha"
            style={styles.input}
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })} />}
          <TouchableOpacity onPress={this.signinOrSignup}>
            <View style={styles.button}>
              <Text sttyle={styles.buttonText}>
                {this.state.stageNew ? "Registrar" : "Entrar"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ padding: 10 }}
          onPress={() => { this.setState({ stageNew: !this.state.stageNew }) }}>
          <View style={styles.button}>
            <Text sttyle={styles.buttonText}>
              {this.state.stageNew ? "Já possu conta?" : "Ainda não possui conta?"}</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {

  },
  title: {

  },
  formContainer: {

  },
  subtitle: {

  },
  input: {

  },
  button: {

  },
  buttonText: {

  },
})