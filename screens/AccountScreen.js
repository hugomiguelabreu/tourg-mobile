import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Button, TouchableRipple, Title} from "react-native-paper";
import {Platform, TouchableOpacity, View} from "react-native";
import AccountStack from '../navigation/AccountStack';
import UserHeader from '../components/UserHeader';
import SearchHeader from "../components/SearchHeader";

export default class AccountScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: <UserHeader navigation={navigation} />,
        headerStyle: {
            height:86,
            elevation:1,
        },
    });

    render() {
        return (
            <View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
                <AccountStack/>
            </View>
        );
    }
}
