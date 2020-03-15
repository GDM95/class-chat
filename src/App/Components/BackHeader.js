import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'
import * as constants from '../../constants';


export default class BackHeader extends React.Component {
  render() {
    return (
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content"
        leftComponent={<TouchableOpacity style={styles.trigger} onPress={this.props.leftAction} >
            <Icon name={'md-arrow-round-back'} size={32} color={'black'} />
            </TouchableOpacity>}
        rightComponent={this.props.rightText ?
            <TouchableOpacity style={styles.trigger} onPress={this.props.rightAction} >
            <Text style={styles.rightText}>{this.props.rightText}</Text>
            </TouchableOpacity>
        : null}
        centerComponent={this.props.isClickable ? 
            <TouchableOpacity onPress={this.props.centerAction}>
                <View style={{flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'}}>
                    <Text style={[styles.centerText, {fontSize: this.props.titleSize, paddingRight: 2}]}>{this.props.title}</Text>
                    <Icon name={'ios-information-circle-outline'} size={15} color={'black'} style={{paddingBottom: 5}} />
                </View>
            </TouchableOpacity>
            : <Text style={[styles.centerText, {fontSize: this.props.titleSize}]}>{this.props.title}</Text>
        }
        containerStyle={{
            backgroundColor: constants.PRIMARY_COLOR,
            borderBottomWidth: 0,
        }}
        />
    )
  }
}

// centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: this.props.titleSize } }}


//<Text style={styles.utility}>G</Text>
const styles = StyleSheet.create({
    rightText: {
        fontSize: 20
    },
    centerText: {
        color: '#fff',
    }
});
