import React from 'react';
import {
    Platform,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    InteractionManager,
    View,
    ActivityIndicator, Modal
} from 'react-native';
import {MonoText} from "../components/StyledText";
import {Button, Title, FAB, Divider} from "react-native-paper";
import {CalendarList} from 'react-native-calendars';
import CalendarPicker from "react-native-calendar-picker";
import BookOption from "../components/BookOption";

export default class BookingScreen extends React.Component {

    moment = require('moment');
    selectedDate = this.moment().format('YYYY-MM-DD');
    static navigationOptions = {
      title: 'BOOKING',
      headerTitleStyle: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center'
      },
      headerRight:<View></View>, // To center title.
    };

  render() {
      return (
          <View style={styles.container}>
              <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
                  <View style={styles.list}>
                      <View style={{backgroundColor:'#F1F0F4', paddingBottom: 5, paddingTop: 10}}>
                          <View style={{position: 'absolute', backgroundColor:'grey', padding:25, width:Dimensions.get('window').width}}></View>
                          <CalendarPicker
                          selectedDayColor="white"
                          selectedDayTextColor="black"
                          swipeConfig={{
                              velocityThreshold: 0.1,
                              directionalOffsetThreshold: 150
                          }}
                          minDate={new Date()}/>
                      </View>
                      <Divider/>
                      <View style={{flex:1, flexDirection: 'column'}}>
                          <BookOption startHour='9AM' endHour='11AM' minimum='2'/>
                          <BookOption startHour='13AM' endHour='15AM' minimum='4'/>
                          <BookOption startHour='16AM' endHour='18AM' minimum='2'/>
                          <BookOption startHour='19AM' endHour='20AM' minimum='2'/>
                      </View>
                  </View>
              </ScrollView>
              <View style={styles.tabBarInfoContainer}>
                  <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around'}}>
                      <View style={{flex:0.8, flexDirection:'column', justifyContent:'center'}}>
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
