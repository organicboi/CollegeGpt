import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const customMainHeader = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>
        Your App Name
      </Text>
    </View>
  );
};

export default customMainHeader;

const styles = StyleSheet.create({});
