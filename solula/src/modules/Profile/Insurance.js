/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{ useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { profileDetails } from '../../services/ProfileService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Insurance = (props) => {

  const { navigate, goBack } = props.navigation

  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])
  const [ dataInsurance, setDataInsurance] = useState([])

  useEffect(() => {
    profileDetails('insurance').then((res) => {
      setLoading(true)
      if(res.status >= 200 && res.status < 300){
        res.json()
        .then((resJson) => {
          console.log(resJson)
          setData(resJson.data)
          setDataInsurance(resJson.data[0].insurance)
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
        <View style={{backgroundColor:'#2180D9', width:'100%', height:100}}>
          <View style={{flexDirection:'row'}}>
            <View style={{ marginLeft:'5%', marginTop:'7%'}}>
              <TouchableOpacity onPress={() => navigate('Profile')}>
                <Image
                  source={require('../../images/iconx.png')}
                  // style={{width:20, height:20}}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft:'5%', marginTop:'5%'}}>
              <Text style={{color:'#fff', fontWeight:'800', fontSize:20}}>
                Insurance
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.boxField}>
          
          <View style={{flex:1, paddingBottom:'50%', marginBottom:'10%'}}>
          <View style={{marginBottom:'5%'}}></View>
            <ScrollView automaticallyAdjustContentInsets={true}> 

              <View>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0.0, 0.99]}
                  colors={['#FFFB91', '#FF9FFF']} style={{position:'absolute', zIndex:999, marginLeft:'8%', marginTop:'1%', width:60, height:20, borderRadius:20}}>
                  <View style={{marginTop:'3%'}}>
                    <Text style={{textAlign:'center', fontSize:12, fontWeight:'800'}}>Contribution</Text>
                  </View>
                </LinearGradient>
                <View style={{marginLeft:'3%', marginTop:'5%', marginRight:'3%', borderWidth:1, borderColor:'#D6D6D6', borderRadius:10, backgroundColor:'#FBFBFB'}}>
                  <View style={{marginTop:'4%'}}>
                    <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                      <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Company Percentage</Text>
                    </View>
                    <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                      <Text style={{color:'#313450', fontSize:14}}>
                        {data[0].insurance_percentage == false ? ' - ' : data[0].insurance_percentage}
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop:'2%'}}>
                    <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                      <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Salary Deduced per Year</Text>
                    </View>
                    <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                      <Text style={{color:'#313450', fontSize:14}}>
                        {data[0].deduced_amount_per_year == false ? ' - ' : data[0].deduced_amount_per_year}
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop:'2%'}}>
                    <View style={{marginLeft:'5%', borderBottomWidth:1, width:'90%', borderColor:'#ECECEC',}}>
                      <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Salary Deduced per Month</Text>
                    </View>
                    <View style={{marginLeft:'5%', width:'90%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                      <Text style={{color:'#313450', fontSize:14}}>
                        {data[0].deduced_amount_per_month == false ? ' - ' : data[0].deduced_amount_per_month}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{marginLeft:'3%', marginTop:'3%', marginRight:'3%', borderWidth:1, borderColor:'#D6D6D6', borderRadius:10, backgroundColor:'#FBFBFB'}}>
                <View style={{marginTop:'4%'}}>
                  <View style={{paddingBottom:'5%'}}>
                    { dataInsurance.length > 0 ? 
                      dataInsurance.map((data) => {
                      (
                        <View>
                          <View style={{flexDirection:'row'}}>
                            <View style={{marginLeft:'5%', width:'30%', height:20, justifyContent:'center', borderColor:'#ECECEC'}}>
                              <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Name</Text>
                            </View>
                            <View style={{marginLeft:'5%', width:'1%', height:20, justifyContent:'center', borderColor:'#ECECEC'}}>
                              <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>:</Text>
                            </View>
                            <View style={{marginLeft:'5%', width:'50%', borderColor:'#ECECEC', height:20, paddingBottom:'3%', justifyContent:'center'}}>
                              <Text style={{color:'#313450', fontSize:14}}>Fajar</Text>
                            </View>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <View style={{marginLeft:'5%', width:'30%', height:20, justifyContent:'center', borderColor:'#ECECEC'}}>
                              <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Relationship</Text>
                            </View>
                            <View style={{marginLeft:'5%', width:'1%', height:20, justifyContent:'center', borderColor:'#ECECEC'}}>
                              <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>:</Text>
                            </View>
                            <View style={{marginLeft:'5%', width:'50%', borderColor:'#ECECEC', height:20, paddingBottom:'3%', justifyContent:'center'}}>
                              <Text style={{color:'#313450', fontSize:14}}>Fajar</Text>
                            </View>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <View style={{marginLeft:'5%', width:'30%', borderColor:'#ECECEC'}}>
                              <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>Contact No</Text>
                            </View>
                            <View style={{marginLeft:'5%', width:'1%', borderColor:'#ECECEC',}}>
                              <Text style={{color:'#313450', fontSize:14, fontWeight:'500'}}>:</Text>
                            </View>
                            <View style={{marginLeft:'5%', width:'60%', borderColor:'#ECECEC', paddingBottom:'3%'}}>
                              <Text style={{color:'#313450', fontSize:14}}>Fajar</Text>
                            </View>
                          </View>
                          <View style={{borderBottomWidth:1, borderColor:'#ECECEC', width:'90%', alignSelf:'center', marginBottom:'2%'}}></View>
                        </View>
                      )
                    }) : (
                      <View>
                        <Text style={{textAlign:'center'}}>Data No Exist</Text>
                      </View>
                    )}

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

Insurance.navigationOptions = ({navigation}) => ({
  title : 'Insurance',
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
    height:'20%', 
    backgroundColor:'#2180D9', 
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,

  },
  boxField : {
    position:'absolute',
    zIndex:999,
    backgroundColor:'#fff', 
    height:'260%',
    width:'92%', 
    marginTop:'20%', 
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

export default Insurance;
