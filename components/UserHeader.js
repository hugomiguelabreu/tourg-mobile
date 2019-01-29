import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Title, Searchbar, Button, TouchableRipple} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";
import userStore from '../stores/UserStore';
import {observer} from "mobx-react/native";

@observer export default class SearchHeader extends React.Component {

    moment = require('moment');

    render() {
        return (
            <View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent:'space-around'}}>
                <View style={{flex:0.2, flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                    <Image style={{width:54, height:54}}
                           source={{uri: userStore.photo_path}}
                    />
                </View>
                <View style={{flex:0.5, flexDirection:'column', justifyContent: 'flex-start', alignItems:'flex-start'}}>
                    <Text style={{fontWeight: '900'}}>{userStore.name}</Text>
                    <Text style={{fontSize: 11, color:'grey'}}>Joined {this.moment(userStore.createdAt.replace(/[-:Z]/g, '')).format("MMM YYYY")}</Text>
                </View>
                <View style={{flex:0.2, flexDirection:'row', justifyContent:'flex-start'}}>
                    <TouchableRipple
                        onPress={() => {userStore.logout();this.props.navigation.navigate('Auth');}}>
                        <Button mode='text'>
                            <Icon.Ionicons
                                name='ios-log-out'
                                size={28}
                                style={{ margin:2 }}
                            />
                        </Button>
                    </TouchableRipple>
                </View>
            </View>
        );
    }
}