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
    AsyncStorage, KeyboardAvoidingView, FlatList
} from 'react-native';
import {TextInput, Button, Title, HelperText, Divider, Checkbox, Subheading} from 'react-native-paper';
import axios from 'axios';
import {Icon} from 'expo';
import {Header} from 'react-navigation';
import userStore from '../stores/UserStore';
import MapView, {AnimatedRegion, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewAnimated from 'react-native-maps';
import LoadingModal from "../components/LoadingModal";

export default class MapScreen extends React.Component {

    constructor(props){
        super(props);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.state = {
            activities: null,
            isLoading: true,
            query:null,
            city: null,
            country: null,
            region: null,
        };
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

    _getActivities() {
        let me = this;
        this.setState({isLoading: true});
        console.log(this.state.city);
        axios.get('/activities/search/' + this.state.city)
            .then((resp) => {
                console.log(resp.data);
                me.setState({activities: resp.data, isLoading:false});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _getCity(){
        let me = this;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.region.latitude + ',' + this.state.region.longitude + '&key=AIzaSyCfbOF4tlJfhEY8ic0U2cdVGSUH3kQSwuc')
            .then((resp) => {
                console.log(resp.data);
                me.setState({query: resp.data.results[0].address_components[1].long_name, city: resp.data.results[0].address_components[1].long_name,
                    country: resp.data.results[0].address_components[3].long_name});
                this._getActivities();
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error while getting location', 'An error occurred getting the location')
            });
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
                        longitudeDelta: 0.0021}, isLoading: false});
                this._getCity();
            },
            error => Alert.alert('Error while getting location', error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    };

    _markers = () => {
        return(
            <FlatList
                data={this.state.activities}
                keyExtractor={(item, index) => 'item' + index}
                extraData={this.state}
                renderItem={({item}) =>
                    <Marker title={item.title}
                            description={item.description}
                            onCalloutPress={() => {this.props.navigation.navigate('Activity', {activityId: item.id})}}
                            coordinate={{latitude: item.lat, longitude: item.lng}}>
                        <View style={{width: 38, height: 38}}>
                            <Image
                                source={{uri: 'https://housing.umn.edu/sites/housing.umn.edu/files/tour_icon.png', width: 38, height: 38}}
                                style={{borderColor:'red', borderRadius: 50, borderWidth: 2}}>
                            </Image>
                        </View>
                    </Marker>
                }
            />
        );
    };

    render() {
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <MapViewAnimated
                        provider={PROVIDER_GOOGLE}
                        region={this.state.region}
                        style={styles.map}
                        showsUserLocation={true}>
                        {this._markers()}
                    </MapViewAnimated>
                </View>
            );
        }else{
            return(
              <LoadingModal/>
            );
        }
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