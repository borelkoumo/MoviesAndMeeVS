import React from "react"
import {StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import {getImageFromApi} from '../API/TMDBApi.js'

class FilmItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _displayFavoriteImage(isFavoriteFilm) {
    if (isFavoriteFilm) {
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

  render() {
    const { film, isFavoriteFilm, displayDetailsForFilm, toggleFavorite} = this.props;
    //debugger;
    let releaseDate = "Indisponible";
    if (film.release_date != "") {
      let d = new Date(film.release_date);
      releaseDate = d.getDate() + " / "+ d.getMonth() + " / "+d.getFullYear();
    }

    const filmID = film.id;

    return (
      <TouchableOpacity style={styles.main_container} onPress={() => displayDetailsForFilm(filmID)}>
        <View style={styles.view_image}>
          <Image style={styles.image} source={{uri : getImageFromApi(film.poster_path)}} />
        </View>

        <View style={styles.view_details}>
          <View style={styles.view_details_header}>
            <TouchableOpacity style={styles.favorite_film} onPress={() => { toggleFavorite(film) }}>
              {this._displayFavoriteImage(isFavoriteFilm)}
            </TouchableOpacity>
            <Text style={styles.title}> {film.title}</Text>
            <Text style={styles.vote}> {film.vote_average}</Text>
          </View>

          <View style={styles.view_details_description}>
            <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
          </View>

          <View style={styles.view_details_release_date}>
            <Text style={styles.release_date}>
              <Text style={styles.release_date_inner}>Date de Sortie : </Text>
              {releaseDate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  main_container : {
    flexDirection : "row",
    height : 190, // j'ai d??fini les tailles de mes containersheader_container ,  description_container  et   date_container avec le style flex ( flex: 3  ,  flex: 7  ,  flex: 1 ), donc avec des tailles dynamiques. Cela n'a pas vraiment d'int??r??t, puisque la taille de mes items FilmItem est statique, elle ne change pas en fonction de l'??cran :  height: 190. Mais, au moins, cela vous donne une id??e du champ des possibilit??s.
  },

  view_image : {
    marginRight : 5,
  },

  view_details : {
    flex : 1,
    flexDirection : "column",
    justifyContent : "space-between",
  },

  view_details_header : {
    flex : 3,
    flexDirection : "row",
    justifyContent : "space-between",
  },

  view_details_description : {
    flex : 7,
  },

  view_details_release_date : {
    flex : 1,
  },

  image : {
    resizeMode : "cover",
    height : 190,
    width : 120,
    backgroundColor : "grey",
  },

  favorite_film: {
    marginRight : 10,
  },

  image_favorite: {
    width: 25,
    height: 25,
  },

  title : {
    flex : 1,
    fontSize : 20,
    fontWeight : "bold",
    flexWrap : "wrap",
  },

  vote : {
    fontStyle : "italic",
    fontSize : 20,
    color: '#666666',
  },

  description : {
    textAlign : "justify",
  },

  release_date : {
    fontSize : 12,
  },

  release_date_inner : {
    fontStyle : "italic",
  },
});

export default FilmItem;
