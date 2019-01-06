import React from 'react'
import {View, Text, StyleSheet,
   ActivityIndicator, ScrollView,
  Image, Button, TouchableOpacity} from 'react-native'
import {getFilmDetails, getImage} from '../API/TMDBapi'
import { connect } from 'react-redux'

class FilmDetails extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        isLoading: false,
        film: undefined,
        viewFilms: undefined
      };
      this.buttonText = 'Ajouter aux films vues'
    }

    toggleFavorite(){
      const action = {
        type: 'TOGGLE_FAVORITE',
        value: this.state.film
      };
      this.props.dispatch(action)
    }

    displayTextViewFilm(){
      let text = 'Ajouter aux films vues';
      // A COMPLETER
      if(this.props.viewFilms.findIndex( item => item.id === this.state.favoritesFilm.id) !== -1){
        text = 'Retirer des films vues';
      }
      this.buttonText = text;
    }

    toggleView(){
      const action = {
        type: 'TOGGLE_VIEW',
        value: this.state.film
      };
      this.props.dispatch(action);
      console.log('VIEWED FILMS : ',this.props.viewFilms);
    }

    displayFavoriteImage(){
      let source = require('../images/dontlove.png');
      if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
        //Le film fait déjà partie des favoris
        source = require('../images/love.png');
      }
      return (
        <Image style={{width: 40, height: 40}} source={source} />
      )
    }

    display(){
      let film = this.state.film;
      if(film !== undefined){
        return (<ScrollView style={{flex: 1}}>
                  <Image
                    style={style.image}
                    source={{uri: getImage(film.backdrop_path)}}
                    />
                    <Text style={style.title}>{film.title}</Text>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={ () => this.toggleFavorite() }>
                        {this.displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={style.desc}>{film.overview}</Text>
                    <Text style={[style.date, style.infos]}>Sortie le {film.release_date}</Text>
                    <Text style={style.infos}>Note : {film.vote_average}</Text>
                    <Text style={style.infos}>Genre(s) : {film.genres.map((genre) => { return genre.name } ).join(' / ')}</Text>
                    <Text style={[style.comp, style.infos]}>Companie(s) : {film.production_companies.map((comp) => {return comp.name} ).join(' / ')}</Text>
                    <Button title={this.buttonText} onPress={ () => this.toggleView()} />
                </ScrollView>)
      }
    }

    componentDidMount() {
      let goodFav = true;
      let goodView = true;
      const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
      if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
        // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
        this.setState({
          film: this.props.favoritesFilm[favoriteFilmIndex]
        })
        goodFav = false;
      }

      const vfindex = this.props.viewFilms.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
      if(vfindex !== -1){
        this.setState({ viewFilms: this.props.favoritesFilm[favoriteFilmIndex] })
        goodView = false;
      }

      if(goodFav){
      // Le film n'est pas dans nos favoris, on n'a pas son détail
      // On appelle l'API pour récupérer son détail
      this.setState({ isLoading: true })
      getFilmDetails(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false,
          viewFilms: goodView ? data : this.state.viewFilms
        })
      })
    }
  }

    loadFilmDetails(){
        getFilmDetails(this.props.navigation.state.params.idFilm)
          .then(data => {
            this.setState({
              film: data,
              isLoading: false
            })
          });
    }

  render(){
    return (
      <View style={style.container}>
          {this.display()}
          {this.state.isLoading && <ActivityIndicator size="large"/>}
      </View>
    )
  }
}

const style = StyleSheet.create({
    container:{
      flex: 1
    },
    image:{
      height: 169,
      margin: 5
    },
    title:{
      textAlign: 'center',
      fontSize: 40
    },
    desc:{
      marginLeft: 10,
      marginRight: 10
    },
    date:{
      marginTop: 10
    },
    infos:{
      marginLeft: 10
    },
    comp:{
      marginBottom: 30
    }
});

const mapStateToProps = (state)=> {
  return {
    favoritesFilm: state.favoritesFilm.favoritesFilm,
    viewFilms: state.viewFilms.viewFilms
  }
}

export default connect(mapStateToProps)(FilmDetails)
