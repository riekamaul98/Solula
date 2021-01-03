import {
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import UrlFormBodyEncode from '../utils/UrlFormBodyEncode'
import HeaderConfig from '../utils/HeaderConfig';
import UrlList from '../utils/UrlList'


const expensesSummaryDetail = async (id='') => {
  const formBody = UrlFormBodyEncode({
    id
  });
  const url = `${UrlList('expenses_summaryDetail')}${formBody}`
  console.log(url)
  const response = await fetch(url,
    HeaderConfig('GET', 'application/json', 'application/x-www-form-urlencoded', null, 
      await AsyncStorage.getItem('access_token')));
    console.log(response)
  return response;
}

const expensesDetail = async (id) => {
  const formBody = UrlFormBodyEncode({
    id
  });
  const url = UrlList('expenses_detail') + formBody;
  const response = await fetch(url,
    HeaderConfig('GET', 'application/json', 'application/x-www-form-urlencoded', null, 
      await AsyncStorage.getItem('access_token')));
  return response;
}

const expensesList = async (state, employee_id, order, offset = '', limit = '') => {
  const formBody = UrlFormBodyEncode({
    state,
    employee_id,
    order,
    offset,
    limit
  });
  const url = UrlList('expenses_list') + formBody;
  const response = await fetch(url,
    HeaderConfig('GET', 'application/json', 'application/x-www-form-urlencoded', null, await AsyncStorage.getItem('access_token')));
  return response;
}

const expensesProductList = async (order) => {
  const formBody = UrlFormBodyEncode({
    order
  });
  const url = UrlList('expenses_productList') + formBody;
  const response = await fetch(url,
    HeaderConfig(
      'GET', 
      'application/json', 
      'application/x-www-form-urlencoded', 
      null, 
      await AsyncStorage.getItem('access_token')
    ));
  return response;
}

const expenseAttachDetail = async (id) => {
  const formBody = UrlFormBodyEncode({
    id
  });
  const url = UrlList('get_attach_detail') + formBody;
  const response = await fetch(url,
    HeaderConfig(
      'GET', 
      'application/json', 
      'application/x-www-form-urlencoded', 
      null, 
      await AsyncStorageController.getItemStorage('access_token')
    ));
  return response;
}


export {
  expensesSummaryDetail,
  expensesList,
  expensesProductList,
  expensesDetail,
  expenseAttachDetail
}