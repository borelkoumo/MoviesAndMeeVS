import React from "react"
import {StyleSheet, View, Button, TextInput, FlatList, Text, Image, ActivityIndicator} from "react-native"
import films from '../Helpers/FilmData'
import FilmItem from './FilmItem'
import EmptyView from './EmptyView'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi.js'

class Search extends React.Component {

  constructor(props) {
      super(props);
      this.searchedText = "";
      this.state = {
        films: [],
        isLoading : false,
      };
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({isLoading : true});
      this.state.films = getFilmsFromApiWithSearchedText(this.searchedText).then(
        data => {
          // console.log(data);
          this.setState({
            films : data.results,
            isLoading : false,
          });
        });
    }
  }

  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {}
          </View>
        )
      }
    }

  render () {
    // let searchContainer = ;
    // console.log(this.state.films);
    // console.log(this.state.films.length);
    let searchView = <View style={styles.search_container}>
        <TextInput style={styles.textinput}
          autoFocus={true}
          returnKeyType="search"
          placeholder="Titre du film"
          onSubmitEditing={() => this._loadFilms()}
          onChangeText={(text)=> this._searchTextInputChanged(text)}/>
        <View style={styles.button_view}>
          <Button style={styles.buttoninput} title="Rechercher" onPress = { (event) => {this._loadFilms()} } />
        </View>
      </View>;

    if(this.state.films?.length != 0) {
      return (
        <View style={styles.main_container}>
          {searchView}

          <View style={styles.list_container}>
            <FlatList
              data={this.state.films}
              renderItem={({item}) => <FilmItem film={item}/>}
              keyExtractor={(item, index) => {item.id.toString()}}
            />
          </View>
          {this._displayLoading()}
        </View>
      );
    }
    else {
      // {debugger}
      return (
        <View style={styles.main_container}>
          {searchView}
          <EmptyView searchedText={this.searchedText}></EmptyView>
          {this._displayLoading()}
        </View>
      );
    }

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
  },

  view_image : {
    flex : 1,
  },

  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
 },

})

export default Search
