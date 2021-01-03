/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Splash = (props) => {
  useEffect(() => {
    AsyncStorage.getItem('uid').then((data) => {
      setTimeout(() => {
        const {navigate} = props.navigation;
        if (data === null || data === undefined) {
          navigate('Login');
        } else {
          navigate('Home');
        }
      }, 1000);
    });
  }, []);

  return (
    <>
      <View
        style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
        <View>
          <Image
            source={require('../../images/logo.png')}
            style={{width: 260, height: 100, alignSelf: 'center'}}
          />
        </View>
      </View>
    </>
  );
};

export default Splash;
