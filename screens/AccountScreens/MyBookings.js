import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import ActivityCard from "../../components/ActivityCard";

export default class MyBookings extends React.Component {

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.list}>
                        <ActivityCard navigation={this.props.navigation}/>
                        <ActivityCard navigation={this.props.navigation}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor:'#F1F0F4',
    },

    list: {
        paddingLeft: 15,
        paddingRight: 15,
        flex:1,
        flexDirection: 'column',
    },
});
