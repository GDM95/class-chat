export const createChat = (data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const uid = getState().firebase.auth.uid
        const { subject, course, courseCode } = data
        let chatId = null

        let courseRef = firestore.collection('courses').where('courseCode', '==', courseCode)
        courseRef.get().then(doc => {
            doc.forEach(ref => {
                chatId = ref.data().activeChat
                if(chatId){
                    console.log('the chat exists')
                    // add the new chat to the user chat array
                    firestore.collection("users").doc(uid).update({
                        chats: firestore.FieldValue.arrayUnion(chatId)
                    })
                }else{
                    console.log('the chat does not exist yet')
                    // chat does not exist for this course, create one
                    firestore.collection('chats').add({
                        subjectName: subject,
                        courseTitle: course,
                        courseRef: ref.id,
                        courseCode: courseCode,
                        lastMessage: '',
                        messages: [],
                        timestamp: firestore.FieldValue.serverTimestamp()
                    }).then(doc => {
                        chatId = doc.id
                        firestore.collection('chats').doc(chatId).update({
                            id: chatId
                        })
                        firestore.collection('courses').doc(ref.id).update({
                            activeChat: chatId
                        })
                        // add the new chat to the user chat array
                        firestore.collection("users").doc(uid).update({
                            chats: firestore.FieldValue.arrayUnion(chatId)
                        })
                    }).then(() => {
                        dispatch(addMessage({ text: 'Chat Created', createdAt: firestore.FieldValue.serverTimestamp(), system:true }, chatId))
                    })
                }
            })
        }).then(() =>  
            //carry on with dispatch
            dispatch({ type: 'CREATE_CHAT_SUCCESS', chatId }) 
        ).catch((err) => {
            dispatch({ type: 'CREATE_CHAT_ERROR', err}) 
        })
    }
}

export const deleteChat = (chat) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const uid = getState().firebase.auth.uid

        firestore.collection("users").doc(uid).update({
            chats: firestore.FieldValue.arrayRemove(chat.id)
        }).then(() =>  
            dispatch({ type: 'DELETE_CHAT_SUCCESS', chat }) 
        ).catch((err) => {
            dispatch({ type: 'DELETE_CHAT_ERROR', err}) 
        })
    }
}

// Create message document in firestore, add it to the current chat, and update chat timestamp  
export const addMessage = (message, chatId) => {
    console.log("action message prop: ", message)
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()

        firestore.collection("messages").add(message).then((doc) => {
            const id = doc.id
            firestore.collection("messages").doc(id).update({
                _id: id,
                timestamp: firestore.FieldValue.serverTimestamp()
            }).then(() => {
                doc.get().then(ref => {
                    const timestamp = ref.data().timestamp
                    firestore.collection("chats").doc(chatId).update({
                        messages: firestore.FieldValue.arrayUnion(id),
                        lastMessage: id,
                        timestamp: timestamp
                    })
                })
            })
        }).then(() =>  
            dispatch({ type: 'ADD_MESSAGE_SUCCESS', message }) 
        ).catch((err) => {
            dispatch({ type: 'ADD_MESSAGE_ERROR', err}) 
        })
    }
}


export const getSubjects = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        let subjects = []
        firestore.collection("subjects").orderBy("subjectName", "asc").get().then((ref) => {
            ref.forEach((doc) => {
                let subject = {id: doc.id, name: doc.data().subjectName, courses: doc.data().courses}
                subjects.push(subject)
            })
        console.log("getSubjects", subjects)
        }).then(() =>  
            dispatch({ type: 'GET_SUBJECTS_SUCCESS', subjects }) 
        ).catch((err) => {
            dispatch({ type: 'GET_SUBJECT_ERROR', err}) 
        })
    }
}


export const getCourses = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        
        console.log('getCourses State', getState(), id)

        console.log('getCourses')
        const firestore = getFirestore()

        let subject = getState().chat.subjects.find((s) => {
            return s.id === id
        })

        let courses = []
        subject.courses.forEach((course) => {
            firestore.collection("courses").doc(course).get()
            .then((doc) => {
                if (doc.exists) {
                    let data = doc.data()
                    courses.push({...data, id: doc.id, name: data.courseTitle + " (" + data.courseCode + ")"})
                } else {
                    console.log("No such document!");
                }
            })
        })
        console.log('Courses ', courses)
        dispatch({ type: 'GET_COURSES_SUCCESS', courses }) 
    }
}