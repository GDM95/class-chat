import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { signUp } from '../Redux/actions/authActions'



class SignUp extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    avatar: '',
  };


  handleSignUp = (user) => {
    this.props.signUp(this.state)
    {this.props.authError && this.props.navigation.navigate('Main')}
  }

render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        {this.props.authError &&
          <Text style={{ color: 'red' }}>
            {this.props.authError}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          placeholder="Display Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
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
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)