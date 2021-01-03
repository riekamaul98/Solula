import {Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import UrlFormBodyEncode from '../utils/UrlFormBodyEncode';
import HeaderConfig from '../utils/HeaderConfig';
import UrlList from '../utils/UrlList';

const LoginAction = async (navigate, db, login, password) => {
  // await saveCookies(db);
  const formBody = UrlFormBodyEncode({
    db,
    login,
    password,
  });
  console.log(db);

  const Url = `${UrlList('login')}${formBody}`;
  console.log(Url);
  const Header = HeaderConfig(
    'GET',
    'application/json',
    'application/x-www-form-urlencoded',
    null,
    null,
  );
  const response = await fetch(`${Url}`, `${Header}`);
  if (response.status >= 200 && response.status < 300) {
    const responseJson = await response.json();
    if (responseJson.data == 'authentication failed') {
      Alert.alert(
        'Information',
        'Username or password Wrong !',
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
    } else {
      await AsyncStorage.multiSet([
        ['db', db.toString()],
        ['username', login.toString()],
        ['password', password.toString()],
        ['access_token', responseJson.access_token.toString()],
        ['uid', responseJson.uid.toString()],
        ['company_id', responseJson.company_id.toString()],
      ]);
      navigate('Home');
    }
  } else {
    console.log(response);
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

const saveCookies = async (db) => {
  const formBody = UrlFormBodyEncode({
    db,
  });
  const Url = UrlList('save_cookies') + formBody;
  console.log(Url);
  const response = await fetch(
    Url,
    HeaderConfig(
      null,
      'application/json',
      'application/x-www-form-urlencoded',
      null,
      null,
    ),
  );
  console.log(response);
  return response;
};

const regenerateToken = async () => {
  const formBody = UrlFormBodyEncode({
    db: await AsyncStorage.getItem('db'),
    login: await AsyncStorage.getItem('username'),
    password: await AsyncStorage.getItem('password'),
  });
  const url = `${UrlList('login')}${formBody}`;
  console.log(url);
  const response = await fetch(
    url,
    HeaderConfig(
      'GET',
      'application/json',
      'application/x-www-form-urlencoded',
      null,
      null,
    ),
  );
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    const responseJson = await response.json();
    AsyncStorage.multiSet([
      ['access_token', responseJson.access_token.toString()],
    ]);
  } else {
    throw new Error('err');
  }
};

export {LoginAction, saveCookies, regenerateToken};
