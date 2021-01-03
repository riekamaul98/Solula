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
  Button,
  TouchableOpacity,
  FlatList  
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from 'react-native-modal'
import moment from 'moment'
import { regenerateToken } from '../../services/LoginService';
import { expensesProductList, expensesDetail, expenseAttachDetail } from '../../services/ExpensesService';


const ExpenseForm = (props) => {
  const { navigate, goBack} = props.navigation
  const { params } = props.navigation.state

  //date time picker
  const [typePicker, setTypePicker] = useState('date')
  const [nameInput, setNameInput] = useState('')
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)
  const [visibleModal, setVisibleModal] = useState(null)

  // list data product
  const [ dataProduct, setDataProduct ] = useState([])

  const [loading, setLoading] = useState(true)
  
  // item claim
  const [date, setDate] = useState('Date')
  const [product, setProduct] = useState('Product')
  const [productId, setProductId] = useState('')
  const [price, setPrice] = useState('')
  const [notes, setNotes] = useState('')

  // file item claim
  const [name, setName] = useState('')
  const [datas, setDatas] = useState('')
  const [id, setId] = useState('')
  const [datasFileName, setDatasFileName] = useState('')


  const getDetail = async () => {
    await regenerateToken()
    let id_detail = params.id_item != undefined || null ? params.id_item : 0 
    console.log(id_detail)
    const productList = await expensesProductList('id asc')
    if (productList.status >= 200 && productList.status < 300) {
      let productListJson = await productList.json();
      console.log(productListJson)
      setDataProduct(productListJson.data)
      if(id_detail != 0){
        const detailClaim = await expensesDetail(id_detail)
        if (detailClaim.status >= 200 && detailClaim.status < 300) {
          let detailClaimJson = await detailClaim.json();
          if (detailClaimJson.count > 0) {
            setProductId(detailClaimJson.data[0].product_id[0])
            setDate(detailKlaimJson.data[0].date)
            setPrice(detailKlaimJson.data[0].unit_amount)
            setNotes(detailKlaimJson.data[0].description)
          }
        }else {
          alert('failed get Data detail')
        }

        const attachDetail = await expenseAttachDetail(id_detail)
        if (attachDetail.status >= 200 && attachDetail.status < 300) {
          let attachDetailJson = await attachDetail.json();
          console.log(attachDetailJson)
          // if (attachDetailJson.count > 0) {
          //   this.state.uploadBukti.data = attachDetailJson.data[0].datas;
          //   this.state.uploadBukti.fileName = attachDetailJson.data[0].name;
          //   this.setState({
          //     last_id: id_detail,
          //     nameFieldBrowse: attachDetailJson.data[attachDetailJson.count - 1].datas_fname,
          //   });
          // }
        }

      }

      setLoading(false)
    } else {
      alert('failed')
    }
  }


  useEffect(() => {
    getDetail()
  }, [])

  const showDateTimePicker = (type, nameInput) => {
    setTypePicker(type)
    setNameInput(nameInput)
    setIsDateTimePickerVisible(true)
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false)
  };

  const handleDatePicked = date => {
    let format = typePicker == 'date' ? 'YYYY-MM-DD' : 'HH:mm:ss'
    let newDate = moment(date).format(format)
    if (nameInput == 'Date') {
      setDate(newDate)
    }
    hideDateTimePicker();
  };

  const selectProduct = (item) => {
    setProductId(item.id)
    setProduct(item.display_name)
    setVisibleModal(null)
  }

  const _renderItem = ({item}) => (
    <View style={{width:'100%', height:40, justifyContent:'center', borderColor:'#bdbdbd', borderTopWidth:0.5}}>
      <TouchableOpacity style={{width:'100%', height:25, justifyContent:'center'}} onPress={() => selectProduct(item)}>
        <Text style={{color:'#000', textAlign:'center'}}>{item.display_name}</Text>
      </TouchableOpacity>
    </View>
  )

  

  const renderModalContent = () => (
    <View style={styles.containerModal}>
      <View style={{width:'100%',  height:40, justifyContent:'center'}}>
        <Text style={{color:'#000', textAlign:'center', fontWeight:'bold'}}>Product</Text>
      </View>
        <View style={{flex:1}}>
          <FlatList 
            data = {dataProduct}
            renderItem = {_renderItem}
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
            <TouchableOpacity style={styles.textBox} onPress={() => showDateTimePicker("date", "Date")}>
              <View style={{flexDirection:'row'}}>
                <View style={{width:'80%', justifyContent:'center'}}>
                  <Text style={styles.textInput}>{date}</Text>
                </View>
                <View style={{justifyContent:'center', marginLeft:'auto', marginRight:'5%'}}>
                  <Ionicons 
                    style={{backgroundColor : 'transparent'}} 
                    name={"md-calendar"}
                    color={"#898A8F"}
                    size={25}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{marginTop:'3%'}}>
            <TouchableOpacity style={styles.textBox} onPress={() => setVisibleModal('default')}>
              <View style={{flexDirection:'row'}}>
                <View style={{width:'80%', justifyContent:'center'}}>
                  <Text style={styles.textInput}>{product}</Text>
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
          
          <View style={{marginTop:'3%'}}>
            <View style={styles.textBox}>
              <View style={{flexDirection:'row'}}>
                <View style={{width:'80%', justifyContent:'center'}}>
                  <TextInput 
                    placeholder={"Price"}
                    placeholderTextColor={"#898A8F"}
                    style={styles.textInput}
                  />
                </View>
                <View style={{justifyContent:'center', marginLeft:'auto', marginRight:'5%'}}>
                  <Ionicons 
                    style={{backgroundColor : 'transparent'}} 
                    name={"md-cash"}
                    color={"#898A8F"}
                    size={25}
                  />
                </View>
              </View>
              
            </View>
          </View>
          
          <View style={{marginTop:'3%'}}>
            <View style={styles.textBoxArea}>
              <TextInput 
                placeholder={"Notes"}
                textAlignVertical={'top'}
                placeholderTextColor={"#898A8F"}
                style={styles.textInputArea}
                multiline={true}
                numberOfLines={5}
              />
            </View>
          </View>

          <View style={{width:'95%', height:100, alignSelf:'center', borderTopWidth:0.8, borderColor:'#ECECEC', marginTop:'3%'}}>
            <View>
              <Text style={{color:'#898A8F'}}>Attachment</Text>
            </View>
            <View>
              <TouchableOpacity 
                onPress={() => navigate('ExpenseForm')}
                style={{backgroundColor:'#F6F6F6', borderWidth:1, borderColor:'#D6D6D6', height:60, width:60, alignSelf:'center', borderRadius:10, justifyContent:'center'}}>
                <Image
                  source={require('../../images/addclaim.png')}
                  style={{alignSelf:'center', marginTop:'5%'}}
                />
            </TouchableOpacity>
            </View>
          </View>
          
          <View style={{ bottom:0, marginTop:'auto', marginBottom:'10%'}}>
            <View style={{alignSelf:'center', width:'100%'}}>
              <TouchableOpacity style={styles.btnSubmit}>
                <Text style={styles.txtBtnSubmit}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode={typePicker}
        is24Hour={true}
      />
      <Modal 
        isVisible={visibleModal === 'default'}
        swipeDirection={['down']}
      >
        {renderModalContent()}
      </Modal>    
    </>
  );
};

ExpenseForm.navigationOptions = ({navigation}) => ({
  title : 'Expense Form',
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
    height:'95%',
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
    marginLeft:'5%', 
    marginRight:'5%', 
    height:40, 
    width:'95%', 
    alignSelf:'center',
    borderWidth:1, 
    backgroundColor:'#F6F6F6', 
    justifyContent:'center', 
    borderRadius:10, 
    borderColor:'#D6D6D6'
  },
  textBoxArea : {
    // marginTop:'5%', 
    marginLeft:'5%', 
    marginRight:'5%', 
    height:120, 
    width:'95%', 
    alignSelf:'center',
    borderWidth:1, 
    backgroundColor:'#F6F6F6', 
    borderRadius:10, 
    borderColor:'#D6D6D6'
  },
  textInput : {
    justifyContent:'center', 
    paddingLeft:'5%', 
    // paddingTop:'3%', 
    fontSize:14, 
    color:'#898A8F'
  },
  textInputArea : {
    justifyContent:'flex-start', 
    paddingLeft:'5%', 
    // paddingTop:'5%', 
    fontSize:14, 
    color:'#898A8F'
  },
  containerModal : {
    backgroundColor: 'white',
    flex:0.7,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  txtBtnSubmit : {
    color:'#fff', 
    textAlign:'center', 
    fontWeight:'800'
  },
  btnSubmit : {
    backgroundColor:'#2180D9', 
    height:50, alignSelf:'center', 
    justifyContent:'center', 
    width:'60%', 
    borderRadius:25
  }

});

export default ExpenseForm;
