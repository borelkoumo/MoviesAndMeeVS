import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class FavoritesFilms extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text>Films Favoris</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesFilms;