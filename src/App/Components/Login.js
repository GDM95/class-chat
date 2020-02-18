import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { signIn } from '../Redux/actions/authActions'



class Login extends React.Component {

  state = { email: '', password: '' }


  handleLogin = () => {
    this.props.signIn(this.state)
    //const user = { email: this.state.email, password: this.state.password }
    //firebaseSDK.login(user, this.loginSuccess, this.loginFailed);
  };


  loginSuccess = () => {
    console.log('login successful.');
    this.props.navigation.navigate('MainNavigator', {
      name: this.state.name,
      email: this.state.email,
    });
  };

  loginFailed = () => {
    alert('Login failure. Please try again.');
  };


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
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingLeft: 10,
    borderRadius: 15
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  }
})

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)