
export const updateAvatar = (avatar) => {
    return (dispatch, getState,  { getFirebase, getFirestore } ) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        const uid = getState().firebase.auth.uid

        firebase.storage().ref('avatars/' + uid).put(avatar.uri).then((ref) => {
        firebase.storage().ref('avatars/' + uid).getDownloadURL().then(url => {
            console.log(url)
            firestore.collection("users").doc(uid).update({
              avatar: url,
            })
        }).then(() => {
            console.log('upload success')
            dispatch({ type: 'UPDATE_AVATAR_SUCCESS', avatar})
        }).catch((err) => {
            dispatch({ type: 'UPDATE_AVATAR_ERROR', err})
        })
        })
    }
}

export const updateName = ( name ) => {
    return (dispatch, getState, { getFirebase, getFirestore } ) => {
        const firestore = getFirestore()
        const uid = getState().firebase.auth.uid

        if(name.length == 0){
            dispatch({ type: 'UPDATE_NAME_ERROR', err: "Invalid name" })
        }else{

            firestore.collection("users").doc(uid).update({
                name: name
            }).then(() => dispatch({ type: 'UPDATE_NAME_SUCCESS', name }))
            .catch((err) => dispatch({ type: 'UPDATE_NAME_ERROR', err }))
        }
    }
}

/*
// https://medium.com/@ericmorgan1/change-user-email-password-in-firebase-and-react-native-d0abc8d21618
export const updateEmail = ( email) => {
    return (dispatch, getState, { getFirebase, getFirestore } ) => {
        const firestore = getFirestore()
        const firebase = getFirebase()
        const uid = getState().firebase.auth.uid
        const user = firebase.auth().currentUser
        
        firebase.auth().currentUser.reauthenticateWithPopup()
        .then((user) =>  {
            // You can now delete the user:
            return firebase.auth().currentUser.delete();
            if (user) {
                user.updateEmail(email).then((response) => {
                    console.log("Update Email: ", response)
                }).then(() => { 
                    firestore.collection("users").doc(uid).update({
                        email: email
                    })
                }).then(() => {
                    console.log('update email success')
                    dispatch({ type: 'UPDATE_EMAIL_SUCCESS', email})
                }).catch((err) => {
                    dispatch({ type: 'UPDATE_EMAIL_ERROR', err})
                })
            } else {
                console.log('No user data for update email')
            }
        })
    }
}
*/



