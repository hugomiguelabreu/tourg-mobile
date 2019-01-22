import React from 'react';
import {View, Text, TouchableNativeFeedback, Image, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import {Title, Card, Paragraph, Button, Divider, Subheading} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";

export default class BookedCard extends React.Component {

    moment = require('moment');
    joined = null;
    timer = null;

    constructor(props){
        super(props);
        if(this.props.guideJoined != null)
            this.joined = this.moment(this.props.guideJoined.replace(/[-:Z]/g, ''));
        this.state = {
            end: this.moment(this.props.bookingDate.replace(/[-:Z]/g, '')).subtract(2, 'h'),
            time: this.moment.duration(this.moment(this.props.bookingDate.replace(/[-:Z]/g, '')).subtract(2, 'h').diff(this.moment(Date.now()))),
        }
    }

    componentDidMount() {
        if(this.props.accepted == null &&
            (this.moment(Date.now()).isBefore(this.state.end))) {
            this.timer = setInterval(() => {
                this.setState({ time: this.moment.duration(this.state.end.diff(this.moment(Date.now()))) });
                if((this.state.time.valueOf() <= 0))
                    clearInterval(this.timer);
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    _confirmed() {
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems: 'center'}}>
                <Icon.Ionicons
                    name='md-checkmark-circle-outline'
                    size={16}
                    color='green'
                    style={{ marginRight: 0 }}
                />
                <Subheading style={{fontSize:14, color:'green', marginLeft: 10}}>Confirmed</Subheading>
            </View>
        );
    }

    _pending() {
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems: 'center'}}>
                <Icon.Ionicons
                    name='md-time'
                    size={16}
                    color='orange'
                    style={{ marginRight: 0 }}
                />
                <View syle={{flex:1, flexDirection:'column'}}>
                    <Subheading style={{fontSize:14, color:'orange', marginLeft: 10}}>Pending</Subheading>
                    <Subheading style={{fontSize:14, color:'orange', marginLeft: 10}}>({this.moment(this.state.time.asMilliseconds()).format('HH:mm:ss')})</Subheading>
                </View>
            </View>
        );
    }

    _canceled() {
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignItems: 'center'}}>
                <Icon.Ionicons
                    name='md-close-circle-outline'
                    size={16}
                    color='red'
                    style={{ marginRight: 0 }}
                />
                <Subheading style={{fontSize:14, color:'red', marginLeft: 10}}>Canceled</Subheading>
            </View>
        );
    }

    _state(){

        if(this.props.accepted == null
            && (this.state.time.valueOf() <= 0)){
            return(
                this._canceled()
            );
        }

        if(this.props.accepted == true)
            return this._confirmed();
        else if(this.props.accepted == false)
            return this._canceled();
        else
            return this._pending();
    }

    render() {
        return (
            <View style={{flex:1, flexDirection: 'column', paddingBottom: 30}}>
                <TouchableNativeFeedback
                    onPress={() => {this.props.navigation.navigate('Rating', {activityId: this.props.id, guideId: this.props.guideId, activityTitle: this.props.title,
                        activityRating:this.props.activityScore})}}>
                    <Card style={{flex:1}}>
                        <Card.Cover style={{height:120}} source={{ uri: 'https://picsum.photos/500/?random' }} />
                        <Card.Content style={{flex:1, paddingTop: 5}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:3, flexDirection:'column'}}>
                                    <Title>{this.props.title}</Title>
                                    <Paragraph numberOfLines={2}>{this.props.description}</Paragraph>
                                </View>
                                {this._state()}
                            </View>
                        </Card.Content>
                        <Divider style={{marginTop: 10, marginBottom: 2}} />
                        <Card.Actions>
                            <View style={{flex:1, flexDirection:'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <View style={{flex:0.5, flexDirection:'row'}}>
                                        <Image style={{width:32, height:32}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDSnWBOqgvr4hOdTTAhcaNU3KAaWQNn8UHqafmbHY_y39ysZ1'}} />
                                    </View>
                                    <View style={{flex:1, flexDirection:'column'}}>
                                        <Text style={{fontWeight: '900'}}>{this.props.guideName}</Text>
                                        <Text style={{fontSize: 11, color:'grey'}}>Joined {this.joined != null ? this.joined.format("MMM YYYY") : ''}</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'column', paddingLeft: 10}}>
                                        <Text style={{fontWeight: '900'}}>Date</Text>
                                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                            <Icon.Ionicons
                                                name='md-calendar'
                                                size={12}
                                                style={{ marginRight: 5 }}
                                            />
                                            <Text style={{ fontSize: 11, color:'grey' }}>{this.moment(this.props.bookingDate.replace(/[-:Z]/g, '')).format("DD/MM/YYYY")}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:1, flexDirection:'column'}}>
                                        <Text style={{fontWeight: '900'}}>Hour</Text>
                                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                            <Icon.Ionicons
                                                name='md-time'
                                                size={12}
                                                style={{ marginRight: 5 }}
                                            />
                                            <Text style={{fontSize: 11, color:'grey'}}>{this.moment(this.props.bookingDate.replace(/[-:Z]/g, '')).format("HH:mm ")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Card.Actions>
                    </Card>
                </TouchableNativeFeedback>
            </View>
        );
    }
}