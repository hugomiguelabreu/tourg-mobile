import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import ActivityCard from "../../components/ActivityCard";
import LoadingModal from "../../components/LoadingModal";
import axios from "axios";

export default class MyBookings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activities: null,
            isLoading: true,
        };
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        // Set navigation param to execute function on header button
        let me = this;
        axios.get('/user/bookings')
            .then((resp) => {
                console.log(resp.data);
                me.setState({activities: resp.data, isLoading:false});
            })
            .catch((err) => {
                console.log(err);
            });
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
