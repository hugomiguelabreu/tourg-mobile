import React from 'react';
import { View, Text } from 'react-native';
import {Title, Searchbar} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";

export default class SearchHeader extends React.Component {
    render() {
        return (
            <View style={{flex:1, flexDirection: 'column'}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Title>FIND ACTIVITIES</Title>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:4}}>
                        <Searchbar
                            style={{border:0, elevation: 0}}
                            placeholder="Search a city..."
                        />
                    </View>
                    <View style={{flex:2, flexDirection:'row', alignItems: 'center'}}>
                        <View style={{flex:0.5}}>
                            <Title>|</Title>
                        </View>
                        <View style={{flex:2, flexDirection:'row', justifyContent:'space-around', alignItems:'stretch'}}>
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
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}