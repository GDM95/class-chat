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
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';

import { withNavigation } from 'react-navigation';
import CustomHeader from './CustomHeader'

import firebase from 'react-native-firebase'
import firestore from '@react-native-firebase/firestore';


import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'



Item = ({ id, title, subTitle, selected, onSelect, lastMessage}) => {

  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? 'gray' : 'white' },
      ]}
    >
    <Text style={styles.title}>{title}</Text>
    {lastMessage ? <Text style={styles.lastMessage}>{lastMessage.length > 35 ? (lastMessage.slice(0,35) + '...') : lastMessage}</Text> : null }
    </TouchableOpacity>
  );
}


class Main extends React.Component {

  state = { currentUser: null, chatData:[]}


  componentDidMount = () => {
    const { chats, name } = this.props
    console.log('chats: ', chats, name)

    
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.readCourseData()
    }) 
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.setState({chatData: []})
      })
  }

  componentWillUnmount() {
     // Remove the event listeners
    this.willFocusSubscription.remove();
    this.willBlurSubscription.remove();
  }


  readCourseData = () => {
    // Make call to Cloud Firestore
    // for the current user, retrieve the chat document associated with each element in the chats array
    let user = firebase.auth().currentUser;

    firestore().collection("users").doc(user.uid).get().then((doc) => {
      doc.data().chats.map((element) => {
        firestore().collection("chats").doc(element).get().then((doc) => {
          let messages = doc.data().messages
          let lastMessageRef = messages[messages.length - 1]
          firestore().collection("messages").doc(lastMessageRef).onSnapshot((ref) => {
            if(ref.exists){
              this.setState(prevState => ({chatData: [...prevState.chatData, {...doc.data(), id: doc.id, 
                lastMessage: (ref.data().user.name + ': ' + ref.data().text)}]}))
            }else{
              this.setState(prevState => ({chatData: [...prevState.chatData, {...doc.data(), id: doc.id}]}))
            }
          })
        })
      });
    })
  }

  getLastMessage = (id) => {
      console.log('get last message')
      firestore().collection("chats").doc(id).onSnapshot((doc) => {
        let lastMessageRef = doc.data().messages[0]
        firestore().collection("messages").doc(lastMessageRef).onSnapshot((ref) => {
          console.log(ref.data().user.name + ': ' + ref.data().text)
          return (ref.data().user.name + ': ' + ref.data().text)
        })
      });
  }


  addChat = () => {
    this.props.navigation.navigate('AddChat')
  }

  onSelect = (id) => {
    console.log("Chat id: ", id)
    this.props.navigation.navigate('Chat', {id: id})
  }

  // temporary for testing
  signOut = () => {
    Alert.alert(
      'Are you sure you want to sign out?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Sign out cancelled')},
        {text: 'Sign Out', onPress: () => 
            firebase.auth().signOut().then(function() {
            this.props.navigation.navigate('Login')
          }, function(error) {
            // An error happened.
          }) 
        },
      ],
      {cancelable: false},
    );
  }

render() {
return (
  
      <>
        <CustomHeader title={'Home'} commandEnabled={true} commandName={'add'} command={this.addChat} />

        <SafeAreaView style={styles.container}>
          <SwipeableFlatList
            data={this.state.chatData}

            renderItem={({ item }) => (
              <Item
              id={item.id}
              style={{ height: 70 }}
              title={item.courseTitle}
              subTitle={item.subjectName}
              messages={item.messages}
              //selected={!!selected.get(item.id)}
              onSelect={this.onSelect}
              lastMessage={item.lastMessage}
              />
            )}

            renderRight={({ item }) => (
              <Text style={{ width: 100, color: 'black'}}>Delete Chat</Text>
            )}


            keyExtractor={item => item.id}
            //extraData={selected}
          />
        </SafeAreaView>
        <Text>{this.props.user.name}</Text>

        <Button title="signout" onPress={this.signOut}></Button>
        
      </>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
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
    //paddingBottom: 10,
    //paddingTop: 10,
    marginVertical: 0,
    marginHorizontal: 0,
  },

  title: {
    fontSize: 14,
  },
  subTitle: {
    fontSize: 8,
    
  },
  lastMessage: {
    fontSize: 13,
    color: '#708090'
  }
})


const mapStateToProps = (state) => {
  return {
    user: state.firebase.profile,
  }
}

// mapDispatchToProps to get 

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect((props) => {
    return [{ collection: 'chats', doc: props.user.uid }]})
)(Main)


//export default withNavigation(Main);
