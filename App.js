import { NavigationContainer } from '@react-navigation/native';
import Homepage from './screen/homepage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Store from './store/configStore';
import Game from './screen/game';
import Gameover from './screen/gameover';
import Leaderboard from './screen/leaderboard';
const stack = createNativeStackNavigator();



export default function App() {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Homepage" component = {Homepage}/>
        <stack.Screen name="game" component = {Game}/>
        <stack.Screen name="Gameover" component = {Gameover}/>
        <stack.Screen name="Leaderboard" component = {Leaderboard}/>
      </stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}




