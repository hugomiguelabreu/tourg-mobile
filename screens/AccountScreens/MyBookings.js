import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import ActivityCard from "../../components/ActivityCard";
import LoadingModal from "../../components/LoadingModal";
import {Title} from 'react-native-paper';
import axios from "axios";
import BookedCard from "../../components/BookedCard";

export default class MyBookings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            bookings: null,
            isLoading: true,
        };
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        // When the screen is focused again let's fetch new results
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this._getBookings();
            }
        );
    }

    _getBookings() {
        let me = this;
        this.setState({isLoading: true});
        axios.get('/user/bookings')
            .then((resp) => {
                me.setState({isLoading:false, bookings: resp.data});
                console.log(resp.data);
            })
            .catch((err) => {
                me.setState({isLoading:false, bookings: null});
                console.log(err);
            });
    }

    activities = () => {
        if(this.state.bookings == null || this.state.bookings.length == 0){
            return(<View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Title style={{color:'gray'}}>No booked activities</Title>
                   </View>);
        }else{
            return(<FlatList
                data={this.state.bookings}
                keyExtractor={(item, index) => 'item' + index}
                renderItem={({item}) =>
                    <BookedCard id={item.id} activityId={item.Activity.id}
                                  title={item.Activity.title} description={item.Activity.description}
                                  guideId={item.Activity.Guide.id} activityScore={item.Activity.total_activity_score == null ? 0 : (item.Activity.total_activity_score / item.Activity.n_activity_score).toFixed(1)}
                                  guideName={item.Activity.Guide.User.name} guideJoined={item.Activity.Guide.User.createdAt} navigation={this.props.navigation}
                                  bookingDate={item.Activity_Date.timestamp} accepted={item.accepted}
                                  activity_review={item.guide_evaluation_id} guide_review={item.activity_evaluation_id}
                                  finished={item.finished}
                                  rating = {true} />
                }
            />);
        }
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
                        <View style={styles.list}>
                            {this.activities()}
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
