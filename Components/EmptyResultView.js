import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

class EmptyResultView extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const searchedText = this.props.searchedText;
    // {debugger}
    return (
      <View style={styles.main_container_empty}>
        <Image style={styles.image} source={require("../assets/search.png")} />
        <Text style={styles.title}> Aucun resultat</Text>
        <Text style={styles.subtitle}>Oups ! Aucun titre correspondant à "{searchedText}"</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    main_container_empty : {
      flex : 1,
      flexDirection : 'column',
      justifyContent : "center",
      alignItems : "center",
      padding : 5,
    },

    image : {
      resizeMode : "cover",
      height : 200,
      width : 200,
      marginBottom : 50,
    },

    title : {
      fontSize : 40,
      fontWeight : "bold",
      // textAlign : "center",
    },

    subtitle : {
      fontSize : 15,
      // textAlign : "center",
    },
});

export default EmptyResultView;
