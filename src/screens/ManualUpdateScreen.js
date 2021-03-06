// import * as React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { updateLocation } from '../actions/locationActions'
import { connect } from 'react-redux';
import { Notifications } from 'expo';




const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const ScanCode = ({ navigation, updateLocationInComponent }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    

    if (data.includes(",") && data.includes("-")) {

      updateLocationInComponent(data);
      console.log("directily from scan:", data);
      console.log('type of data', String(data).type);

      Alert.alert(
        'Here you go!',
        'You current locations is updated!',
        [

          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              setScanned(false);
              navigation.navigate('Map');
            }
          }
        ]
      );
    }
    else { alert(`You've just scanned "${data}". Please find the right barcode to scan!`) };

    //////////////////////////////////////////////////////////////


  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Text style={styles.description}>Scan QR Code</Text>

        <Ionicons name="ios-qr-scanner" size={350} color="white" />

        <Text onPress={() => navigation.navigate('Map')} style={styles.cancel}>
          Cancel
            </Text>

      </BarCodeScanner>


      {scanned && (
        <Button title="Tap to Scan Again" color="orange" onPress={() => setScanned(false)} />
      )}


    </View>
  );
}


ScanCode.navigationOptions = {
  tabBarIcon: <Ionicons name="ios-qr-scanner" size={20} />
}

const mapDispatchToProps = (dispatch) => {
  console.log("scan updating to redux");
  return {
    updateLocationInComponent: (newCoord) => dispatch(updateLocation(newCoord))
  }
}
export default connect(null, mapDispatchToProps)(ScanCode)


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  description: {
    fontSize: width * 0.1,
    fontFamily: "Nunito-Bold",
    fontWeight: "bold",
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.07,
    textAlign: 'center',
    fontFamily: "Nunito-Regular",
    width: '70%',
    color: 'white',
  },
});

