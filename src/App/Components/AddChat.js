import React from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  Button
} from 'react-native';
import Space from './Space';
import BackHeader from './BackHeader';
import RNPicker from "rn-modal-picker";
import AwesomeButton from "react-native-really-awesome-button";

import firebase from 'react-native-firebase'
import firestore from '@react-native-firebase/firestore';



export default class AddChat extends React.Component {

    state = { subjectSource: [], courseSource: [],
    selectedCourse: null,
    subjectsPlaceHolderText: "Please Select Subject",
    coursesPlaceHolderText: "Please Select Course",
    selectedSubjectText: "", selectedCourseText: "", selectedCourseCode: ''}


    componentDidMount() {
        this.readSubjectData()
    }

    _selectedSubjectValue(index, item) {
        this.setState({ selectedSubjectText: item.name })
        // new subject was selected, clear the course list and text
        this.setState({ selectedCourseText: '', selectedCourse: null, courseSource: []})
        

        // populate the course selector based on the chosen subject
        let docRef = firestore().collection("subjects").doc(item.name);
        docRef.get().then((doc) => {
            if (doc.exists) {
                doc.data().courses.map((course) => {
                    firestore().collection('courses').doc(course).get().then((doc) => {
                        this.setState({ courseSource: [...this.state.courseSource, {id: doc.data().courseCode, name:  (doc.data().courseTitle + ' (' + doc.data().courseCode + ')')}]})
                    })
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    _selectedCourseValue(index, item) {
        this.setState({ selectedCourseText: item.name })
        this.setState({selectedCourseCode: item.id })
    }


    goBack = () => {
        this.props.navigation.goBack()
    }




    readSubjectData = () => {
        console.log("read subj data")
        firestore().collection('subjects').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                this.setState({ subjectSource: [...this.state.subjectSource, {id: doc.id, name: doc.id}] })
            });
        });
    }


    
    searchButtonPress = () => {

        let subject = this.state.selectedSubjectText
        let course = this.state.selectedCourseText

        console.log(subject, course)
        if(subject && course){
            console.log('both fields populated', subject, course)
            let user = firebase.auth().currentUser;
            let courseRef = firestore().collection('courses').where('subject', '==', subject)
                .where('courseCode', '==', this.state.selectedCourseCode)


            courseRef.get().then(doc => {
                doc.forEach(ref => {
                    console.log(ref)
                    if(ref.data().activeChat){
                        console.log("the chat exists for this course")

                         // add the new chat to the user chat array
                        firestore().collection("users").doc(user.uid).update({
                            chats: firestore.FieldValue.arrayUnion(ref.data().activeChat)
                        })

                    }else{
                        console.log("the chat doesn't exist for this course")

                        // chat does not exist for this course, create one
                        firestore().collection('chats').add({
                            subjectName: subject,
                            courseTitle: course,
                            courseRef: ref.id,
                            courseCode: this.state.selectedCourseCode,
                            messages: []
                        }).then(doc => {
                            firestore().collection('courses').doc(ref.id).update({
                                activeChat: doc.id
                            })
                            
                            // add the new chat to the user chat array
                            firestore().collection("users").doc(user.uid).update({
                                chats: firestore.FieldValue.arrayUnion(doc.id)
                            })
                        })
                    }
                })
            }).then(() => this.goBack())
        }
    }

    render() {
    return (
        <>
            <BackHeader title={'Find a Chatroom'} command={this.goBack} titleSize={22}  />

          {this.state.subjectSource ?
            <View style={styles.container}>
                
                <RNPicker
                dataSource={this.state.subjectSource}
                dummyDataSource={this.state.subjectSource}
                defaultValue={false}
                pickerTitle={"Pick A Subject"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Search..."}
                showPickerTitle={true}
                searchBarContainerStyle={this.props.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={this.state.selectedSubjectText}
                placeHolderText={this.state.subjectsPlaceHolderText}
                placeHolderLabel={this.state.subjectsPlaceHolderText}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                //dropDownImageStyle={styles.dropDownImageStyle}
                //dropDownImage={require("./res/ic_drop_down.png")}
                selectedValue={(index, item) => this._selectedSubjectValue(index, item)}
                />

                <Space height={10}></Space>

                {this.state.selectedSubjectText ?
             
                    <RNPicker
                    dataSource={this.state.courseSource}
                    dummyDataSource={this.state.courseSource}
                    defaultValue={false}
                    pickerTitle={"Pick A Course"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={"Search..."}
                    showPickerTitle={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={styles.pickerStyle}
                    pickerItemTextStyle={styles.listTextViewStyle}
                    placeHolderText={this.state.coursesPlaceHolderText}
                    selectedLabel={this.state.selectedCourseText}
                    placeHolderLabel={this.state.coursesPlaceHolderText}
                    selectLabelTextStyle={styles.selectLabelTextStyle}
                    placeHolderTextStyle={styles.placeHolderTextStyle}
                    //dropDownImageStyle={styles.dropDownImageStyle}
                    //dropDownImage={require("./res/ic_drop_down.png")}
                    selectedValue={(index, item) => this._selectedCourseValue(index, item)}
                    />
                    : null
                }

                <AwesomeButton onPress={this.searchButtonPress} borderRadius={20} backgroundColor='#0099ff' style={styles.searchButton}>Search</AwesomeButton>
            </View>
          : null}


        </>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    borderTopWidth: 0,
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 16,
  },

  // RNPicker styles
  containerStyle: {
    marginTop: 100,
    paddingTop: 100,
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 18,
    elevation:3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row",
    paddingTop: 7,
    paddingBottom: 7,
  },
  searchButton: {
    marginTop: 15
  }
})