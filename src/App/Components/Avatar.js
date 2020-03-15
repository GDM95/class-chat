import React from 'react'
import { StyleSheet, Platform, Text, View, ImageBackground, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import { TouchableOpacity } from 'react-native-gesture-handler'
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { updateAvatar } from '../Redux/actions/userActions'
import Image from 'react-native-image-progress'
import Spinner from './Spinner'
import * as constants from '../../constants';




class Avatar extends React.Component {

  imageStyle = () => {
    let height = this.props.height
    let borderRadius = height / 2

    return {
      height: height,
      width: height,
      borderWidth: 1,
      borderRadius: borderRadius,
      borderColor: '#F7F2F1',
    }
  }
 
  selectImage = () => {
    ImagePicker.showImagePicker({title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
    response => {
        if(response.error){
            console.log('ImagePicker Error: ', response.error)  
        }else if (response.didCancel) {
          console.log('ImagePicker Canceled ');
        }else{
            const source = { uri: response.uri }
            this.props.updateAvatar({ uri: response.uri })
        }
    })
  }

  render() {
    return (
    <>
    {this.props.active ?
      <>
      <TouchableOpacity onPressOut={this.selectImage}>
          <Image
          style={{height: this.props.height, width: this.props.height,}}
          source={{ uri: this.props.user.avatar }}
          indicator={Spinner}
          imageStyle={this.imageStyle()} />
      </TouchableOpacity> 
      </> 
    :
    <>
      <Image
        style={{height: this.props.height, width: this.props.height,}}
        source={{ uri: this.props.user.avatar }}
        indicator={Spinner}
        imageStyle={this.imageStyle()} 
      />
      <Text style={[styles.userNameText, {fontFamily: constants.PRIMARY_FONT}]}>{this.props.user.name}</Text>
    </>
    }
    </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateAvatar: (avatar) => dispatch(updateAvatar(avatar))
    }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps), 
  firestoreConnect((props) => {
    if( props.user.isLoaded ){
      return [{ collection: 'users', doc: props.user.uid }]
    }return []
  }),
)(Avatar)


const styles = StyleSheet.create({
  userNameText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
  },
})
