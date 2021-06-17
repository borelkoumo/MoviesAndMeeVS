import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text>TMDB Api App Home</Text>
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

export default Home;