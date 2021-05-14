import React from "react"
import {View, Button, TextInput} from "react-native"

class Search extends React.Component {
  render () {
    return (
      <View>
        <TextInput placeholder="Rechercher un film"/>
        <Button title="Rechercher" onPress = { () => { alert ("Cliquera")}}/>
      </View>
    );
  }
}

export default Search
