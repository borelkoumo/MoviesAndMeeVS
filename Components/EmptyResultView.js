import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class EmptyResultView extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const searchedText = this.props.searchedText;

    return (
      <View style={styles.main_container_empty}>
        <Ionicons name={'alert-circle'} size={100} color={'#000'} />
        {/* <Image style={styles.image} source={require("../assets/not-found.png")} /> */}
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
      height: 100,
      width: 100,
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
