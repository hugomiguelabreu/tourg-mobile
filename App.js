import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Constants } from 'expo';
import axios from 'axios';
import userStore from "./stores/UserStore";

export default class App extends React.Component {
  state = {
      isLoadingComplete: false,
  };

  render() {
    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#2E3C58',
            accent: '#349D88',
        }
    };

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <PaperProvider theme={theme}>
            <View style={styles.statusBar} />
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator store = {userStore}/>
            </View>
        </PaperProvider>
      );
    }
  }

  _configAxios = () => {
      axios.defaults.baseURL = 'http://188.166.173.44/api/';
      axios.defaults.headers.common['Authorization'] = '';
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
      this._configAxios(),
    ])
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: -(Constants.statusBarHeight), //Remove extra space of status bar
    },

    statusBar: {
        elevation:1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: Constants.statusBarHeight,
    },
});
