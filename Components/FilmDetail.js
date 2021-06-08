import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main_style}>
        <Text>Details du Film</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex : 1,
  },
});

export default FilmDetail;
