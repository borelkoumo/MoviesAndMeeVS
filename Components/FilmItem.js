import React from "react"
import {StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import {getImageFromApi} from '../API/TMDBApi.js'

class FilmItem extends React.Component {

  render() {
    // debugger;
    const {film, displayDetailFromFilm} = this.props;
    let releaseDate;
    const imageUri = getImageFromApi(film.poster_path);

    if (film.release_date != "") {
      let d = new Date(film.release_date);
      releaseDate = d.getDate() + " / "+ d.getMonth() + " / "+d.getFullYear();
    }
    else {
       releaseDate = "Indisponible"
    }
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={displayDetailFromFilm(film.id)}>
        <View style={styles.view_image}>
          <Image style={styles.image} source={{uri : imageUri}} />
        </View>

        <View style={styles.view_details}>
          <View style={styles.view_details_header}>
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
    height : 190, // j'ai défini les tailles de mes containersheader_container ,  description_container  et   date_container avec le style flex ( flex: 3  ,  flex: 7  ,  flex: 1 ), donc avec des tailles dynamiques. Cela n'a pas vraiment d'intérêt, puisque la taille de mes items FilmItem est statique, elle ne change pas en fonction de l'écran :  height: 190. Mais, au moins, cela vous donne une idée du champ des possibilités.
    marginBottom : 20,
  },

  view_image : {
    marginRight : 10,
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
