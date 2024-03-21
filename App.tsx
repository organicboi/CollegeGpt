/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import CollegeGpt from './screens/CollegeGpt';
import VertexAI from './components/VertexAI';
import CustomHeaderMenu from './components/CustomHeaderMenu';
import Settings from './components/Settings';
import Retrive from './components/Retrive';

const Drawer = createDrawerNavigator();

const CustomHeader = ({navigation}) => {
  // Destructure navigation prop here
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3B3A3F',
        paddingHorizontal: 20,
        elevation: 9,
        paddingBottom: 5,
      }}>
      <TouchableOpacity
        style={styles.navMenuClass}
        onPress={() => navigation.openDrawer()}>
        <Image
          source={require('./images/more.png')}
          style={styles.logoMenuIcon}
        />
      </TouchableOpacity>
      <View style={styles.imageLogoClass}>
        <Image
          source={require('./images/CollegeGpt.png')}
          style={styles.headingLogo}
        />
      </View>
    </View>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomHeaderMenu {...props} />}
        backBehavior="history"
        screenOptions={{
          drawerActiveBackgroundColor: '#fcd62f',
          // drawerInactiveBackgroundColor: '',
          drawerLabelStyle: {
            color: 'rgb(25,25,25)',
            fontWeight: 'bold',
            fontSize: 17,
          },
          drawerStyle: {
            backgroundColor: '#3B3A3F',
            width: 240,
            elevation: 9,
          },
          drawerType: 'front',
          headerStyle: {
            backgroundColor: 'bal',
          },
        }}>
        <Drawer.Screen
          name="CollegeGpt"
          component={CollegeGpt}
          options={{
            header: ({navigation}) => <CustomHeader navigation={navigation} />, // Pass navigation prop to CustomHeader
            headerTitle: 'CollegeGPT',
            headerTitleStyle: {
              fontSize: 0,
              fontWeight: 'bold',
              color: 'gold',
            },
            // headerTintColor: 'red',
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTransparent: true,
          }}
        />
        <Drawer.Screen name="VertexAI" component={VertexAI} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Retrive" component={Retrive} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  navMenuClass: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMenuIcon: {
    width: 45,
    height: 45,
    // marginRight: 12,
  },
  headingLogo: {
    width: 170,
    height: 37,
    marginTop: 4,
    marginLeft: 9,
  },
  logoRobot: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  imageLogoClass: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '15%',
  },
});
