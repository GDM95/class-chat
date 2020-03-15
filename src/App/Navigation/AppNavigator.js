import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// import the screens
import Loading from '../Components/Loading'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import MainNavigator from './MainNavigator'


const AppNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    MainNavigator
  },
  {
    initialRouteName: 'Loading'
  }
)

const Navigator = createAppContainer(AppNavigator);


export default Navigator