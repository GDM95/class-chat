import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';

import firebase from 'react-native-firebase'
import firestore from '@react-native-firebase/firestore';



export default class ProfileView extends React.Component {

    state = {
        currentUser: null
    }


    componentDidMount() {
        let user = firebase.auth().currentUser._user

        firestore().collection("users").doc(user.uid).onSnapshot(doc => {
            data = doc.data()
            this.setState({currentUser: {
                name: data.name,
                email: data.email,
                avatar: data.avatar,
                id: doc.id,
            }})
        })
    }

    handleProfileClick = () => {
        console.log(this.state.currentUser.avatar)
    }


    render() {

    const { currentUser } = this.state;

    if (currentUser === null) {
      return null;
    }
    return (
        <>
            <View style={styles.headerColumn}>
                <TouchableOpacity onPress={this.handleProfileClick}>
                    <Image
                    style={styles.userImage}
                    source={{
                        uri: this.state.currentUser.avatar,
                    }}
                    />
                    <Text style={styles.userNameText}>{this.state.currentUser.name}</Text> 
                </TouchableOpacity>
            </View>          
        </>
        )
    }
}


const styles = StyleSheet.create({
    headerColumn: {
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          alignItems: 'center',
          justifyContent: 'center',
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
      borderRadius: 85,
      borderWidth: 2,
      height: 150,
      marginBottom: 10,
      width: 150,
    },
    userNameText: {
      color: 'black',
      fontSize: 22,
      fontWeight: 'bold',
      paddingBottom: 0,
      textAlign: 'center',
    },
  })