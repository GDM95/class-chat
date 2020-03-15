import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import BackHeader from './BackHeader';
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native'

import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { addMessage } from '../Redux/actions/chatActions'



class Chat extends React.Component {

    componentDidMount(){
        console.log('Chat component mounted')
    }
    
   get user(){
        const { name, avatar, uid } = this.props.user
        return {
            name: name,
            avatar: avatar,
            _id: uid
        };
    }

    goBack = () => {
        console.log('back to main clicked')
        this.props.navigation.goBack()
    }


    render() {
      return (
        <View style={{ flex: 1 }}>
        <>
            {console.log("Chat props: ", this.props.chat.messages)}
            <><BackHeader 
              title={this.props.chat.courseTitle} 
              leftAction={this.goBack} 
              centerAction={() => this.props.navigation.navigate('ChatInfo', this.props.chat)} 
              isClickable={true}
              titleSize={12} />
            <GiftedChat
                //showUserAvatar={true}
                alwaysShowSend={true}
                renderUsernameOnMessage={true}
                isTyping={true}
                messages={this.props.chat.messages}
                renderTime={() => {}}
                onSend={message => this.props.addMessage(message[0], this.props.chat.id)}
                maxInputLength={500}
                minInputToolbarHeight={50}
                user={this.user}
                renderUsername={() => console.log("renderUsername => ", item) }
                renderLoading={() => 
                  <View style={[styles.spinnerContainer]}>
                    <ActivityIndicator size="large" color="gray" />
                  </View>} //- Render a loading view when initializing
                isLoadingEarlier={true}
                //renderLoadEarlier={} //(Function) - Custom "Load earlier messages" button
                renderBubble={props => {
                  return (
                    <Bubble
                      {...props}
                      textStyle={{
                        left: {
                          color: 'black',
                        },
                      }}
                      wrapperStyle={{
                        left: {
                          backgroundColor: '#ededed',
                        },
                      }}
                    />
                  );
                }}
            />{
           }
            </>
        </>
        </View>
      );
    }
  }

  
  const mapDispatchToProps = (dispatch) => {
    return {
      addMessage: (message, chatId) => dispatch(addMessage(message, chatId)),
    }
  }
  
  const mapStateToProps = (state, ownProps) => { 
    console.log("Chat mapStateToProps -> state: ", state, ownProps)

    let singleChat = state.firestore.data.chats[ownProps.navigation.state.params.id]
    if(singleChat && singleChat.messages){
      console.log("Singlechat: ", singleChat, singleChat.messages)
      let temp = {...singleChat, 
        messages: singleChat.messages.map((m) => {
          let message = state.firestore.data.allMessages[m]
          return {
            ...message,
            createdAt: message.timestamp.toDate()
          }
        }).reverse()
      }
      return {
        user: state.firestore.data.user,
        chat: temp,
      }
    }else{
      return {
        user: state.firestore.data.user,
        chat: { messages: null },
      }
    }
}
  
  export default compose(
    firestoreConnect((props) => {
      console.log("Chat firestoreConnect -> props : ", props)
      console.log("course id prop: ", props.navigation.state.params.id)
      return [ { collection: 'chats' }, { collection: 'messages' },
                { collection: 'users' } ] 
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(Chat)


  const styles = StyleSheet.create({
    spinnerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  })
  