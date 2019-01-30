import React from 'react';
import {View, Text, TouchableNativeFeedback, Image, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import {Title, Card, Paragraph, Button, Divider} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";

export default class ActivityCard extends React.Component {

    moment = require('moment');
    joined = null;

    constructor(props){
        super(props);
        if(this.props.guideJoined != null)
            this.joined = this.moment(this.props.guideJoined.replace(/[-:Z]/g, ''));
    }

    render() {
        return (
            <View style={{flex:1, flexDirection: 'column', paddingBottom: 30}}>
                <TouchableNativeFeedback
                    onPress={() => {this.props.navigation.navigate('Activity', {activityId: this.props.id})}}>
                    <Card style={{flex:1}}>
                        <Card.Cover style={{height:120}} source={{ uri: 'http://188.166.173.44/' + this.props.activityImage }} />
                        <Card.Content style={{flex:1, paddingTop: 5}}>
                            <Title>{this.props.title}</Title>
                            <Paragraph numberOfLines={2}>{this.props.description}</Paragraph>
                        </Card.Content>
                        <Divider style={{marginTop: 10, marginBottom: 2}} />
                        <Card.Actions>
                            <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex:0.5, flexDirection:'row'}}>
                                    <Image style={{width:32, height:32}} source={{uri: 'http://188.166.173.44/' + this.props.guidePhoto}} />
                                </View>
                                <View style={{flex:1, flexDirection:'column'}}>
                                    <Text style={{fontWeight: '900'}}>{this.props.guideName}</Text>
                                    <Text style={{fontSize: 11, color:'grey'}}>Joined {this.joined != null ? this.joined.format("MMM, YYYY") : ''}</Text>
                                </View>
                                <View style={{flex:1, flexDirection:'column', paddingLeft: 10}}>
                                    <Text style={{fontWeight: '900'}}>Rating</Text>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Icon.Ionicons
                                            name='md-star'
                                            size={12}
                                            style={{ marginTop:0.5, marginRight: 2 }}
                                        />
                                        <Text style={{ fontSize: 11, color:'grey', marginRight: 5 }}>{this.props.activityScore}</Text>
                                        <Text style={{ fontSize: 11, color:'grey' }}>({this.props.activityScoreCount})</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'column'}}>
                                    <Text style={{fontWeight: '900'}}>Price</Text>
                                    <Text style={{fontSize: 11, color:'grey'}}>{this.props.price}€ per person</Text>
                                </View>
                            </View>
                        </Card.Actions>
                    </Card>
                </TouchableNativeFeedback>
            </View>
        );
    }
}