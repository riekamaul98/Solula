/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const Notification = () => {
  
  return (
    <>
      <View style={{flex:1}}>
        <View style={styles.boxProfile}></View>
          <View style={{marginTop:'8%', flexDirection:'row', height:20}}>
            <View>
              <Text>Notification</Text>
            </View>
          </View>
      </View>
    </>
  );

};

const styles = StyleSheet.create({
  boxProfile : {
    flex:0.5, 
    marginBottom:'1%', 
    backgroundColor:'#2180D9',
    borderBottomLeftRadius : 25,
    borderBottomRightRadius : 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },

  listMenu : {
    backgroundColor:'#fff', 
    borderRadius:50, 
    width:80, 
    height:80, 
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },



});

export default Notification;
