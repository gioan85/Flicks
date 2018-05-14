import React from "react";
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";

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

const FlicksMovie = (props) => {
  const img = {
    uri: "https://image.tmdb.org/t/p/w342" + props.movie.poster_path
  };
  return (
      <View style={styles.itemContainer} >
        <View style={styles.itemColLeft}>
          <TouchableHighlight onPress={props.loadDetails}>
            <Image source={img} style={styles.itemImg} />
          </TouchableHighlight>
        </View>
        <View style={styles.itemColRight}>
          <Text style={styles.itemTitle}>{props.movie.title}</Text>
          <Text style={styles.itemOverView} ellipsizeMode="tail">
            {props.movie.overview}
          </Text>
        </View>
      </View>
  );
};

FlicksMovie.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
  }),
  loadDetails: PropTypes.func,
};

export default FlicksMovie;
