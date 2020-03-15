import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { signUp, resetAuthError } from '../Redux/actions/authActions'
import * as constants from '../../constants';



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

  redirectToLogin = () => {
    this.props.resetAuthError()
    this.props.navigation.navigate('Login')
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
          placeholderTextColor="#D3D3D3"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#D3D3D3"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          placeholder="Display Name"
          placeholderTextColor="#D3D3D3"
          autoCapitalize="none"
          maxLength={25}
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
         <TouchableOpacity
          style={[styles.signUpButton, {backgroundColor: constants.PRIMARY_COLOR}]}
          onPress={this.handleSignUp} 
          underlayColor='#fff'>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        <Button
          title="Already have an account?"
          onPress={this.redirectToLogin}
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
    signUp: (creds) => dispatch(signUp(creds)),
    resetAuthError: () => dispatch(resetAuthError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)


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
  signUpButton: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius:15,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign:'center',
    justifyContent: 'center',
    height: 45,
    width: '90%',
  },
  signUpText:{
    fontSize: 18,
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
}
})
