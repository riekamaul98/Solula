/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState }from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,

} from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { overtimeList } from '../../services/OvertimeService';
import { regenerateToken } from '../../services/LoginService'
import AsyncStorage from '@react-native-community/async-storage';


const dataOvertime = [
  {
    id : '1',
    date : '09/10/2019',
    start : '08.00',
    end : '11.00',
    status : 'Approved'
  },
  {
    id : '2',
    date : '09/10/2019',
    start : '08.00',
    end : '11.00',
    status : 'Approved'
  },
  {
    id : '3',
    date : '09/10/2019',
    start : '08.00',
    end : '11.00',
    status : 'Approved'
  },
  {
    id : '4',
    date : '09/10/2019',
    start : '08.00',
    end : '11.00',
    status : 'Approved'
  },
  {
    id : '5',
    date : '09/10/2019',
    start : '08.00',
    end : '11.00',
    status : 'Approved'
  },
  {
    id : '6',
    date : '09/10/2019',
    start : '08.00',
    end : '11.00',
    status : 'Approved'
  },
  {
    id : '7',
    date : '09/10/2019',
    start : '08.00',
    end : '11.00',
    status : 'Approved'
  },
  {
    id : '8',
    date : '09/10/2019',
    start : '08.00',
    end : '11.00',
    status : 'Approved'
  }
]

const _renderItem = (item, index) => (
  <View>
    <TouchableOpacity style={{height:100, marginLeft:'1%', justifyContent:'center', backgroundColor:index % 2 == 0 ? '#2180D9' : 'fff'}}>
      <View style={{flexDirection:'row'}}>

        <View style={{justifyContent:'center', width:'20%', marginLeft:'2%'}}>
          <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.date}</Text>
        </View>

        <View style={{justifyContent:'center', width:'20%', marginLeft:'4%'}}>
        
          <View style={{flexDirection:'row'}}>
            <View style={{margin:'2%', width:50}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>Start</Text>
            </View>
            <View style={{margin:'2%', width:30}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>:</Text>
            </View>
            <View style={{margin:'2%', width:40}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.start}</Text>
            </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={{margin:'2%', width:50}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>End</Text>
            </View>
            <View style={{margin:'2%', width:30}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>:</Text>
            </View>
            <View style={{margin:'2%'}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.start}</Text>
            </View>
          </View>

          <View style={{flexDirection:'row'}}>
            <View style={{margin:'2%', width:50}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>Status</Text>
            </View>
            <View style={{margin:'2%', width:30}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>:</Text>
            </View>
            <View style={{margin:'2%'}}>
              <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.start}</Text>
            </View>
          </View>
          
        </View>
      </View>
    </TouchableOpacity>
  </View>
  
)

const _itemSeparator = () => (
  <View style={{width:'100%', marginLeft:'2%', borderWidth:0.5, opacity:0.2, backgroundColor:'#ECECEC'}}></View>
)




const Overtime = (props) => {
  const { navigate, goBack } = props.navigation
  const [order, setOrder] = useState('id desc')
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)


   
  // useEffect(() => {
  //   const data = async () => {
  //     setLoading(true)
  //     await regenerateToken()
  //     const response = await overtimeList('confirm', await AsyncStorage.getItem('employee_id'), order, offset, limit)
  //     console.log(response)
  //     setLoading(false)
  //   } 

  //   data()
  // }, [])

  return (
    <>
      <View style={{flex:1}}>
        <View style={{height:'75%', marginRight:'1%', borderColor:'#000', backgroundColor:'#FBFBFB',}}>
          <FlatList
            data={dataOvertime}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => _renderItem(item, index)}
            ItemSeparatorComponent = {() => _itemSeparator()}
          />
        </View>
        <View style={{height:'5%'}}>
          <View style={{flexDirection:'row'}}>
            <View style={{marginTop:'5%', marginLeft:'5%'}}>
              <TouchableOpacity style={{width:60, height:50, borderColor:'#C7C7C7', borderWidth:1, borderRadius:25, justifyContent:'center'}}>
                <Text style={{color:'#000', textAlign:'center', fontWeight:'600'}}>ASC</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop:'5%', marginLeft:'auto', marginRight:'5%'}}>
              <TouchableOpacity style={{width:60, height:50, borderColor:'#C7C7C7', borderWidth:1, borderRadius:25, justifyContent:'center'}}>
                <Text style={{color:'#000', textAlign:'center', fontWeight:'600'}}>DESC</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{justifyContent:'center', marginBottom:'auto'}}>
            <View style={{marginTop:'1%'}}>
              <TouchableOpacity style={styles.btnRequest} onPress={() => navigate('OvertimeForm')}>
                <Text style={{fontWeight:'800', color:'#fff', textAlign:'center'}}>New Request</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </View>
    </>
  );

};

Overtime.navigationOptions = ({navigation}) => ({
  title : 'Overtime',
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
    opacity : 0.85,
    height:'55%',
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

  menuRound : {
    opacity : 0.85,
    alignSelf:'center',
    justifyContent:'center',
    height:50,
    width:'80%',
    marginBottom:10, 
    marginTop:10,
    backgroundColor:'#fff',
    borderBottomLeftRadius : 25,
    borderBottomRightRadius : 25,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.68,
    elevation: 5,
  },
  btnRequest : {backgroundColor:'#2180D9', width:'40%', alignSelf:'center', height:50, borderRadius:25, justifyContent:'center'}


});

export default Overtime;
