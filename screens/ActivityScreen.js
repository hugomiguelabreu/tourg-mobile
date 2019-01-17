import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, Dimensions} from "react-native";
import {Button, Card, Title} from "react-native-paper";
import {Icon} from "expo";


export default class ActivityScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activity_id : 1};
        this.fetchActivityData(0);
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
                                size={14}
                                style={{ alignSelf:'flex-start', margin:0 }}
                            />
                        </Title>
                    </Card.Content>
                </Card>

                <View style={styles.quickinfo}>

                    <View style={styles.priceBook}>
                        <View style={styles.pricing}><Text style={styles.pricing}>{this.state.price}€ per person</Text></View>
                        <View style={styles.booking}><Button style={styles.button} title="sdsad" onPress={()=>{}}>Book</Button></View>
                    </View>

                    <View style={styles.info}>

                        <View styles={styles.quickInfoLine}>
                            <Text style={styles.quickInfoText}>

                                  {this.state.location}, {this.state.city}
                            </Text>
                        </View>

                        <View styles={styles.quickInfoLine}>
                            <Text style={styles.quickInfoText}>

                                  Between {this.state.min} and {this.state.max} people
                            </Text>
                        </View>

                        <View styles={styles.quickInfoLine}>

                            <Text style={styles.quickInfoText}>

                                  {this.state.hours} hours and {this.state.minutes} minutes
                            </Text>
                        </View>

                        <View styles={styles.quickInfoLine}>

                            <Text style={styles.quickInfoText}>

                                  {this.state.language.join(", ")}
                            </Text>
                        </View>

                    </View>
                </View>

                <View style={styles.about}>
                    <Text style={styles.aboutTitle}>About</Text>
                    <Text style={styles.aboutText}>{this.state.about}</Text>
                </View>


            </ScrollView>
            </View>

        );
    }
};

const styles = StyleSheet.create({

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

    pricing:{flex:0,textAlign: 'center'},
    booking: {flex:1,alignSelf: "stretch"},
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
        textAlign: 'center'
    },


    quickInfoLine:{
        flex:1,
        flexDirection: 'row', justifyContent: 'space-between'
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

    about:{flex:1},
    aboutTitle:{
        fontSize: 25,
        marginTop: 10,
        marginLeft: 25},

    aboutText:{
        margin: 10,
        color: '#9D9DA3',
        fontSize: 14
    }




});





