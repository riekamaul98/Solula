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
  TouchableOpacity,
  Image,
  View,
  Text,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const dataResend = [
  {
    id : '1',
    name : 'General',
  },
  {
    id : '2',
    name : 'Ride Tour',
  },
  {
    id : '3',
    name : 'Finance',
  },
  {
    id : '4',
    name : 'General',
  },
  {
    id : '5',
    name : 'Ride Tour',
  },
  {
    id : '6',
    name : 'Finance',
  },
  {
    id : '7',
    name : 'General',
  },
  {
    id : '8',
    name : 'Ride Tour',
  },
  {
    id : '9',
    name : 'Finance',
  },
 
  
]

const listResendChat = () => {
  return dataResend.map((data, index) => (
    <TouchableOpacity key={index} style={{height:120, marginLeft:'2%', marginRight:'2%', marginTop:'3%'}}>
      <View style={styles.boxResendChat}>
        <View style={{ zIndex:999,  marginTop:'10%', alignSelf:'center'}}>
          <Image
            source={require('../../images/groupcontact.png')}
            style={{height:40, width:40, borderRadius:30, alignSelf:'center', borderWidth:1}}
          />  
        </View>
        <View style={{height:'50%', justifyContent:'center', alignSelf:'center'}}>
          <View>
            <Text style={{textAlign:'center', fontWeight:'600', fontSize:12}}>{data.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ))
}



const GroupContact = (props) => {
  
  const { navigation, goBack } = props

  return (
    <>
      <View style={{flex:1}}>
        <View style={{flexDirection:'row', marginTop:'5%', width:'100%', }}>
          <View style={{height:40, marginLeft:'5%', marginRight:'5%', justifyContent:'center'}}>
            <TouchableOpacity style={styles.roundedArrow} onPress={() => navigation.goBack()}>
              <Image
                source={require('../../images/arrowBackProfile.png')}
                style={{alignSelf:'center'}}
              />
            </TouchableOpacity>
          </View>
          <View style={{height:40, marginRight:'auto', marginLeft:'15%', paddingRight:'10%', width:'50%', justifyContent:'center'}}>
            <Text style={{color:'#000', fontSize:16, textAlign:'center'}}>Groups</Text>
          </View>
        </View>
        <ScrollView style={{paddingBottom:'10%'}}>
          <View style={{ flexWrap: 'wrap', alignSelf: 'flex-start', flexDirection:'row', justifyContent:'center', paddingBottom:'50%'}}>
            {listResendChat()}
          </View>
        </ScrollView>
      </View>
    </>
  );

};

GroupContact.navigationOptions = ({navigation}) => ({
  title : 'Contact',
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

  boxResendChat : {
    marginTop:'25%',
    backgroundColor:'#fff',
    borderRadius:10, 
    height:110,
    width: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  roundedArrow : {
    backgroundColor:'#fff', 
    borderRadius:25, 
    width:20, 
    height:20, 
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.26,
    shadowRadius: 2.68,
    elevation: 4,
  }

});

export default GroupContact;
