/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import {employeeList} from '../../services/EmployeService';
import ReqPermission from '../../utils/ReqPermission';
import DefaultProfile from './static/DefaultProfile';
import {regenerateToken} from '../../services/LoginService';

const dataMenu = [
  {
    id: '1',
    menu: 'Attendances',
    link: 'Attendance',
    image: require('../../images/attendance.png'),
  },
  {
    id: '2',
    menu: 'Leaves',
    link: 'Leaves',
    image: require('../../images/leaves.png'),
  },
  // {
  //   id: '3',
  //   menu: 'Expenses',
  //   link: 'Expense',
  //   image: require('../../images/expenses.png'),
  // },
  // {
  //   id: '4',
  //   menu: 'Contact',
  //   link: 'Contact',
  //   image: require('../../images/contact.png'),
  // },
  // {
  //   id: '5',
  //   menu: 'Approval',
  //   link: 'Approval',
  //   image: require('../../images/approval.png'),
  // },
  // {
  //   id: '6',
  //   menu: 'Resignation',
  //   link: 'Attendance',
  //   image: require('../../images/resignation.png'),
  // },
];

const listMenu = (props) => {
  const {navigate} = props.navigation;
  return dataMenu.map((data, index) => (
    <View
      key={index}
      style={{
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
      }}>
      <TouchableOpacity
        style={styles.listMenu}
        onPress={() => navigate(data.link)}>
        <View>
          <Image
            source={data.image}
            style={{alignSelf: 'center', width: 45, height: 45}}
          />
        </View>
      </TouchableOpacity>
      <View style={{justifyContent: 'center', marginTop: '5%'}}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: '7%',
            fontSize: 14,
            fontWeight: '600',
          }}>
          {data.menu}
        </Text>
      </View>
    </View>
  ));
};

const dataResend = [
  {
    id: '1',
    name: 'Ghozi Alwan',
    job: 'Programmer',
  },
  {
    id: '2',
    name: 'Ghozi Alwan',
    job: 'Programmer',
  },
  {
    id: '3',
    name: 'Ghozi Alwan',
    job: 'Programmer',
  },
  {
    id: '4',
    name: 'Ghozi Alwan',
    job: 'Programmer',
  },
];

const listResendChat = () => {
  return dataResend.map((data, index) => (
    <View
      key={index}
      style={{height: 200, marginLeft: '2%', marginRight: '2%'}}>
      <View style={{position: 'absolute', zIndex: 999, alignSelf: 'center'}}>
        <Image
          source={require('../../images/logo.png')}
          style={{height: 60, width: 60, borderRadius: 30}}
        />
      </View>
      <View style={styles.boxResendChat}>
        <View style={{marginTop: '50%'}}>
          <View style={{marginTop: '5%'}}>
            <Text
              style={{textAlign: 'center', fontWeight: '500', fontSize: 11}}>
              {data.name}
            </Text>
          </View>
          <View style={{marginTop: '5%'}}>
            <Text style={{textAlign: 'center', fontSize: 10}}>{data.job}</Text>
          </View>
        </View>
      </View>
    </View>
  ));
};

const dataEmployee = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let employee = await employeeList(
        '',
        '',
        "[('user_id', '=', " + (await AsyncStorage.getItem('uid')) + ')]',
      );
      console.log('employee - ', employee);
      if (employee.status >= 200 && employee.status < 300) {
        let employeeJson = await employee.json();
        console.log(employeeJson);
        AsyncStorage.multiSet([
          ['employee_id', employeeJson.data[0].id.toString()],
          [
            'image_profile',
            employeeJson.data[0].image == null
              ? DefaultProfile
              : employeeJson.data[0].image,
          ],
          ['name_profile', employeeJson.data[0].display_name.toString()],
          ['home_id', employeeJson.data[0].address_home_id[0].toString()],
          ['work_email', employeeJson.data[0].work_email.toString()],
        ]);
        setLoading(false);
      } else {
        console.log('here');
        setLoading(false);
        Alert.alert(
          'Information',
          'Network is error !',
          [
            {
              text: 'OK',
              onPress: () => {
                return false;
              },
            },
          ],
          {cancelable: false},
        );
      }
    };

    ReqPermission();
    getData();
  }, []);

  return {
    loading,
  };
};

const Home = (props) => {
  const {loading} = dataEmployee();

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
      <View style={{flex: 1}}>
        {/* <View
          style={{
            width: '100%',
            marginTop: '10%',
            marginBottom: '10%',
            position: 'absolute',
            justifyContent: 'center',
          }}></View> */}
        <View style={styles.boxProfile}>
          <Image
            source={require('../../images/logo.png')}
            style={{
              width: 260,
              height: 100,
              alignSelf: 'center',
              opacity: 1,
            }}
          />
        </View>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              flexWrap: 'wrap',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: '5%',
            }}>
            {listMenu(props)}
          </View>

          {/* <View style={{paddingBottom:'5%'}}>
            <View style={{marginTop:'8%', flexDirection:'row', height:30}}>
              <View style={{marginLeft:'5%'}}>
                <Text style={{fontSize:12, fontWeight:'500', color:'#3F4079'}}>Resend Chat</Text>
              </View>
              <View style={{marginLeft:'auto', marginRight:'5%'}}>
                <TouchableOpacity>
                  <Text style={{color:'#2180D9', fontSize:12}}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>


            <View style={{justifyContent:'center', flex:1}}>
              <ScrollView  
                showsHorizontalScrollIndicator={false}
                horizontal={true} contentContainerStyle={{width: 600}}>
                {listResendChat()}
              </ScrollView>
            </View>
          </View> */}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  boxProfile: {
    justifyContent: 'center',
    opacity: 1,
    flex: 0.5,
    marginBottom: '1%',
    backgroundColor: '#F5F5F5',
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

  listMenu: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },

  boxResendChat: {
    marginTop: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 130,
    width: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
});

export default Home;
