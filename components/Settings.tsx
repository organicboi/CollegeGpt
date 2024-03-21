import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from @react-native-async-storage/async-storage
import Storage from 'react-native-storage';

const SettingsPage = () => {
  const [apiKey, setApiKey] = useState('');

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
  });

  const saveApiKey = async () => {
    try {
      await storage.save({
        key: 'api_key',
        data: apiKey,
      });
      Alert.alert('Success', 'API key saved successfully');
    } catch (error) {
      console.error('Error saving API key:', error);
      Alert.alert('Error', 'Failed to save API key');
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Enter API Key"
        onChangeText={text => setApiKey(text)}
        value={apiKey}
      />
      <Button title="Save API Key" onPress={saveApiKey} />
    </View>
  );
};

export default SettingsPage;
