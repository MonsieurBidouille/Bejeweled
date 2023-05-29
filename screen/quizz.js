import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {connect} from "react-redux";
import WhiteButton from '../components/white_button';
import Radioquizz from '../components/radio';
import { RadioButton } from 'react-native-paper';


class Quizz extends React.Component{
    constructor(props){
        super(props);
        this.state={
            wquizz:"",
            score:0,
            question:"",
            r1:"",
            r2:"",
            r3:"",
            r4:"",
            correct:"",
            useranwser:1,
            quizzlength:0,
            currentquestion:0,
            checked:"first"
        }
}


componentDidMount(){
    
    fetch('http://jdevalik.fr/api/getquizz.php',{
        method:"POST",
        header:{
          "Content-Type":"multipart/form-data"},})
    .then((res) => res.json())
    .then((json =>{
      if(json != false){
        this.setState({wquizz:json});
        this.switchquestion();
      }})) 
}




postscore(score){
    const {crnt_usr} = this.props;
    const formdata = new FormData;
    formdata.append("name",crnt_usr);
    formdata.append("score", score);
    console.log(formdata);
    fetch('http://jdevalik.fr/api/postscore.php',{
      method: 'POST',
      body:formdata,
      headers:{
        "Content-Type":"multipart/form-data"}
    })
}

switchquestion(score){
    const {navigate} = this.props.navigation;
    this.setState({quizzlength:this.state.wquizz.length})
    if(this.state.wquizz.length > this.state.currentquestion){
        this.setState({question:this.state.wquizz[this.state.currentquestion].que_txt})
        this.setState({r1:this.state.wquizz[this.state.currentquestion].que_r1})
        this.setState({r2:this.state.wquizz[this.state.currentquestion].que_r2})
        this.setState({r3:this.state.wquizz[this.state.currentquestion].que_r3})
        this.setState({r4:this.state.wquizz[this.state.currentquestion].que_r4})
        this.setState({correct:this.state.wquizz[this.state.currentquestion].que_repons})
        this.setState({currentquestion:this.state.currentquestion+1})
    }else{
        this.postscore(score);
        navigate('score',scr = score,max = this.state.quizzlength);
    }
}

 validax(){

   if(this.state.checked === this.state.correct){
        this.setState({score:this.state.score+1});
        this.switchquestion(this.state.score+1)}
    else{
        this.switchquestion(this.state.score)}
}


onChangeChecked(newValue){
  this.setState({checked: newValue})
}

    render(){
        const {crnt_usr} = this.props;
        const {user_an} = this.props;
        return (
            <View style={styles.container}>
                      <Text style={{color:'blue',fontSize: 22 ,}}>Bienvenue {crnt_usr} ton score actuel est de {this.state.score} points</Text>
                      <View style={{height: 20}}/>
                      <Text>{this.state.question}</Text>
                      <View>
                        <RadioButton
                          value="first"
                          status={ this.state.checked === 1 ? 'checked' : 'unchecked' }
                          onPress={() => this.onChangeChecked(1)}
                        />
                        <Text>{this.state.r1}</Text>
                        <RadioButton
                          value="second"
                          status={ this.state.checked === 2 ? 'checked' : 'unchecked' }
                          onPress={() => this.onChangeChecked(2)}
                        />
                        <Text>{this.state.r2}</Text>
                        <RadioButton
                          value="third"
                          status={ this.state.checked === 3 ? 'checked' : 'unchecked' }
                          onPress={() => this.onChangeChecked(3)}
                        />
                        <Text>{this.state.r3}</Text>     
                        <RadioButton
                        value="fourth"
                        status={ this.state.checked === 4 ? 'checked' : 'unchecked' }
                        onPress={() => this.onChangeChecked(4)}
                      />
                      <Text>{this.state.r4}</Text>
                      </View>
                      <View style={{height: 20}}/>
                      <WhiteButton val="Valider" onPress={() => this.validax()}></WhiteButton>
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
export default connect(mapStateToProps)(Quizz);