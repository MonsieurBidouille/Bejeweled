import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import WhiteButton from '../components/white_button';


export default class Gameover extends React.Component{
    constructor(props){
        super(props);
        this.state={
          name:"",
          score:""
        }
}

componentDidMount() {
    
    this.setState({name:this.props.route.params.name});
    this.setState({score:this.props.route.params.score});
}


render(){
  const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Game Over</Text>
            <Text style={styles.display}>Félicitation {this.state.name}</Text>
            <Text  style={styles.display}>Vous avez obtenus {this.state.score} points</Text>
            <WhiteButton val="Retour" onPress={() => navigate("Homepage")}></WhiteButton>
        </View>
    )}

}


const styles = StyleSheet.create({

    boutoncli:{
      margin:10,
      height:40,
    },

    container:{
      flex: 1,
      backgroundColor: 'lightGreen',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title:{
      fontSize: 42,
      fontWeight: 'bold',
      color: '#071B68',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginBottom: 10,
    },
  });




