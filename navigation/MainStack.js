import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ChatScreen from '../screens/ChatScreen';
import BookingScreen from "../screens/BookingScreen";
import MapScreen from "../screens/MapScreen";
import RatingScreen from "../screens/RatingScreen";
import AccountTop from './AccountStack';
import UserHeader from "../components/UserHeader";
import ActivityScreen from "../screens/ActivityScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-globe${focused ? '' : '-outline'}`
          : 'md-globe'
      }
    />
  ),
};

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const SearchStack = createStackNavigator({
    Search: SearchScreen,
    Booking: BookingScreen,
    Activity: ActivityScreen,
    Chat: ChatScreen,
});

SearchStack.navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
        />
    ),
};

const BookingsStack = createStackNavigator({
  Chat: MapScreen,
});

BookingsStack.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'}
    />
  ),
};

const AccountStack = createStackNavigator({
    Account: {
        screen: AccountTop,
        navigationOptions: ({navigation}) => ({
            headerTitle: <UserHeader navigation={navigation} />,
            headerStyle: {
                height:86,
                elevation:1,
            },
        })
    },
    Rating: RatingScreen,
});

AccountStack.navigationOptions = {
    tabBarLabel: 'Account',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    MapStack,
    SearchStack,
    BookingsStack,
    AccountStack,
});
