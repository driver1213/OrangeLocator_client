import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import MapScreen from './src/screens/MapScreen'
import ManualUpdateScreen from './src/screens/ManualUpdateScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { setNavigator } from './src/navigationRef'
import ChooseSiteScreen from './src/screens/ChooseSiteScreen';
import SavedListScreen from './src/screens/SavedListScreen';
import ViewDetailScreen from './src/screens/ViewDetailScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import DigitalCodeScreen from './src/screens/DigitalCodeScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import AccountScreen from './src/screens/AccountScreen';
import StillMapScreen from './src/screens/StillMapScreen';
import * as Font from 'expo-font';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import combineReducer from './src/reducers/combineReducer';
import {loadData, loadAllData} from './src/actions/locationActions'

// await loadAsync({
//   // Load a font `Montserrat` from a static resource
//   "Nunito-Bold": require('./assets/fonts/Nunito-Bold.ttf'),
//   "Nunito-Regular": require('./assets/fonts/Nunito-Bold.ttf')

// });

// //Use the font with the fontFamily property

// return <Text style={{ fontFamily: 'Montserrat' }} />;


const switchNavigator = createSwitchNavigator({

  mainFlow: createBottomTabNavigator({
    screenFlow: createStackNavigator({
      // ChooseSite: ChooseSiteScreen,
      SavedList: SavedListScreen,
      ViewDetail: ViewDetailScreen,
      SearchResults: SearchResultsScreen,
      Map: MapScreen,
      ManualUpdate: ManualUpdateScreen,
    }),

    Map: MapScreen,
    ManualUpdate: ManualUpdateScreen,

    loginFlow: createStackNavigator({
      Signup: SignupScreen,
      Signin: SigninScreen
    }),
    Account: AccountScreen
  }),
});






const App = createAppContainer(switchNavigator);

const store = createStore(combineReducer, applyMiddleware(thunk));
console.log(loadAllData([]))
store.dispatch(loadData());









export default () => {



  let [fontsLoaded] = useFonts({
    "Nunito-Bold": require('./assets/fonts/Nunito-Bold.ttf'),
    "Nunito-Regular": require('./assets/fonts/Nunito-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <Provider store={store}>
        <AuthProvider>
          <App ref={(navigator) => { setNavigator(navigator) }} />
        </AuthProvider>
      </Provider>
    )







}