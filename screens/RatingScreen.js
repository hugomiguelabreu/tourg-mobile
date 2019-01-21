import React from 'react';
import {
    Platform,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Card, Button, FAB, Title, Subheading, TextInput, HelperText, Snackbar} from "react-native-paper";
import SearchHeader from "../components/SearchHeader";
import ActivityCard from "../components/ActivityCard";
import {AirbnbRating} from "react-native-ratings";
import {Constants, Icon} from 'expo';
import {Header} from "react-navigation";
import axios from "axios";
import userStore from "../stores/UserStore";

export default class RatingScreen extends React.Component {

    static navigationOptions = {
        headerTransparent: true,
        headerStyle: {
        },
    };

    constructor(props){
        super(props);
        this.state={
            rating: 0,
            textRating: '',
            guideRating: 0,
            activityId: this.props.navigation.state.params.activityId,
            title: this.props.navigation.state.params.activityTitle,
            ratingTotal: this.props.navigation.state.params.activityRating,
            guideId: this.props.navigation.state.params.guideId,
            errorMessage: '',
            successMessage: '',
            done: false,
        };
    }

    _rate(activityId, guideId, text, ratingActivity, ratingGuide){
        if(this._rateActivity(activityId, text, ratingActivity) &&
                this._rateGuide(guideId, ratingGuide)){
            this.setState({successMessage: "Rating successfully submitted", done: true});
        }
    }

    _rateActivity(id, text, rating){
        let me = this;
        if(text == '') {
            me.setState({errorMessage: 'Please fill the required fields'});
            return;
        }

        return axios.post('/user/evaluate_activity',
        {activity_id:id, text: text, score: rating})
        .then((resp) => {
            return true;
        })
        .catch((err) => {
            me.setState({ errorMessage: 'Something went wrong.' });
            console.log(err);
            return false;
        });
    }

    _rateGuide(id, rating){
        let me = this;

        return axios.post('/user/evaluate_guide',
        {guide_id:id, text: '', score: rating})
        .then((resp) => {
            return true;
        })
        .catch((err) => {
            me.setState({ errorMessage: 'Something went wrong.' });
            console.log(err);
            return false;
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset = {Header.HEIGHT - 30} enabled>
                <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.welcomeContainer}>
                        <Card style={{flex:4, flexDirection:'column'}}>
                            <Card.Cover source={{ uri: 'https://picsum.photos/900' }} />
                            <Card.Content style={{width:(Dimensions.get('window').width/1.65), justifyContent: 'space-between', alignItems: 'flex-end',
                                position:'absolute', right: 0, bottom: 0}}>
                                <Title style={styles.title}>{this.state.title}</Title>
                                <Title style={styles.ratingText}>
                                    {this.state.ratingTotal}
                                    &nbsp;
                                    <Icon.Ionicons
                                        name='ios-star'
                                        size={20}
                                        style={{ alignSelf:'flex-start', margin:0 }}
                                    />
                                </Title>
                            </Card.Content>
                        </Card>
                        <View style={styles.rating}>
                            <View style={{flex:1, paddingBottom: 15}}>
                                <Subheading>Rate your activity</Subheading>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Bad", "Ok", "Good", "Unbelievable"]}
                                    defaultRating={this.state.rating}
                                    onFinishRating={(rating) => { this.setState({rating:rating}) }}
                                    size={18}
                                />
                            </View>
                            <View style={{flex:1, paddingBottom: 35}}>
                                <Subheading>Write a review</Subheading>
                                <TextInput
                                    label='Review'
                                    multiline={true}
                                    value={this.state.textRating}
                                    onChangeText={text => this.setState({ textRating: text })}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={{flex:1, paddingBottom: 15}}>
                                <Subheading>Rate your guide</Subheading>
                                <View style={{flex:0.5, flexDirection: 'row'}}>
                                    <View style={{flex:0.3, flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                                        <Image style={{width:54, height:54}} source={{uri: 'https://media.istockphoto.com/photos/confident-businessman-posing-in-the-office-picture-id891418990?k=6&m=891418990&s=612x612&w=0&h=BItvQKG0Wf4Ht3XHPxa2LV0WkCtNjhBjkQv28Dhq2pA='}} />
                                    </View>
                                    <View style={{flex:1, flexDirection:'column', justifyContent: 'center', margin:35}}>
                                        <View style={{flex:1, flexDirection:'column', justifyContent: 'center', alignItems:'flex-start'}}>
                                            <Text style={{fontSize: 11, color:'grey'}}>Joined August, 2018</Text>
                                        </View>
                                        <View style={{flex:1, flexDirection:'column', justifyContent: 'center', alignItems:'flex-start'}}>
                                            <AirbnbRating
                                                count={5}
                                                defaultRating={this.state.guideRating}
                                                showRating={false}
                                                onFinishRating={(rating) => { this.setState({guideRating:rating}) }}
                                                size={18}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1, paddingBottom: 15}}>
                                <TouchableOpacity
                                    disabled={this.state.done}
                                    style={styles.button}
                                    onPress={() => {this._rate(this.state.activityId, this.state.guideId, this.state.textRating, this.state.rating, this.state.guideRating)}}>
                                    <Button mode="contained"
                                            disabled={this.state.done}
                                            style={styles.buttonLogin}>
                                        SUBMIT
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
                <Snackbar
                    visible={this.state.successMessage != ''}
                    style={{backgroundColor: 'white'}}
                    onDismiss={() => {
                        this.setState({ successMessage: '' });
                    }}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {
                            this.setState({ successMessage: '' });
                        },
                    }}>
                    <Icon.Ionicons
                        name='md-checkmark'
                        style={{color:'green'}}
                        size={16}
                    />
                    &nbsp;
                    &nbsp;
                    <Text style={{color:'black'}}>{this.state.successMessage}</Text>
                </Snackbar>
                <Snackbar
                    visible={this.state.errorMessage != ''}
                    style={{backgroundColor: 'white'}}
                    onDismiss={() => {
                        this.setState({ errorMessage: '' });
                    }}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {
                            this.setState({errorMessage:''});
                        },
                    }}>
                    <Icon.Ionicons
                        name='md-close'
                        style={{color:'red'}}
                        size={16}
                    />
                    &nbsp;
                    &nbsp;
                    <Text style={{color:'black'}}>{this.state.errorMessage}</Text>
                </Snackbar>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F1F0F4',
    },
    welcomeContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    textInput: {
      backgroundColor: '#F1F0F4',
    },
    buttonLogin:{
        padding:5,
    },
    rating: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        flex:1,
        flexDirection: 'column',
    },
    title:{
        fontWeight: 'bold',
        fontSize:30,
        color:'white',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5
    },

    ratingText:{
        color: 'white',
        alignSelf: 'flex-end'
    },
});