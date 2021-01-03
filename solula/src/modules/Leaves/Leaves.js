/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const dataStatus = [
  {
    id: '1',
    title: 'Legal Leaves 2019',
    maxLeave: '12',
    current: '4',
  },
  {
    id: '2',
    title: 'Sick',
    maxLeave: '12',
    current: '5',
  },
  {
    id: '3',
    title: 'Family',
    maxLeave: '12',
    current: '10',
  },
  {
    id: '4',
    title: 'Non - Paid',
    maxLeave: '12',
    current: '8',
  },
  {
    id: '5',
    title: 'Pregnant',
    maxLeave: '12',
    current: '0',
  },
  {
    id: '5',
    title: 'Pregnant',
    maxLeave: '12',
    current: '0',
  },
  {
    id: '5',
    title: 'Pregnant',
    maxLeave: '12',
    current: '0',
  },
];

const statusBar = () => {
  return dataStatus.map((data, index) => {
    return (
      <View key={index} style={{marginTop: '4%'}}>
        <View style={{flexDirection: 'row', marginLeft: '3%'}}>
          <View>
            <Text style={{color: '#fff', fontWeight: '600'}}>{data.title}</Text>
          </View>
          <View
            style={{marginLeft: '3%', marginLeft: 'auto', marginRight: '3%'}}>
            <Text style={{color: '#fff', fontWeight: '600'}}>
              {data.current}/{data.maxLeave} days
            </Text>
          </View>
        </View>
        <View style={styles.barStatus}>
          <View
            style={{
              backgroundColor: '#fff',
              width:
                (parseFloat(data.current) / parseFloat(data.maxLeave)) * 100 +
                '%',
              height: 20,
              borderRadius: 25,
            }}></View>
        </View>
      </View>
    );
  });
};

const Leaves = (props) => {
  const {navigate, goBack} = props.navigation;
  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.boxProfile}>
          <Image
            source={require('../../images/logo.png')}
            style={{
              width: 265,
              height: 100,
              alignSelf: 'flex-end',
              opacity: 1,
              marginTop: 5,
            }}
          />
          {/* <View style={{marginTop: '5%'}}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontSize: 38,
                  fontWeight: '800',
                }}>
                {currentTime}
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '800',
                }}>
                {moment(new Date()).format('dddd, DD MMMM YYYY')}
              </Text>
            </View>
          </View>
          <View style={{marginTop: '5%'}}>
            {statusAttendance === 'checkin' ? (
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  style={styles.btnCheckin}
                  onPress={() => submiAttendance(statusAttendance)}>
                  <Text
                    style={{
                      color: '#2180D9',
                      fontSize: 14,
                      fontWeight: '800',
                      textAlign: 'center',
                    }}>
                    Check In
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  style={styles.btnCheckout}
                  onPress={() => submiAttendance(statusAttendance, goBack)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: '800',
                      textAlign: 'center',
                    }}>
                    Check Out
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
         */}
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: '5%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={styles.listMenu}
            onPress={() => navigate('LeavesRequest')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#005243',
                fontWeight: '800',
              }}>
              Apply For Leaves
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listMenu}
            onPress={() => navigate('LeavesStatus')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#005243',
                fontWeight: '800',
              }}>
              Status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listMenu}
            onPress={() => navigate('LeavesHistory')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#005243',
                fontWeight: '800',
              }}>
              History
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>

        {/* <View style={{backgroundColor:'#fff', width:'100%', height:'8%'}}>
          <View style={{flexDirection:'row'}}>
            <View style={{ marginLeft:'5%', marginTop:'6%'}}>
              <TouchableOpacity onPress={() => goBack()}>
                <Image
                  source={require('../../images/grayx.png')}
                  // style={{width:20, height:20}}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft:'5%', marginTop:'5%'}}>
              <Text style={{color:'#2180D9', fontWeight:'800', fontSize:20}}>
                Leaves Summary
              </Text>
            </View>
          </View>
        </View> */}

        {/* <ScrollView style={styles.boxProfile} automaticallyAdjustContentInsets={true} >
         {statusBar()}
         <View style={{marginBottom:'10%'}}></View>
        </ScrollView> */}

        {/* <View style={{height:'50%'}}>
          <View style={{marginTop:'2%'}}>
            <TouchableOpacity style={styles.menuRound} onPress={() => navigate('LeavesRequest')}>
              <Text style={{textAlign:'center', color:'#3F4079', fontWeight:'800'}}>
                Leaves Request
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:'2%'}}>
            <TouchableOpacity style={styles.menuRound} onPress={() => navigate('LeavesCancelRequest')}>
              <Text style={{textAlign:'center', color:'#3082CC', fontWeight:'800'}}>
                Leaves Cancel Request
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:'2%'}}>
            <TouchableOpacity style={styles.menuRound} onPress={() => navigate('LeavesHistory')}>
              <Text style={{textAlign:'center', color:'#FF6B6B', fontWeight:'800'}}>
                Leaves History
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
       */}
      </View>
    </>
  );
};

Leaves.navigationOptions = ({navigation}) => ({
  title: 'Leaves',
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
                color={'#898A8F'}
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
    // opacity : 0.85,
    height: '30%',
    marginBottom: '1%',
    paddingBottom: '5%',
    backgroundColor: '#005243',
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
    borderRadius: 15,
    width: 80,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
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

  barStatus: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    height: 20,
    width: '95%',
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: '#8F8F8F',
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

export default Leaves;
