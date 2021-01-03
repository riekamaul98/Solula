/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { profileDetails } from '../../services/ProfileService';


const data = [
  {
    id : '1',
    name : 'Doni',
    periode: '25/08/2019 - 25/09/2020'
  },
  {
    id : '2',
    name : 'Doni',
    periode: '25/08/2019 - 25/09/2020'
  },
  {
    id : '3',
    name : 'Doni',
    periode: '25/08/2019 - 25/09/2020'
  },
 
]



const Payslip = (props) => {

  const { navigate, goBack } = props.navigation




  const list = data.length > 0 ? data.map((data, index) => {
    return(
      <View key={index}>
        <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:'5%', width:'20%', height:20, justifyContent:'center', borderColor:'#ECECEC'}}>
            <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>No</Text>
          </View>
          <View style={{marginLeft:'5%', width:'1%', height:20, justifyContent:'center', borderColor:'#ECECEC'}}>
            <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>:</Text>
          </View>
          <View style={{marginLeft:'5%', width:'50%', borderColor:'#ECECEC', height:20, paddingBottom:'3%', justifyContent:'center'}}>
            <Text style={{color:'#313450', fontSize:14}}>{data.id}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:'5%', width:'20%', height:20, justifyContent:'center', borderColor:'#ECECEC'}}>
            <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Name</Text>
          </View>
          <View style={{marginLeft:'5%', width:'1%', height:20, justifyContent:'center', borderColor:'#ECECEC'}}>
            <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>:</Text>
          </View>
          <View style={{marginLeft:'5%', width:'50%', borderColor:'#ECECEC', height:20, paddingBottom:'3%', justifyContent:'center'}}>
            <Text style={{color:'#313450', fontSize:14}}>{data.name}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:'5%', width:'20%', borderColor:'#ECECEC'}}>
            <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Periode</Text>
          </View>
          <View style={{marginLeft:'5%', width:'1%', borderColor:'#ECECEC',}}>
            <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>:</Text>
          </View>
          <View style={{marginLeft:'5%', width:'60%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
            <Text style={{color:'#313450', fontSize:14}}>{data.periode}</Text>
          </View>
        </View>
        <View style={{borderBottomWidth:1, borderColor:'#ECECEC', width:'90%', alignSelf:'center', marginBottom:'2%'}}></View>
      </View>
    )
  }) : (
    <View>
      <Text style={{textAlign:'center'}}>Data No Exist</Text>
    </View>
  )


  // if(loading){
  //   return(
  //     <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center'}}>
  //       <View style={{justifyContent:'center'}}>
  //         <Text style={{color:'#000', fontSize:18, fontWeight:'700', textAlign:'center'}}>Loading ...</Text>
  //       </View>
  //     </View>
  //   )

  // }

  return (
    <>
      <View style={{flex:1}}>
          <View style={styles.boxField}>
           
            <View style={{flex:1, paddingBottom:'50%', marginBottom:'15%', width:'100%'}}>
              <View style={{marginBottom:'5%'}}></View>
              <ScrollView automaticallyAdjustContentInsets={true}> 

                <View style={{marginLeft:'3%', marginTop:'3%', marginRight:'3%', borderWidth:1, borderColor:'#D6D6D6', borderRadius:10, backgroundColor:'#FBFBFB'}}>
                  
                  <View style={{marginTop:'4%'}}>
                    <View style={{paddingBottom:'10%'}}>
                      {list}
                    
                    </View>
                  </View>
                </View>
                <View style={{marginBottom:'10%'}}></View>
              </ScrollView>
            </View>
          </View>
        <View style={styles.boxProfile}></View>
      </View>
    </>
  );
};

Payslip.navigationOptions = ({navigation}) => ({
  title : 'Family Data',
  headerBackTitle: null,
  header : (props) => {
    return(
      <View style={{height:50, flexDirection:'row', backgroundColor:'#2180D9'}} >
        <View style={{justifyContent:'center'}}>
          <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.goBack()}>
            <View style={{justifyContent:'center', marginLeft:10}}>
              <MaterialIcons 
                style={{backgroundColor : 'transparent'}} 
                name={"close"}
                color={"#fff"}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
      
        <View style={{justifyContent:'center', marginLeft:10}}>
          <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>{props.scene.descriptor.options.title}</Text>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  boxProfile : {
    // position : 'absolute',
    height:'15%', 
    backgroundColor:'#2180D9', 
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,

  },
  boxField : {
    position:'absolute',
    zIndex:999,
    backgroundColor:'#fff', 
    width:'92%',
    height:'260%', 
    marginTop:'5%', 
    marginLeft:'4%', 
    marginRight:'4%', 
    borderTopLeftRadius:25, 
    borderTopRightRadius:25,
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.26,
    shadowRadius: 10.68,
    elevation: 5,
  },

 


});

export default Payslip;
