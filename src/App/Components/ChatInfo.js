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
import BackHeader from './BackHeader'

import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { deleteChat } from '../Redux/actions/chatActions'
import Spinner from './Spinner'
import * as constants from '../../constants';


class ChatInfo extends React.Component {

  state = {
    selected: null
  }

  componentDidMount(){
    console.log('Main component mounted', this.props)
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
      const chatData = this.props.navigation.state.params
  return (
      <>
          <BackHeader title={'Chat Info'} leftAction={this.goBack} isClickable={false} titleSize={22}  />
          {console.log("ChatInfo props: ", this.props)}

          {chatData ?
            <View>
                 <View style={styles.editInfoMid}>
                    <Text style={styles.labelText}>Subject</Text>
                    <Text style={styles.dataText}>{chatData.subjectName}</Text>
                </View>
                <View style={styles.editInfoMid}>
                    <Text style={styles.labelText}>Course Title</Text>
                    <Text style={styles.dataText}>{chatData.courseTitle}</Text>
                </View>
                <View style={styles.editInfoMid}>
                    <Text style={styles.labelText}>Course Code</Text>
                    <Text style={styles.dataText}>{chatData.courseCode}</Text>
                </View>
            </View>
            : <Spinner /> }
      </>
    )
  }
}

{/* <TextdataText
                        editable={false}
                        style={[styles.dataText, {fontFamily: constants.PRIMARY_FONT}]}
                        placeholder={this.props.user.email}
                        defaultValue={this.state.currentUser.email}
                        onChangeText={(str) => this.onChangeTextdataText(str, 'email')}            
                        underlineColorAndroid="transparent"
                    /> */}


const mapDispatchToProps = (dispatch) => {
  return {}
}

// need to listen at ever level - chats and messages
const mapStateToProps = (state) => { 
    console.log(state)
    return {}}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ChatInfo)



const styles = StyleSheet.create({
    editInfoMid: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c8c7cc',
        backgroundColor: 'white',
        borderBottomWidth: 1,
      },
      labelText: {
          paddingLeft: 15,
          fontSize: 16
      },
      dataText: {
          flex: 1,
          paddingTop: 10,
          paddingRight: 15,
          paddingLeft: 15,
          paddingBottom: 10,
          color: '#424242',
          fontSize: 16,
          textAlign: 'right'
      },
})