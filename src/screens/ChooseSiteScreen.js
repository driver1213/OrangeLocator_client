import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import NavLink from '../components/NavLink'


const ChooseSiteScreen = () => {

        return (
            <View style={styles.container} >
            <Text style={{ fontSize: 48 }}>Choose Site Screen</Text> 
            <NavLink
            routeName="SearchResults"
            text="Go to Search Results"
            />
            <NavLink
            routeName="ManualUpdate"
            text="Go to Update Screen"
            />
            </View>
            )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 150
    },

})
export default ChooseSiteScreen
