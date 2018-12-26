import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainStack from './MainStack';
import AuthStack from './AuthStack';
import AuthLoadingScreen from './AuthLoadingScreen';

export default createSwitchNavigator(
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    {
        AuthLoading: AuthLoadingScreen,
        Main: MainStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }

);