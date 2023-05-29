import React, { Component } from 'react';
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


class Grille extends Component {
  render() {
    const { grille } = this.props;

    return (
      <View style={styles.container}>
        {grille.map((ligne, indexLigne) => (
          <View style={styles.row} key={indexLigne}>
            {ligne.map((valeur, indexColonne) => (
            <TouchableOpacity style={styles.touch}>
              <View style={styles.cell} key={indexColonne}>
                <Text style={styles.cellText}>{valeur}</Text>
              </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 18,
  },
  touch:{
    backgroundColor:"green"
  }
});

export default Grille;