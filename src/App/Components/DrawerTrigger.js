import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'


// withNavigation allows components to dispatch navigation actions
import { withNavigation } from 'react-navigation';

// DrawerActions is a specific type of navigation dispatcher
import { DrawerActions } from 'react-navigation-drawer';

class DrawerTrigger extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.trigger}
        onPress={() => {
          this.props.navigation.dispatch(DrawerActions.openDrawer())
        }}
      >
      <Icon name={'md-menu'} size={38} color={'black'} />

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  trigger: {
    borderRadius: 30,
  }
});

export default withNavigation(DrawerTrigger);