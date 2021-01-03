import {
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import UrlFormBodyEncode from '../utils/UrlFormBodyEncode'
import HeaderConfig from '../utils/HeaderConfig';
import UrlList from '../utils/UrlList'

const checkAttendance = async () => {
  const formBody = UrlFormBodyEncode({
    domain: `[('employee_id', '=', ${await AsyncStorage.getItem('employee_id')}), ('check_out', '=', False)]`,
  });
  const Url = UrlList('attendance_status') + formBody;
  const response = await fetch(Url,
    HeaderConfig('GET', 'application/json', 'application/x-www-form-urlencoded', null, await AsyncStorage.getItem('access_token')));

  if(response.status >= 200 && response.status < 300){
    const responseJson = await response.json()
    return responseJson
  }else{
    Alert.alert('Information', 'Network is error !', [
      { text: 'OK', onPress: () => { return false } },
    ], { cancelable: false });
  }
}

const checkin = async (x_longitude, y_latitude, photo) => {
  const formBody = UrlFormBodyEncode({
    employee_id: await AsyncStorage.getItem('employee_id'),
    x_longitude,
    y_latitude,
    photo,
  });

  const Url = UrlList('attendance_checkin');
  const response = await fetch(Url,
    HeaderConfig('POST', 'application/json', 'application/x-www-form-urlencoded', formBody, await AsyncStorage.getItem('access_token')));
    return response;
}

const checkout = async (id_attendances, x_longitude_out, y_latitude_out, photo_out) => {
  const formBody = UrlFormBodyEncode({
    id: id_attendances,
    check_out: 'SYS_TIMES_NOW',
    x_longitude_out,
    y_latitude_out,
    photo_out,
  });
  const url = UrlList('attendance_checkout');
  const response = await fetch(url,
    HeaderConfig('PUT', 'application/json', 'application/x-www-form-urlencoded', formBody, await AsyncStorage.getItem('access_token')));
    return response
}

const attendanceList = async (employee_id, order, offset = '', limit = '', time_start = '', time_end = '') => {
  const formBody = UrlFormBodyEncode({
    employee_id,
    order,
    offset,
    limit,
    time_start,
    time_end,
  });
  const url = UrlList('attendance_list') + formBody;
  const response = await fetch(url,
    HeaderConfig('GET', 'application/json', 'application/x-www-form-urlencoded', null, await AsyncStorage.getItem('access_token')));
  return response;
}



export {
  checkAttendance,
  checkin,
  checkout,
  attendanceList
}