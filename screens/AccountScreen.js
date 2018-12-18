import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Button, TouchableRipple, Title} from "react-native-paper";
import {Platform, TouchableOpacity, View} from "react-native";
import {createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import SettingsScreen from "./SettingsScreen";

const ProfileStack = createStackNavigator({
    Account: SettingsScreen,
});

ProfileStack.navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
        />
    ),
};

const MyBookingsStack = createStackNavigator({
    Account: SettingsScreen,
});

MyBookingsStack .navigationOptions = {
    tabBarLabel: 'My Bookings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
        />
    ),
};

const PaymentsStack = createStackNavigator({
    Account: SettingsScreen,
});

PaymentsStack.navigationOptions = {
    tabBarLabel: 'Payments',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
        />
    ),
};


export default createMaterialTopTabNavigator({
    MyBookingsStack,
    ProfileStack,
    PaymentsStack,
},{
    swipeEnabled: false,
    tabBarOptions: {

    }
});
