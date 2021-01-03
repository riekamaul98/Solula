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
  Image,
  Text,
  TextInput

} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const AttendanceRevForm = (props) => {
  const { navigate } = props.navigation
  return (
    <>
      <View style={{flex:1}}>
        <View style={styles.box}>
          <View style={styles.textBox}>
            <TextInput 
              placeholder={"Date"}
              placeholderTextColor={"#898A8F"}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textBox}>
            <TextInput 
              placeholder={"Start"}
              placeholderTextColor={"#898A8F"}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textBox}>
            <TextInput 
              placeholder={"End"}
              placeholderTextColor={"#898A8F"}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textBoxArea}>
            <TextInput 
              placeholder={"Notes"}
              placeholderTextColor={"#898A8F"}
              style={styles.textInputArea}
              multiline={true}
              numberOfLines={5}
            />
          </View>
          <View style={{ marginTop:'5%', marginBottom:'10%'}}>
            <View style={{alignSelf:'center', width:'100%'}}>
              <TouchableOpacity style={{backgroundColor:'#2180D9', height:50, alignSelf:'center', justifyContent:'center', width:'60%', borderRadius:25}}>
                <Text style={{color:'#fff', textAlign:'center', fontWeight:'800'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </>
  );
};

AttendanceRevForm.navigationOptions = ({navigation}) => ({
  title : 'Revision Form',
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
  box : {
    height:'80%',
    marginBottom:'1%', 
    margin:'2%',
    marginTop:'5%',
    backgroundColor:'#fff',
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    borderBottomLeftRadius : 25,
    borderBottomRightRadius : 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 10.68,
    elevation: 5,
  },
  textBox : {
    marginTop:'5%', 
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
  textBoxArea : {
    marginTop:'5%', 
    marginLeft:'5%', 
    marginRight:'5%', 
    height:150, 
    width:'90%', 
    borderWidth:1, 
    backgroundColor:'#F6F6F6', 
    borderRadius:15, 
    borderColor:'#D6D6D6'
  },
  textInput : {
    justifyContent:'center', 
    paddingLeft:'5%', 
    paddingTop:'3%', 
    fontSize:14, 
    color:'#898A8F'
  },
  textInputArea : {
    justifyContent:'flex-start', 
    paddingLeft:'5%', 
    paddingTop:'5%', 
    fontSize:14, 
    color:'#898A8F'
  }


});

export default AttendanceRevForm;
