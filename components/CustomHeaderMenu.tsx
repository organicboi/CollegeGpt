import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomHeaderMenu = props => {
  return (
    <>
      <View style={styles.headingContainer}>
        <Image
          source={require('../images/CollegeGpt.png')}
          style={styles.headingLogo}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};

export default CustomHeaderMenu;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    // elevation: 3,
    shadowColor: '#F9EFDB',
    marginHorizontal: 9,
    marginVertical: 15,
  },
  headingLogo: {
    width: 170,
    height: 37,
    // marginTop: 4,
    // marginLeft: 9,
  },
  logo: {
    width: 50, // Set the width of your logo
    height: 50, // Set the height of your logo
    marginRight: 12,
  },
  brandName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F9EFDB',
    fontFamily: 'Sixtyfour-Regular',
  },
});
