import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//redux stuff
import { connect } from 'react-redux'
import { updateLocation } from '../actions/locationActions'

// import { MonoText } from '../components/StyledText';

import MapView, { Polyline, Marker, Callout, AnimatedRegion } from 'react-native-maps';
// import React, { useEffect, useState } from 'react';
// import {safeAreaView} from 'react-navigation';
// import {Text } from 'react-native-elements';

import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import '../components/_mockLocations';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Modal from 'react-native-modal';


import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { redLinePoints, greenLinePoints, brownLinePoints, blueLinePoints, orangeLinePoints, darkblueLinePoints } from '../context/mapLines';
let mapStyle = require('../context/mapStyle.json');




class MapScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

      isModalVisible: false,
      loading: true
    }

  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };




  render() {


    // if (this.props.loading) {
    //   return (<View><Text>Data Loading</Text></View>)
    // }
    // else



    // console.log(this.props.data);

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



    let rawUpdatedCoordArray = this.props.newCoord.split(",");
    // console.log('raw', rawUpdatedCoordArray);

    let parsedCoord = [parseFloat(rawUpdatedCoordArray[1]), parseFloat(rawUpdatedCoordArray[0])];
    // console.log('parsed: ', parsedCoord);

    let newLatLngObj = { latitude: parsedCoord[0], longitude: parsedCoord[1] };
    // console.log(newLatLngObj);

    // let destLatLngObj = { latitude: this.props.destInfo.latitude, longitude: this.props.destInfo.longitude};
    // console.log(destLatLngObj);
    // console.log("destInfo-------------------from props")
    // console.log(JSON.stringify(this.props.destInfo));
    // console.log(this.props.destInfo);
    console.log(this.props.locationLog);





    let pointsToCoordArray = points => {
      let coordObj = {}
      let coordArray = []

      points.map(point => {
        coordObj = { latitude: point[1], longitude: point[0] }
        coordArray.push(coordObj)
      })

      return coordArray;
    }


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


            <Polyline coordinates={pointsToCoordArray(redLinePoints)}
              strokeColor={"red"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArray(greenLinePoints)}
              strokeColor={"green"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArray(brownLinePoints)}
              strokeColor={"darkorange"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArray(blueLinePoints)}
              strokeColor={"blue"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArray(orangeLinePoints)}
              strokeColor={"orange"}
              strokeWidth={5}
            />

            <Polyline coordinates={pointsToCoordArray(darkblueLinePoints)}
              strokeColor={"darkblue"}
              strokeWidth={5}
            />


            <Marker
              key={2}
              title={this.props.destInfo.name}
              coordinate={
                {
                  latitude: this.props.destInfo.latitude,
                  longitude: this.props.destInfo.longitude
                  // latitude: 29.7544285,
                  // longitude: -95.3748376

                }
              }
            >
              <Callout
                description={"What is it"}
             / >
            </Marker>

            <Marker

              key={1}
              pinColor={"navy"}
              coordinate={
                newLatLngObj
                // {
                //   latitude: 29.7544285,
                //   longitude: -95.3748376
                // }
              }
              title={"Your Last Location"}

            >
              {/* <Ionicons name={"ios-walk"} size={50} color={"navy"} /> */}
              <FontAwesome name={"wheelchair-alt"} size={50} color={"navy"} />

            </Marker>

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

const mapStateToProp = (state) => {
  return {
    data: state.locationReducer.data,
    newCoord: state.locationReducer.newCoord,
    destInfo: state.locationReducer.destInfo,
    loading: state.locationReducer.loading,
    locationLog:state.locationReducer.locationLog


  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLocation: (newCoord) => dispatch(updateLocation(newCoord))
  }
}
export default connect(mapStateToProp, mapDispatchToProps)(MapScreen)


{/* <MapScreen data=globalStateData updateLoacation={anonFunc} */ }