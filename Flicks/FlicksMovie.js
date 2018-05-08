import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight
} from "react-native";
//import GridView from "react-native-super-grid";
//import "FlicksMovie.css"

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: 150,
    marginBottom: 10,
    backgroundColor: "white",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    height: "auto"
  },
  itemColLeft: {
    width: "30%",
    marginRight: "5%"
  },
  itemColRight: {
    width: "50%"
  },
  itemImg: {
    width: 100,
    minHeight: 150
  },
  itemTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  itemOverView: {
    fontSize: 14,
    height: 100
  }
});

export default class FlicksMovie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const movie = this.props.movie;
    const img = {
      uri: "https://image.tmdb.org/t/p/w342" + this.props.movie.poster_path
    };
    return (
      
        <View style={styles.itemContainer}>
          <View style={styles.itemColLeft}><TouchableHighlight onPress={() => {this.props.loadDetails}}>
            <Image source={img} style={styles.itemImg} /></TouchableHighlight>
          </View>
          <View style={styles.itemColRight}>
            <Text style={styles.itemTitle}>{movie.title}</Text>
            <Text style={styles.itemOverView} ellipsizeMode="tail">
              {movie.overview}
            </Text>
          </View>
        </View>
      
    );
  }
}
