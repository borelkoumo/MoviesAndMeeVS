import React from "react"
import {StyleSheet, View, Button, TextInput, Alert } from "react-native"

class Search extends React.Component {
  constructor(props) {
      super(props);
      this.state = {inputValue: ""};
      /*this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);*/
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(event) {
    Alert.alert('A name was submitted: ' + this.state.inputValue);
    event.preventDefault();
  }

  //const [text, setText] = useState('');
  render () {

    return (
      <View style={styles.viewStyle}>
        <TextInput onChange={e => this.handleChange(e)} style={styles.textInput}
        autoFocus={true} placeholder="Rechercher un film"/>
        <Button title="Rechercher" onPress = { e => { this.handleSubmit(e) } } style={styles.buttonStyle}/>
      </View>
    );
  }
}

const values = {
  inputValue : ""
};

const styles = StyleSheet.create ({
  viewStyle : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'flex-start',
    justifyContent: 'space-between',
    borderColor:'#c0c0c0',
    borderWidth:1,
    padding : 5
  },
  textInput : {
    flex : 1,
    marginRight: 10,
    height:35,
    borderWidth:.5,
    borderColor:'#c0c0c0',
    paddingLeft:10
  },
  buttonStyle : {
    flex : 1,
    height: 60,
  }
})

export default Search
