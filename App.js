import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';

export default function App() {
    return (
      <View style={styles.container} >
        <Navigation/>
      </View>
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
