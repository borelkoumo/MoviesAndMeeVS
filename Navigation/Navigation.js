import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';

function buildNavigation(){
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name='Search' component={Search} options={{title : 'Recherche'}}/>
      <Stack.Screen name='FilmDetail' component={FilmDetail} options={{title : 'Details du film'}}/>
    </Stack.Navigator>
  );
}

export default buildNavigation;
