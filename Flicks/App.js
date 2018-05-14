import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackNavigator } from "react-navigation";

import FlicksList from "./FlicksList";
import FlicksMovieDetail from "./FlicksMovieDetail";


const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  }
});

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "a07e22bc18f5cb106bfe4cc1f83ad8ed";

const sleep = ms => new Promise(timeout => setTimeout(timeout, ms));

const Routes = StackNavigator({
  FlicksList: {
    screen: FlicksList,
    navigationOptions: {
      title: 'Welcome to Flicks',
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
    super(props);
    this.state = {
      movies: [],
      loading: true,
      refreshing: false
    };

    this.fetchWithPage = this.fetchWithPage.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  async componentDidMount() {
    await sleep(1000);
    this.fetchWithPage('now_playing');
  }

  async _onRefresh() {
    this.setState({ refreshing: true });
    this.fetchWithPage('top_rated');
  }

  async fetchWithPage(mode) {
    const results = await fetch(`${API_URL}${mode}?api_key=${API_KEY}`);
    const data = await results.json();
    this.movies = data.results;
    await sleep(1000);

    this.setState({
      movies: this.movies,
      loading: false,
      refreshing: false
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Text>loading</Text>
        </View>
      );
    }

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
