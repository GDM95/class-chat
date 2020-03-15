import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { signIn, resetAuthError } from '../Redux/actions/authActions'
import * as constants from '../../constants';



class Login extends React.Component {

  state = { email: '', password: '' }

  handleLogin = () => {
    this.props.signIn(this.state)
  }


  loginSuccess = () => {
    console.log('login successful.');
    this.props.navigation.navigate('MainNavigator', {
      name: this.state.name,
      email: this.state.email,
    })
  }

  loginFailed = () => {
    alert('Login failure. Please try again.')
  }

  redirectToSignUp = () => {
    this.props.resetAuthError()
    this.props.navigation.navigate('SignUp')
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {this.props.authError &&
          <Text style={{ color: 'red' }}>
            {this.props.authError}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor="#D3D3D3"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor="#D3D3D3"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={[styles.loginButton, {backgroundColor: constants.PRIMARY_COLOR}]}
          onPress={this.handleLogin} 
          underlayColor='#fff'>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Button
          title="Don't have an account?"
          onPress={this.redirectToSignUp}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    resetAuthError: () => dispatch(resetAuthError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  textInput: {
    color: 'black',
    fontSize: 16,
    height: 45,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingLeft: 10,
    borderRadius: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius:15,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign:'center',
    justifyContent: 'center',
    height: 45,
    width: '90%',
  },
  loginText:{
    fontSize: 18,
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
}
})