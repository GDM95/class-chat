

import authReducer from './authReducer'
import userReducer from './userReducer'
import chatReducer from './chatReducer'

import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer