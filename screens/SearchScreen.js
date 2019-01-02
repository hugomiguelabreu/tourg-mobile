import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Alert,
    FlatList, Modal
} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Title} from "react-native-paper";
import SearchHeader from "../components/SearchHeader";
import ActivityCard from "../components/ActivityCard";
import axios from 'axios';
import LoadingModal from "../components/LoadingModal";

export default class SearchScreen extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            activities: null,
            isLoading: true,
        }
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
        let me = this;
        axios.get('/activities')
            .then((resp) => {
                console.log(resp.data);
                me.setState({activities: resp.data, isLoading:false});
            })
            .catch((err) => {
                console.log(err);
            });
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
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
                        <View style={styles.list}>
                            <FlatList
                                data={this.state.activities}
                                keyExtractor={(item, index) => 'item' + index}
                                renderItem={({item}) =>
                                        <ActivityCard id={item.id} title={item.title} description={item.description}
                                                      activityScore = {item.total_activity_score == null ? 0 : (item.total_activity_score / item.n_activity_score)}
                                                      activityScoreCount = {item.n_activity_score}
                                                      guideName={item.Guide.User.name} guideJoined={item.Guide.User.createdAt} navigation={this.props.navigation}
                                                      isChanging={this._isChanging}/>
                                }
                            />
                        </View>
                    </ScrollView>
                </View>
            );
        }else {
            return(
                <LoadingModal />
            );
        }
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
    loading: {
        flex: 1,
        paddingTop: 15,
        backgroundColor:'#F1F0F4',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
