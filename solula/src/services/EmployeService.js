import UrlList from '../utils/UrlList';
import HeaderConfig from '../utils/HeaderConfig';
import UrlFormBodyEncode from '../utils/UrlFormBodyEncode';
import AsyncStorage from '@react-native-community/async-storage';
import {regenerateToken, saveCookies} from './LoginService';

const employeeList = async (
  limit = '',
  offset = '',
  domain = '',
  order = 'id asc',
) => {
  try {
    // await saveCookies(await AsyncStorage.getItem('db'))
    await regenerateToken();
    const formBody = UrlFormBodyEncode({
      limit,
      offset,
      domain,
      order,
    });
    const url = UrlList('employee_list') + formBody;
    console.log(url);
    const response = await fetch(
      url,
      HeaderConfig(
        'GET',
        'application/json',
        'application/x-www-form-urlencoded',
        null,
        await AsyncStorage.getItem('access_token'),
      ),
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    // throw new Error('err');
    return 'ERROR';
  }
};

const employeeEdit = async (id, image) => {
  try {
    const formBody = UrlFormBodyEncode({
      image,
    });
    const url = UrlList('profile_update') + id;
    const response = await fetch(
      url,
      HeaderConfig(
        'PUT',
        'application/json',
        'application/x-www-form-urlencoded',
        formBody,
        await AsyncStorageController.getItemStorage('access_token'),
      ),
    );
    return response;
  } catch (error) {
    throw new Error('err');
  }
};

const changePassword = async (id, password) => {
  try {
    const formBody = UrlFormBodyEncode({
      password,
    });
    const url = UrlList('change_password') + id;
    const response = await fetch(
      url,
      HeaderConfig(
        'PUT',
        'application/json',
        'application/x-www-form-urlencoded',
        formBody,
        await AsyncStorageController.getItemStorage('access_token'),
      ),
    );
    return response;
  } catch (error) {
    throw new Error('err');
  }
};

export {employeeList, employeeEdit, changePassword};
