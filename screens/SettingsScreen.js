import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Button, TouchableRipple, Title} from "react-native-paper";
import {TouchableOpacity, View} from "react-native";

export default class SettingsScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
        <View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
          <TouchableRipple
              onPress={() => {this.props.navigation.navigate('Auth')}}>
            <Button mode='contained'
                      style={{padding:10}}>
              Logout
            </Button>
          </TouchableRipple>
        </View>
    );
  }
}
