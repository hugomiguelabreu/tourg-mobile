import React from 'react';
import {Platform, StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Divider, FAB, Title} from "react-native-paper";
import SearchHeader from "../components/SearchHeader";
import ActivityCard from "../components/ActivityCard";
import CalendarPicker from "react-native-calendar-picker/CalendarPicker";



export default class ChatScreen extends React.Component {

    static navigationOptions = {
        headerTitle: <View style={{flex:1, flexDirection: 'column'}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Title>RATING</Title></View></View>,
    };


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.pic}>
                        <View style={styles.topText}>
                            <Text style={styles.title}>Kek</Text>
                            <Text style={styles.rating}>Kappa</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header:{

    },

    pic:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        backgroundColor:'gray',
        alignSelf: 'stretch',
    },

    topText:{
        flex:0.6,
        flexDirection:'column',
        paddingTop: 50,
        paddingBottom: 5,

    },

    title:{
        fontWeight: 'bold',
        fontSize:30,
        color:'white',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5
    },

    rating:{
        color: 'white',
    }
});