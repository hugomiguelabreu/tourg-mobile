import React from 'react';
import {
    Platform,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    Alert,
    View,
    ActivityIndicator, Modal, FlatList, TouchableNativeFeedback
} from 'react-native';
import {MonoText} from "../components/StyledText";
import {
    Button,
    Title,
    List,
    Divider,
    Card,
    HelperText,
    Checkbox,
    Subheading,
    Paragraph,
    Snackbar, Portal
} from "react-native-paper";
import {CalendarList} from 'react-native-calendars';
import CalendarPicker from "react-native-calendar-picker";
import BookOption from "../components/BookOption";
import LoadingModal from "../components/LoadingModal";
import axios from "axios";
import {DangerZone, Icon} from 'expo';
import NumericInput from 'react-native-numeric-input';
const { Stripe } = DangerZone;

export default class PaymentScreen extends React.Component {

    moment = require('moment');

    constructor(props){
        super(props);
        this.state={
            activityId: this.props.navigation.getParam('activityId', '0'),
            activityDateId: this.props.navigation.getParam('activityDateId', '0'),
            activityDateDetails: this.props.navigation.getParam('activityDateDetails', '0'),
            isLoading: false,
            activityDetails: null,
            token: null,
            title: '',
            city: '',
            description: '',
            image: '',
            activityPhoto: null,
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
            totalPeople:0,
            cards: [],
            saveCard: false,
            errorMessage: '',
            successMessage: '',
            processing: false,
            paid: false,
        }
    }

    componentDidMount() {
        //Fetch hours for activity id
        // When the screen is focused again let's fetch new results
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this._getDetails();
                this._getCards();
            }
        );
    }

    _getDetails(){
        Stripe.setOptionsAsync({
            publishableKey: 'pk_test_Ebu3056HRTsfFnYQ4xrtZDzz',
        });
        let me = this;
        this.setState({isLoading: true});
        axios.get('/activities/' + this.state.activityId)
            .then((resp) => {
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
                    activityPhoto: resp.data.photo_path,
                    totalPeople: resp.data.min_people,
                    price: resp.data.price,
                    guideBio: resp.data.Guide.User.bio,
                    guideTotalScore: resp.data.Guide.total_guide_score,
                    guideNScore: resp.data.Guide.n_guide_score,
                    guideJoined: this.moment(resp.data.Guide.User.createdAt.replace(/[-:Z]/g, '')),
                    isLoading:false
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    book(){
        let me = this;
        this.setState({processing: true});

        let data = {};
        if(this.state.token == null)
            this.setState({errorMessage:'No card selected', processing:false});

        if(this.state.token.created != null && !this.state.saveCard) {
            data = {
                activity_id: this.state.activityId, activity_date_id: this.state.activityDateId,
                n_booking: this.state.totalPeople, token: this.state.token.tokenId, save: this.state.saveCard.toString()
            };
        }else if(this.state.token.created != null && this.state.saveCard){
            data = {
                activity_id: this.state.activityId, activity_date_id: this.state.activityDateId,
                n_booking: this.state.totalPeople, token: this.state.token.tokenId, save: this.state.saveCard.toString(),
                last_four:this.state.token.card.last4, type: this.state.token.card.brand
            };
        }else{
            data = {
                activity_id: this.state.activityId, activity_date_id: this.state.activityDateId,
                n_booking: this.state.totalPeople, customer_id: this.state.token.tokenId
            };
        }
        console.log(data);
        axios.post('/user/book_activity',
            data)
            .then((resp) => {
                this.setState({paid: true,processing:false, successMessage:'Reservations completed successfully. Visit your account for more info.'});
            })
            .catch((err) => {
                this.setState({processing:false, errorMessage:'There was an error processing the transaction.'});
                console.log(err.response);
            });
    }

    removeCard(){
        Alert.alert(
            'Remove card',
            'Do you want to remove this card?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => this.setState({token:null})},
            ], { cancelable: false });
    }

    _getCards(){
        let me = this;
        this.setState({isLoading: true});
        axios.get('/user/credit_cards')
            .then((resp) => {
                me.setState({isLoading:false, cards: resp.data});
            })
            .catch((err) => {
                me.setState({isLoading:false, cards: []});
                console.log(err);
            });
    }

    _cards = (state) => {
        if(this.state.cards.length <= 0){
            return(<List.Item
                style={{paddingLeft:15, marginTop: -20, marginBottom:10}}
                title=""
                description="No cards saved to your account"
                onPress = {() => {console.log('ola')}}
            />);
        }else{
            return(
                <List.Section title="My saved cards" style={{paddingLeft:15, marginTop: -15}}>
                    <FlatList
                        data={this.state.cards}
                        keyExtractor={(item, index) => 'item' + index}
                        extraData={this.state}
                        renderItem={({item}) =>
                        <List.Item
                            title={"**** **** **** " + item.last_four}
                            description=""
                            style={{padding:0, paddingLeft: 20}}
                            left={() =>  <List.Icon icon={ () => <Icon.FontAwesome name={'cc-' + item.type.toLowerCase()} size={24} /> } />}
                            onPress = {() => {this.setState({
                                token:{
                                    tokenId: item.customer_id,
                                    created: null,
                                    card:{
                                        last4:item.last_four,
                                        brand:item.type,
                                        name: null,
                                    }
                                }, saveCard: false
                            }); setTimeout(() => {this.refs.scroll.scrollToEnd()}, 500);}}
                    />
                }/>
                </List.Section>
            );
        }
    };

    _getCard = () => {
        if(this.state.token != null){
            return(
                <View>
                    <View style={styles.section}>
                        <Title style={styles.sectionTitle}>Selected payment method</Title>
                    </View>
                    <View style={{justifyContent: 'space-around', paddingLeft: 20}}>
                    <List.Item
                        title={"**** **** **** " + this.state.token.card.last4}
                        description={this.state.token.card.name != null ? this.state.token.card.name : ''}
                        left={() =>  <List.Icon icon={ () => <Icon.FontAwesome name={'cc-' + this.state.token.card.brand.toLowerCase()} size={24} /> } />}
                        onPress = {() => {this.removeCard()}}
                        style={{paddingLeft: 15, paddingBottom:0, paddingTop: 0}}
                    />
                    <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                        <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                            <Checkbox
                                status={this.state.saveCard ? 'checked' : 'unchecked'}
                                disabled={this.state.token.created == null}
                                onPress={() => {
                                    this.setState({saveCard: !this.state.saveCard})
                                }}
                            />
                            <Paragraph>Save my card</Paragraph>
                        </View>
                    </View>
                    </View>
                </View>
            );
        }
    };

    static navigationOptions = {
      headerTitle: <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Title>CHECKOUT</Title></View>,
      headerRight: <View></View>, // To center title.
    };

    handleCardPayPress = async () => {
        const options = {
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
            },
        };

        const token = await Stripe.paymentRequestWithCardFormAsync(options);
        this.setState({token: token, saveCard: true});
        console.log(token);
        setTimeout(() => {this.refs.scroll.scrollToEnd()}, 500);
    }

    _updatePeople = (value) => {
        this.setState({totalPeople: value});
    };

    _processing() {
        if(this.state.processing)
            return(
                <LoadingModal/>
            );
    }

    _done(){
        if(this.state.paid)
            return(
                <View
                    style={{
                        width: (Dimensions.get('window').width),
                        height: (Dimensions.get('window').height),
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        backgroundColor:'rgba(128, 128, 128, 0.6)',
                        zIndex:1000
                    }}/>
            );
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}} ref='scroll'>
                        {this._done()}
                        <View style={styles.container}>
                            <View style={{flexDirection: 'column', paddingBottom: 20}}>
                                <Card style={{flexDirection: 'column'}}>
                                    <Card.Cover style={{height:(Dimensions.get('window').height / 6)}} source={{uri: 'http://188.166.173.44/' + this.state.activityPhoto}}/>
                                    <Card.Content style={{
                                        width: (Dimensions.get('window').width / 1.75),
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0
                                    }}>
                                        <Title style={{color: 'white',}}>
                                        Reservation
                                        </Title>
                                        <Title style={{color: 'white',}}>
                                            <Icon.Ionicons
                                                name='md-calendar'
                                                size={24}
                                                style={{alignSelf: 'flex-start', margin: 0}}
                                            />
                                            &nbsp;
                                            {this.moment(this.state.activityDateDetails.date).format("DD-MM-YYYY")}
                                        </Title>
                                        <Subheading style={{color: 'white',}}>
                                            {this.state.activityDateDetails.startHour}
                                        </Subheading>
                                    </Card.Content>
                                    <Card.Content style={{
                                        width: (Dimensions.get('window').width / 1.85),
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
                            </View>
                            <View style={styles.section}>
                                <Title style={styles.sectionTitle}>Number of people</Title>
                                <Text style={styles.aboutText}>The number of people going with you on this activity</Text>
                            </View>
                            <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingBottom:20}}>
                                <NumericInput value={this.state.totalPeople}
                                              minValue={this.state.min}
                                              maxValue={this.state.max}
                                              onChange={this._updatePeople}
                                              rounded={true}
                                              initValue={this.state.totalPeople}
                                              rightButtonBackgroundColor='#349D88'
                                              leftButtonBackgroundColor='#349D88'
                                              borderColor='#349D88'
                                              containerStyle={{padding:0, borderRadius: 10}}/>
                                <HelperText
                                    type="info"
                                    visible={true}>
                                    From {this.state.min} to {this.state.max}
                                </HelperText>
                            </View>
                            <View style={styles.section}>
                                <Title style={styles.sectionTitle}>Payment method</Title>
                            </View>
                            <View style={{justifyContent: 'space-around'}}>
                                {this._cards()}
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    marginBottom: 10
                                }}>
                                    <TouchableNativeFeedback
                                        onPress={() => {this.handleCardPayPress()}
                                        }>
                                        <Button mode="contained" style={{padding: 5}}>
                                            Add a card &nbsp;
                                            <Icon.FontAwesome
                                                name={'credit-card'}
                                                size={16}
                                            />
                                        </Button>
                                    </TouchableNativeFeedback>
                                </View>
                                {this._getCard()}
                            </View>
                        </View>
                    </ScrollView>
                    <Divider style={{elevation:0.2}}/>
                        <View style={{
                            flex: 0.2,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingBottom: 0,
                        }}>
                            <TouchableNativeFeedback
                                onPress={() => {this.book()}
                                }>
                                <Button mode="contained" style={{padding: 5, marginTop:10}} disabled={this.state.token == null || this.state.paid}>
                                    {'Pay ' + this.state.totalPeople * this.state.price + '€ with'} &nbsp;
                                    <Icon.FontAwesome
                                        name={this.state.token != null ? 'cc-' + this.state.token.card.brand.toLowerCase() : 'credit-card'}
                                        size={16}
                                    />
                                </Button>
                            </TouchableNativeFeedback>
                            <HelperText
                                type="info"
                                visible={true}
                                style={{textAlign: 'center'}}>
                                <Icon.FontAwesome
                                    name={'lock'}
                                /> &nbsp; Secure checkout
                            </HelperText>
                        </View>
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
                    {this._processing()}
                </View>
            );
        }else{
            return(<LoadingModal/>);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    section:{
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    },

    sectionTitle:{
        paddingBottom: 5,
        marginLeft:10
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
    list: {
        flex:1,
        flexDirection: 'column',
        paddingBottom:50,
    },
    tabBarInfoText: {
        fontSize: 14,
        color: 'black',
    },
    aboutText:{
        color: '#9D9DA3',
        fontSize: 14,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    }
});
