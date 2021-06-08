import React from "react"
import {StyleSheet, View, Button, TextInput, FlatList, Text, Image, ActivityIndicator} from "react-native"
import films from '../Helpers/FilmData'
import FilmItem from './FilmItem'
import EmptyResultView from './EmptyResultView'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi.js'

class Search extends React.Component {

  constructor(props) {
      super(props);
      this.searchedText = "";
      this.currentPage = 0;
      this.totalPages = 0;
      this.state = {
        films: [],
        isLoading : false,
        existResult : false,
      };
  }

  _searchTextInputChanged(text) {
    console.log('_searchTextInputChanged = '+text);
    this.searchedText = text;
  }

  _searchFilms () {
    if (this.searchedText.length > 0) {
      this.currentPage = 0;
      this.totalPages = 0;
      this.setState ({
        films: [],
        isLoading : true,
        existResult : false,
      }, () => {
        console.log('DANS _searchFilms et BEFORE _loadNextFilms');
        setTimeout(()=>{
          console.log('setTimeout(5000)')
          this._loadNextFilms();
        }, 2500);
        console.log('DANS _searchFilms et APRES _loadNextFilms');
      });
    }
  }


  _loadNextFilms() {
    console.log('DANS _loadNextFilms et BEFORE getFilmsFromApiWithSearchedText');
    getFilmsFromApiWithSearchedText(this.searchedText, this.currentPage+1).then(
      (data) => {
        //console.log('data = '+data);
        this.currentPage = data.page;
        this.totalPages = data.total_pages;
        const films = [...this.state.films, ...data.results];
        const existResult = films.length == 0 ? false : true;

        console.log('this.currentPage = '+this.currentPage+'; this.totalPages='+this.totalPages+'; existResult='+existResult+'; films='+films);
        // debugg er;
        this.setState({
          films : films,
          isLoading : false,
          existResult : existResult,
        });
      }
    ).catch((error)=> {
      console.log('Mon erreur dans _loadNextFilms= '+error)
      this.setState({ films : [], isLoading : false, existResult : false, });
    });;
  }

  _displayLoadingView() {
    console.log('_displayLoadingView');
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color="#999999"/>
        </View>
      )
    }
  }

  _getSearchView() {
    return (
      <View style={styles.search_container}>
        <TextInput style={styles.textinput}
          autoFocus={true}
          returnKeyType="search"
          placeholder="Titre du film"
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={(text)=> this._searchTextInputChanged(text)}/>
        <View style={styles.button_view}>
          <Button
            style={styles.buttoninput}
            title="Rechercher"
            onPress = {
              (event) => {
                this._searchFilms()
              }
            }
          />
        </View>
      </View>);
  }

  _displayDetailsForFilm = (filmID) => {
    console.log('Display film with ID = '+filmID);
    //debugger;
    this.props.navigation.navigate("FilmDetail", {filmID : filmID})
  };

  render () {
    console.log('rendering state /// isLoading='+this.state.isLoading);

    if(this.state.existResult) {
      return (
        <View style={styles.main_container}>
          {this._getSearchView()}
          <View style={styles.list_container}>
            <FlatList
              data={this.state.films}
              renderItem={({item}) =>
                <FilmItem film={item} displayDetailsForFilm={this._displayDetailsForFilm}/>
              }
              onEndReachedThreshold={0.8}
              onEndReached={() => {
                if(this.currentPage < this.totalPages) {
                  this._loadNextFilms();
                }
              }}
              keyExtractor={(item, index) => {item.id.toString()}}
            />
          </View>
        </View>
      );
    }
    else {
      //debugger;
      return (
        <View style={styles.main_container}>
          {this._getSearchView()}
          {this._displayLoadingView()}
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
    justifyContent: 'center',
    borderWidth: 3,
    borderColor:'red',
  },



})

export default Search;
