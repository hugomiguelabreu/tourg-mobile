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
import {Button, Chip, Divider, Portal, Dialog, Checkbox, Title, Subheading} from "react-native-paper";
import SearchHeader from "../components/SearchHeader";
import ActivityCard from "../components/ActivityCard";
import axios from 'axios';
import LoadingModal from "../components/LoadingModal";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Icon} from 'expo';

export default class SearchScreen extends React.Component {

    moment = require('moment');

    constructor(props){
        super(props);
        this.state = {
            activities: null,
            isLoading: true,
            isDateTimePickerVisibleStart: false,
            isDateTimePickerVisibleEnd: false,
            dateStart: null,
            dateEnd: null,
            lat: null,
            lng: null,
            query: '',
            showCategories: false,
            selectedCategories: {
                'Food and Drink': false,
                'Concerts': false,
                'Nature': false,
                'Arts': false,
                'Surfing': false,
                'History': false,
                'Sports' : false,
                'Classes and Workshops': false,
                'Entertainment': false,
                'Music': false,
                'Nightlife': false,
                'Health and Wellness': false,
                'Social Impact': false,
            },
        };
    }

    categories = [
        'Food and Drink',
        'Concerts',
        'Nature',
        'Arts',
        'Surfing',
        'History',
        'Sports',
        'Classes and Workshops',
        'Entertainment',
        'Music',
        'Nightlife',
        'Health and Wellness',
        'Social Impact',
    ];

    static navigationOptions = ({navigation}) => ({
        headerTitle: <SearchHeader onClick={navigation.getParam('getLocation')} handleQuery={navigation.getParam('query')}/>,
        headerStyle: {
            height:96,
        },
    });

    componentDidMount() {
        // Set navigation param to execute function on header button
        this.props.navigation.setParams({ query: this.handleChangeQuery });
        // When the screen is focused again let's fetch new results
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this._getActivities();
            }
        );
    }

    handleChangeQuery = (query) => {
        this.setState({query: query});
        this._search();
    };

    _showDateTimePickerStart = () => this.setState({ isDateTimePickerVisibleStart: true });
    _showDateTimePickerEnd = () => this.setState({ isDateTimePickerVisibleEnd: true });

    _hideDateTimePickerStart = () => this.setState({ isDateTimePickerVisibleStart: false });
    _hideDateTimePickerEnd = () => this.setState({ isDateTimePickerVisibleEnd: false });

    _handleDatePickedStart = (date) => {
        this.setState({dateStart: date});
        this._search();
        this._hideDateTimePickerStart();
    };

    _handleDatePickedEnd = (date) => {
        this.setState({dateEnd: date});
        this._search();
        this._hideDateTimePickerEnd();
    };

    _getActivities() {
        let me = this;
        this.setState({isLoading: true});
        axios.get('/activities')
            .then((resp) => {
                me.setState({activities: resp.data, isLoading:false});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _search(){
        let me = this;

        if(this.state.dateStart == null && this.state.dateEnd == null){
            axios.get('/activities/search/' + this.state.query)
                .then((resp) => {
                    console.log(resp.data);
                    me.setState({activities: resp.data});
                })
                .catch((err) => {
                    console.log(err);
                });
        }else{
            axios.get('/activities/search/' + this.state.query + '/' +
                this.moment(this.state.dateStart).format('YYYY-MM-DD 00:01:00+00') + '/' +
                this.moment(this.state.dateEnd).format('YYYY-MM-DD 23:59:00+00'))
                .then((resp) => {
                    console.log(resp.data);
                    me.setState({activities: resp.data});
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    _categories(){
        return(
            <FlatList
                data={this.categories}
                keyExtractor={(item, index) => 'item' + index}
                extraData={this.state}
                renderItem={({item}) =>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <Checkbox
                            status={this.state.selectedCategories[item] ? 'checked' : 'unchecked'}
                            onPress={() => {
                                this.state.selectedCategories[item] = !this.state.selectedCategories[item];
                                this.setState({ selectedCategories: this.state.selectedCategories  });
                            }}
                        />
                        <Subheading>{item}</Subheading>
                    </View>
                }
            />
        );
    }

    _hideDialog = () => {
        this.setState({showCategories: false});
    };

    _showDialog = () => {
        this.setState({showCategories: true});
    };

    render() {
        if(!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Portal>
                        <Dialog
                            visible={this.state.showCategories}
                            onDismiss={this._hideDialog}>
                            <Dialog.Title style={{fontSize:16, marginTop:10, marginBottom: 10}}>Categories</Dialog.Title>
                            <Dialog.ScrollArea>
                                <ScrollView style={{height: 400}} contentContainerStyle={{flexGrow:1, paddingHorizontal: 24}}>
                                    <View style={{flex:1}}>
                                        {this._categories()}
                                    </View>
                                </ScrollView>
                            </Dialog.ScrollArea>
                            <Dialog.Actions>
                                <Button onPress={this._hideDialog}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <View style={{flex:0.1, flexDirection:'column', padding:5}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingLeft: 10, paddingRight: 10}}>
                            <Chip icon={() => {return(<Icon.Ionicons name='md-calendar' size={16} color='grey'/>);}} mode='outlined'
                                  onPress={() => this._showDateTimePickerStart()}>{this.state.dateStart == null ? 'Start date' : this.moment(this.state.dateStart).format('DD MMM YY')}</Chip>
                            <Chip icon={() => {return(<Icon.Ionicons name='md-calendar' size={16} color='grey'/>);}} mode='outlined'
                                  onPress={() => this._showDateTimePickerEnd()}>{this.state.dateEnd == null ? 'End date' : this.moment(this.state.dateEnd).format('DD MMM YY')}</Chip>
                            <Chip icon={() => {return(<Icon.Ionicons name='md-menu' size={16} color='grey'/>);}} mode='outlined' onPress={() => this._showDialog()}>Categories</Chip>
                        </View>
                    </View>
                    <Divider style={{elevation: 0.5}}/>
                    <ScrollView style={[styles.container, {paddingTop:5}]} contentContainerStyle={{flexGrow:1}}>
                        <View style={styles.list}>
                            <FlatList
                                data={this.state.activities}
                                keyExtractor={(item, index) => 'item' + index}
                                renderItem={({item}) =>
                                        <ActivityCard id={item.id} title={item.title} description={item.description}
                                                      activityScore = {item.total_activity_score == null ? 0 : (item.total_activity_score / item.n_activity_score).toFixed(1)}
                                                      activityScoreCount = {item.n_activity_score}
                                                      price = {item.price}
                                                      guideName={item.Guide.User.name} guideJoined={item.Guide.User.createdAt} navigation={this.props.navigation}/>
                                }
                            />
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisibleStart}
                            minimumDate={new Date()}
                            onConfirm={this._handleDatePickedStart}
                            onCancel={this._hideDateTimePickerStart}
                        />
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisibleEnd}
                            minimumDate={this.state.dateStart != null ? this.state.dateStart : new Date()}
                            onConfirm={this._handleDatePickedEnd}
                            onCancel={this._hideDateTimePickerEnd}
                        />
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
