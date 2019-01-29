import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableNativeFeedback, TouchableOpacity} from "react-native";
import {Button, Card, Paragraph, Title, HelperText} from "react-native-paper";
import {Icon} from "expo";
import Timeline from "react-native-timeline-listview";
import MapViewAnimated, {PROVIDER_GOOGLE, Circle, Marker} from "react-native-maps";
import LoadingModal from "../components/LoadingModal";
import axios from "axios";
import userStore from '../stores/UserStore';


export default class ActivityScreen extends React.Component {

    moment = require('moment');

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            activity_id : this.props.navigation.state.params.activityId,
            title: '',
            city: '',
            description: '',
            image: '',
            total_activity_score: null,
            n_activity_score: 0,
            region:null,
            durationMin: '',
            price: 0,
            max: 0,
            min: 0,
            guideName: '',
            guideBio: '',
            guideTotalScore: null,
            guideNScore: 0,
            guideJoined: null,
            highlights: [],
            lang: [],
        };
    }

    static navigationOptions = {
        headerTransparent: true,
        headerStyle: {
        },
    };

    componentDidMount() {
        // When the screen is focused again let's fetch new results
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this._fetchActivityData();
            }
        );
    }

    _highlights = () => {
        if(this.state.highlights.length <= 0){
            return(
                <View>
                    <Text style={[styles.aboutText, {paddingLeft:15, marginTop:-15, marginBottom: 15}]}>
                        No highlights for this activity
                    </Text>
                </View>
            );
        }else{
            return(
                <Timeline
                    style={{paddingTop: 15, backgroundColor: 'white', marginBottom: 15, marginTop: -15}}
                    descriptionStyle={{color: 'gray'}}
                    innerCircle={'dot'}
                    lineColor='#2E3C58'
                    circleColor='#349D88'
                    data={this.state.highlights}
                />
            );
        }
    };

    _fetchActivityData(){

        let me = this;
        this.setState({isLoading: true});
        axios.get('/activities/' + this.state.activity_id)
            .then((resp) => {
                console.log(resp.data);
                me.setState({
                    title: resp.data.title,
                    city: resp.data.city,
                    description: resp.data.description,
                    total_activity_score: resp.data.total_activity_score,
                    n_activity_score: resp.data.n_activity_score,
                    region:{latitude:resp.data.lat, longitude:resp.data.lng, latitudeDelta: 0.0122, longitudeDelta: 0.0021},
                    durationMin: resp.data.duration,
                    guideName: resp.data.Guide.User.name,
                    min: resp.data.min_people,
                    max: resp.data.n_people,
                    price: resp.data.price,
                    guideBio: resp.data.Guide.User.bio,
                    guideTotalScore: resp.data.Guide.total_guide_score,
                    guideNScore: resp.data.Guide.n_guide_score,
                    guideJoined: this.moment(resp.data.Guide.User.createdAt.replace(/[-:Z]/g, '')),
                    lang: resp.data.Activity_Languages,
                    highlights: resp.data.Highlights,
                    isLoading:false
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <Card style={{flex: 4, flexDirection: 'column'}}>
                            <Card.Cover source={{uri: 'https://picsum.photos/900'}}/>
                            <Card.Content style={{
                                width: (Dimensions.get('window').width / 1.65),
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                position: 'absolute',
                                right: 0,
                                bottom: 0
                            }}>
                                <Title style={styles.title}>{this.state.title}</Title>
                                <Title style={styles.rating}>
                                    {this.state.total_activity_score == null ? 0 : (this.state.total_activity_score / this.state.n_activity_score).toFixed(1)}
                                    &nbsp;
                                    <Icon.Ionicons
                                        name='ios-star'
                                        size={20}
                                        style={{alignSelf: 'flex-start', margin: 0}}
                                    />
                                </Title>
                            </Card.Content>
                        </Card>
                        <View style={styles.quickinfo}>
                            <View style={styles.priceBook}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    marginBottom: 10,
                                }}>
                                    <Text>{this.state.price}€ per person</Text>
                                </View>
                                <TouchableNativeFeedback
                                    onPress={() => {
                                        if(userStore.token != null)
                                            this.props.navigation.navigate('Booking', {activityId: this.state.activity_id});
                                        else
                                            this.props.navigation.navigate('Account');
                                    }
                                    }>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-around'
                                    }}>
                                        <Button mode="contained" style={{padding: 5}}>
                                            {(userStore.token != null) ? 'BOOK' : 'LOGIN'}
                                        </Button>
                                    </View>
                                </TouchableNativeFeedback>
                                <HelperText
                                    type='error'
                                    visible={(userStore.token == null)}>
                                    Login to book this tour.
                                </HelperText>
                            </View>
                            <View style={styles.info}>
                                <View style={styles.quickInfoLine}>
                                    <Icon.Ionicons
                                        name='md-map'
                                        size={14}
                                        style={{alignSelf: 'flex-start', margin: 0}}
                                    />
                                    <Text style={{marginLeft: 5}}>{this.state.city}</Text>
                                </View>
                                <View style={styles.quickInfoLine}>
                                    <Icon.Ionicons
                                        name='ios-people'
                                        size={14}
                                        style={{alignSelf: 'flex-start', margin: 0}}
                                    />
                                    <Text
                                        style={{marginLeft: 5}}>Between {this.state.min} and {this.state.max} people</Text>
                                </View>
                                <View style={styles.quickInfoLine}>
                                    <Icon.Ionicons
                                        name='ios-time'
                                        size={14}
                                        style={{alignSelf: 'flex-start', margin: 0}}
                                    />
                                    <Text style={{marginLeft: 5}}>{this.moment.duration(this.state.durationMin, 'minutes').humanize()}</Text>
                                </View>
                                <View style={styles.quickInfoLine}>
                                    <Icon.Ionicons
                                        name='ios-chatbubbles'
                                        size={14}
                                        style={{alignSelf: 'flex-start', margin: 0}}
                                    />
                                    <Text style={{marginLeft: 5}}>{
                                        this.state.lang.length >= 1 ?
                                            this.state.lang.map(l =>
                                                (l.language.charAt(0).toUpperCase() + l.language.slice(1))).join(", ") :
                                            'Not available'}</Text>
                                </View>

                            </View>
                        </View>
                        <View style={styles.section}>
                            <Title style={styles.sectionTitle}>About</Title>
                            <Text style={styles.aboutText}>{this.state.description}</Text>
                        </View>
                        <View style={styles.section}>
                            <Title style={styles.sectionTitle}>Highlights</Title>
                        </View>
                        {this._highlights()}
                        <View style={styles.section}>
                            <Title style={styles.sectionTitle}>Map</Title>
                        </View>
                        <MapViewAnimated
                            provider={PROVIDER_GOOGLE}
                            region={this.state.region}
                            style={styles.map}
                            customMapStyle={mapStyle}
                            showsUserLocation={true}>
                            <Marker coordinate={this.state.region} tracksViewChanges={false}/>
                            <Circle center={this.state.region} radius={500}
                                    strokeColor='#FF0000'
                                    fillColor='rgba(255,0,0,0.4)'/>
                        </MapViewAnimated>
                        <View style={styles.section}>
                            <Title style={styles.sectionTitle}>Guide</Title>
                            <TouchableNativeFeedback>
                                <View style={{flex: 0.5, flexDirection: 'row'}}>
                                    <View style={{
                                        flex: 0.3,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Image style={{width: 54, height: 54}}
                                               source={{uri: 'https://media.istockphoto.com/photos/confident-businessman-posing-in-the-office-picture-id891418990?k=6&m=891418990&s=612x612&w=0&h=BItvQKG0Wf4Ht3XHPxa2LV0WkCtNjhBjkQv28Dhq2pA='}}/>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            marginLeft: 25,
                                            marginBottom: 10
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start'
                                            }}>
                                                <Text style={{fontWeight: '900'}}>{this.state.guideName}</Text>
                                                <Text style={{fontSize: 11, color: 'grey'}}>Joined {this.state.guideJoined != null ? this.state.guideJoined.format("MMM, YYYY") : ''}</Text>
                                            </View>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start'
                                            }}>
                                                <Text style={{fontWeight: '900'}}>Rating</Text>
                                                <View style={{
                                                    flex: 0.4,
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start'
                                                }}>
                                                    <Icon.Ionicons
                                                        name='md-star'
                                                        size={11}
                                                        style={{marginTop: 0.5, marginRight: 5}}
                                                    />
                                                    <Text
                                                        style={{fontSize: 11, color: 'grey', marginRight: 5}}>
                                                        {this.state.guideTotalScore == null ? 0 : (this.state.guideTotalScore / this.state.guideNScore).toFixed(1)}
                                                    </Text>
                                                    <Text style={{fontSize: 11, color: 'grey'}}>({this.state.guideNScore})</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            marginLeft: 25,
                                            marginRight: 5
                                        }}>
                                            <Paragraph numberOfLines={4} style={styles.aboutText}>
                                                {this.state.guideBio}
                                            </Paragraph>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </ScrollView>
                </View>
            );
        }else{
            return(
                <LoadingModal/>
            );
        }
    }
};

const styles = StyleSheet.create({
    map: {
        height:300,
        marginBottom: 15,
        marginTop: -10
    },
    container: {
        flex:1,
        flexDirection: 'column'
    },

    header:{

    },

    pic:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        backgroundColor:'gray',
        alignSelf: 'stretch',
    },

    toptext:{
        flex:0.6,
        flexDirection:'column',
        paddingTop: 50,
        paddingBottom: 5,

    },

    title:{
        fontWeight: 'bold',
        fontSize:30,
        color:'white',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5
    },

    rating:{
        color: 'white',
        alignSelf: 'flex-end'
    },

    button:{
        backgroundColor: "white",
        alignContent: 'center',
        flex:1,
        marginTop:5,
        marginRight:15,
        marginLeft:15
    },

    quickinfo:{
        flex:1,
        paddingTop: 10,
        paddingBottom: 5,
        flexDirection:'row',
    },

    info:{flex:1, flexDirection:"column"},

    priceBook:{
        flex:0.66,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },


    quickInfoLine:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 2
    },


    quickInfoText:{
    },


    quickIcon:{
        height:15 , width: 15,
        marginRight: 20,
        resizeMode:'contain'

    },

    bookInfo:{},
    bookButton:{height: 50},

    section:{
        flex:1,
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },

    sectionTitle:{
        paddingBottom: 5,
        marginLeft:10
    },

    aboutText:{
        color: '#9D9DA3',
        fontSize: 14
    }
});

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#523735"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9b2a6"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dcd2be"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ae9e90"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#93817c"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a5b076"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#447530"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fdfcf8"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f8c967"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e9bc62"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e98d58"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db8555"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#806b63"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8f7d77"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b9d3c2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#92998d"
            }
        ]
    }
]





