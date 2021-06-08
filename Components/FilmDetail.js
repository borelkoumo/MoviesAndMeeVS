import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator, ScrollView} from 'react-native';
import {getFilmDetailFromApi} from '../API/TMDBApi';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film : undefined,
      isLoading : true,
    }
  }

  componentDidMount () {
    console.log('componentDidMount');    
    getFilmDetailFromApi(this.props.route.params.filmID).then(data => {
      this.setState({
        film : data,
        isLoading : false,
      });
    });
  }

  _displayFilm () {
    const film = this.state.film;
    if(film != null) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Text>{film.title}</Text>
        </ScrollView>
      );
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
    console.log('render');
    //debugger;
    const filmID = this.props.route.params.filmID;
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this._displayLoadingView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex : 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 3,
    // borderColor:'red',
  },
  scrollview_container : {
    flex : 1,
  }
});

export default FilmDetail;
