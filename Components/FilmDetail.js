import React from 'react';
import moment from 'moment'
import numeral from 'numeral';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import { connect } from 'react-redux';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film : undefined,
      isLoading : true,
    }
  }

  componentDidMount () {
    console.log('FilmDetail componentDidMount');
    getFilmDetailFromApi(this.props.route.params.filmID).then(data => {
      this.setState({
        film : data,
        isLoading : false,
      });
    });
  }

  componentDidUpdate() {
    console.log('FilmDetail componentDidUpdate');
  }

  _displayFilm() {
    const film = this.state.film;
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path, 'w500') }}
          />
          <View style={styles.infos_films}>
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity style={styles.actions} onPress={() => { this._toggleFavorite() }}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
            {/* <Button title='Favoris' onPress={() => this._toggleFavorite()}></Button> */}
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function (genre) {
            return genre.name;
          }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function (company) {
            return company.name;
          }).join(" / ")}
            </Text>
          </View>
        </ScrollView>
      )
    }
    else {

    }
  }

  _toggleFavorite() {
    // D??finition de notre action ici
    const action = {
      type: 'TOOGLE_FAVORITE',
      value: this.state.film
    };
    // console.log(this.state.film);
    this.props.dispatch(action);
  }

  _displayFavoriteImage() {
    const favoritesFilms = this.props.favoritesFilms;
    const currentFilm = this.state.film;
    // debugger
    const index = favoritesFilms.findIndex((item) => item.id === currentFilm.id);
    if (index !== -1) {
      return (
        <Image style={styles.image_favorite}
          source={require('../assets/ic_favorite.png')} />
      )
    }
    else {
      return (
        <Image style={styles.image_favorite}
          source={require('../assets/ic_favorite_border.png')} />
      )
    }
  }

  _displayLoadingView() {
    console.log('_displayLoadingView dans FilmDetail');
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color="#999999"/>
        </View>
      )
    }
  }

  render() {
    console.log('rendering FIlmDetail /// isLoading=' + this.state.isLoading + ' film=' + this.state.film);
    return (
      <View style={styles.main_container}>
        {this._displayLoadingView()}
        {this._displayFilm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview_container: {
    flex: 1,
  },
  infos_films: {
    padding: 10,
  },
  image: {
    height: 300,
    margin: 5,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  image_favorite: {
    width: 30,
    height: 30,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15,
    textAlign: 'justify',
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
});


function mapStateToProps(state) {
  return {
    favoritesFilms: state.favoritesFilms
  };
}
export default connect(mapStateToProps)(FilmDetail);
