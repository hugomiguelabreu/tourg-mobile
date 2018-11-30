import React from 'react';
import {Platform, StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Title} from "react-native-paper";
import SearchHeader from "../components/SearchHeader";
import ActivityCard from "../components/ActivityCard";

export default class SearchScreen extends React.Component {

  static navigationOptions = {
      headerTitle: <SearchHeader />,
      headerStyle: {
          height:96,
      },
  };

  render() {
      return (
          <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
                  <View style={styles.list}>
                      <ActivityCard/>
                      <ActivityCard/>
                      <ActivityCard/>
                      <ActivityCard/>
                      <ActivityCard/>
                      <ActivityCard/>
                      <ActivityCard/>
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
