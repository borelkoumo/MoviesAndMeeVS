import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class SearchHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.main_container_empty}>
                <Image style={styles.image} source={require("../assets/search.png")} />
                <Text style={styles.title}> Films</Text>
                <Text style={styles.subtitle}>Recherchez des milliers de films dans TMDB</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container_empty: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    },

    image: {
        resizeMode: "cover",
        height: 100,
        width: 100,
        marginBottom: 50,
    },

    title: {
        fontSize: 40,
        fontWeight: "bold",
        // textAlign : "center",
    },

    subtitle: {
        fontSize: 15,
        // textAlign : "center",
    },
});

export default SearchHome;
