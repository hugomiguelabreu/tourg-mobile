import React from 'react';
import {View, Text, TouchableNativeFeedback, Image, StyleSheet} from 'react-native';
import {Title, Card, Paragraph, Button, Divider} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";
import{stripe} from 'tipsi-stripe';

export default class BookOption extends React.Component {


    render() {
        return (
            <View style={{flex:1, flexDirection: 'column'}}>
                <Card style={{flex:1}}>
                    <Card.Content>
                        <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{fontWeight: '900'}}>{this.props.startHour} - {this.props.endHour}</Text>
                                <Text style={{fontSize: 11, color:'grey'}}>{this.props.price}€ per person | Min: <Text style={{fontWeight: '800'}}>{this.props.minimum}</Text>
                                    {this.props.minimum == 1 ? ' person' : ' people'} required</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:0.1}}>
                                    <Title style={{color:'grey'}}>|</Title>
                                </View>
                                <View style={{flex:1}}>
                                    <Button title='Book' onPress={() => {this.props.navigation.navigate('Payment', {activityId: this.props.activityId, activityDateId: this.props.activityDateId})}}>
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