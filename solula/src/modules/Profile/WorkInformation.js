/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{ useEffect, useState }from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { regenerateToken } from '../../services/LoginService';
import { profileDetails } from '../../services/ProfileService';




const WorkInformation = (props) => {

  const { navigate, goBack } = props.navigation
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])

  useEffect(() => {
    profileDetails('public').then((res) => {
      setLoading(true)
      if(res.status >= 200 && res.status < 300){
        res.json()
        .then((resJson) => {
          console.log(resJson)
          setData(resJson.data)
          setLoading(false)
        })
      }else{
        setLoading(false)
      }
    })

  }, [])

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
          <View style={styles.boxField}>

            <View style={{flexDirection:'row', marginTop:'5%', width:'100%'}}>
              <View style={{height:40, marginLeft:'auto', paddingLeft:'10%', width:'50%', justifyContent:'center'}}>
                <Text style={{color:'#000', fontSize:16, textAlign:'center'}}>Work Information</Text>
              </View>
              <View style={{height:40, marginLeft:'auto', marginRight:'5%', justifyContent:'center'}}>
                <TouchableOpacity style={styles.roundedArrow} onPress={() => navigate('PrivateInformation')}>
                  <View style={{justifyContent:'center'}}>
                    <MaterialIcons 
                      style={{backgroundColor : 'transparent'}} 
                      name={"chevron-right"}
                      color={"#000"}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
           
            <View style={{flex:1, paddingBottom:'50%', marginBottom:'10%'}}>
              <ScrollView automaticallyAdjustContentInsets={true}> 
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0.0, 0.99]}
                  colors={['#FFFB91', '#FF9FFF']} style={{position:'absolute', zIndex:999, marginLeft:'8%', marginTop:'1%', width:50, height:20, borderRadius:20}}>
                  <View style={{marginTop:'3%'}}>
                    <Text style={{textAlign:'center', fontSize:12, fontWeight:'800'}}>Contact</Text>
                  </View>
                </LinearGradient>
                <View style={{marginLeft:'3%', marginTop:'5%', marginRight:'3%', borderWidth:1, borderColor:'#D6D6D6', borderRadius:10, backgroundColor:'#FBFBFB'}}>
                  
                  <View style={{marginTop:'4%'}}>
                    <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                      <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Work Location</Text>
                    </View>
                    <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                      <Text style={{color:'#313450', fontSize:14}}>
                        {data[0].work_location == false ? ' - ' : data[0].work_location}
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop:'2%'}}>
                    <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                      <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Work Mobile</Text>
                    </View>
                    <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                      <Text style={{color:'#313450', fontSize:14}}>
                        {data[0].mobile_phone == false ? ' - ' : data[0].mobile_phone}
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop:'2%'}}>
                    <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                      <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Work Phone</Text>
                    </View>
                    <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                      <Text style={{color:'#313450', fontSize:14}}>
                        {data[0].work_phone == false ? ' - ' : data[0].work_phone}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0.0, 0.99]}
                    colors={['#E0CCFF', '#C1FFF1']} style={{position:'absolute', zIndex:9, marginLeft:'8%', marginTop:'1.5%',  width:50, height:20, borderRadius:20}}>
                    <View style={{marginTop:'4%'}}>
                      <Text style={{textAlign:'center', fontSize:12, fontWeight:'800'}}>Position</Text>
                    </View>
                  </LinearGradient>
                  <View style={{marginLeft:'3%', marginTop:'5%', marginRight:'3%', paddingBottom:'5%', borderWidth:1, borderColor:'#D6D6D6', borderRadius:10, backgroundColor:'#FBFBFB'}}>
                    <View style={{marginTop:'4%'}}>
                      <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                        <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Department</Text>
                      </View>
                      <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                        <Text style={{color:'#313450', fontSize:14}}>
                          {data[0].department_id == false ? ' - ' : data[0].department_id[1]}
                        </Text>
                      </View>
                    </View>

                    <View style={{marginTop:'2%'}}>
                      <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                        <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Job Title</Text>
                      </View>
                      <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                        <Text style={{color:'#313450', fontSize:14}}>
                          {data[0].job_id == false ? ' - ' : data[0].job_id[1]}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={{marginTop:'2%'}}>
                      <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                        <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Manager</Text>
                      </View>
                      <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                        <Text style={{color:'#313450', fontSize:14}}>
                          -
                        </Text>
                      </View>
                    </View>
                  </View>
              
                

                </View>
                
                <View style={{marginBottom:'10%'}}></View>

              </ScrollView>
            </View>
           
          </View>
        

        <View style={styles.boxProfile}>

        </View>
      </View>
    </>
  );
};

WorkInformation.navigationOptions = ({navigation}) => ({
  title : 'Information',
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
    height:'25%', 
    backgroundColor:'#2180D9', 
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,

  },
  boxField : {
    position:'absolute',
    zIndex:999,
    backgroundColor:'#fff', 
    height:'260%', 
    marginTop:'10%', 
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

export default WorkInformation;
