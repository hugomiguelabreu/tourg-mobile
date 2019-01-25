import React from 'react';
import {
    Platform,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    InteractionManager,
    View,
    ActivityIndicator, Modal, FlatList
} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Button, Title, FAB, Divider} from "react-native-paper";
import {CalendarList} from 'react-native-calendars';
import CalendarPicker from "react-native-calendar-picker";
import BookOption from "../components/BookOption";
import LoadingModal from "../components/LoadingModal";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";

export default class BookingScreen extends React.Component {

    moment = require('moment');

    constructor(props){
        super(props);
        this.state={
            selectedStartDate: null,
            activityId: this.props.navigation.getParam('activityId', '0'),
            isLoading: true,
            activityDetails: null,
            activityDate: null
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidMount() {
        //Fetch hours for activity id
        // When the screen is focused again let's fetch new results
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this._getDetails();
            }
        );
    }

    _getDetails(){
        let me = this;
        this.setState({isLoading: true});
        axios.get('/activities_dates/' + this.state.activityId)
            .then((resp) => {
                console.log(resp.data);
                me.setState({isLoading:false, activityDetails: resp.data, activityDate: resp.data.Activity_Dates});
            })
            .catch((err) => {
                me.setState({isLoading:false, activityDetails: null});
                console.log(err);
            });
    }

    onDateChange = (date) => {
        this.setState({
            selectedStartDate: date,
        });
        console.log(this.moment(date).format("DD-MM-YYYY"));
    }

    hours = () => {
        let available = this.state.activityDate.filter(act =>
            this.moment(act.timestamp.replace(/[-:Z]/g, '')).isSame(this.state.selectedStartDate, 'day') && act.bookings == 0
        );

        if(available.length <= 0){
            return(<View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:'gray'}}>Activity not available on selected date</Text>
            </View>);
        }else{
            return(<FlatList
                data={available}
                keyExtractor={(item, index) => 'item' + index}
                renderItem={({item}) =>
                    <BookOption startHour={this.moment(item.timestamp.replace(/[-:Z]/g, '')).format("HH:mm a")}
                                endHour={this.moment(item.timestamp.replace(/[-:Z]/g, '')).add(this.state.activityDetails.duration, 'minutes').format("HH:mm a")}
                                minimum={this.state.activityDetails.n_people} price={item.price}
                                activityId={this.state.activityDetails.id} activityDateId={item.id}
                                navigation={this.props.navigation}/>
                }
            />);
        }
    }

    selectedDate = this.moment().format('YYYY-MM-DD');

    static navigationOptions = {
      headerTitle: <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Title>BOOKING</Title></View>,
      headerRight: <View></View>, // To center title.
    };

    render() {
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.list}>
                            <View style={{backgroundColor: '#F1F0F4', paddingBottom: 5, paddingTop: 10}}>
                                <View style={{
                                    position: 'absolute',
                                    backgroundColor: 'grey',
                                    padding: 25,
                                    width: Dimensions.get('window').width
                                }} />
                                <CalendarPicker
                                    selectedDayColor="white"
                                    selectedDayTextColor="black"
                                    swipeConfig={{
                                        velocityThreshold: 0.1,
                                        directionalOffsetThreshold: 150
                                    }}
                                    minDate={new Date()}
                                    maxDate={this.moment(new Date()).add('2', 'months')}
                                    onDateChange={this.onDateChange}/>
                            </View>
                            <Divider/>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                {this.hours()}
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.tabBarInfoContainer}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={{flex: 0.8, flexDirection: 'column', justifyContent: 'center'}}>
                                <Text style={styles.tabBarInfoText}>Need more options? Chat with the guide</Text>
                            </View>
                            <View>
                                <FAB
                                    small
                                    icon="chat"
                                    onPress={() => this.props.navigation.navigate('Chat')}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            );
        }else{
            return(<LoadingModal/>);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        flex:1,
        flexDirection: 'column',
        paddingBottom:50,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        backgroundColor:'#F1F0F4',
        paddingVertical: 7.5,
    },
    tabBarInfoText: {
        fontSize: 14,
        color: 'black',
    },
});
