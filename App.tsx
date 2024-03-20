/* eslint-disable prettier/prettier */
// import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import CollegeGpt from './screens/CollegeGpt';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="CollegeGpt" component={CollegeGpt} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
