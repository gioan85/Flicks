import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FlicksList from "./FlicksList";
import FlicksMovieDetail from "./FlicksMovieDetail"
import { StackNavigator } from "react-navigation";
import HTMLView from 'react-native-htmlview';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  }
});

const api_url = "https://api.themoviedb.org/3/movie/";
const api_key = "a07e22bc18f5cb106bfe4cc1f83ad8ed";

const Routes = StackNavigator({
  FlicksList: { 
    screen: FlicksList,
    navigationOptions:  {
      title:  'Welcome to Flicks',
    } 
  },
  FlicksMovieDetail: { 
    screen: FlicksMovieDetail,
    navigationOptions: {
      title: 'Flicks details'
    }
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        movies: [],
        loading: true,
        refreshing: false
      });
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  async componentDidMount() {
    await this.sleep(1000);
    this.fetchWithPage('now_playing');
  }

  sleep(ms) {
    return new Promise(timeout => setTimeout(timeout, ms));
  }

  async _onRefresh(){
    this.setState({ refreshing: true });
    this.fetchWithPage('top_rated');
  }

  async fetchWithPage(mode) {
    const results = await fetch(`${api_url}${mode}?api_key=${api_key}`);
    const data = await results.json();
    this.movies = data.results;
    await this.sleep(1000);

    this.setState({
      movies: this.movies,
      loading: false,
      refreshing: false
    });
  }

  render() {
    if (this.state.loading)
      return (
        <View style={styles.loading}>
          <Text>loading</Text>
        </View>
      );

    return (
      <Routes
        screenProps={{
          movies: this.state.movies,
          refreshing: this.state.refreshing,
          onRefresh: this._onRefresh
        }}
      />
    );
  }
}
