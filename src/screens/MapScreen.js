import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// import { MonoText } from '../components/StyledText';

import MapView, { Polyline, Marker, Callout } from 'react-native-maps';
// import React, { useEffect, useState } from 'react';
// import {safeAreaView} from 'react-navigation';
// import {Text } from 'react-native-elements';

import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import '../components/_mockLocations';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Modal from 'react-native-modal';


import { Ionicons } from '@expo/vector-icons';

class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 29.756295,
        longitude: -95.362869,
        latitudeDelta: 0.00412,
        longitudeDelta: 0.0121,
      },

      markers: [{
        key: 1,
        title: 'Hello Start',
        coordinates: {
          latitude: 29.75695,
          longitude: -95.365869
        },
      },
      {
        key: 2,
        title: 'end',
        coordinates: {
          latitude: 29.756290,
          longitude: -95.362874
        },
      }
      ],

      isModalVisible: false,

    }
  }


  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {

    // const [err, setErr] = useState(null);

    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        }, (location) => {
          console.log(location);

        })
      } catch (e) {
        setErr(e);
      }

    }





    // useEffect(() => {
    //   startWatching();
    // }, []
    // );



    let points = [];
    for (let i = 0; i < 20; i++) {
      if (i % 2 === 0) {
        points.push({
          latitude: 29.756295 + i * 0.00001,
          longitude: -95.362869 + i * 0.0001
        });
      } else {
        points.push({

          latitude: 29.756295 - i * 0.00001,
          longitude: -95.362869 + i * 0.0001
        });
      }

    }



    return (

      <View>
        {/* 
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <Text>This is Map Page</Text>
        </View> */}
        <View>

        </View>



        <View>




          <MapView style={styles.map}


            initialRegion={{
              latitude: 29.756295,
              longitude: -95.362869,
              latitudeDelta: 0.00412,
              longitudeDelta: 0.0121,
            }}

            showsUserLocation={true}
            showsIndoors={true}
            showsIndoorLevelPicker={true}
            cacheEnabled={true}

          >

            <Polyline coordinates={points}
              strokeColo={"orange"}
              strokeWidth={5}

            />

            {this.state.markers.map(marker => (
              <MapView.Marker
                key={marker.key}
                // style={slected cate}
                coordinate={marker.coordinates}
                title={marker.title}
              />
            ))}

          </MapView>
          {/* {err ? <Text> Please enable location services </Text>: null} */}


        </View>

        <View style={styles.bubble1}>
          <TouchableOpacity

            onPress={this.toggleModal}
          >
            <Text style={styles.scanText}>New Destination</Text>
          </TouchableOpacity>

          <Modal isVisible={this.state.isModalVisible}>
          
            <View style={{ flex: 1 }}>
              <Text>Hello!</Text>
              <TouchableOpacity style={styles.modalButton} onPress={this.toggleModal}>
              <Text style={styles.scanText}> Search </Text>

              </TouchableOpacity>
            </View>
          </Modal>
        </View>



        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bubble}
            onPress={() => this.props.navigation.navigate("ManualUpdate")}
          >
            <Text style={styles.scanText}>
              [ + ] Update Location
            </Text>

          </TouchableOpacity>

        </View>

      </View>
    )
  }

}






const styles = StyleSheet.create({

  modalButton: {

    flex: 1,
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    elevation: 5,
    position: 'absolute',
    top: "5%",
    right: 0,
    
  },

  bubble1: {
    flex: 1,
    backgroundColor: 'brown',
    opacity: 0.9,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    elevation: 5,
    position: 'absolute',
    top: "5%",
    right: 0,
    zIndex: 4,
  },

  buttonContainer: {
    flex: 1,
    position: 'absolute',
    top: "90%",
    right: 0,
    zIndex: 10,

  },


  bubble: {
    flex: 1,
    backgroundColor: 'rgb(0,139,139)',
    opacity: 0.9,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    elevation: 5,
    zIndex: 4,
  },


  map: {
    // flex:1,
    height: "100%",
    zIndex: -1,
  },


  scanText: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    margin: 4,
  }

});


export default MapScreen
