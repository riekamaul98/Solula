import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  View,
  Text,
  Alert,
  Button,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

import {LoginAction, saveCookies} from '../../services/LoginService';
import HeaderConfig from '../../utils/HeaderConfig';
import UrlList from '../../utils/UrlList';

const loadDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [dbArr, setDbArr] = useState([]);
  const [res, setRes] = useState('');

  useEffect(() => {
    setLoading(true);
    saveCookies('Skripsirieka1');
    const Url = `${UrlList('db_list')}`;
    const Header = HeaderConfig(
      'GET',
      'application/json',
      'application/x-www-form-urlencoded',
      null,
      null,
    );
    const response = fetch(`${Url}`, `${Header}`).then((res) => {
      console.log('here');
      if (res.status >= 200 && res.status < 300) {
        console.log(res);
        res.json().then((resJson) => {
          console.log(resJson);
          setDbArr(resJson.data);
          setLoading(false);
          setRes('success');
        });
      } else {
        setLoading(false);
        setRes('failed');
      }
    });
  }, []);

  return {
    dbArr,
    loading,
    res,
  };
};

const Login = (props) => {
  const [database, setDatabase] = useState('Skripsirieka1');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visibleModal, setVisibleModal] = useState(null);
  const [companySelect, setCompanySelect] = useState('-- Select Company --');

  // const {dbArr, loading, res} = loadDatabase();

  const {navigate} = props.navigation;

  const passwordInput = useRef(null);

  const selectedDB = (item) => {
    console.log(item.db);
    setDatabase(item.db);
    setCompanySelect(item.name);
    setVisibleModal(null);
  };

  // const _renderModalContent = () => (
  //   <View style={styles.containerModal}>
  //     <View
  //       style={{
  //         width: '100%',
  //         marginTop: '4%',
  //         marginBottom: '4%',
  //         height: 40,
  //         justifyContent: 'center',
  //       }}>
  //       <Text style={{color: '#000', textAlign: 'center', fontWeight: 'bold'}}>
  //         List Company
  //       </Text>
  //     </View>
  //     <View style={{flex: 1}}>
  //       <FlatList
  //         data={dbArr}
  //         renderItem={_renderItem}
  //         keyExtractor={(item, index) => `list-${index}`}
  //         // ItemSeparatorComponent={this._renderSeparatorView}
  //       />
  //     </View>
  //     <View style={{justifyContent: 'flex-end', marginTop: 'auto'}}>
  //       <Button onPress={() => setVisibleModal(null)} title="Close" />
  //     </View>
  //   </View>
  // );

  // const _renderItem = ({item}) => (
  //   <View
  //     style={{
  //       width: '100%',
  //       height: 40,
  //       justifyContent: 'center',
  //       borderColor: '#bdbdbd',
  //       borderTopWidth: 0.5,
  //     }}>
  //     <TouchableOpacity
  //       style={{width: '100%', height: 25, justifyContent: 'center'}}
  //       onPress={() => selectedDB(item)}>
  //       <Text style={{color: '#000', textAlign: 'center'}}>{item.name}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  // if (loading) {
  //   return (
  //     <View
  //       style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
  //       <View style={{justifyContent: 'center'}}>
  //         <Text
  //           style={{
  //             color: '#000',
  //             fontSize: 18,
  //             fontWeight: '700',
  //             textAlign: 'center',
  //           }}>
  //           Loading ...
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.containerImage}>
          <Image
            source={require('../../images/logo.png')}
            style={{width: 260, height: 100, alignSelf: 'center'}}
          />
        </View>

        <View style={styles.containerTitle}>
          <Text style={{color: '#000', fontSize: 26, fontWeight: 'bold'}}>
            Sign in
          </Text>
        </View>
        {/* 
        <View style={{marginTop: '5%'}}>
          <TouchableOpacity
            style={styles.btnModal}
            onPress={() => setVisibleModal('default')}>
            <View
              style={{
                justifyContent: 'center',
                paddingLeft: '5%',
                marginLeft: 'auto',
              }}>
              <Text style={{textAlign: 'center', color: '#fff'}}>
                {companySelect}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 0,
              }}>
              <MaterialIcons
                style={{backgroundColor: 'transparent'}}
                name={'arrow-drop-down'}
                color={'#fff'}
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={styles.containerField}>
          <View style={{marginBottom: '2%'}}>
            <Text style={{fontSize: 16, color: '#9F9F9F'}}>Email</Text>
          </View>
          <View>
            <TextInput
              style={{fontSize: 18}}
              returnKeyType={'next'}
              blurOnSubmit={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              onSubmitEditing={(e) => {
                passwordInput.current.focus();
              }}
              onChangeText={(data) => setUsername(data)}
              value={username}
            />
          </View>
        </View>

        <View style={styles.containerField}>
          <View style={{marginBottom: '2%'}}>
            <Text style={{fontSize: 16, color: '#9F9F9F'}}>Password</Text>
          </View>
          <View>
            <TextInput
              style={{fontSize: 18}}
              secureTextEntry={true}
              returnKeyType={'next'}
              blurOnSubmit={false}
              autoCapitalize={'none'}
              autoCorrect={false}
              ref={passwordInput}
              onChangeText={(data) => setPassword(data)}
              value={password}
            />
          </View>
        </View>

        <View style={{marginTop: '3%'}}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => LoginAction(navigate, database, username, password)}>
            <Text style={{color: '#fff', textAlign: 'center', fontSize: 14}}>
              SIGN IN
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.btnForgot}>
            <Text
              style={{
                marginTop: '3%',
                color: '#005243',
                textAlign: 'center',
                fontSize: 14,
              }}>
              FORGOT PASSWORD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 
      <Modal isVisible={visibleModal === 'default'} swipeDirection={['down']}>
        {_renderModalContent()}
      </Modal> */}
    </>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#005243',
    width: '85%',
    height: 40,
    borderRadius: 25,
    alignContent: 'center',
  },
  btnForgot: {
    alignSelf: 'center',
    marginTop: '3%',
    width: '80%',
    height: 40,
    alignContent: 'center',
  },
  containerImage: {
    marginTop: '15%',
    marginBottom: '5%',
  },
  containerTitle: {
    flex: 0.15,
    marginLeft: '7%',
    marginBottom: '2%',
  },
  containerField: {
    borderBottomWidth: 0.5,
    width: '85%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  containerModal: {
    backgroundColor: 'white',
    flex: 0.7,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  btnModal: {
    backgroundColor: '#bdbdbd',
    height: 40,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Login;
