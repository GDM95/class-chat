import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ImageBackground, TextInput } from 'react-native'
import Logout from './Logout'
import BackHeader from './BackHeader'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker';

import firebase from 'react-native-firebase'
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'




class Settings extends React.Component {
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false, currentUser: null};
  }

  componentDidMount() {

    let user = firebase.auth().currentUser._user

    
    firestore().collection("users").doc(user.uid).get().then(doc => {
    data = doc.data()
    this.setState({currentUser: {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        id: doc.id,
    }})
    })

  
  }

  selectImage = () => {
    console.log("Avatar: ", this.state.currentUser.avatar)

    ImagePicker.showImagePicker({title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
    response => {
        if(response.error){
            console.log('image error')
        }else{
            const source = { uri: response.uri }
            this.setState(prevState => ({
              ...prevState,
              currentUser: {
                  ...prevState.currentUser, avatar: source.uri}
            }))
            let user = firebase.auth().currentUser._user
            

            firebase.storage().ref('avatars/' + user.uid).put(source.uri);
            firebase.storage().ref('avatars/' + user.uid).getDownloadURL().then(url => {
                console.log('Download URL: ', url)
                firestore().collection("users").doc(user.uid).update({
                  avatar: url,
                })
            })
            
        }
    })

  }

  saveInfo = () => {
    console.log('user info updated', this.state.currentUser.email)
    let user = firebase.auth().currentUser._user
    firestore().collection("users").doc(user.uid).update({
        name: this.state.currentUser.name,
        email: this.state.currentUser.email
    })
  }


  onChangeTextInput = (str, field) => {
    this.setState(prevState => ({
      ...prevState,
      currentUser: {
          ...prevState.currentUser, [field]: str}
    }))
  }


  goBack = () => {
    this.props.navigation.navigate('Home')
  }

  setAvatar = () => {
    this.selectImage()
  }


  render() {
    const { currentUser } = this.state;
    if (currentUser === null) {
      return null;
    }

    return (
    <>
      <BackHeader title={'Settings'} command={this.goBack} titleSize={22}/>

      <View style={styles.headerContainer}>
          <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
              uri: this.state.currentUser.avatar,
          }}
          >
          <View style={styles.headerColumn}>
            <TouchableOpacity onPressOut={this.setAvatar}>
              <Image
              style={styles.userImage}
              source={{
                  uri: this.state.currentUser.avatar,
              }}
              />
              </TouchableOpacity>
              <Text style={styles.userNameText}>{this.state.currentUser.name}</Text>
              <View style={styles.userAddressRow}>
              <View>
                  <Icon
                  name="md-arrow-round-back"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                  />
              </View>
              <View style={styles.userCityRow}>
                  <Text style={styles.userCityText}>
                  City Test
                  </Text>
              </View>
              </View>
          </View>
          </ImageBackground>
      </View>
      <View style={styles.editInfoTop}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
            style={styles.input}
            onEndEditing={this.saveInfo}
            defaultValue={this.state.currentUser.name}
            onChangeText={(str) => this.onChangeTextInput(str, 'name')}            
            underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.editInfoMid}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
            style={styles.input}
            defaultValue={this.state.currentUser.email}
            onEndEditing={this.saveInfo}
            onChangeText={(str) => this.onChangeTextInput(str, 'email')}            
            underlineColorAndroid="transparent"
        />
      </View>
      <Logout navigation={this.props.navigation}/>
      </>
    );
  }
  onValueChange(value){
    this.setState({switchValue: value});
    }
}

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
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
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
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#F7F2F1',
    borderRadius: 100,
    borderWidth: 1,
    height: 190,
    marginBottom: 15,
    width: 190,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  }, 
  signOutStyle: {
    //color: 'red',
    fontSize: 16,
}
})


const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user
  }
}

export default compose(
  connect(mapStateToProps), 
  firestoreConnect([
      { collection: 'users' }
    ])
)(Settings)