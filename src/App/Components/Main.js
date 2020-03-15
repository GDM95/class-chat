import React from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from 'react-native';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import CustomHeader from './CustomHeader'

import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { deleteChat } from '../Redux/actions/chatActions'
import Spinner from './Spinner'
import * as constants from '../../constants';



Item = ({ id, title, subTitle, selected, onSelect, lastMessage}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? 'gray' : 'white' },
      ]}
    >
    <Text style={[styles.title, {fontFamily: constants.SECONDARY_FONT}]}>{title}</Text>
    {lastMessage 
      ? <>{ lastMessage.user 
        ? <Text style={[styles.lastMessage, {fontFamily: constants.PRIMARY_FONT}]}>{lastMessage.user.name}: {lastMessage.text.length > 35 ? (lastMessage.text.slice(0,35) + '...') : lastMessage.text}</Text>
        : <Text style={[styles.lastMessage, {fontFamily: constants.PRIMARY_FONT}]}>{lastMessage.text.length > 35 ? (lastMessage.text.slice(0,35) + '...') : lastMessage.text}</Text>} 
        </>
      : null }
    </TouchableOpacity>
  );
}


class Main extends React.Component {

  state = {
    selected: null
  }

  componentDidMount(){
    console.log('Main component mounted', this.props)
  }

  addChat = () => {
    this.props.navigation.navigate('AddChat')
  }

  onSelect = (id) => {
    console.log("Clicked Chat: ", id)
    this.props.navigation.navigate('Chat', {id: id})
  }

  deleteChat = (item) => {
    console.log("Delete: ", item)
    Alert.alert(
      'Delete this chat?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Delete chat cancelled')},
        {text: 'Yes', onPress: () => {
          this.props.deleteChat(item)
        }
        },
      ],
      {cancelable: false},
    )
  }

  render() {
  return (
      <>
        <CustomHeader title={'Home'} commandEnabled={true} commandName={'add'} command={this.addChat} />

        {this.props.user.chats ?
          <>
          {this.props.user.chats.length > 0 ?
            <SafeAreaView style={styles.container}>
              <SwipeableFlatList
                data={this.props.user.chats}

                renderItem={({ item }) => (
                  <Item
                  id={item.id}
                  style={{ height: 60 }}
                  title={item.courseTitle}
                  onSelect={this.onSelect}
                  lastMessage={item.lastMessage}
                  />
                )}              

                renderRight={({ item }) => (
                  <TouchableOpacity style={styles.deleteSlider} onPress={() => this.deleteChat(item)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}

                keyExtractor={item => item.id}
              />
          </SafeAreaView>
          : <View style={styles.addChatContainer}>
              <Text style={styles.addChatsText}>Your chats will appear here</Text>
              <Text style={styles.addChatsText}>Add new chats by clicking + in the navigation bar</Text>
            </View>}
          </>
        : <Spinner/> }
      </>
    )
  }
}

const populates = [
  { child: 'chats', 
    root: 'chats', 
    keyProp: 'courseTitle', 
    queryParams: ['orderByChild=timestamp'], 
  },
  { child: 'lastMessage', 
    root: 'messages',
  },
  { child: 'messages', 
    root: 'messages',
  },
]

const mapDispatchToProps = (dispatch) => {
  return {
    deleteChat: (chat) => dispatch(deleteChat(chat)),
  }
}

// need to listen at ever level - chats and messages
const mapStateToProps = (state) => { 
    console.log("Main mapStateToProps -> state: ", state)
    let user = populate(state.firestore, 'user', populates, [])
   
    console.log('user: ', user)
    if(user && user.chats){
      console.log(state.firestore)
      let temp = {...user, 
        chats: Object.values(user.chats).map(chat => ({
          ...chat,
        // listen to all messages, and then get chat.messages.map((message) => return state.firebase.messages[message])
          lastMessage: chat.lastMessage 
            ? state.firestore.data.allMessages[chat.lastMessage]
            : null,
        })).sort((a,b) => {
          if (a.timestamp > b.timestamp) return -1
          else if (a.timestamp < b.timestamp) return 1
          else return 0
        })
      }
      return {
        auth: state.firebase.auth,
        user: temp,
      }
    }else{
      return {
        auth: state.firebase.auth,
        user: { chats: null },
      }
    }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    console.log("Main firestoreConnect -> props : ", props)
    // listen to the user document and each chat document active for the user
    return [ { collection: 'users', doc: props.auth.uid, populates, storeAs: 'user' }, 
      { collection: 'messages', storeAs: 'allMessages' }, 
      { collection: 'chats' }  ]
  }),
)(Main)



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 60,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    borderTopWidth: 0,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 14,
  },
  subTitle: {
    fontSize: 8,  
  },
  lastMessage: {
    fontSize: 14,
    color: '#708090'
  },
  deleteSlider: {
    width: 100,
    height: 60,
    backgroundColor: '#f91313',
    justifyContent: 'center',
    alignItems: 'center', 
    color: 'black',
    borderWidth: 0.3,
    borderColor: 'black',
  },
  deleteText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  addChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  addChatsText: {
    fontSize: 15,
    color: '#707070',
  }
})