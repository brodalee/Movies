import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import { getNewFilms } from '../API/TMDBapi'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import FilmItem from './FilmItem'

class NewFilms extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      films: [],
      isLoading: false
    }
    this.page = 0;
    this.totalPage = 0;
  }

  // arrow fx for binding
  displayDetails = (idFilm) => {
    this.props.navigation.navigate('FilmDetails', {idFilm: idFilm});

  }

  // arrow fx for binding
  loadFilms = () => {
    this.setState({isLoading: true});
    getNewFilms(this.page+1).then( data => {
      this.page = data.page;
      this.totalPage = data.total_pages;
      this.setState({
        films: [...this.state.films, ...data.results],
        isLoading: false
      });
    })
  }

  isFavorite(id){
    return this.props.favoritesFilm.findIndex(film => film.id === id) !== -1;
  }

  componentDidMount(){
    this.loadFilms();
  }

  render(){
    return (
      <View style={{marginTop: 25}}>
        {this.state.isLoading && <ActivityIndicator size="large"/>}

        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this.loadFilms}
          page={this.page}
          totalPages={this.totalPage}
          favoriteList={false}
        />

      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm.favoritesFilm,
    viewFilms: state.viewFilms.viewFilms
  }
}

export default connect(mapStateToProps)(NewFilms)
