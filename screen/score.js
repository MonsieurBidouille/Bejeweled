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
import { DataTable } from 'react-native-paper';
import {connect} from "react-redux";
import WhiteButton from '../components/white_button';



export default class Score extends React.Component{
    constructor(props){
        super(props);
        this.state={
          name:"",
          score:[],
          n1:"",
          s1:"",
          n2:"",
          s2:"",
          n3:"",
          s3:"",
          n4:"",
          s4:""
        }
}

componentDidMount(){
    
    fetch('http://jdevalik.fr/api/getscore.php',{
        method:"POST",
        header:{
          "Content-Type":"multipart/form-data"},})
    .then((res) => res.json())
    .then((json =>{
      if(json != false){
        this.setState({score:json});
        this.setState({n1:json[0].sc_name})
        this.setState({n2:json[1].sc_name})
        this.setState({n3:json[2].sc_name})
        this.setState({n4:json[3].sc_name})
        this.setState({s1:json[0].sc_score})
        this.setState({s2:json[1].sc_score})
        this.setState({s3:json[2].sc_score})
        this.setState({s4:json[3].sc_score})
      }})) 
}

    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                      <Text style={{color:'blue',fontSize: 22 ,}}>Votre score est de {scr}/{max}</Text>
                      <View style={{height: 20}}/>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Nom</DataTable.Title>
                                <DataTable.Title>Score</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell>{this.state.n1}</DataTable.Cell>
                                <DataTable.Cell>{this.state.s1}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>{this.state.n2}</DataTable.Cell>
                                <DataTable.Cell>{this.state.s2}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>{this.state.n3}</DataTable.Cell>
                                <DataTable.Cell>{this.state.s3}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>{this.state.n4}</DataTable.Cell>
                                <DataTable.Cell>{this.state.s4}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                      <View style={{height: 20}}/>
                      <WhiteButton val="Recommencer le quizz" onPress={() => navigate('Homepage')}></WhiteButton>
                      
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

