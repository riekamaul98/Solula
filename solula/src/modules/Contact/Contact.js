/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect }from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { employeeList } from '../../services/EmployeService';
import { regenerateToken } from '../../services/LoginService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const dataResend = [
  {
    id : '1',
    name : 'Ghozi Alwan',
    job : 'Programmer'
  },
  {
    id : '2',
    name : 'Ghozi Alwan',
    job : 'Programmer'
  },
  {
    id : '3',
    name : 'Ghozi Alwan',
    job : 'Programmer'
  },
  // {
  //   id : '4',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  // {
  //   id : '5',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  // {
  //   id : '6',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  // {
  //   id : '7',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  // {
  //   id : '8',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  // {
  //   id : '9',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  // {
  //   id : '10',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  // {
  //   id : '11',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  // {
  //   id : '12',
  //   name : 'Ghozi Alwan',
  //   job : 'Programmer'
  // },
  
]





const Contact = (props) => {
  const { navigate, goBack } = props.navigation

  const [order, setOrder] = useState('id asc')
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    const data = async() => {
      setLoading(true)
      await regenerateToken();
      const response = await employeeList(
        limit,
        offset,
        '',
        order, 
      )
      if(response.status >= 200 && response.status < 300){
        const resJson = await response.json()
        setDataSource(resJson.data)
        setLoading(false)
      }else{
        setLoading(false)
      }
    }

    data()

  }, [])


  const listResendChat = () => {
    return dataSource.map((data, index) => (
      
      <TouchableOpacity key={index} style={{height:130, marginLeft:'2%', marginRight:'2%'}}>
        <View style={styles.boxResendChat}>
          <View style={{zIndex:2, alignSelf:'center', marginTop:'5%'}}>
            <Image
              source={require('../../images/pp.jpg')}
              style={{height:60, width:60, borderRadius:30}}
            />
          </View>
          <View style={{marginTop:'5%'}}>
            <View style={{marginTop:'5%'}}>
              <Text style={{textAlign:'center', fontWeight:'500', fontSize:11}}>{data.display_name}</Text>
            </View>
            <View style={{marginTop:'2%'}}>
              <Text style={{textAlign:'center', fontSize:10}}>programmer</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ))
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
        <View style={{flexDirection:'row', marginTop:'3%', width:'100%', marginBottom:'2%'}}>
          <View style={{height:40, marginLeft:'auto', paddingLeft:'10%', width:'50%', justifyContent:'center'}}>
            <Text style={{color:'#000', fontSize:16, textAlign:'center'}}>Contact</Text>
          </View>
          <View style={{height:40, marginLeft:'auto', marginRight:'5%', justifyContent:'center'}}>
            <TouchableOpacity style={styles.roundedArrow} onPress={() => navigate('GroupContact')}>
              <Image
                source={require('../../images/arrowProfile.png')}
                style={{alignSelf:'center'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{paddingBottom:'10%'}}>
          <View style={{ flexWrap: 'wrap', alignSelf: 'center', flexDirection:'row', justifyContent:'center', paddingBottom:'2%'}}>
            {listResendChat()}
          </View>
        </ScrollView>
      </View>
    </>
  );

};

Contact.navigationOptions = ({navigation}) => ({
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
    zIndex:-22,
    marginTop:'10%',
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

export default Contact;
