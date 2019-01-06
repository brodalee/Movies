import React from 'react'
import {Text, FlatList, View, StyleSheet} from 'react-native'
import FilmItem from './FilmItem'
import {connect} from 'react-redux'

class Favorites extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        films: []
      }
    }

    componentDidUpdate(){
      /*console.log('----------------------------------------------------');
      console.log(this.props.favoritesFilm);
      console.log('----------------------------------------------------');*/
    }

    isFavorite(id){
      return this.props.favoritesFilm.findIndex(film => film.id === id) !== -1;
    }

    // arrow fx for binding
    displayDetails = (idFilm) => {
      this.props.navigation.navigate('FilmDetails', {idFilm: idFilm});
    }

  render(){
    return (
        <View style={{marginTop: 25}}>
            <FlatList
              data={this.props.favoritesFilm}
              keyExtractor={ (item) => item.id.toString() }
              renderItem={ ({item}) => <FilmItem film={item}
                            displayDetails={this.displayDetails}
                            isFavorite={this.isFavorite(item.id)}/> }
                            />
        </View>
    )
  }

}

const style = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
