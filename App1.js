
import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';



state = {
  data: [],
  loading: true,
  selectDest: {},
};

axios.get("http://192.168.31.43:3000/stores")
  .then(res => {
    console.log(res);
    this.setState({
      data: res.data,
      loading: false
    })
  })


// A very simple reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;

    case 'DECREMENT':
      console.log("decress by 5 and axio")
      console.log(state);
      return state - 5;

    // case 'SELECT_1ST_LOCATION':



    default:
      return state;
  }
}



// A very simple store
let store = createStore(combineReducers({ count: counter }));

// A screen!
function Counter({ count, dispatch, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{count}</Text>
      <Button
        title="Select 1st Location"
        onPress={() => dispatch({ type:  'SELECT_1ST_LOCATION' })}
      />
      <Button
        title="Increment"
        onPress={() => dispatch({ type: 'INCREMENT' })}
      />
      <Button
        title="Decrement"
        onPress={() => dispatch({ type: 'DECREMENT' })}
      />

      <Button
        title="Go to static count screen"
        onPress={() =>
          navigation.navigate('StaticCounter', {
            count,
          })
        }
      />
    </View>
  );
}

// Another screen!
function StaticCounter({ route }) {
  console.log(route.params)
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{route.params.count}</Text>
    </View>
  );
}

// Connect the screens to Redux
let CounterContainer = connect(state => ({ count: state.count }))(Counter);

// Create our stack navigator
let RootStack = createStackNavigator();

// Render the app container component with the provider around it
export default function App() {
  // if (state.loading) {
  //   return (<View><Text>Data Loading</Text></View>)
  // }
  // else
  //   console.log(state.data);

  return (

    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Counter" component={CounterContainer} />
          <RootStack.Screen
            name="StaticCounter"
            component={StaticCounter}
            options={({ route }) => ({ title: route.params.count })}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// //////////////////////////////////////////////////////////////////

// import {
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   View,
//   Text,
// } from 'react-native';
// import Constants from 'expo-constants';
// import React, { Component } from 'react';

// // const DATA = [
// //   {
// //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
// //     title: 'First Item',
// //   },
// //   {
// //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
// //     title: 'Second Item',
// //   },
// //   {
// //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
// //     title: 'Third Item',
// //   },
// // ];

// // const DATA = require("./data.json");

// // const DATA = require('./data.json')

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       loading: true,
//     };
//   }

//   componentWillMount() {
//     fetch('http://192.168.31.43:3000/stores')
//       .then(results => results.json())
//       .then(data => {
//         this.setState({
//           data: data.data,
//           loading: false,
//         });
//       });
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <View>
//           <Text>Data Loading</Text>
//         </View>
//       );
//     } else console.log(this.data);

//     const DATA = this.data;

//     function Item({ id, title, selected, onSelect }) {
//       return (
//         <TouchableOpacity
//           onPress={() => onSelect(id)}
//           style={[
//             styles.item,
//             { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
//           ]}>
//           <Text style={styles.title}>{title}</Text>
//         </TouchableOpacity>
//       );
//     }

//     const [selected, setSelected] = React.useState(new Map());

//     const onSelect = React.useCallback(
//       id => {
//         const newSelected = new Map(selected);
//         newSelected.set(id, !selected.get(id));
//         setSelected(newSelected);
//       },
//       [selected]
//     );
//     return (
//       <SafeAreaView style={styles.container}>
//         <FlatList
//           data={DATA}
//           renderItem={({ item }) => (
//             <Item
//               id={item._id}
//               title={item.name}
//               selected={!!selected.get(item._id)}
//               onSelect={onSelect}
//             />
//           )}
//           keyExtractor={item => item._id}
//           extraData={selected}
//         />

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.bubble}
//             onPress={() => this.props.navigation.navigate('ManualUpdate')}>
//             <Text style={styles.scanText}>[ + ] Update Location</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   item: {

//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },

//   buttonContainer: {
//     flex: 1,
//     position: 'absolute',
//     top: '80%',
//     right: 0,
//     zIndex: 10,
//   },

//   bubble: {
//     flex: 1,
//     backgroundColor: 'rgb(0,139,139)',
//     opacity: 0.9,
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     borderRadius: 20,
//     marginRight: 10,
//     elevation: 5,
//     zIndex: 4,
//   },
//   scanText: {
//     flex: 1,
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 20,
//     margin: 4,
//   },
// });
