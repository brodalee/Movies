import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import FilmVueList from './FilmVueList'
import FadeIn from '../Animations/FadeIn'

class ViewFilm extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <FadeIn>
        <View style={{marginTop: 25}} >
        <FilmVueList
            films={this.props.viewFilms}
            navigation={this.props.navigation}
            loadFilms={this.loadFilms}
            page={this.page}
            totalPages={this.totalPage}
            favoriteList={false}
        />
        </View>
      </FadeIn>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      viewFilms: state.viewFilms.viewFilms
    }
}

export default connect(mapStateToProps)(ViewFilm)
