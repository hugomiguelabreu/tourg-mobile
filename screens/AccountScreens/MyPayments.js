import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Form, Image, TouchableNativeFeedback, FlatList, Alert
} from 'react-native';
import {List, Colors, Title, Snackbar, Divider} from 'react-native-paper';
import {Icon} from 'expo';
import axios from "axios";
import BookedCard from "../../components/BookedCard";
import LoadingModal from "../../components/LoadingModal";

export default class MyPayments extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            cards: [],
        };
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        // When the screen is focused again let's fetch new results
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this._getCards();
            }
        );
    }

    removeCard(id){
        Alert.alert(
            'Remove card',
            'Do you want to remove this card?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => this._removeCard(id)},
            ], { cancelable: false });
    }

    _removeCard(id){
        let me = this;
        axios.delete('/user/credit_card', {data: {id: id}})
            .then((resp) => {
                this._getCards();
            })
            .catch((err) => {
                me.setState({isLoading:false, cards: []});
                console.log(err);
            });
    }

    _getCards(){
        let me = this;
        this.setState({isLoading: true});
        axios.get('/user/credit_cards')
            .then((resp) => {
                me.setState({isLoading:false, cards: resp.data});
                console.log(resp.data);
            })
            .catch((err) => {
                me.setState({isLoading:false, cards: []});
                console.log(err);
            });
    }

    _cards = (state) => {
        if(this.state.cards.length <= 0){
            return(<List.Item
                title=""
                description="No cards saved to your account"
                onPress = {() => {console.log('ola')}}
            />);
        }else{
            return(<FlatList
                data={this.state.cards}
                keyExtractor={(item, index) => 'item' + index}
                renderItem={({item}) =>
                    <List.Item
                        title={"**** **** **** " + item.last_four}
                        description=""
                        left={() =>  <List.Icon icon={ () => <Icon.FontAwesome name={'cc-' + item.type.toLowerCase()} size={24} /> } />}
                        onPress = {() => {this.removeCard(item.id)}}
                    />
                }
            />);
        }
    };

    render() {
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.welcomeContainer}>
                            <View style={styles.profile}>
                                <List.Section title="Cards">
                                    {this._cards(this.state)}
                                </List.Section>
                                <List.Section title="Paypal">
                                    <List.Item
                                        title=""
                                        description="Not yet supported"
                                        onPress={() => {
                                            console.log('ola')
                                        }}
                                    />
                                </List.Section>
                            </View>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow:1,
    },
    textInput:{
        marginBottom: 25,
        backgroundColor:'transparent',
    },
    welcomeContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
    },
    profile:{
        flex:1,
        flexDirection:'column',
    },
});
