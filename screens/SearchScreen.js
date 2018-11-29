import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Title} from "react-native-paper";
import SearchHeader from "../components/SearchHeader";

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
                  <View style={styles.getStartedContainer}>
                      <Text style={styles.getStartedText}>Get started by opening</Text>

                      <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                          <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
                      </View>

                      <Text style={styles.getStartedText}>
                          Change this text and your app will automatically reload.
                      </Text>
                  </View>

                  <View style={styles.helpContainer}>
                      <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
                          <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
                      </TouchableOpacity>
                  </View>
              </ScrollView>

              <View style={styles.tabBarInfoContainer}>
                  <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

                  <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                      <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
                  </View>
              </View>
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
});
