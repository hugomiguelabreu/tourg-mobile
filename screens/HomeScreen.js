import React from 'react';
import {
    FlatList,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';
import {Divider, Subheading, Title} from 'react-native-paper';
import { MonoText } from '../components/StyledText';
import ActivityCard from "../components/ActivityCard";
import userStore from '../stores/UserStore';
import axios from "axios";
import {Icon} from "expo";

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activities: null,
    };
  }

  static navigationOptions = {
      headerTitle: <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Title>EXPLORE</Title></View>
  };

  componentDidMount() {
    this._getActivities();
  }

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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingTop: 15, alignItems: 'center'}}>
            <Title>Welcome back, {userStore.token != null ? userStore.name : 'Guest'}&nbsp;</Title>
            <Icon.Ionicons
                name='md-happy'
                size={24}
            />
          </View>
            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingTop: 5, alignItems:'center'}}>
                <Subheading>Were are some highlights for you &nbsp;</Subheading>
                <Icon.Ionicons
                    name='md-heart'
                    size={16}
                />
            </View>
          <View style={styles.list}>
            <Divider style={{marginBottom: 15, marginTop: 15}}/>
              <FlatList
                  data={this.state.activities}
                  keyExtractor={(item, index) => 'item' + index}
                  extraData={this.state}
                  renderItem={({item}) => {
                          return(<ActivityCard id={item.id} title={item.title} description={item.description}
                                               activityScore={item.total_activity_score == null ? 0 : (item.total_activity_score / item.n_activity_score).toFixed(1)}
                                               activityScoreCount={item.n_activity_score}
                                               activityImage={item.photo_path}
                                               price={item.price}
                                               guideName={item.Guide.User.name} guidePhoto={item.Guide.User.photo_path}
                                               guideJoined={item.Guide.User.createdAt}
                                               navigation={this.props.navigation}/>);
                      }
                  }
              />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F1F0F4',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    marginLeft: -15,
      marginRight: -15,
      alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
    list: {
        paddingLeft: 15,
        paddingRight: 15,
        flex:1,
        flexDirection: 'column',
    },
});
