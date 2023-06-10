import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  Alert,
  useEffect,
  ImageBackground,
  setInterval,
} from 'react-native';
import {connect} from "react-redux";
import WhiteButton from '../components/white_button';



class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state={
          name:""
        }
}


qstart(){
  if(this.state.name != ""){
  const {navigate} = this.props.navigation;
  navigate('game', {name: this.state.name});}
  else{
    Alert.alert("Erreur", "Veuillez entrer votre nom.")
  }
}


    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                  <ImageBackground source={require('../assets/Beerbackground.png')} resizeMode="cover" style={styles.image}>
                    <View style={styles.container2}>
                      <Text style={styles.title}>Beerjeweled</Text>
                      <View style={{height: 20}}/>
                      <TextInput style={styles.input} value={this.state.name} onChangeText={text=> this.setState({name:text})}  placeholder="Veuillez entrer votre nom" keyboardType="text"/>
                      <View style={{height: 20}}/>
                      <WhiteButton val="Commencer le jeu" onPress={() => this.qstart()}></WhiteButton>
                      <WhiteButton val="Leaderboard" onPress={() => navigate("Leaderboard")}></WhiteButton>
                      </View>
                      </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    boutoncli:{
      margin:10,
      height:40,
    },

    container:{
      flex: 1,
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

    container2:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    input:{
      backgroundColor:'rgba(22, 223, 198, 0.3)' ,
      padding:5
    },

    image: {
      flex: 1,
      justifyContent: 'center',
    },
  
  });

  const mapStateToProps = (state)=>{
    return state;}
export default connect(mapStateToProps)(Homepage);