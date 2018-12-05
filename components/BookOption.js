import React from 'react';
import {View, Text, TouchableNativeFeedback, Image, StyleSheet} from 'react-native';
import {Title, Card, Paragraph, Button, Divider} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";

export default class BookOption extends React.Component {
    render() {
        return (
            <View style={{flex:1, flexDirection: 'column'}}>
                <Card style={{flex:1}}>
                    <Card.Content>
                        <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{fontWeight: '900'}}>9AM - 11AM</Text>
                                <Text style={{fontSize: 11, color:'grey'}}>Minimum: 2 people required</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:0.1}}>
                                    <Title style={{color:'grey'}}>|</Title>
                                </View>
                                <View style={{flex:1}}>
                                    <Button title='Book' onPress={() => {}}>
                                        Book
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
                <Divider/>
            </View>
        );
    }
}