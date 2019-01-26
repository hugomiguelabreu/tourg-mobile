import React from 'react';
import {
    Platform,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    InteractionManager,
    View,
    ActivityIndicator, Modal, FlatList
} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Button, Title, List, Divider} from "react-native-paper";
import {CalendarList} from 'react-native-calendars';
import CalendarPicker from "react-native-calendar-picker";
import BookOption from "../components/BookOption";
import LoadingModal from "../components/LoadingModal";
import axios from "axios";
import {DangerZone, Icon} from 'expo';
const { Stripe } = DangerZone;

export default class PaymentScreen extends React.Component {

    moment = require('moment');

    constructor(props){
        super(props);
        this.state={
            activityId: this.props.navigation.getParam('activityId', '0'),
            activityDateId: this.props.navigation.getParam('activityDateId', '0'),
            isLoading: false,
            activityDetails: null,
            token: null,
        }
    }

    componentDidMount() {
        //Fetch hours for activity id
        // When the screen is focused again let's fetch new results
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this._getDetails();
            }
        );
    }

    _getDetails(){
        Stripe.setOptionsAsync({
            publishableKey: 'pk_test_Ebu3056HRTsfFnYQ4xrtZDzz',
        });
    }

    _getCard = () => {
        if(this.state.token != null){
            return(
                <List.Section title="Card">
                    <List.Item
                        title={"**** **** **** " + this.state.token.card.last4}
                        description={this.state.token.card.name != null ? this.state.token.card.name : ''}
                        left={() =>  <List.Icon icon={ () => <Icon.FontAwesome name={'cc-' + this.state.token.card.brand.toLowerCase()} size={24} /> } />}
                        onPress = {() => {console.log('ola')}}
                    />
                </List.Section>
            );
        }
    };

    static navigationOptions = {
      headerTitle: <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Title>PAYMENT</Title></View>,
      headerRight: <View></View>, // To center title.
    };

    handleCardPayPress = async () => {
        const options = {
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
                billingAddress: {
                    name: 'Gunilla Haugeh',
                    line1: 'Canary Place',
                    line2: '3',
                    city: 'Macon',
                    state: 'Georgia',
                    country: 'US',
                    postalCode: '31217',
                },
            },
        };

        const token = await Stripe.paymentRequestWithCardFormAsync(options);
        this.setState({token: token});
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.container}>
                            <Text style={styles.header}>
                                Card Form Example
                            </Text>
                            <Text style={styles.instruction}>
                                Click button to show Card Form dialog.
                            </Text>
                            <Button
                                text="Enter you card and pay"
                                onPress={this.handleCardPayPress}>
                                Click me
                            </Button>
                            <View
                                style={styles.token}>
                                <Text style={styles.instruction}>
                                    Token: {JSON.stringify(this.state.token)}
                                </Text>
                                {this._getCard()}
                            </View>
                        </View>

                    </ScrollView>
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
    list: {
        flex:1,
        flexDirection: 'column',
        paddingBottom:50,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        backgroundColor:'#F1F0F4',
        paddingVertical: 7.5,
    },
    tabBarInfoText: {
        fontSize: 14,
        color: 'black',
    },
});
