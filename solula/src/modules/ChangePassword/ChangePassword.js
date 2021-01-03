/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{ useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { regenerateToken } from '../../services/LoginService';
import { changePassword } from '../../services/EmployeService'



const ChangePassword = (props) => {
  
  const [ password, setPassword ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const { goBack, navigate } = props.navigation

  const submitChangePassword = async() => {
    if(password == ''){
      Alert.alert('Warning', 'field cannot be empty !', [
        { text: 'OK', onPress: () => {return false} },
      ], { cancelable: false });
    }else{
      setLoading(true)
      await regenerateToken();
      let submit = await changePassword(
        await AsyncStorage.getItem('uid'), password)
      if(submit.status >= 200 && submit.status < 300){
        setLoading(false)
        Alert.alert('Information', 'Change password success', [
          { text: 'OK', onPress: () => goBack() },
        ], { cancelable: false });
      }else{
        Alert.alert('Warning', 'Change Password failed !', [
          { text: 'OK', onPress: () => goBack() },
        ], { cancelable: false });
      }
    }
  }

  if(loading){
    return(
      <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center'}}>
        <View style={{justifyContent:'center'}}>
          <Text style={{color:'#000', fontSize:18, fontWeight:'700', textAlign:'center'}}>Loading ...</Text>
        </View>
      </View>
    )
  }

  return (
    <>
      <View style={{flex:1}}>
        <View style={{width:'100%', marginTop:'15%', marginBottom:'10%', justifyContent:'center'}}>
          <Image
            source={require('../../images/forgot.png')}
            style={{width:260, height:140, alignSelf:'center', opacity:1}}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput 
            placeholder={"New Password"}
            placeholderTextColor={"#898A8F"}
            style={styles.textInput}
            value={password}
            onChangeText={(data) => setPassword(data)}
          />
        </View>
        <View style={{ marginTop:'5%', marginBottom:'10%'}}>
            <View style={{alignSelf:'center', width:'100%'}}>
              <TouchableOpacity 
                onPress={() => submitChangePassword()}
                style={{backgroundColor:'#2180D9', height:50, alignSelf:'center', justifyContent:'center', width:'60%', borderRadius:25}}>
                <Text style={{color:'#fff', textAlign:'center', fontWeight:'800'}}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </>
  );
};

ChangePassword.navigationOptions = ({navigation}) => ({
  title : 'Change Password',
  headerBackTitle: null,
  header : (props) => {
    return(
      <View style={{height:50, flexDirection:'row'}} >
      <View style={{justifyContent:'center'}}>
        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.goBack()}>
          <View style={{justifyContent:'center', marginLeft:10}}>
            <MaterialIcons 
              style={{backgroundColor : 'transparent'}} 
              name={"close"}
              color={"#898A8F"}
              size={25}
            />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={{justifyContent:'center', marginLeft:10}}>
        <Text style={{color:'#2180D9', fontSize:18, fontWeight:'bold'}}>{props.scene.descriptor.options.title}</Text>
      </View>
    </View>
    )
  }
})

const styles = StyleSheet.create({
  textInput : {
    justifyContent:'center', 
    paddingLeft:'5%', 
    paddingTop:'3%', 
    fontSize:14, 
    color:'#898A8F'
  },
  textBox : {
    // marginTop:'5%', 
    marginLeft:'5%', 
    marginRight:'5%', 
    height:50, 
    width:'90%', 
    borderWidth:0.5, 
    backgroundColor:'#F6F6F6', 
    justifyContent:'center', 
    borderRadius:15, 
    borderColor:'#D6D6D6'
  },

});

export default ChangePassword;
