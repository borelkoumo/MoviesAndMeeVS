import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './Navigation/Navigation';

export default function App() {
    return (
      <NavigationContainer style={styles.container} >
        <Navigation/>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'column',
    justifyContent: 'center',
    alignContent: 'flex-start',
    backgroundColor: '#ffffff',
  }
});
