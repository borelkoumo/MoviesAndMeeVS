import React from "react"
import {StyleSheet, View, Text } from "react-native"

class FilmItem extends React.Component {
  render() {
    const film = this.props.film;
    console.log(film);
    return (
      <View style={styles.main_container}>
        <Text style={styles.text_style}> {film.title}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main_container : {
    height : 190
  },
  text_style : {

  }
});

export default FilmItem;
