import React from 'react'
import {Dimensions, Animated, View} from 'react-native'

class FadeIn extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      positonLeft: new Animated.Value(Dimensions.get('window').width)
    }
  }

  componentDidMount(){
    Animated.spring(
      this.state.positonLeft,
      {
        toValue: 0
      }
    ).start();
  }

  render(){
    return (
      <Animated.View style={{left: this.state.positonLeft}}>
         {this.props.children}
      </Animated.View>
    )
  }

}

export default FadeIn;
