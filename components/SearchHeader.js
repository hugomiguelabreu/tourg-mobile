import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {Title, Searchbar} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";

export default class SearchHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            query: '',
            typing: false,
            typingTimeout: 0
        }
    }

    querySearch = (query) => {
        const self = this;
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
        this.setState({
            query: query,
            typing: false,
            typingTimeout: setTimeout(function () {
                self.props.handleQuery(query);
            }, 500)
        });
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
                            onChangeText={query => { this.querySearch(query) }}
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
                                <Text>GPS</Text>
                                <Text>Location</Text>
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