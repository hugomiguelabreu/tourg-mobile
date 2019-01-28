import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

const instanceLocatorId = "v1:us1:887650cc-ac5b-475e-9f5b-6410cdf6e7ad";
const chatServer = "http://YOUR_INTERNAL_IP:3000/users";

export default class ChatRooms extends React.Component {
    render() {
        return(
            <View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        alignSelf: 'stretch',
    },
    leave_button: {
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
    },
    leave_button_text: {
        color: '#FFF',
        fontSize: 16,
    },
    activity: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    activity_text: {
        fontSize: 14,
        color: '#484848',
    },
    body: {
        flex: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    list_item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    list_item_body: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    online_indicator: {
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    online: {
        backgroundColor: '#3ec70f',
    },
    offline: {
        backgroundColor: '#ccc',
    },
    username: {
        marginLeft: 10,
        fontSize: 16,
    },
});