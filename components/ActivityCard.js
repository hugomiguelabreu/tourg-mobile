import React from 'react';
import {View, Text, TouchableNativeFeedback, Image, StyleSheet} from 'react-native';
import {Title, Card, Paragraph, Button, Divider} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";

export default class ActivityCard extends React.Component {
    render() {
        return (
            <View style={{flex:1, flexDirection: 'column', paddingBottom: 30}}>
                <TouchableNativeFeedback
                    onPress={() => {this.props.navigation.navigate('Booking')}}>
                    <Card style={{flex:1}}>
                        <Card.Cover style={{height:130}} source={{ uri: 'https://picsum.photos/500/?random' }} />
                        <Card.Content style={{flex:1}}>
                            <Title>Experiência gastronómica</Title>
                            <Paragraph numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                In tempus vitae enim sed euismod.</Paragraph>
                        </Card.Content>
                        <Divider style={{marginTop: 10, marginBottom: 2}} />
                        <Card.Actions>
                            <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex:0.5, flexDirection:'row'}}>
                                    <Image style={{width:32, height:32}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDSnWBOqgvr4hOdTTAhcaNU3KAaWQNn8UHqafmbHY_y39ysZ1'}} />
                                </View>
                                <View style={{flex:1, flexDirection:'column'}}>
                                    <Text style={{fontWeight: '900'}}>John Doe</Text>
                                    <Text style={{fontSize: 11, color:'grey'}}>Joined Aug. 2018</Text>
                                </View>
                                <View style={{flex:1, flexDirection:'column', paddingLeft: 10}}>
                                    <Text style={{fontWeight: '900'}}>Rating</Text>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                                        <Icon.Ionicons
                                            name='md-star'
                                            size={12}
                                            style={{ marginTop:0.5, marginRight: 2 }}
                                        />
                                        <Text style={{ fontSize: 11, color:'grey', marginRight: 5 }}>4.5</Text>
                                        <Text style={{ fontSize: 11, color:'grey' }}>(143)</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'column'}}>
                                    <Text style={{fontWeight: '900'}}>Availability</Text>
                                    <Text style={{fontSize: 11, color:'grey'}}>Available now</Text>
                                </View>
                            </View>
                        </Card.Actions>
                    </Card>
                </TouchableNativeFeedback>
            </View>
        );
    }
}