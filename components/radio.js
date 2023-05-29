import * as React from 'react';
import { View,Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

// les composants c'est Satan

const Radioquizz = (props) => {
  const [checked, setChecked] = React.useState('first');
  const {re1,re2,re3,re4} = props;



  return (
    <View>
      <RadioButton
        value="first"
        status={ props.checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => props.changeChecked('first')}
      />
      <Text>{re1}</Text>
      <RadioButton
        value="second"
        status={ props.checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => props.changeChecked('second')}
      />
      <Text>{re2}</Text>
      <RadioButton
        value="third"
        status={ props.checked === 'third' ? 'checked' : 'unchecked' }
        onPress={() => props.changeChecked('third')}
      />
      <Text>{re3}</Text>     
      <RadioButton
      value="fourth"
      status={ props.checked === 'fourth' ? 'checked' : 'unchecked' }
      onPress={() => props.changeChecked('fourth')}
    />
    <Text>{re4}</Text>
    </View>
  );
};


export default Radioquizz;