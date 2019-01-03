import {createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import React from "react";
import MyBookings from "../screens/AccountScreens/MyBookings";
import Profile from "../screens/AccountScreens/Profile";
import MyPayments from "../screens/AccountScreens/MyPayments";

const MyBookingsStack = createStackNavigator({
    MyBookings: MyBookings,
});

MyBookingsStack.navigationOptions = {
    tabBarLabel: 'My Bookings',
};

const ProfileStack = createStackNavigator({
    Profile: Profile,
});

ProfileStack.navigationOptions = {
    tabBarLabel: 'My Profile',
};

const PaymentsStack = createStackNavigator({
    Payments: MyPayments,
});

PaymentsStack.navigationOptions = {
    tabBarLabel: 'Payments',
};


export default createMaterialTopTabNavigator({
    MyBookingsStack,
    ProfileStack,
    PaymentsStack,
},{
    swipeEnabled: false,
    optimizationsEnabled: true,
    tabBarOptions: {
        activeTintColor:'#000000',
        inactiveTintColor:'#000000',
        pressColor: '#F1F0F4',
        indicatorStyle: {
            backgroundColor: '#000000',
        },
        style: {
            backgroundColor: '#ffffff',
            elevation: 1,
        },
    }
});