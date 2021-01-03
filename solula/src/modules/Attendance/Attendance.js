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
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  checkAttendance,
  checkin,
  checkout,
} from '../../services/AttendanceService';

const options = {
  title: 'Select Avatar',
  quality: 0.4,
  maxWidth: 200,
  maxHeight: 200,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Attendance = (props) => {
  const {navigate, goBack} = props.navigation;
  const [currentTime, setCurrentTime] = useState('');
  const [statusAttendance, setStatusAttendance] = useState('');
  const [loading, setLoading] = useState(false);
  const [longitude, setlongitude] = useState('');
  const [latitude, setlatitude] = useState('');
  const [dataResponse, setDataResponse] = useState([]);
  const [idAttendance, setIdAttendance] = useState('');

  const submiAttendance = async (param, goBack) => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        setDataResponse(response);
        if (param === 'checkin') {
          submitAttendance(param, longitude, latitude, response.data);
        } else {
          submitAttendance(
            param,
            longitude,
            latitude,
            response.data,
            idAttendance,
          );
        }
      }
    });
  };

  const submitAttendance = async (
    param,
    longitude,
    latitude,
    photo,
    id = '',
  ) => {
    setLoading(true);
    const response =
      param === 'checkin'
        ? await checkin(longitude, latitude, photo)
        : await checkout(id, longitude, latitude, photo);

    if (response.status >= 200 && response.status < 300) {
      Alert.alert(
        'Information',
        param === 'checkin' ? 'Check in success' : 'check out success',
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
      setStatusAttendance(param === 'checkin' ? 'checkout' : 'checkin');
      setLoading(false);
    } else {
      Alert.alert(
        'Information',
        param === 'checkin' ? 'Check in failed' : 'check out failed',
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
      setLoading(false);
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        setlongitude(info.coords.longitude);
        setlatitude(info.coords.latitude);
      },
      (err) => {
        Alert.alert(
          'Information',
          `${err.message}`,
          [{text: 'OK', onPress: () => goBack()}],
          {cancelable: false},
        );
      },
    );

    const check = async () => {
      setLoading(true);
      let statusCheck = await checkAttendance();
      console.log(statusCheck);
      if (statusCheck.count == 0) {
        setStatusAttendance('checkin');
        setIdAttendance('0');
      } else {
        setStatusAttendance('checkout');
        setIdAttendance(statusCheck.data[0].id);
      }
      setLoading(false);
    };

    check();

    const tick = setInterval(() => {
      setCurrentTime(moment(new Date()).format('LTS'));
    });

    return function cleanup() {
      clearInterval(tick);
    };
  }, []);

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
        <View style={styles.boxProfile}>
          <Image
            source={require('../../images/logo.png')}
            style={{
              width: 260,
              height: 100,
              alignSelf: 'center',
              opacity: 1,
              marginTop: 5,
            }}
          />
          <View style={{marginTop: '5%'}}>
            <View style={{justifyContent: 'center'}}>
              {/* <Text style={{color:'#fff', textAlign:'center', fontSize:38, fontWeight:'800'}}>09:41:25</Text> */}
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
        </View>

        <View>
          <TouchableOpacity
            style={styles.menuRound}
            onPress={() => navigate('AttendanceHistory')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FF6B6B',
                fontWeight: '800',
              }}>
              Attendance History
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    </>
  );
};

Attendance.navigationOptions = ({navigation}) => ({
  title: 'Attendance',
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
                color={'#898A8F'}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{color: '#2180D9', fontSize: 18, fontWeight: 'bold'}}>
            {props.scene.descriptor.options.title}
          </Text>
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  boxProfile: {
    justifyContent: 'center',
    opacity: 1,
    flex: 0.7,
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
  btnCheckin: {
    backgroundColor: '#fff',
    width: '50%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  btnCheckout: {
    backgroundColor: '#FF6B6B',
    width: '50%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
});

export default Attendance;
