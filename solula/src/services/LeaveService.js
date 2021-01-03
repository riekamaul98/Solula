import {Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import UrlFormBodyEncode from '../utils/UrlFormBodyEncode';
import HeaderConfig from '../utils/HeaderConfig';
import UrlList from '../utils/UrlList';

const leaveHistory = async (employee_id, order, offset, limit) => {
  const formBody = UrlFormBodyEncode({
    employee_id: employee_id,
    state: "['validate', 'refuse']",
    order: order,
    offset: offset,
    limit: limit,
  });
  const Url = UrlList('leaves_history') + formBody;
  const response = await fetch(
    Url,
    HeaderConfig(
      'GET',
      'application/json',
      'application/x-www-form-urlencoded',
      null,
      await AsyncStorage.getItem('access_token'),
    ),
  );

  return response;
};

const leaveStatus = async (employee_id, order, offset, limit) => {
  const formBody = UrlFormBodyEncode({
    employee_id: employee_id,
    // state: "['validate', 'refuse']",
    order: order,
    offset: offset,
    limit: limit,
  });
  const Url = UrlList('leaves_list') + formBody;
  const response = await fetch(
    Url,
    HeaderConfig(
      'GET',
      'application/json',
      'application/x-www-form-urlencoded',
      null,
      await AsyncStorage.getItem('access_token'),
    ),
  );

  return response;
};

const leaveStatusType = async (employee_id, order) => {
  const formBody = UrlFormBodyEncode({
    employee_id: employee_id,
    order: order,
  });
  const Url = UrlList('leaves_type') + formBody;
  const response = await fetch(
    Url,
    HeaderConfig(
      'GET',
      'application/json',
      'application/x-www-form-urlencoded',
      null,
      await AsyncStorage.getItem('access_token'),
    ),
  );

  return response;
};

const leaveSubmit = async (
  employee_id,
  holiday_status_id,
  date_from,
  date_to,
  report_note,
) => {
  const formBody = UrlFormBodyEncode({
    employee_id: employee_id,
    holiday_status_id: holiday_status_id,
    date_from: date_from,
    date_to: date_to,
    report_note: report_note,
  });
  const Url = UrlList('leaves_submit');
  const response = await fetch(
    Url,
    HeaderConfig(
      'POST',
      'application/json',
      'application/x-www-form-urlencoded',
      formBody,
      await AsyncStorage.getItem('access_token'),
    ),
  );
  return response;
};

export {leaveHistory, leaveStatus, leaveStatusType, leaveSubmit};
