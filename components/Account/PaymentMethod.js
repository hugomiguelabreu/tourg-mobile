import React from 'react';
import {View, Text, TouchableNativeFeedback, Image, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import {Title, Card, Paragraph, Button, Divider} from "react-native-paper";
import {Icon} from "expo";

export default class PaymentMethod extends React.Component {
    render() {
        return (
            <View style={{flex:1, flexDirection: 'column', paddingBottom: 30}}>
                <TouchableNativeFeedback
                    onPress={() => {}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:0.2, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Icon.FontAwesome
                                name='cc-visa'
                                size={30}
                            />
                        </View>
                        <View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent:'flex-start'}}>
                            <Text>Update profile picture</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}