import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { logout } from '../Redux/actions/authActions'
import { actionTypes } from 'redux-firestore'




class Logout extends React.Component {

    signOut = () => {
        Alert.alert(
          'Are you sure you want to sign out?',
          '',
          [
            {text: 'Cancel', onPress: () => console.log('Sign out cancelled')},
            {text: 'Sign Out', onPress: () => {
                this.props.clearData()
                this.props.logout()
            }
            },
          ],
          {cancelable: false},
        );
    }

    render() {
        return (
            <TouchableOpacity onPressOut={this.signOut}>
                <View style={styles.signOutContainer}>
                <Text style={styles.signOutLabel}>Sign Out</Text>
                <Icon style={styles.signOutIcon} name="ios-log-out" size={25} color="#FF0000"/>
                </View>
            </TouchableOpacity>
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
    logout: (creds) => dispatch(logout(creds)),
    clearData: () => dispatch({ type: actionTypes.CLEAR_DATA })

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)


const styles = StyleSheet.create({
    signOutContainer: {
      height: 55,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderColor: '#c8c7cc',
      backgroundColor: 'white',
      borderBottomWidth: 1,
    },
    signOutLabel: {
      flex: 1,
      paddingLeft: 15,
      fontSize: 16,
      textAlign: 'left',
      color: '#FF0000',
    },
    signOutIcon: {
      padding: 15,
    },
    signOutStyle: {
      //color: 'red',
      fontSize: 16,
    }
  })
  
