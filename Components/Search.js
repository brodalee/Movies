import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsWithSearch} from '../API/TMDBapi'
import { connect } from 'react-redux'
import FilmList from './FilmList'

class Search extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      films: [],
      isLoading: false
    }
    this.page = 0;
    this.totalPage = 0;
    this.text = '';
  }

  // arrow fx for binding
  displayDetails = (idFilm) => {
    this.props.navigation.navigate('FilmDetails', {idFilm: idFilm});
  }

  // arrow fx for binding
  loadFilms = () => {
    if(this.text.length > 0){
      this.setState({isLoading: true});
      getFilmsWithSearch(this.text, this.page+1).then(data => {
        this.page = data.page;
        this.totalPage = data.total_pages;
        this.setState({
          films: [...this.state.films, ...data.results],
          isLoading: false
        });
      });
    }
  }

  searchFilm(){
    this.page = 0;
    this.totalPage = 0;
    this.setState({
      films: []
    }, ()=>{
      this.loadFilms();
    });

  }

  searchOnChange(text) {
      this.text = text;
  }

  isFavorite(id){
    return this.props.favoritesFilm.findIndex(film => film.id === id) !== -1;
  }

  render(){
    return (
      <View>
        <TextInput onSubmitEditing={()=>this.searchFilm()} style={styles.textinput} placeholder="Titre du film" onChangeText={(text)=>this.searchOnChange(text)} />
        <Button style={styles.button} title="Recherche" onPress={() => {this.searchFilm()}} />
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

const styles = StyleSheet.create({
  textinput:{
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    paddingLeft: 20
  },
  button:{
    height:50
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm.favoritesFilm,
    viewFilms: state.viewFilms.viewFilms
  }
}

export default connect(mapStateToProps)(Search);
