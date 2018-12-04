import React from 'react';
import {Platform, StatusBar, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Title} from "react-native-paper";
import { Icon } from 'expo';

export default class BookingScreen extends React.Component {

  static navigationOptions = {
      title: 'BOOKING',
      headerTitleStyle: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center'
      },
  };

  render() {
      return (
          <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
                  <View style={styles.list}>
                      <Text></Text>
                  </View>
              </ScrollView>
          </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },

    list: {
        paddingLeft: 15,
        paddingRight: 15,
        flex:1,
        flexDirection: 'column',
    },
});
