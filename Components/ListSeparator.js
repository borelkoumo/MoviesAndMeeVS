import React from 'react';
import { View, StyleSheet } from 'react-native';

export function getSeparator() {
    return <View style={styles.separator} />
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: 'grey',
        marginLeft: 80,
        marginVertical: 20,
    },
})