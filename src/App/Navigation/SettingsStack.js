import { createStackNavigator } from 'react-navigation-stack'


import Settings from '../Components/Settings'

const ChatStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
        headerShown: false,
    }
  },
});

export default ChatStack;