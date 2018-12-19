import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
    Form, Image, TouchableNativeFeedback
} from 'react-native';
import {TextInput, Button, Title, Snackbar, Divider} from 'react-native-paper';

export default class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: ''
        };
    }


    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        AsyncStorage.getItem('USER')
            .then((user) => {
                if(user!=null) {
                    user = JSON.parse(user);
                    this.setState({firstName: user.firstName});
                    this.setState({lastName: user.lastName});
                    this.setState({email: user.email});
                    this.setState({password: user.password});
                    this.setState({phone: user.phone});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _saveProfile(state){
        AsyncStorage.setItem('USER', JSON.stringify({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password,
                phone: state.phone,
            }))
            .then((resp) => {
            console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log('ole');
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <View style={styles.profile}>
                            <TouchableNativeFeedback>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:0.3, flexDirection:'row', padding:10, alignItems:'center', justifyContent: 'center'}}>
                                        <Image style={{height: 54, width: 54}}
                                               resizeMode = 'cover'
                                               source={{uri: 'https://media.istockphoto.com/photos/confident-businessman-posing-in-the-office-picture-id891418990?k=6&m=891418990&s=612x612&w=0&h=BItvQKG0Wf4Ht3XHPxa2LV0WkCtNjhBjkQv28Dhq2pA='}} />
                                    </View>
                                    <View style={{flex:1, flexDirection:'row', alignItems: 'center'}}>
                                        <Text style={{padding:10, fontSize:16, fontWeight:'bold'}}>Update profile picture</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={{flex:1, flexDirection:'column', paddingTop:10, paddingBottom:10}}>
                                <Divider/>
                            </View>
                            <View style={{flex:4, flexDirection:'column'}}>
                                <TextInput
                                    label='First name'
                                    value={this.state.firstName}
                                    onChangeText={firstName => this.setState({ firstName: firstName })}
                                    style={styles.textInput}
                                />
                                <TextInput
                                    label='Last name'
                                    value={this.state.lastName}
                                    onChangeText={lastName => this.setState({ lastName: lastName })}
                                    style={styles.textInput}
                                />
                                <TextInput
                                    label='Email'
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email: email })}
                                    style={styles.textInput}
                                />
                                <TextInput
                                    label='Password'
                                    value={this.state.password}
                                    secureTextEntry={true}
                                    onChangeText={password=> this.setState({ password: password })}
                                    style={styles.textInput}
                                />
                                <TextInput
                                    label='Phone'
                                    value={this.state.phone}
                                    onChangeText={phone=> this.setState({ phone: phone})}
                                    style={styles.textInput}
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {this._saveProfile(this.state)}}>
                                    <Button mode="contained"
                                            style={styles.buttonLogin}>
                                        Login
                                    </Button>
                                </TouchableOpacity>
                            </View>
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
        marginLeft: 25,
        marginRight: 25,
    },
    profile:{
        flex:1,
        flexDirection:'column',
    },
});
