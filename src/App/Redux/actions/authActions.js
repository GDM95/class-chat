//import firebase from '../../../config/fbConfig'

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credentials.email, 
            credentials.password,
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR'})
        })
    }
}

export const signUp = (user) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to db
        const firestore = getFirestore()
        const firebase = getFirebase()

        firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userData) => {
            firestore.collection("users").doc(userData.user.uid).set({
                name: user.name,
                email: user.email,
                chats: [],
                uid: userData.user.uid,
                avatar: 'https://firebasestorage.googleapis.com/v0/b/class-chat-b0b05.appspot.com/o/avatars%2FdefaultAvatar.jpg?alt=media&token=40d2a7d0-7495-4648-af84-c27176cf1fd9'
            })
        }).then(() =>  
            //carry on with dispatch
            dispatch({ type: 'SIGNUP_SUCCESS' }) 
        ).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR' }, err) 
        })
    }
}


export const logout = () => {
    return (dispatch, getState,  { getFirebase } ) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS'})
        }).catch((err) => {
            dispatch({ type: 'LOGOUT_ERROR'})
        })
    }
}


