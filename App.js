/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  StatusBar,
  YellowBox,
  Platform,
  ActivityIndicator
} from 'react-native';
console.disableYellowBox = true
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import styles from './style/style'

import {
  secondaryColor
} from './utils/contants'

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity,
} from 'react-native-global-props'

const customTextProps = {
  style: {
    fontSize: 22,
    fontFamily: Platform.OS == 'android' ? 'DBYord' : 'DB Yord X',
  }
};
setCustomText(customTextProps);
setCustomTextInput(customTextProps);


import Login from './screen/LoginScreen'
import Signup from './screen/SignupScreen'
import Forget from './screen/ForgetpasswordScreen'

import List3 from './screen/ListScreen3'
import Profile from './screen/ProfileScreen'
import splashScreen from './screen/splashScreen'
import Calls from './screen/Calls'
import Calls2 from './screen/Calls2'
import ListScreen_json from './screen/ListScreen_json'
import FullimageScreen from './screen/FullimageScreen'
import SavedataScreen from './screen/SavedataScreen'


const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='splashScreen'>
      <Stack.Screen name="splashScreen" component={splashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forget" component={Forget} />

      <Stack.Screen name="List3" component={List3} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Calls" component={Calls} />
      <Stack.Screen name="Calls2" component={Calls2} />
      <Stack.Screen name="FullimageScreen" component={FullimageScreen} />
      <Stack.Screen name="SavedataScreen" component={SavedataScreen} />
      
      <Stack.Screen name="ListScreen_json" component={ListScreen_json} />
    </Stack.Navigator>
  );
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack />
        {
          this.props.reducer.indicator ?
            <View style={[styles.loadingIndicator]}>
              <ActivityIndicator size='large' color={secondaryColor} />
            </View>
            :
            null
        }
      </NavigationContainer>
    )
  }
};

const mapStateToProps = (state) => ({
  reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)