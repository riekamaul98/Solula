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
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity, 
  FlatList,
  Button,
  Alert
} from 'react-native';
import { regenerateToken } from '../../services/LoginService';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'
import dataPayment from './static/dataPayment'
import {expensesSummaryDetail} from '../../services/ExpensesService'



const _renderItem = (item, index) => (
  <View>
    <TouchableOpacity style={{height:50, marginLeft:'1%', justifyContent:'center', backgroundColor:index % 2 == 0 ? '#2180D9' : 'fff'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{justifyContent:'center', width:'20%', marginLeft:'2%',}}>
            <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.tgl}</Text>
          </View>

          <View style={{marginLeft:'5%'}}>

            <View style={{flexDirection:'row'}}>
              <View style={{margin:'2%', width:50}}>
                <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>Check In</Text>
              </View>
              <View style={{margin:'2%', width:10}}>
                <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>:</Text>
              </View>
              <View style={{margin:'2%', width:120}}>
                <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.product}</Text>
              </View>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={{margin:'2%', width:50}}>
                  <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>Check In</Text>
                </View>
                <View style={{margin:'2%', width:10}}>
                  <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>:</Text>
                </View>
                <View style={{margin:'2%', width:120}}>
                  <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.product}</Text>
                </View>
              </View>
          </View>
        </View>
        
    </TouchableOpacity>
  </View>
  
)


const ExpenseReport = (props) => {
  const { navigate, goBack } = props.navigation
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState([])
  const [sheets, setSheets] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  
  const [visibleModal, setVisibleModal] = useState(null)
  
  const [nameSummary, setNameSummary] = useState('')
  const [paymentMode, setPaymentMode] = useState('')
  const [paymentName, setPaymentName] = useState('Payment')

  const _renderItemModal = ({item}) => (
    <View style={{width:'100%', height:40, justifyContent:'center', borderColor:'#bdbdbd', borderTopWidth:0.5}}>
      <TouchableOpacity style={{width:'100%', height:25, justifyContent:'center'}} onPress={() => selectPayment(item)}>
        <Text style={{color:'#000', textAlign:'center'}}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  )

  const selectPayment = (item) => {
    setPaymentMode(item.value)
    setPaymentName(item.name)
    setVisibleModal(null)
  }


  const renderModalContent = () => (
    <View style={styles.containerModal}>
      <View style={{width:'100%',  height:40, justifyContent:'center'}}>
        <Text style={{color:'#000', textAlign:'center', fontWeight:'bold'}}>Payment</Text>
      </View>
        <View style={{flex:1}}>
          <FlatList 
            data = {dataPayment}
            renderItem = {_renderItemModal}
            keyExtractor={(item, index) => `list-${index}`}
            // ItemSeparatorComponent={this._renderSeparatorView}
          />
        </View>
      <View style={{justifyContent:'flex-end', marginTop:'auto'}}>
        <Button
          onPress={() => setVisibleModal(null)}
          title="Close"
        />
      </View>
    </View>
  );

  const listItemSummary = async () => {
    setLoading(true)
    await regenerateToken();
    const itemSummary = await expensesSummaryDetail(
      await AsyncStorage.getItem('summary_claim_id') == undefined || null ? 0 : await AsyncStorage.getItem('summary_claim_id')
    )
    let responseJson
    if (itemSummary.status >= 200 && itemSummary.status < 300) {
      responseJson = await itemSummary.json()
      if (responseJson.count > 0) {
        setSheets(responseJson.data[0].sheets)
        setDataSource(responseJson.data)
        setNameSummary(responseJson.data[0].name)
        let sum = 0;
        sheets.map((data) => {
          if (!isNaN(parseFloat(data.total_amount))) {
            sum += parseFloat(data.total_amount);
          }
        });
        setTotalPrice(sum)
      }
      setLoading(false)
    } else {
      responseJson = 'error'
      Alert.alert('Information', 'Server error', [
        { text: 'OK', onPress: () => {return false} },
      ], { cancelable: false });
      setLoading(false)
    }
  }

  const addItem = () => {
    if (nameSummary == '' || paymentMode == '') {
      Alert.alert('Peringatan', 'Harap Isi Kegiatan / Deskripsi Terlebih Dahulu', [
        { text: 'OK', onPress: () => {return false} },
      ], { cancelable: false });
    } else {
      props.navigation.navigate('ExpenseForm', {
        name_summary: nameSummary, 
        payment_mode: paymentMode,
        returnData: listItemSummary.bind(this)
      })
    }
  }

  useEffect(() => {
    listItemSummary()
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
        <View style={styles.box}>
          <View style={{marginTop:'3%'}}>
            <View style={styles.textBox}>
              <TextInput 
                placeholder={"Description"}
                placeholderTextColor={"#898A8F"}
                style={styles.textInput}
                onChangeText={(text) => setNameSummary(text)}
                value={nameSummary}
              />
            </View>
          </View>
          <View style={{marginTop:'3%'}}>
            <TouchableOpacity style={styles.textBox} onPress={() => setVisibleModal('default')}>
              <View style={{flexDirection:'row'}}>
                <View style={{width:'80%', justifyContent:'center'}}>
                  <Text style={styles.textInput}>{paymentName}</Text>
                </View>
                <View style={{justifyContent:'center', marginLeft:'auto', marginRight:'5%'}}>
                  <Ionicons 
                    style={{backgroundColor : 'transparent'}} 
                    name={"ios-arrow-down"}
                    color={"#898A8F"}
                    size={20}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          

          <View style={{height:40, marginLeft:'5%', marginTop:'5%', justifyContent:'center'}}>
            <Text style={{color:'#898A8F', fontWeight:'500'}}>Expense</Text>
          </View>
          
          <View style={{height:'50%', marginLeft:'5%', marginRight:'5%'}}>
            <FlatList
              data={dataSource}
              keyExtractor={(item) => item.id}
              renderItem={({item, index}) => _renderItem(item, index)}
              ListEmptyComponent={() => 
                (
                  <View style={{justifyContent:'center', backgroundColor:'#fff', marginTop:100}}>
                    <Text style={{textAlign:'center', color:'#000', fontWeight:'800', fontSize:16}}>No Data</Text>
                  </View>
                )
              }
              ListFooterComponent={() => (
                <View style={{marginTop:'2%'}}>
                  <TouchableOpacity 
                    onPress={addItem}
                    style={{backgroundColor:'#F6F6F6', borderWidth:1, borderColor:'#D6D6D6', height:60, width:60, alignSelf:'center', borderRadius:10, justifyContent:'center'}}>
                    <Image
                      source={require('../../images/addclaim.png')}
                      style={{alignSelf:'center', marginTop:'5%'}}
                    />
                  </TouchableOpacity>
                </View>
              )}
              // ItemSeparatorComponent = {() => _itemSeparator()}
            />
          </View>


          <View style={{ bottom:0, marginTop:'10%'}}>
            <View style={{alignSelf:'center', width:'100%', marginBottom:'2%'}}>
              <View style={{backgroundColor:'#fff', height:40, alignSelf:'center', justifyContent:'center', width:'90%', borderRadius:25, borderWidth:1, borderColor:'#C7C7C7'}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{marginLeft:'10%'}}>
                    <Text style={{color:'#000', textAlign:'center', fontWeight:'800'}}>TOTAL  </Text>
                  </View>
                  <View style={{marginLeft:'auto', marginRight:'10%'}}>
                    <Text style={{color:'#000', textAlign:'right', fontWeight:'800'}}>Rp {totalPrice}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{alignSelf:'center', width:'100%'}}>
              <TouchableOpacity style={{backgroundColor:'#2180D9', height:40, alignSelf:'center', justifyContent:'center', width:'50%', borderRadius:25}}>
                <Text style={{color:'#fff', textAlign:'center', fontWeight:'800'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
      <Modal 
        isVisible={visibleModal === 'default'}
        swipeDirection={['down']}
      >
        {renderModalContent()}
      </Modal> 
    </>
  );
};

ExpenseReport.navigationOptions = ({navigation}) => ({
  title : 'Expense Report',
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
    height:'100%',
    marginBottom:'1%', 
    margin:'2%',
    marginTop:'1%',
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
    // marginTop:'5%', 
    marginLeft:'5%', 
    marginRight:'5%',
    height:40, 
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
    // paddingTop:'1%', 
    fontSize:12, 
    color:'#898A8F'
  },
  textInputArea : {
    justifyContent:'flex-start', 
    paddingLeft:'5%', 
    paddingTop:'5%', 
    fontSize:14, 
    color:'#898A8F'
  },
  containerModal : {
    backgroundColor: 'white',
    flex:0.7,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },


});

export default ExpenseReport;
