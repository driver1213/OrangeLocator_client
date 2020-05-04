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

import { redLinePoints, greenLinePoints, brownLinePoints, blueLinePoints, orangeLinePoints, darkblueLinePoints } from '../context/mapLines';
let mapStyle = require('../context/mapStyle.json');




class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      loading: true,

      region: {
        latitude: 29.756295,
        longitude: -95.362869,
        latitudeDelta: 0.00412,
        longitudeDelta: 0.0121,
      },

      currentLocationObj: {

      },

      destObj: {},

      isModalVisible: false,

      data: {},


    }
  }




  componentWillMount() {
 
  }




  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };




  render() {

    if (this.state.loading) {
      return (<View><Text>Data Loading</Text></View>)
    }
    else
      // console.log(this.state.data);

      // const [err, setErr] = useState(null);

      // const startWatching = async () => {
      //   try {
      //     await requestPermissionsAsync();
      //     await watchPositionAsync({
      //       accuracy: Accuracy.BestForNavigation,
      //       timeInterval: 1000,
      //       distanceInterval: 10
      //     }, (location) => {
      //       console.log(location);

      //     })
      //   } catch (e) {
      //     setErr(e);
      //   }
      // }

      // useEffect(() => {
      //   startWatching();
      // }, []
      // );



      ////////////////////////////////



      /////////////////
      // console.log("+++++++++++++++++++++++++++++++", this.state.data[0].latitude)


      // const updatedLocationObj = this.state.data[0];


      console.log("currentMarker=========================", this.state.currentLocationObj);
    console.log(this.state.currentLocationObj.latitude);
    // console.log(this.state.scanText);




    pointsToCoordArry = points => {
      let coordObj = {}
      let coordArray = []

      points.map(point => {
        coordObj = { latitude: point[1], longitude: point[0] }
        coordArray.push(coordObj)
      })
      // console.log(coordArray);

      return coordArray;
    }

    pointsToCoordArry(redLinePoints);

    return (

      <View>

        <View>

        </View>

        <View>

          <MapView style={styles.map}

            customMapStyle={mapStyle}

            initialRegion={{
              latitude: 29.758611,
              longitude: -95.366792,
              latitudeDelta: 0.003812,
              longitudeDelta: 0.00521,

            }}

            showsUserLocation={true}
            showsIndoors={true}
            showsIndoorLevelPicker={true}
            // cacheEnabled={true}
            toolbarEnabled={true}
          // animateCamera 

          >


            <Polyline coordinates={pointsToCoordArry(redLinePoints)}
              strokeColor={"red"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArry(greenLinePoints)}
              strokeColor={"green"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArry(brownLinePoints)}
              strokeColor={"darkorange"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArry(blueLinePoints)}
              strokeColor={"blue"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArry(orangeLinePoints)}
              strokeColor={"orange"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArry(darkblueLinePoints)}
              strokeColor={"darkblue"}
              strokeWidth={5}
            />


            {/* <MapView.Marker


            /> */}

            <Marker await

              key={this.state.currentLocationObj._id}
              coordinate={{
                latitude: this.state.data[2].latitude,
                longitude: this.state.data[2].longitude
                // latitude: 29.7544285,
                // longitude: -95.3748376
              }}


              title={this.state.currentLocationObj.name}

            />

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
