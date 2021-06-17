import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "../Components/Search";
import FilmDetail from '../Components/FilmDetail';
import Home from '../Components/Home'
import FavoritesFilms from '../Components/FavoritesFilms'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SearchStackScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: 'Recherche' }}
        />
        <Stack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={{ title: 'Details du film' }}
        />
    </Stack.Navigator>
  );
}

function FavoritesFilmsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={FavoritesFilms}
        options={{ title: 'Favorites' }}
      />
    </Stack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
    </Stack.Navigator>
  );
}

function Navigation({ favoritesFilms }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused
                ? 'home'
                : 'home-outline';
              break;

            case 'Search':
              iconName = focused ? 'search-circle' : 'search-circle-outline';
              break;

            case 'FavoriteFilms':
              iconName = focused ? 'bookmarks' : 'bookmarks-outline';
              break;

            default:
              iconName = focused
                ? 'close-circle'
                : 'close-circle-outline';
              break;
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#ffd4cc',
        style: {
          height: 60,
        },
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Search" component={SearchStackScreen} options={{ title: 'Search' }} />
      <Tab.Screen name="FavoriteFilms" component={FavoritesFilmsStackScreen} options={{
        title: 'Favorite films',
        tabBarBadge: favoritesFilms.length
      }} />
    </Tab.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    favoritesFilms: state.favoritesFilms,
  }
}
export default connect(mapStateToProps)(Navigation);
