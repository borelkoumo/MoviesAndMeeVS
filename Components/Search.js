import React from "react"
import {View, Button, TextInput} from "react-native"

class Search extends React.Component {


  render () {

    return (
      <View>
        <TextInput onChange={e => {values.inputValue = e.target.value}} style={styles.textinput} autoFocus = {true} placeholder="Rechercher un film" />
        <Button title="Rechercher" onPress = { () => { alert (values.inputValue) } }/>
      </View>
    );
  }
}

var values = {
  inputValue : ""
};

const styles= {
  textinput : {
    margin: 20,
    height:50,
    borderColor:'#c0c0c0',
    borderWidth:1,
    paddingLeft:10
  }
}

export default Search
