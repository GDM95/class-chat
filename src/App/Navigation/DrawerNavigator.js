import React from 'react';

import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import {StyleSheet, View, SafeAreaView, ScrollView, Dimensions, Image, Text, TouchableOpacity} from 'react-native'
import ChatStack from '../Navigation/ChatStack';
import SettingsStack from '../Navigation/SettingsStack';
import ProfileView from '../Components/ProfileView'

const DrawerNavigator = createDrawerNavigator({
  Home: ChatStack,
  Settings: SettingsStack
},{
  contentComponent: (props) => <CustomDrawerComponent {...props}/>,
  /*
  onDrawerToggled: isOpen => {
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
  }*/
});


const CustomDrawerComponent = props => (
  
  <SafeAreaView style={{flex: 1}}>
      <View style={{ height: 200, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <ProfileView navigation={props.navigation} />
      </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)


export default DrawerNavigator;