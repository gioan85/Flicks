import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import HTMLView from "react-native-htmlview";

const styles = StyleSheet.create({});

export default class FlicksMovieDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props.navigation.state.params;
    const img = {
      uri: "https://image.tmdb.org/t/p/w342" + this.props.movie.poster_path
    };
    return (
      <View>
        <Image source={img} />
        <View>
          <HTMLView value={props.overview} />
        </View>
      </View>
    );
  }
}
