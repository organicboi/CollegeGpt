import React, {useEffect, useState} from 'react';
import {View, Text, Button, AppState, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import
import Storage from 'react-native-storage';
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

export const getApiKey = async () => {
  try {
    const apiKey = await storage.load({key: 'api_key'});
    return apiKey;
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return null;
  }
};

const Retrive = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const key = await getApiKey();
      setApiKey(key);
    };

    fetchData();
  }, []);

  return (
    <>
      <View style={{backgroundColor: 'red'}}>
        <Text>API Key: {apiKey}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Retrive;
