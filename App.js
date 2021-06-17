import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux';
import FilmStore from './Store/configureStore'

export default function App() {
  return (
    <Provider store={FilmStore}>
      <NavigationContainer style={styles.container} >
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'flex-start',
    backgroundColor: '#ffffff',
  }
});
