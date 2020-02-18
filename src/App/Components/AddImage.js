import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'rn-fetch-blob'


import firestore from '@react-native-firebase/firestore';
import firebase from 'react-native-firebase'
import firebaseSDK from '../../../config/firebaseSDK'



export default class AddPost extends React.Component {
    state = {
      image: null,
    }
    onChangeTitle = title => {
      this.setState({ title })
    }

    selectImage = () => {
        ImagePicker.showImagePicker({title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
        response => {
            if(response.error){
                console.log('image error')
            }else{
                const source = { uri: response.uri }
                this.setState({
                image: source
                })
            }
        }
        )
    }

    
      onSubmit = async () => {
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        const filename = `${uuid()}`;
        let mime = 'image/jpeg'
        return new Promise((resolve, reject) => {
            let imgUri = this.state.image; let uploadBlob = null;
            const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
            const { currentUser } = firebase.auth();
            const imageRef = firebase.storage().ref(`/profiles/${currentUser.uid}`)
        
            fs.readFile(uploadUri, 'base64')
              .then(data => {
                return Blob.build(data, { type: `${mime};BASE64` });
              })
              .then(blob => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime, name: filename });
              })
              .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL();
              })
              .then(url => {
                resolve(url);
              })
              .catch(error => {
                reject(error)
            })
          })
      }

  
    render() {
        return (
            < >
                <Button onPress={this.selectImage} title={'pick image'}></Button>
                <Image source={this.state.image} style={{height:50, width:50}} />
                <Button onPress={this.onSubmit} title={'submit'}></Button>
            </>
        )
    }
  }