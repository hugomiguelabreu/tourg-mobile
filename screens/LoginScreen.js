import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
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

export default class LoginScreen extends React.Component {

    state = {
        loginEmail: 'user@gmail.com',
        loginPassword: 'password',
        loginErrorMessage:'',
        registerName: '',
        registerEmail: '',
        registerPassword:'',
        registerPhone:'',
        registerErrorMessage:'',
    };

    static navigationOptions = {
        title: 'ACCOUNT',
        headerTitleStyle: {
            flex: 1,
            alignSelf: 'center',
            textAlign: 'center',
            justifyContent: 'center'
        }
    };

    _login(email, password){
        let me = this;
        if(email == '' || password == '') {
            me.setState({loginErrorMessage: 'Please fill the required fields'});
            return;
        }

        axios.post('/user/login',
            {email:email, password: password})
            .then((resp) => {
                //Put user in store
                userStore.login(resp.data);
                // Navigate to dashboard;
                me.props.navigation.navigate('Main');
            })
            .catch((err) => {
                me.setState({ loginErrorMessage: 'Invalid credentials provided' });
                console.log(err);
        });
    }

    _register(name, email, password, phone){
        let me = this;
        if(email == '' || password == '' || name == '' || phone == '') {
            me.setState({registerErrorMessage: 'Please fill the required fields'});
            return;
        }

        if(password.length < 6){
            me.setState({registerErrorMessage: 'Password should be at least 6 characters'});
            return;
        }

        axios.post('/user/register',
            {name:name, email:email, password: password, phone:phone, bio:''})
            .then((resp) => {
                //Login user
                me._login(email, password);
            })
            .catch((err) => {
                me.setState({ registerErrorMessage: 'Email already registered' });
                console.log(err);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset = {Header.HEIGHT + 35} enabled>
                <ScrollView style={styles.contentContainer} contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.welcomeContainer}>
                        <View style={styles.loginView}>
                            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                                <Title style={{fontSize:24}}>Login</Title>
                            </View>
                            <TextInput
                                label='Email'
                                value={this.state.loginEmail}
                                onChangeText={email => this.setState({ loginEmail: email })}
                                style={styles.textInput}
                            />
                            <TextInput
                                label='Password'
                                value={this.state.loginPassword}
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ loginPassword: password })}
                                style={styles.textInput}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this._login(this.state.loginEmail, this.state.loginPassword)}}>
                                <Button mode="contained"
                                        style={styles.buttonLogin}>
                                    Login
                                </Button>
                            </TouchableOpacity>
                            <View style={{paddingTop:10, paddingBottom:15, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <HelperText
                                    type="error"
                                    visible={!(this.state.loginErrorMessage == '')}
                                    style={{fontSize:14}}>
                                    <Icon.Ionicons name="md-alert" size={14}/> {this.state.loginErrorMessage}
                                </HelperText>
                            </View>
                        </View>
                        <View style={{flex:1, paddingBottom:25}}>
                            <Divider/>
                            <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
                                <Text style={{position:'absolute', top:-10, backgroundColor:'#F1F0F4'}}>  or  </Text>
                            </View>
                        </View>
                        <View style={styles.loginView}>
                            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                                <Title style={{fontSize:24}}>Register</Title>
                            </View>
                            <TextInput
                                label='Name'
                                value={this.state.registerName}
                                onChangeText={name => this.setState({ registerName: name })}
                                style={styles.textInput}
                            />
                            <TextInput
                                label='Email'
                                value={this.state.registerEmail}
                                onChangeText={email => this.setState({ registerEmail: email })}
                                style={styles.textInput}
                            />
                            <TextInput
                                label='Password'
                                value={this.state.registerPassword}
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ registerPassword: password })}
                                style={styles.textInput}
                            />
                            <TextInput
                                label='Phone'
                                value={this.state.registerPhone}
                                onChangeText={phone => this.setState({ registerPhone: phone })}
                                style={styles.textInput}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this._register(this.state.registerName, this.state.registerEmail, this.state.registerPassword, this.state.registerPhone)}}>
                                <Button mode="contained"
                                        style={styles.buttonLogin}>
                                    Register
                                </Button>
                            </TouchableOpacity>
                            <View style={{paddingTop:10, paddingBottom:25, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <HelperText
                                    type="error"
                                    visible={!(this.state.registerErrorMessage=='')}
                                    style={{fontSize:14}}>
                                    <Icon.Ionicons name="md-alert" size={14}/> {this.state.registerErrorMessage}
                                </HelperText>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F1F0F4',
    },
    contentContainer: {
        flex:1,
        paddingTop: 30,
    },
    buttonLogin:{
        padding:10,
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
        marginLeft: 45,
        marginRight: 45,
    },
    imageView:{
        flex:1,
        flexDirection:'row',
        marginTop:30,
    },
    loginView:{
        flex:4,
        flexDirection:'column',
    },
    welcomeImage: {
        flex:1,
        height:65,
        flexDirection: 'row',
        resizeMode: 'contain',
    },
});
