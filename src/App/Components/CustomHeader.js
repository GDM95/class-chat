import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'
import * as constants from '../../constants';


import DrawerTrigger from './DrawerTrigger'

export default class CustomHeader extends React.Component {
  render() {
    return (
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content"
        leftComponent={<DrawerTrigger/>}
        centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 22 } }}
        rightComponent={this.props.commandEnabled 
            ? <TouchableOpacity style={styles.trigger} onPress={this.props.command} >
                <Icon name={'md-add'} size={35} color={'black'} />
            </TouchableOpacity>
            : null }
        containerStyle={{
            backgroundColor: constants.PRIMARY_COLOR,
            borderBottomWidth: 0,
        }}
        />
    )
  }
}


const styles = StyleSheet.create({
    container:{
        //flex: 1,
        flexDirection: 'row',
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 27,
        color: 'black',
    },
    headerTitlePadded: {
        alignSelf: 'center',
        fontSize: 27,
        color: 'black',
    },
    drawerTrigger: {
        alignSelf: 'flex-start',
        marginLeft: 50,
    },
    utility: {
        alignSelf: 'flex-end',
        fontSize: 27
    }
});
