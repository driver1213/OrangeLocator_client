import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import * as Network from 'expo-network';
import { MaterialCommunityIcons } from '@expo/vector-icons';



class WifiToLocation extends Component {
  render() {
    return (
      <>
        
      </>
    )
  }
}

export default WifiToLocation


///examples:
await Network.getMacAddressAsync();
// "E5:12:D8:E5:69:97"

await Network.getNetworkStateAsync();
// {
//   type: NetworkStateType.CELLULAR,
//   isConnected: true,
//   isInternetReachable: true,
// }

///  https://docs.expo.io/versions/latest/sdk/network/#networkgetmacaddressasyncinterfacename
/// https://reactnativemaster.com/react-native-netinfo-example/

NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    console.log('Wifi Strength'), state.strength
  });