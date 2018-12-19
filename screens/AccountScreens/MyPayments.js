import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Form, Image, TouchableNativeFeedback
} from 'react-native';
import {List, Colors, Title, Snackbar, Divider} from 'react-native-paper';
import PaymentMethod from "../../components/Account/PaymentMethod";
import {Icon} from 'expo';

export default class MyPayments extends React.Component {

    state = {

    };

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <View style={styles.profile}>
                            <List.Section title="Cards">
                                <List.Item
                                    title="**** **** **** 9825"
                                    left={() =>  <List.Icon icon={ () => <Icon.FontAwesome name='cc-mastercard' size={24} /> } />}
                                    onPress = {() => {console.log('ola')}}
                                />
                                <List.Item
                                    title="**** **** **** 7082"
                                    left={() =>  <List.Icon icon={ () => <Icon.FontAwesome name='cc-visa' size={24} /> } />}
                                    onPress = {() => {console.log('ola')}}
                                />
                            </List.Section>
                            <List.Section title="Paypal">
                                <List.Item
                                    title="jo****3s@gmail.com"
                                    left={() =>  <List.Icon icon={ () => <Icon.FontAwesome name='cc-paypal' size={24} /> } />}
                                    onPress = {() => {console.log('ola')}}
                                />
                            </List.Section>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
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
