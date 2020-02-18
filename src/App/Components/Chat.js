import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import BackHeader from './BackHeader';
import firebaseSDK from '../../../config/firebaseSDK';
import firebase from 'react-native-firebase'
import firestore from '@react-native-firebase/firestore';



export default class Chat extends React.Component {

    state = {
      messages: [],
      currentUser: null,
      chatID: '',
      courseTitle: ''
    };

    componentDidMount(){
        
        let user = firebase.auth().currentUser._user
        firestore().collection("users").doc(user.uid).get().then(doc => {
            data = doc.data()
            this.setState({currentUser: {
                name: data.name,
                email: data.email,
                avatar: data.avatar,
                _id: doc.id,
            }})
        })

        let chatID = this.props.navigation.state.params.id
        this.setState({chatID: chatID})

        firestore().collection("chats").doc(chatID).onSnapshot((doc) => {
            this.setState({ messages: [], courseTitle: doc.data().courseTitle })
            let newArray = []
            doc.data().messages.map(item => {
                firestore().collection("messages").doc(item).onSnapshot((doc) => {
                    let message = doc.data()
                    message['_id'] = doc.id
                    newArray.push(message)
                    this.setState(previousState => ({
                        messages: GiftedChat.append(previousState.messages, message)
                    }))
                })
            })
        })
    }
    

   get user() {
        currentUser = this.state.currentUser
        return {
            name: currentUser.name,
            email: currentUser.email,
            avatar: currentUser.avatar.uri,
            _id: currentUser._id
        };
    }


    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    onSend(messages = []) {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };

           firestore().collection("messages").add(message).then((doc) => {
                const id = doc.id
                firestore().collection("chats").doc(this.state.chatID).update({
                    messages: firestore.FieldValue.arrayUnion(id)
                })
           })
        }
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
      return (
        <>
        {this.state.currentUser ?
            <>
            <BackHeader title={this.state.courseTitle} command={this.goBack} titleSize={12} />
            <GiftedChat
            showUserAvatar={true}
            renderUsernameOnMessage={true}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={this.user}
            />
            </>
        : null }
        </>
      );
    }
  }