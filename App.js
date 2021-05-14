import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './Components/Search.js';

export default function App() {
    return (
      <View style={styles.container}>
        <Search/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection (axe d'alignement des vues) et alignContent (alignement des enfants de la vue) sont deux paires qui marchent toujours ensemble
    flex: 1,
    flexDirection : 'column', //flexDirection (axe d'alignement des vues). flexDirection controls which directions children of a container go.
    justifyContent: 'flex-start', // Le style  justifyContent  permet de définir comment sont distribués vos components enfants sur l'axe principal. Première chose, l'axe principal dépend de l'alignement choisi avec le style  flexDirection. It defines the alignment along the main axis. It helps distribute extra free space leftover when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size.
    alignContent: 'flex-start', // alignContent (alignement des enfants de la vue par rapport àà leur parent). alignContent controls how rows align in the cross direction, overriding the alignContent of the parent.
    alignItems : 'center', // Le style  alignItems  est comme  justifyContent, sauf qu'il s'applique sur l'axe secondaire.
    marginTop : 50,
    borderColor: 'red',
    borderWidth:2,
    backgroundColor: '#ffffff',
  },
});
