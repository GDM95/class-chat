import React from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Space from './Space';
import BackHeader from './BackHeader';
import RNPicker from "rn-modal-picker";

import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createChat, getSubjects, getCourses, clearCourses } from '../Redux/actions/chatActions'
import Spinner from './Spinner'
import * as constants from '../../constants';



class AddChat extends React.Component {

    state = { 
      subjectsPlaceHolderText: "Please Select Subject",
      coursesPlaceHolderText: "Please Select Course",
      selectedSubjectText: "", selectedCourseText: "", selectedCourseCode: ""
    }


    componentDidMount() {
        this.props.getSubjects()
    }

    _selectedSubjectValue(index, item) {
      this.props.getCourses(item.id)
      this.setState(() => ({ ...this.state, selectedSubjectText: item.name, selectedCourseText: ''}))
    }

    _selectedCourseValue(index, item) {
        this.setState(() => ({ ...this.state, selectedCourseText: item.name, selectedCourseCode: item.courseCode }))
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    addChatPress = () => {
        let subject = this.state.selectedSubjectText
        let course = this.state.selectedCourseText
        let courseCode = this.state.selectedCourseCode
        if(subject && course && courseCode){
            this.props.createChat({ subject, course, courseCode: this.state.selectedCourseCode })
            this.goBack()
        }
    }

    render() {
    return (
        <>
          {console.log("Comp props: ", this.props)}
          <BackHeader title={'Find a Chatroom'} leftAction={this.goBack} titleSize={22}  />

          {this.props.subjects ?
            <View style={styles.container}>
                <RNPicker
                dataSource={this.props.subjects}
                dummyDataSource={this.props.subjects}
                defaultValue={false}
                pickerTitle={"Search Subjects"}
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
                placeholderTextColor="black"
                selectedValue={(index, item) => this._selectedSubjectValue(index, item)}
                />

                <Space height={10}></Space>

                {this.state.selectedSubjectText ?
             
                    <RNPicker
                    dataSource={this.props.courses}
                    dummyDataSource={this.props.courses}
                    defaultValue={false}
                    pickerTitle={"Search Courses"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={"Search..."}
                    showPickerTitle={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={styles.pickerStyle}
                    pickerItemTextStyle={styles.listTextViewStyle}
                    placeHolderText={this.state.coursesPlaceHolderText}
                    placeHolderLabel={this.state.coursesPlaceHolderText}
                    placeHolderTextStyle={styles.placeHolderTextStyle}
                    placeholderTextColor="black"
                    selectedLabel={this.state.selectedCourseText}
                    selectLabelTextStyle={styles.selectLabelTextStyle}
                    selectedValue={(index, item) => this._selectedCourseValue(index, item)}
                    />
                    : null
                }

                {this.state.selectedCourseText 
                  ? <TouchableOpacity
                      style={[styles.addChatButton, {backgroundColor: constants.SECONDARY_COLOR}]}
                      onPress={this.addChatPress} 
                      underlayColor='#fff'>
                      <Text style={styles.addChatText}>Search</Text>
                    </TouchableOpacity>
                  : null
                }
            </View>
          : <Spinner />}
        </>
        )
    }
}


const mapStateToProps = (state) => {
  
  console.log("AddChat state: ", state)
  return {
    user: state.firebase.profile,
    subjects: state.chat.subjects,
    courses: state.chat.courses
    //courses: []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createChat: (obj) => dispatch(createChat(obj)),
    getSubjects: () => dispatch(getSubjects()),
    getCourses: (index) => dispatch(getCourses(index)),
    clearCourses: () => dispatch({ type: 'CLEAR_COURSES' })
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AddChat)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'column',
    alignItems: 'center',
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
    color: 'black',
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
    marginBottom: 10,
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
  addChatButton: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor:'#0099ff',
    borderRadius: 10,    
    borderWidth: 1,
    borderColor: '#fff',
    textAlign:'center',
    justifyContent: 'center',
    height: 45,
    width: "85%",
  },
  addChatText:{
    fontSize: 18,
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
}
})
