import React from "react"
import {StyleSheet, View, Button, TextInput, FlatList, Text} from "react-native"
import films from '../Helpers/FilmData'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi.js'

class Search extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        films: [],
        searchedText: "" // Initialisation de notre donnée searchedText dans le state
      };
  }

  _searchTextInputChanged(text) {
    this.setState({searchedText: text})
  }

  _loadFilms() {
    this.state.films = getFilmsFromApiWithSearchedText(this.state.searchedText).then(
      data => {
        this.setState({films : data})
      })
  }

  render () {
    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          <TextInput style={styles.textinput}
            autoFocus={true} placeholder="Titre du film"
            onChangeText={(text)=> this._searchTextInputChanged(text)}/>
          <Button style={styles.buttoninput} title="Rechercher" onPress = { () => {this._loadFilms();} } />
        </View>
        <View style={styles.list_container}>
          <FlatList
            data={films}
            keyExtractor={(item) => {item.id.toString()}}
            renderItem={({item}) => <FilmItem film={item}/>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  main_container : {
    flex : 1,
    flexDirection : 'column',
    padding : 5
  },
  search_container : {
    flexDirection : 'column', // default
    justifyContent: 'center',
    alignContent : 'center', // defines the alignment along the cross-axis.
    borderWidth : 1,
    marginBottom : 10
  },

  list_container : {
    borderColor:'#c0c0c0',
    borderWidth:1,
    padding : 5
  },

  textinput : {
    height:35,
    marginBottom : 5,
    borderWidth:.5,
    borderColor:'#c0c0c0',
  },

  buttoninput : {
    height:35,
    borderWidth:.5,
    borderColor:'#c0c0c0'
  }
})

export default Search
