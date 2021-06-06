import React from "react"
import {StyleSheet, View, Button, TextInput, FlatList, Text} from "react-native"
// import films from '../Helpers/FilmData'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi.js'

class Search extends React.Component {

  constructor(props) {
      super(props);
      this._films = [];
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
        // console.log(data);
        this.setState({films : data});
        this._films = data.results;
        // debugger;
        console.log("this films" + this._films);
        this.forceUpdate();
        // debugger;
      });
  }

  render () {
    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          <TextInput style={styles.textinput}
            autoFocus={true} placeholder="Titre du film"
            onChangeText={(text)=> this._searchTextInputChanged(text)}/>

          <View style={styles.button_view}>
            <Button style={styles.buttoninput} title="Rechercher" onPress = { (event) => {this._loadFilms()} } />
          </View>
        </View>

        <View style={styles.list_container}>
          <FlatList
            data={this._films}
            renderItem={({item}) => <FilmItem film={item}/>}
            keyExtractor={(item) => {item.id.toString()}}
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

  list_container : {
    padding : 5
  },

  search_container : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignContent : 'center',
    marginBottom : 10
  },

  textinput : {
    flex : 0.7,
    borderWidth:.5,
    borderColor:'#c0c0c0',
    paddingLeft : 10,
    marginRight : 10,
  },

  button_view : {
      flex : 0.3,
  },

  buttoninput : {
    flex : 1,
  }
})

export default Search
