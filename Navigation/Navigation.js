import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import { createAppContainer } from 'react-navigation';
import React from 'react'
import {Image, StyleSheet} from 'react-native'
import Search from '../Components/Search'
import FilmDetails from '../Components/FilmDetails'
import Favorites from '../Components/Favorites'
import ViewFilm from '../Components/ViewFilm'
import FilmVueList from '../Components/FilmVueList'
import NewFilms from '../Components/NewFilms'

const SearchStackNavigator = createStackNavigator({
    // View Search a film
    Search:{
      screen: Search,
      navigationOptions:{
        title: 'Rechercher'
      }
    },
    //View Details for a film
    FilmDetails:{
      screen: FilmDetails,
      navigationOptions:{
        title: 'Details'
      }
    },
    FilmVueList: {
      screen: FilmVueList,
      navigationOptions:{
        title: 'Mes films vues'
      }
    }
});

const TabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return (
          <Image style={style.fav} source={require('../images/search.png')} />
        )
      }
    }
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: "Mes Favoris",
      tabBarIcon: () => {
          return (
            <Image style={style.fav} source={require('../images/love.png')}/>
          )
      }
    }
  },
  View: {
    screen: ViewFilm,
    navigationOptions: {
      tabBarIcon: () => {
        return (
          <Image style={style.fav} source={require('../images/vue.png')} />
        )
      }
    }
  },
  NewFilms: {
    screen: NewFilms,
    navigationOptions: {
      tabBarIcon: () => {
        return (
          <Image style={style.fav} source={require('../images/new.png')} />
        )
      }
    }
  }
}, {
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true,

  },
  initialRouteName: 'Search'
})

const AppContainer = createAppContainer(TabNavigator);

const style = StyleSheet.create({
    fav: {
      width: 30,
      height: 30
    }
});

export default AppContainer;
