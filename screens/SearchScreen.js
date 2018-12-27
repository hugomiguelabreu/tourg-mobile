import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Alert
} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Title} from "react-native-paper";
import SearchHeader from "../components/SearchHeader";
import ActivityCard from "../components/ActivityCard";

export default class SearchScreen extends React.Component {


    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: <SearchHeader onClick={navigation.getParam('getLocation')}/>,
        headerStyle: {
            height:96,
        },
    });

    componentDidMount() {
        // Set navigation param to execute function on header button
        this.props.navigation.setParams({ getLocation: this._getLocation });
    }

    //Function to get user location using gps
    _getLocation = () => {
        console.log("kek");
        navigator.geolocation.getCurrentPosition(position => {
                const location = JSON.stringify(position);
                console.log(location);
            },
            error => Alert.alert('Error while getting location', error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

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
        paddingTop: 15,
        backgroundColor:'#F1F0F4',
    },

    list: {
        paddingLeft: 15,
        paddingRight: 15,
        flex:1,
        flexDirection: 'column',
    },
});
