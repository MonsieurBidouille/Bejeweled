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
  const {navigate} = this.props.navigation;
  const action2 = {type:"crnt_user",value:this.state.name};
  this.props.dispatch(action2);
  navigate('quizz');
}





    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                      <Text style={{color:'blue',fontSize: 22 ,}}>Le Quizz</Text>
                      <View style={{height: 20}}/>
                      <TextInput style={styles.input} value={this.state.name} onChangeText={text=> this.setState({name:text})}  placeholder="Veuillez entrer votre nom" keyboardType="text"/>
                      <View style={{height: 20}}/>
                      <WhiteButton val="Commencer le quizz" onPress={() => this.qstart()}></WhiteButton>
                      
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
      backgroundColor: 'lightGreen',
      alignItems: 'center',
      justifyContent: 'center',
    },

    tinyLogo: {
      position:'absolute',
      top:0,
      left:0,
      width: 50,
      height: 50,
    },
  
  });

  const mapStateToProps = (state)=>{
    return state;}
export default connect(mapStateToProps)(Homepage);