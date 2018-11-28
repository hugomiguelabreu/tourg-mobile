import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Form, Image
} from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

export default class LoginScreen extends React.Component {

    state = {
      email: '',
      password: '',
    };

    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <View style={styles.imageView}>
                            <Image
                                source={
                                    require('../assets/images/tour-white.png')
                                }
                                style={styles.welcomeImage}
                            />
                        </View>
                        <View style={styles.loginView}>
                            <View style={{flexDirection:'row', justifyContent: 'center'}}>
                                <Title style={{fontSize:32}}>Login</Title>
                            </View>
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
                            <TouchableOpacity
                                style={styles.button}>
                                <Button mode="contained" onPress={() => this.props.navigation.navigate('Main')}
                                        style={styles.buttonLogin}>
                                    Login
                                </Button>
                            </TouchableOpacity>
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
        backgroundColor: '#349D88',
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
