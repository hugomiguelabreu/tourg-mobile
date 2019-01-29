import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Form, Image, TouchableNativeFeedback
} from 'react-native';
import {Header} from 'react-navigation';
import {TextInput, Button, Title, Snackbar, Divider, HelperText} from 'react-native-paper';
import userStore from '../../stores/UserStore';
import {observer} from "mobx-react/native";
import axios from "axios";
import {Icon} from "expo";
import Colors from "../../constants/Colors";
import { ImagePicker } from 'expo';

@observer export default class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: userStore.email,
            password: userStore.password,
            phone: userStore.phone,
            name: userStore.name,
            bio: userStore.bio,
            photo: userStore.photo_path,
            errorMessage: '',
            successMessage: '',
        };
    }

    _pickImage = async () => {
        // only if user allows permission t
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: "Images",
            aspect: [3, 4],
        });

        if(pickerResult.cancelled === false){
            console.log(pickerResult);
            let ext = pickerResult.uri.split('.');
            ext = ext[ext.length-1];
            const formData = new FormData();
            formData.append("image", {
                name: "picture." + ext,
                type: pickerResult.type + '/' + ext,
                uri:
                    Platform.OS === "android" ? pickerResult.uri : pickerResult.uri.replace("file://", "")
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            };
            axios.post("/user/upload_image", formData, config)
                .then((resp) => {
                    console.log(resp);
                    userStore.updatePhoto(resp.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    static navigationOptions = {
        header: null,
    };

    _saveProfile(state){
        let me = this;
        let data = {};
        //Clear errors
        me.setState({errorMessage:''});

        if(state.password != '' && state.password.length < 6) {
            me.setState({errorMessage: 'The password should be longer.'});
            return;
        }
        // Password is bigger than 6
        if(state.password != '')
            data = {email: state.email, password:state.password, name: state.name, phone: state.phone, bio: state.bio}
        else
            data = {email: state.email, name: state.name, phone: state.phone, bio: state.bio}


        axios.post('/user/update',
            data)
            .then((resp) => {
                //Put user in store
                userStore.updateUser(resp.data);
                me.setState({successMessage: 'Profile successfully updated'});
            })
            .catch((err) => {
                me.setState({ errorMessage: 'Something went wrong updating the profile' });
                console.log(err);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset = {Header.HEIGHT + 105} enabled>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <View style={styles.profile}>
                            <TouchableNativeFeedback
                                onPress={this._pickImage}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:0.3, flexDirection:'row', padding:10, alignItems:'center', justifyContent: 'center'}}>
                                        <Image style={{height: 54, width: 54}}
                                               resizeMode = 'cover'
                                               source={{uri: userStore.photo_path == null ?
                                                       'https://media.istockphoto.com/photos/confident-businessman-posing-in-the-office-picture-id891418990?k=6&m=891418990&s=612x612&w=0&h=BItvQKG0Wf4Ht3XHPxa2LV0WkCtNjhBjkQv28Dhq2pA='
                                                        : userStore.photo_path}} />
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
                                    label='Name'
                                    value={this.state.name}
                                    onChangeText={name => this.setState({name: name})}
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
                                <TextInput
                                    label='Bio'
                                    multiline={true}
                                    value={this.state.bio}
                                    onChangeText={bio=> this.setState({ bio: bio})}
                                    style={styles.textInput}
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {this._saveProfile(this.state)}}>
                                    <Button mode="contained"
                                            style={styles.buttonLogin}>
                                        Update profile
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
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
