import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Title, Searchbar, Button, TouchableRipple} from "react-native-paper";
import Colors from "../constants/Colors";
import {Icon} from "expo";
import userStore from '../stores/UserStore';
import {observer} from "mobx-react/native";

export default observer(class SearchHeader extends React.Component {
    render() {
        return (
            <View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent:'space-around'}}>
                <View style={{flex:0.3, flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                    <Image style={{width:54, height:54}} source={{uri: 'https://media.istockphoto.com/photos/confident-businessman-posing-in-the-office-picture-id891418990?k=6&m=891418990&s=612x612&w=0&h=BItvQKG0Wf4Ht3XHPxa2LV0WkCtNjhBjkQv28Dhq2pA='}} />
                </View>
                <View style={{flex:0.4, flexDirection:'column', justifyContent: 'flex-start', alignItems:'flex-start'}}>
                    <Text style={{fontWeight: '900'}}>{userStore.name}</Text>
                    <Text style={{fontSize: 11, color:'grey'}}>Joined August, 2018</Text>
                </View>
                <View style={{flex:0.4, flexDirection:'row', justifyContent:'flex-start'}}>
                    <Icon.Ionicons
                        name='md-star'
                        size={16}
                        style={{ marginTop:0.5, marginRight: 5 }}
                    />
                    <Text style={{ fontSize: 14, color:'grey', marginRight: 5 }}>4.5</Text>
                    <Text style={{ fontSize: 14, color:'grey' }}>(143)</Text>
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
})