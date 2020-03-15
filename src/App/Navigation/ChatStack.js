import { createStackNavigator } from 'react-navigation-stack'

import Main from '../Components/Main';
import AddChat from '../Components/AddChat';
import Chat from '../Components/Chat'
import ChatInfo from '../Components/ChatInfo'


const ChatStack = createStackNavigator({
  Home: {
    screen: Main,
    navigationOptions: {
        headerShown: false,
    }
  },
  AddChat: {
    screen: AddChat,
    navigationOptions: {
        headerShown: false,
    }
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
        headerShown: false,
    }
  },
  ChatInfo: {
    screen: ChatInfo,
    navigationOptions: {
        headerShown: false,
    }
  }

});

export default ChatStack;