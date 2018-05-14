import React from "react";
import PropTypes from 'prop-types';
import { View, Image } from "react-native";
import HTMLView from "react-native-htmlview";


const FlicksMovieDetail = (props) => {
  const navigationParams = props.navigation.state.params;
  const img = {
    uri: "https://image.tmdb.org/t/p/w342" + navigationParams.movie.poster_path
  };
  return (
    <View>
      <Image source={img} />
      <View>
        <HTMLView value={navigationParams.movie.overview} />
      </View>
    </View>
  );
};

FlicksMovieDetail.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        movie: PropTypes.shape({
          poster_path: PropTypes.string,
          overview: PropTypes.string,
        })
      }),
    }),
  })
};

export default FlicksMovieDetail;
