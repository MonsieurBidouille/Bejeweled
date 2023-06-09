import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  ImageBackground,
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



export default class Leaderboard extends React.Component{
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
          s4:"",
          n5:"",
          s5:""
        }
}

componentDidMount(){
    
    fetch('http://jdevalik.fr/api/bejgetscore.php',{
        method:"POST",
        header:{
          "Content-Type":"multipart/form-data"},})
    .then((res) => res.json())
    .then((json =>{
      if(json != false){
        this.setState({score:json});
        this.setState({n1:json[0].name})
        this.setState({n2:json[1].name})
        this.setState({n3:json[2].name})
        this.setState({n4:json[3].name})
        this.setState({n5:json[4].name})
        this.setState({s1:json[0].score})
        this.setState({s2:json[1].score})
        this.setState({s3:json[2].score})
        this.setState({s4:json[3].score})
        this.setState({s5:json[4].score})
      }})) 
}

    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>    
              <ImageBackground source={require('../assets/leaderboardbg.jpg')} resizeMode="cover" style={styles.image}>  
              <View style={styles.container2}>   
              <Text style={styles.title}>Leaderboard</Text>
                        <DataTable style={styles.table}>
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
                            <DataTable.Row>
                                <DataTable.Cell>{this.state.n5}</DataTable.Cell>
                                <DataTable.Cell>{this.state.s5}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                      <View style={{height: 20}}/>
                      <WhiteButton val="Revenir a l'accueil" onPress={() => navigate('Homepage')}></WhiteButton>
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
      flex: 1
    },

    container2:{
      flex: 1,
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

    image: {
      flex: 1,
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

    table:{
      backgroundColor:'rgba(200, 159, 198, 0.5)' ,
    }
  
  });
