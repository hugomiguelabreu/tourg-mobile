import React from 'react';
import {Platform, StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Title} from "react-native-paper";
import SearchHeader from "../components/SearchHeader";
import ActivityCard from "../components/ActivityCard";



export default class ChatScreen extends React.Component {

    static navigationOptions = {
        headerTitle: <View style={{flex:1, flexDirection: 'column'}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Title>RATING</Title></View></View>,
    };


    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: CHATKIT_USER_NAME
                }}
            />
        );
    }
}