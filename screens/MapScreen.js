import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableOpacity,
    View,
    Form, Image,
    Modal,
    AsyncStorage, KeyboardAvoidingView
} from 'react-native';
import {TextInput, Button, Title, HelperText, Divider} from 'react-native-paper';
import axios from 'axios';
import {Icon} from 'expo';
import {Header} from 'react-navigation';
import userStore from '../stores/UserStore';
import MapView, {AnimatedRegion, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewAnimated from 'react-native-maps';

export default class MapScreen extends React.Component {

    constructor(props){
        super(props);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.state = {};
    }

    static navigationOptions = {
        headerTitle: <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Title>NEAR ME</Title></View>,
    };

    componentDidMount() {
        // Get actual location
        // When the screen is focused again let's fetch new results
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this._getLocation();
            }
        );
    }

    onRegionChange(region) {
        this.setState({ region: region });
    }

    //Function to get user location using gps
    _getLocation = () => {
        let me = this;
        navigator.geolocation.getCurrentPosition(position => {
                const location = JSON.stringify(position);
                me.setState({ region: {latitude: position.coords.latitude, longitude: position.coords.longitude,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0021}});
            },
            error => Alert.alert('Error while getting location', error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapViewAnimated
                    provider={PROVIDER_GOOGLE}
                    region={this.state.region}
                    style={styles.map}
                    showsUserLocation={true}>
                </MapViewAnimated>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});