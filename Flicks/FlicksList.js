import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";

import FlicksMoive from "./FlicksMovie";


const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "orange",
    alignItems: "center"
  },
  viewListMovies: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    paddingTop: 40
  },
  inputtext: {
    width: "86%",
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    left: 26,
    top: 10
  }
});


export default class FlicksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };

    this.filterSearch = this.filterSearch.bind(this);
  }

  filterSearch(text) {
    const props = this.props.screenProps;
    let results = props.movies.filter(movie => {
      return movie.title.indexOf(text) !== -1;
    });
    this.setState({ moviesSearch: results });
  }

  render() {
    const props = this.props.screenProps;
    let content;
    if (this.state.moviesSearch) content = this.state.moviesSearch;
    else content = props.movies;

    return (
      <View style={styles.container}>
        <View style={styles.viewListMovies}>
          <TextInput
            type="text"
            style={styles.inputtext}
            value={this.state.search}
            onChangeText={text => this.filterSearch(text)}
          />
          <FlatList
            data={content}
            keyExtractor={movie => movie.id}
            ListHeaderComponent={this.renderHeader}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            
            renderItem={movieItem => {
              return (
                <FlicksMoive
                  movie={movieItem.item}
                  loadDetails={() =>
                    this.props.screenProps.navigation.navigate("FlicksMovieDetail")
                  }
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}
