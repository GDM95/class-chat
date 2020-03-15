import React, { useEffect } from 'react';
import Navigator from './src/App/Navigation/AppNavigator'
import { Provider, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './src/App/Redux/reducers/rootReducer';
import thunk from 'redux-thunk'
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import fbConfig from './src/config/fbConfig'
import firebase from './src/config/fbConfig'

import SplashScreen from 'react-native-splash-screen'


const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig),
  )
)

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}


export default class App extends React.Component { 

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={ store }>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <Navigator />
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}
