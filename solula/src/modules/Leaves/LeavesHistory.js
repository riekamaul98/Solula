/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {leaveHistory} from '../../services/LeaveService';
import {regenerateToken} from '../../services/LoginService';
import AsyncStorage from '@react-native-community/async-storage';

const dataOvertime = [
  {
    id: '1',
    date: '09/10/2019',
    start: '08.00',
    end: '11.00',
    status: 'Approved',
  },
  {
    id: '2',
    date: '09/10/2019',
    start: '08.00',
    end: '11.00',
    status: 'Approved',
  },
  {
    id: '3',
    date: '09/10/2019',
    start: '08.00',
    end: '11.00',
    status: 'Approved',
  },
  {
    id: '4',
    date: '09/10/2019',
    start: '08.00',
    end: '11.00',
    status: 'Approved',
  },
  {
    id: '5',
    date: '09/10/2019',
    start: '08.00',
    end: '11.00',
    status: 'Approved',
  },
  {
    id: '6',
    date: '09/10/2019',
    start: '08.00',
    end: '11.00',
    status: 'Approved',
  },
  {
    id: '7',
    date: '09/10/2019',
    start: '08.00',
    end: '11.00',
    status: 'Approved',
  },
  {
    id: '8',
    date: '09/10/2019',
    start: '08.00',
    end: '11.00',
    status: 'Approved',
  },
];

const dataLeaves = [
  {
    id: '1',
    user: 'Rieka Maulida',
    fromDate: '30 Mei 2020',
    toDate: '30 Mei 2020',
    type: 'Legal Leaves 2020',
    status: 'Approved',
  },
  {
    id: '2',
    user: 'Rieka Maulida',
    fromDate: '01 Januari 2021',
    toDate: '31 Desember 2021',
    type: 'Legal Leaves 2021',
    status: 'Refused',
  },
  {
    id: '3',
    user: 'Rieka Maulida',
    fromDate: '30 Mei 2020',
    toDate: '30 Mei 2020',
    type: 'Legal Leaves 2020',
    status: 'Approved',
  },
  {
    id: '4',
    user: 'Rieka Maulida',
    fromDate: '01 Januari 2021',
    toDate: '31 Desember 2021',
    type: 'Legal Leaves 2021',
    status: 'Refused',
  },
  {
    id: '5',
    user: 'Rieka Maulida',
    fromDate: '30 Mei 2020',
    toDate: '30 Mei 2020',
    type: 'Legal Leaves 2020',
    status: 'Approved',
  },
  {
    id: '6',
    user: 'Rieka Maulida',
    fromDate: '01 Januari 2021',
    toDate: '31 Desember 2021',
    type: 'Legal Leaves 2021',
    status: 'Refused',
  },
  {
    id: '7',
    user: 'Rieka Maulida',
    fromDate: '30 Mei 2020',
    toDate: '30 Mei 2020',
    type: 'Legal Leaves 2020',
    status: 'Approved',
  },
  {
    id: '8',
    user: 'Rieka Maulida',
    fromDate: '01 Januari 2021',
    toDate: '31 Desember 2021',
    type: 'Legal Leaves 2021',
    status: 'Refused',
  },
];

// const _renderItem = (item, index) => (
//   <View>
//     <TouchableOpacity style={{height:100, marginLeft:'1%', justifyContent:'center', backgroundColor:index % 2 == 0 ? '#2180D9' : 'fff'}}>
//       <View style={{flexDirection:'row'}}>

//         <View style={{justifyContent:'center', width:'20%', marginLeft:'2%'}}>
//           <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.date}</Text>
//         </View>

//         <View style={{justifyContent:'center', width:'20%', marginLeft:'4%'}}>

//           <View style={{flexDirection:'row'}}>
//             <View style={{margin:'2%', width:80}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>Check In</Text>
//             </View>
//             <View style={{margin:'2%', width:30}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>:</Text>
//             </View>
//             <View style={{margin:'2%', width:40}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.start}</Text>
//             </View>
//           </View>

//           <View style={{flexDirection:'row'}}>
//             <View style={{margin:'2%', width:80}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>Check Out</Text>
//             </View>
//             <View style={{margin:'2%', width:30}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>:</Text>
//             </View>
//             <View style={{margin:'2%'}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.start}</Text>
//             </View>
//           </View>

//           <View style={{flexDirection:'row'}}>
//             <View style={{margin:'2%', width:80}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>Status</Text>
//             </View>
//             <View style={{margin:'2%', width:30}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>:</Text>
//             </View>
//             <View style={{margin:'2%'}}>
//               <Text style={{color:index % 2 == 0 ? '#fff':'#000', fontSize:12}}>{item.status}</Text>
//             </View>
//           </View>

//         </View>
//       </View>
//     </TouchableOpacity>
//   </View>

// )

const _renderItem = (item, index) => (
  <View style={{flex: 1}} key={`key-${index}`}>
    <TouchableOpacity
      style={{
        width: '96%',
        height: 100,
        marginTop: '2%',
        marginHorizontal: '2%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowOpacity: 0.15,
        shadowColor: '#000',
      }}>
      <View
        style={{
          textAlignVertical: 'center',
          width: '100%',
          marginLeft: '5%',
          marginTop: '2%',
        }}>
        <Text style={{color: '#434343', fontSize: 13, fontWeight: 'bold'}}>
          {item.employee_id[1]}
        </Text>
      </View>

      <View
        style={{textAlignVertical: 'center', width: '100%', marginLeft: '5%'}}>
        <Text style={{color: '#434343', fontSize: 13}}>
          {item.date_from != false
            ? moment(item.date_from, 'YYYY-MM-DD H:mm:ss')
                .tz('Asia/Jakarta')
                .format('DD MMMM YYYY')
            : ''}{' '}
          -{' '}
          {item.date_to != false
            ? moment(item.date_to, 'YYYY-MM-DD H:mm:ss')
                .tz('Asia/Jakarta')
                .format('DD MMMM YYYY')
            : ''}
        </Text>
        <Text style={{color: '#434343', fontSize: 13}}>{item.type}</Text>
        {/* <Text style={{color : '#000', fontSize:13}}>{item.fromDate != false ? moment(item.fromDate, 'YYYY-MM-DD H:mm:ss').tz('Asia/Jakarta').format('DD MMMM YYYY') : ''} - {item.toDate != false ? moment(item.toDate, 'YYYY-MM-DD H:mm:ss').tz('Asia/Jakarta').format('DD MMMM YYYY') : ''}</Text> */}
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            width: '50%',
            height: 45,
            flexDirection: 'row',
            margin: '2%',
          }}>
          <View
            style={{marginTop: '5%', marginBottom: '10%', marginLeft: '5%'}}>
            <Text style={{color: '#434343', fontSize: 13}}>
              {item.holiday_status_id[1]}
            </Text>
          </View>
          <MaterialIcons
            style={{
              backgroundColor: 'transparent',
              alignSelf: 'center',
              marginBottom: '7%',
              marginLeft: '5%',
            }}
            name={item.status == 'Approved' ? 'check-circle' : 'cancel'}
            color={item.status == 'Approved' ? '#005243' : 'red'}
            size={23}
          />
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const _itemSeparator = () => (
  <View
    style={{
      width: '100%',
      marginLeft: '2%',
      borderWidth: 0.5,
      opacity: 0.2,
      backgroundColor: '#ECECEC',
    }}
  />
);

const LeavesHistory = (props) => {
  const {navigate, goBack} = props.navigation;
  const [order, setOrder] = useState('id desc');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const data = async () => {
    setLoading(true);
    await regenerateToken();
    const response = await leaveHistory(
      await AsyncStorage.getItem('employee_id'),
      order,
      offset,
      limit,
    );
    console.log('data', data);
    console.log(await AsyncStorage.getItem('employee_id'));
    if (response.status >= 200 && response.status < 300) {
      const resJson = await response.json();
      console.log(resJson);
      setDataSource(resJson.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    data();
  }, []);

  const loadMore = () => {
    setOffset(offset + 10);
  };

  if (loading) {
    return (
      <View
        style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Loading ...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FBFBFB'}}>
        <View style={{height: '85%', marginRight: '1%', borderColor: '#000'}}>
          <FlatList
            data={dataSource}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => _renderItem(item, index)}
            ItemSeparatorComponent={() => _itemSeparator()}
            onEndReached={loadMore}
            onEndReachedThreshold={1}
            scrollEventThrottle={150}
          />
        </View>
        <View style={{height: '20%'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: '5%', marginLeft: '5%'}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 50,
                  borderColor: '#C7C7C7',
                  borderWidth: 1,
                  borderRadius: 25,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  ASC
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{marginTop: '5%', marginLeft: 'auto', marginRight: '5%'}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 50,
                  borderColor: '#C7C7C7',
                  borderWidth: 1,
                  borderRadius: 25,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  DESC
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

LeavesHistory.navigationOptions = ({navigation}) => ({
  title: 'History',
  headerBackTitle: null,
  header: (props) => {
    return (
      <View style={{height: 50, flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => navigation.goBack()}>
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <MaterialIcons
                style={{backgroundColor: 'transparent'}}
                name={'close'}
                color={'#005243'}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{color: '#005243', fontSize: 18, fontWeight: 'bold'}}>
            {props.scene.descriptor.options.title}
          </Text>
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  boxProfile: {
    opacity: 0.85,
    height: '55%',
    marginBottom: '1%',
    backgroundColor: '#2180D9',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },

  menuRound: {
    opacity: 0.85,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    width: '80%',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.68,
    elevation: 5,
  },
});

export default LeavesHistory;
