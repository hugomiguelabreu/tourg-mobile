import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {Title, Searchbar} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";

export default class SearchHeader extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, flexDirection: 'column'}}>
                <View style={{flex:1, paddingTop:5, alignItems:'center', justifyContent:'center'}}>
                    <Title>FIND ACTIVITIES</Title>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <TouchableOpacity style={{flex:4}}>
                        <Searchbar
                            style={{border:0, elevation: 0, flex:1}}
                            placeholder="Search a city..."
                        />
                    </TouchableOpacity>
                    <View style={{flex:2, flexDirection:'row', alignItems: 'center'}}>
                        <View style={{flex:0.5}}>
                            <Title>|</Title>
                        </View>
                        <TouchableOpacity style={{flex:2, flexDirection:'row', justifyContent:'space-around', alignItems:'stretch'}}
                            onPress={this.props.onClick}>
                            <View style={{flex:2, flexDirection:'column', justifyContent: 'center'}}>
                                <Text>Braga,</Text>
                                <Text>Portugal</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Icon.Ionicons
                                    name='md-map'
                                    size={26}
                                    color={Colors.tabIconDefault}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}