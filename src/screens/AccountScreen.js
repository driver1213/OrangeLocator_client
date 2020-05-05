import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import { EvilIcons } from '@expo/vector-icons';


const AccountScreen = () => {
    const { signout } = useContext(AuthContext)

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            {/* <Text style={{ fontSize: 48 }}>Account Screen</Text>  */}
                <Button style={styles.container} title="Sign Out" onPress={signout} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 200
    },

})

AccountScreen.navigationOptions = {
    tabBarIcon: <EvilIcons name="gear" size={20} />
    }


export default AccountScreen