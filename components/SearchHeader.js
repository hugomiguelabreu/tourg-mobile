import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {Title, Searchbar} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";
import axios from "axios";

export default class SearchHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            query: '',
            city: null,
            country: null,
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

    _getCity(){
        let me = this;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.lat + ',' + this.state.lng + '&key=AIzaSyA4Bctc88WtGRmd_dOOMoF26XllgIyBhPc')
            .then((resp) => {
                me.setState({query: resp.data.results[0].address_components[1].long_name, city: resp.data.results[0].address_components[1].long_name,
                                country: resp.data.results[0].address_components[3].long_name});
                this.querySearch(me.state.query);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Function to get user location using gps
    _getLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
                this._getCity();
            },
            error => Alert.alert('Error while getting location', error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
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
                            value={this.state.query}
                        />
                    </TouchableOpacity>
                    <View style={{flex:2, flexDirection:'row', alignItems: 'center'}}>
                        <View style={{flex:0.5}}>
                            <Title>|</Title>
                        </View>
                        <TouchableOpacity style={{flex:2, flexDirection:'row', justifyContent:'space-around', alignItems:'stretch'}}
                            onPress={this._getLocation}>
                            <View style={{flex:2, flexDirection:'column', justifyContent: 'center'}}>
                                <Text>{this.state.city==null ? 'GPS' : this.state.city}</Text>
                                <Text>{this.state.country==null ? 'Location' : this.state.country}</Text>
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