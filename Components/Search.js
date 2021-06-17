import React from "react"
import { StyleSheet, View, Button, TextInput, FlatList, Text, Image, ActivityIndicator, Keyboard } from "react-native"
import FilmItem from './FilmItem'
import EmptyResultView from './EmptyResultView'
import SearchHome from './SearchHome'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi.js'
import { getSeparator } from './ListSeparator';
import { connect } from "react-redux"

const VIEWS = { 'HOME': 1, "RESULTS": 2, "RESULT_NOT_FOUND": 3 };
Object.freeze(VIEWS);

class Search extends React.Component {

  constructor(props) {
      super(props);
      this.searchedText = "";
      this.currentPage = 0;
      this.totalPages = 0;
      this.state = {
        films: [],
        isLoading: false,
      };
    this.displayView = VIEWS.HOME;
  }

  _searchTextInputChanged(text) {
    console.log('_searchTextInputChanged = '+text);
    this.searchedText = text;
  }

  _searchFilms () {
    if (this.searchedText.length > 0) {
      Keyboard.dismiss();
      this.currentPage = 0;
      this.totalPages = 0;
      this.setState ({
        films: [],
        isLoading: true,
      }, () => {
        console.log('DANS _searchFilms et BEFORE _loadNextFilms');
        this._loadNextFilms();
        // setTimeout(()=>{
        //   console.log('setTimeout(5000)')
        //   this._loadNextFilms();
        // }, 1500);
        console.log('DANS _searchFilms et APRES _loadNextFilms');
      });
    }
  }

  _loadNextFilms() {
    console.log('DANS _loadNextFilms et BEFORE getFilmsFromApiWithSearchedText');
    getFilmsFromApiWithSearchedText(this.searchedText, this.currentPage+1).then(
      (data) => {
        console.log('data = ' + data.results.map((item) => item.id).join(' / '));
        this.currentPage = data.page;
        this.totalPages = data.total_pages;
        const films = [...this.state.films, ...data.results];
        const existResult = films.length == 0 ? false : true;
        if (existResult) {
          this.displayView = VIEWS.RESULTS;
        }
        else {
          this.displayView = VIEWS.RESULT_NOT_FOUND;
        }
        console.log('this.currentPage = ' + this.currentPage + '; this.totalPages=' + this.totalPages + '; existResult=' + existResult + '; films=' + films);
        this.setState({
          films : films,
          isLoading: false,
        });
      }
    ).catch((error)=> {
      console.log('Mon erreur dans _loadNextFilms= '+error)
      this.setState({ films: [], isLoading: false, });
    });;
  }

  _displayDetailsForFilm = (filmID) => {
    console.log('Display film with ID = ' + filmID);
    this.props.navigation.navigate("FilmDetail", { filmID: filmID })
  };

  _toggleFavorite = (film) => {
    // Définition de notre action ici
    const action = {
      type: 'TOOGLE_FAVORITE',
      value: film
    };
    //debugger
    this.props.dispatch(action);
  }

  _renderLoadingView() {
    console.log('_renderLoadingView');
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color="#999999"/>
        </View>
      )
    }
  }

  _renderSearchView() {
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

  _renderSearchHomeView = () => {
    return <SearchHome searchedText={this.searchedText}></SearchHome>
  }

  _renderEmptyResultView = () => {
    return <EmptyResultView searchedText={this.searchedText}></EmptyResultView>
  }

  _renderResultView = () => {
    return <View style={styles.list_container}>
      <FlatList
        style={styles.list_flat}
        data={this.state.films}
        renderItem={({ item }) =>
          <FilmItem
            film={item}
            isFavoriteFilm={this.props.favoritesFilms.findIndex(currentItem => currentItem.id === item.id) === -1 ? false : true}
            displayDetailsForFilm={this._displayDetailsForFilm}
            toggleFavorite={this._toggleFavorite}
          />
        }
        onEndReachedThreshold={0.8}
        onEndReached={() => {
          if (this.currentPage < this.totalPages) {
            this._loadNextFilms();
          }
        }}
        keyExtractor={(item, index) => { return item.id.toString() }}
        ItemSeparatorComponent={getSeparator}
        extraData={this.props.favoritesFilm}
      />
    </View>
  }

  render() {
    console.log('rendering state /// isLoading=' + this.state.isLoading + 'displayView=' + this.displayView);

    switch (this.displayView) {
      case VIEWS.HOME:
        return (
          <View style={styles.main_container}>
            {this._renderSearchView()}
            {this._renderSearchHomeView()}
            {this._renderLoadingView()}
          </View>
        );
        break;

      case VIEWS.RESULTS:
        return (
          <View style={styles.main_container}>
            {this._renderSearchView()}
            {this._renderResultView()}
            {this._renderLoadingView()}
          </View>
        );
        break;

      case VIEWS.RESULT_NOT_FOUND: {
        return (
          <View style={styles.main_container}>
            {this._renderSearchView()}
            {this._renderEmptyResultView()}
            {this._renderLoadingView()}
          </View>
        );
      }

      default:
        return <View></View>
    }
  }
}

const styles = StyleSheet.create ({
  main_container : {
    flex : 1,
    flexDirection : 'column',
    //padding : 5
  },

  list_container : {
    paddingHorizontal: 10,
  },

  list_flat: {
    paddingTop: 10,
  },

  search_container: {
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 1.0,
    elevation: 3,
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignContent : 'center',
    // marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
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
    top: 45,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#a9a9a9',
  },



})

function mapStateToProps(state) {
  return {
    favoritesFilms: state.favoritesFilms
  }
}

export default connect(mapStateToProps)(Search);
