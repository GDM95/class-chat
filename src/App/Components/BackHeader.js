import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'


export default class BackHeader extends React.Component {
  render() {
    return (
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content"
        leftComponent={<TouchableOpacity style={styles.trigger} onPress={this.props.command} >
            <Icon name={'md-arrow-round-back'} size={28} color={'black'} />
        </TouchableOpacity>}
        centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: this.props.titleSize } }}
        />
    )
  }
}


//<Text style={styles.utility}>G</Text>
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
