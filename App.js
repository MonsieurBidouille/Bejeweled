import { NavigationContainer } from '@react-navigation/native';
import Homepage from './screen/homepage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Store from './store/configStore';
import Quizz from './screen/quizz';
import Score from './screen/score';
import Game from './screen/game';
const stack = createNativeStackNavigator();



export default function App() {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="game" component = {Game}/>
        <stack.Screen name="Homepage" component = {Homepage}/>
        <stack.Screen name="quizz" component = {Quizz}/>
        <stack.Screen name="score" component = {Score}/>
      </stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}




