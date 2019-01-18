import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableNativeFeedback, TouchableOpacity} from "react-native";
import {Button, Card, Paragraph, Title} from "react-native-paper";
import {Icon} from "expo";
import Timeline from "react-native-timeline-listview";
import MapViewAnimated, {PROVIDER_GOOGLE} from "react-native-maps";
import {AirbnbRating} from "react-native-ratings";


export default class ActivityScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activity_id : 1};
        this.fetchActivityData(0);
        this.data = [
            {time: '', title: 'Visitar a Sé', description: 'Visitar a Sé de Braga incluindo o tesouro'},
            {time: '', title: 'Event 2', description: 'Event 2 Description'},
            {time: '', title: 'Event 3', description: 'Event 3 Description'},
            {time: '', title: 'Event 4', description: 'Event 4 Description'},
            {time: '', title: 'Event 5', description: 'Event 5 Description'}
        ]
    }

    static navigationOptions = {
        headerTransparent: true,
        headerStyle: {
        },
    };

    fetchActivityData(activity_id){
        this.state = {
                activity_id: 2,
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                image: 'image_url',
                stars: 4.5,
                price: 70,
                location: "Picoto",
                city: "Braga",
                min: 2,
                max: 10,
                hours: 2,
                minutes: 30,
                language: ["Portuguese", "English", "French"],
                about: "Aliquam ullamcorper arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis sodales eget tellus vitae porttitor. Ut et maximus urna. Mauris vestibulum magna sed mauris luctus, non sodales eros pulvinar. Duis fermentum id arcu a iaculis. Quisque congue convallis tempor. Nullam ullamcorper maximus nisi, vitae tincidunt tortor pulvinar in. Proin ac euismod tellus. Integer ut placerat sapien. In dictum orci eros, in varius mi consectetur tempus. Nam iaculis sed nibh quis tincidunt. Nulla eu rutrum metus.",
            };
    }

    render() {
        return(
            <View style={styles.container}>
            <ScrollView style={styles.container}>
                <Card style={{flex:4, flexDirection:'column'}}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/900' }} />
                    <Card.Content style={{width:(Dimensions.get('window').width/1.65), justifyContent: 'space-between', alignItems: 'flex-end',
                        position:'absolute', right: 0, bottom: 0}}>
                        <Title style={styles.title}>London sightseeing - Best of London city</Title>
                        <Title style={styles.rating}>
                            {this.state.stars}
                            &nbsp;
                            <Icon.Ionicons
                                name='ios-star'
                                size={20}
                                style={{ alignSelf:'flex-start', margin:0 }}
                            />
                        </Title>
                    </Card.Content>
                </Card>

                <View style={styles.quickinfo}>

                    <View style={styles.priceBook}>
                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <Text>{this.state.price}€ per person</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <TouchableOpacity
                                onPress={() => {console.log("kek")}}>
                                <Button mode="contained" style={{padding:5}}>
                                    BOOK
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.info}>
                        <View style={styles.quickInfoLine}>
                            <Icon.Ionicons
                                name='md-map'
                                size={14}
                                style={{ alignSelf:'flex-start', margin:0 }}
                            />
                            <Text style={{marginLeft:5}}>{this.state.location}, {this.state.city}</Text>
                        </View>
                        <View style={styles.quickInfoLine}>
                            <Icon.Ionicons
                                name='ios-people'
                                size={14}
                                style={{ alignSelf:'flex-start', margin:0 }}
                            />
                            <Text style={{marginLeft:5}}>Between {this.state.min} and {this.state.max} people</Text>
                        </View>
                        <View style={styles.quickInfoLine}>
                            <Icon.Ionicons
                                name='ios-time'
                                size={14}
                                style={{ alignSelf:'flex-start', margin:0 }}
                            />
                            <Text style={{marginLeft:5}}>{this.state.hours} hours and {this.state.minutes} minutes</Text>
                        </View>
                        <View style={styles.quickInfoLine}>
                            <Icon.Ionicons
                                name='ios-chatbubbles'
                                size={14}
                                style={{ alignSelf:'flex-start', margin:0 }}
                            />
                            <Text style={{marginLeft:5}}>{this.state.language.join(", ")}</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.section}>
                    <Title style={styles.sectionTitle}>About</Title>
                    <Text style={styles.aboutText}>{this.state.about}</Text>
                </View>
                <View style={styles.section}>
                    <Title style={styles.sectionTitle}>Highlights</Title>
                </View>
                <Timeline
                    style={{paddingTop:15, backgroundColor:'white', marginBottom:15, marginTop: -15}}
                    descriptionStyle={{color:'gray'}}
                    innerCircle={'dot'}
                    lineColor='#2E3C58'
                    circleColor='#349D88'
                    data={this.data}
                />
                <View style={styles.section}>
                    <Title style={styles.sectionTitle}>Map</Title>
                </View>
                <MapViewAnimated
                    provider={PROVIDER_GOOGLE}
                    region={this.state.region}
                    style={styles.map}
                    showsUserLocation={true}>
                </MapViewAnimated>
                <View style={styles.section}>
                    <Title style={styles.sectionTitle}>Guide</Title>
                    <TouchableNativeFeedback>
                        <View style={{flex:0.5, flexDirection: 'row'}}>
                            <View style={{flex:0.3, flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                                <Image style={{width:54, height:54}} source={{uri: 'https://media.istockphoto.com/photos/confident-businessman-posing-in-the-office-picture-id891418990?k=6&m=891418990&s=612x612&w=0&h=BItvQKG0Wf4Ht3XHPxa2LV0WkCtNjhBjkQv28Dhq2pA='}} />
                            </View>
                            <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent: 'center', marginLeft:25, marginBottom: 10}}>
                                    <View style={{flex:1, flexDirection:'column', justifyContent: 'flex-start', alignItems:'flex-start'}}>
                                        <Text style={{fontWeight: '900'}}>João</Text>
                                        <Text style={{fontSize: 11, color:'grey'}}>Joined August, 2018</Text>
                                    </View>
                                    <View style={{flex:1, flexDirection:'column', justifyContent: 'flex-start', alignItems:'flex-start'}}>
                                        <Text style={{fontWeight: '900'}}>Rating</Text>
                                        <View style={{flex:0.4, flexDirection:'row', justifyContent:'flex-start'}}>
                                            <Icon.Ionicons
                                                name='md-star'
                                                size={11}
                                                style={{ marginTop:0.5, marginRight: 5 }}
                                            />
                                            <Text style={{ fontSize: 11, color:'grey', marginRight: 5 }}>4.5</Text>
                                            <Text style={{ fontSize: 11, color:'grey' }}>(143)</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, flexDirection:'row', justifyContent: 'center', marginLeft:25, marginRight: 5}}>
                                    <Paragraph numberOfLines={4} style={styles.aboutText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nunc mollis sodales dignissim. Nullam ornare sollicitudin eleifend.
                                        Nam iaculis ligula risus, non lobortis diam dignissim id. In hac habitasse platea dictumst.</Paragraph>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </ScrollView>
            </View>

        );
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
        alignSelf: 'flex-start'
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





