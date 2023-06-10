import React from "react";
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
  } from 'react-native';

export default class WhiteButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {val} = this.props;
        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress} style={styles.button}><Text style={styles.buttonText}>{val}</Text></TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
button: {
    backgroundColor: '#11A602',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:10,
    width:200
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
