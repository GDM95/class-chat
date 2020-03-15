import React from 'react';

import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import {StyleSheet, View, SafeAreaView, ScrollView, Dimensions, Image, Text, TouchableOpacity} from 'react-native'
import ChatStack from '../Navigation/ChatStack';
import SettingsStack from '../Navigation/SettingsStack';
import Avatar from '../Components/Avatar'

const DrawerNavigator = createDrawerNavigator({
  Home: ChatStack,
  Settings: SettingsStack
},{
  contentComponent: (props) => <CustomDrawerComponent {...props}/>,
});


const CustomDrawerComponent = props => (
  <SafeAreaView style={{flex: 1}}>
      <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center', justifyContent: 'center'}}>
        <Avatar active={false} height={170} />
      </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)


export default DrawerNavigator;