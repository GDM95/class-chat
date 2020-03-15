import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ImageBackground, TextInput } from 'react-native'
import Logout from './Logout'
import BackHeader from './BackHeader'
import Avatar from './Avatar'
import Icon from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateName, updateEmail } from '../Redux/actions/userActions'
import * as constants from '../../constants';


class Settings extends React.Component {
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false, currentUser: null};
  }

  componentDidMount() {
    this.readUserData()
  }

  // set the component state from the Redux store
  readUserData = () => {
    const { name, email } = this.props.user
    this.setState({currentUser: {
      name: name,
      email: email,
    }})
  }

  onChangeTextInput = (str, field) => {
    this.setState(prevState => ({
      ...prevState,
      currentUser: {
          ...prevState.currentUser, [field]: str
      }
    }))
  }

  updateInfo = () => {
    const { name, email } = this.state.currentUser
    this.props.updateName(name)
    //this.props.updateEmail(email)
    this.props.navigation.navigate('Home')
  }

  goBack = () => {
    // reset the component state to Redux state
    this.readUserData()
    this.props.navigation.navigate('Home')
  }

  render() {
    const { currentUser } = this.state;
    if (currentUser === null) {
      return null;
    }

    return (
      <>
      <BackHeader title={'Settings'} leftAction={this.goBack} rightText={'Done'} rightAction={this.updateInfo} titleSize={22}/>
      <View style={styles.headerContainer}>
          <View
          style={styles.headerBackground}
          blurRadius={10}
          backgroundColor={'#000a28'} >
            <View style={styles.headerColumn}>
                <Avatar active={true} showName={false} height={215}/>
            </View>
          </View>
      </View>
      <View style={styles.editInfoTop}>
        <Text style={styles.inputLabel}>Display Name</Text>
        <TextInput
            style={[styles.input, {fontFamily: constants.PRIMARY_FONT}]}
            maxLength={25}
            placeholder={this.props.user.name}
            defaultValue={this.state.currentUser.name}
            onChangeText={(str) => this.onChangeTextInput(str, 'name')}            
            underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.editInfoMid}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
            editable={false}
            style={[styles.input, {fontFamily: constants.PRIMARY_FONT}]}
            placeholder={this.props.user.email}
            defaultValue={this.state.currentUser.email}
            onChangeText={(str) => this.onChangeTextInput(str, 'email')}            
            underlineColorAndroid="transparent"
        />
      </View>
      <Logout navigation={this.props.navigation}/>
      </>
    )
  }
  onValueChange(value){
    this.setState({switchValue: value});
    }
}

const mapStateToProps = (state) => {
  console.log('Settings State: ', state)
  return {
    user: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateName: (name) => dispatch(updateName(name)),
    //updateEmail: (email) => dispatch(updateEmail(email)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps), 
  /*firestoreConnect((props) => {
      return [{ collection: 'users', doc: props.user.uid }]
  })*/
)(Settings)



const styles = StyleSheet.create({
  editInfoTop: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c8c7cc',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
},
  editInfoMid: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c8c7cc',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  inputLabel: {
      paddingLeft: 15,
      fontSize: 16
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 10,
      color: '#424242',
      fontSize: 16,
      textAlign: 'right'
  },
  headerBackground: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  userImage: {
    borderColor: '#F7F2F1',
    borderRadius: 100,
    borderWidth: 1,
    height: 190,
    marginBottom: 15,
    width: 190,
  },
})
