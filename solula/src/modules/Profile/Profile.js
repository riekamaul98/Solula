import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {profileDetails} from '../../services/ProfileService';

import LinearGradient from 'react-native-linear-gradient';
import DefaultProfile from '../Home/static/DefaultProfile';

const dataMenuProfile = [
  {
    id: '1',
    menu: 'Information',
    link: 'WorkInformation',
    height: 27,
    width: 26,
    image: require('../../images/information.png'),
  },
  {
    id: '2',
    menu: 'Insurance',
    link: 'Insurance',
    height: 27,
    width: 26,
    image: require('../../images/insurance.png'),
  },
  {
    id: '3',
    menu: 'Family Data',
    link: 'FamilyData',
    height: 27,
    width: 28,
    image: require('../../images/family.png'),
  },
  {
    id: '4',
    menu: 'BPJS & NPWP',
    link: 'BpjsNpwp',
    height: 29,
    width: 25,
    image: require('../../images/bpjsnpwp.png'),
  },
  {
    id: '5',
    menu: 'Payslip',
    link: 'Payslip',
    height: 20,
    width: 28,
    image: require('../../images/payslip.png'),
  },
  {
    id: '6',
    menu: 'Change Password',
    link: 'ChangePassword',
    height: 27,
    width: 26,
    image: require('../../images/changepassword.png'),
  },
];

const logout = async () => {
  await AsyncStorage.clear();
  RNRestart.Restart();
};

const _renderItem = (item, navigate) => (
  <TouchableOpacity
    style={{height: 50, marginLeft: '5%', flexDirection: 'row'}}
    onPress={() => navigate(item.link)}>
    <View style={{width: '20%', justifyContent: 'center'}}>
      <Image
        source={item.image}
        style={{width: item.width, height: item.height}}
      />
    </View>
    <View style={{justifyContent: 'center', alignSelf: 'center'}}>
      <Text style={{color: '#898A8F', textAlign: 'center'}}>{item.menu}</Text>
    </View>
    <View
      style={{justifyContent: 'center', marginLeft: 'auto', marginRight: '5%'}}>
      <Image source={require('../../images/arrow.png')} />
    </View>
  </TouchableOpacity>
);

const _itemSeparator = () => (
  <View
    style={{
      width: '100%',
      borderWidth: 0.5,
      opacity: 0.2,
      backgroundColor: '#ECECEC',
    }}
  />
);

const dataProfile = () => {
  const [imageProfile, setImageProfile] = useState('');
  const [emailProfile, setEmailProfile] = useState('');
  const [nameProfile, setNameProfile] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    profileDetails('public').then((res) => {
      setLoading(true);
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        res.json().then((resJson) => {
          console.log('ini resJson', resJson);
          setData(resJson.data[0]);
          profile();
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const profile = async () => {
      setLoading(true);
      setImageProfile(await AsyncStorage.getItem('image_profile'));
      setEmailProfile(await AsyncStorage.getItem('work_email'));
      setNameProfile(await AsyncStorage.getItem('name_profile'));
      setLoading(false);
    };

    // profileDetails('public').then((res) => {
    //   if(res.status >= 200 && res.status < 300){
    //     res.json()
    //     .then((resJson) => {
    //       console.log(resJson)
    //       setData(resJson.data)
    //     })
    //   }else{
    //     console.log('gagal')
    //     setLoading(false)
    //   }
    // })

    //profile()
  }, []);
  console.log('data', data);
  return {
    loading,
    imageProfile,
    emailProfile,
    nameProfile,
    data,
  };
};

const Profile = (props) => {
  const {navigate} = props.navigation;
  const {goBack} = props.navigation;
  const {
    loading,
    imageProfile,
    emailProfile,
    nameProfile,
    data,
  } = dataProfile();

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
        {/* <View style={{flex:0.1, backgroundColor:'#fff'}}>

        </View> */}
        <View style={styles.boxProfile}>
          <View>
            <Image
              // source={require('../../images/pp.jpg')}
              source={{uri: imageProfile == '' ? DefaultProfile : imageProfile}}
              style={{
                alignSelf: 'center',
                borderRadius: 50,
                width: 80,
                height: 80,
                marginTop: '1%',
              }}
            />
          </View>
          <View style={{marginTop: '3%'}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '500',
              }}>
              {nameProfile}
            </Text>
          </View>
          <View>
            <Text style={{color: '#fff', textAlign: 'center', fontSize: 12}}>
              {emailProfile}
            </Text>
          </View>
        </View>

        <View style={styles.boxField}>
          <View style={{marginTop: '5%'}}>
            <Text style={{color: '#000', fontSize: 16, textAlign: 'center'}}>
              Work Information
            </Text>
          </View>
          {/* <View style={{flexDirection:'row', marginTop:'5%', width:'100%'}}>
  <View style={{height:40, marginLeft:'auto', paddingLeft:'10%', justifyContent:'center'}}>
    <Text style={{color:'#000', fontSize:16, textAlign:'center'}}>Work Information</Text>
  </View> */}
          {/* <View style={{height:40, marginLeft:'auto', marginRight:'5%', justifyContent:'center'}}>
    <TouchableOpacity style={styles.roundedArrow} onPress={() => navigate('PrivateInformation')}>
      <View style={{justifyContent:'center'}}>
        <MaterialIcons
          style={{backgroundColor : 'transparent'}}
          name={"chevron-right"}
          color={"#000"}
          size={20}
        />
      </View>
    </TouchableOpacity>
  </View> */}
          {/* </View> */}

          <View style={{flex: 1, paddingBottom: '50%', marginBottom: '10%'}}>
            <ScrollView automaticallyAdjustContentInsets={true}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0.0, 0.99]}
                colors={['#FFFB91', '#FF9FFF']}
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  marginLeft: '8%',
                  marginTop: '1%',
                  width: 50,
                  height: 20,
                  borderRadius: 20,
                }}>
                <View style={{marginTop: '3%'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: '800',
                    }}>
                    Contact
                  </Text>
                </View>
              </LinearGradient>
              <View
                style={{
                  marginLeft: '3%',
                  marginTop: '5%',
                  marginRight: '3%',
                  borderWidth: 1,
                  borderColor: '#D6D6D6',
                  borderRadius: 10,
                  backgroundColor: '#FBFBFB',
                }}>
                <View style={{marginTop: '4%'}}>
                  <View
                    style={{
                      marginLeft: '5%',
                      borderBottomWidth: 1,
                      width: '90%',
                      borderColor: '#ECECEC',
                    }}>
                    <Text
                      style={{
                        color: '#313450',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      Work Location
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: '5%',
                      width: '90%',
                      borderColor: '#ECECEC',
                      paddingBottom: '3%',
                    }}>
                    <Text style={{color: '#313450', fontSize: 14}}>
                      {data.work_location ? data.work_location : ' - '}
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: '4%'}}>
                  <View
                    style={{
                      marginLeft: '5%',
                      borderBottomWidth: 1,
                      width: '90%',
                      borderColor: '#ECECEC',
                    }}>
                    <Text
                      style={{
                        color: '#313450',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      Work Mobile
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: '5%',
                      width: '90%',
                      borderColor: '#ECECEC',
                      paddingBottom: '3%',
                    }}>
                    <Text style={{color: '#313450', fontSize: 14}}>
                      {data.mobile_phone ? data.mobile_phone : '-'}
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: '2%'}}>
                  <View
                    style={{
                      marginLeft: '5%',
                      borderBottomWidth: 1,
                      width: '90%',
                      borderColor: '#ECECEC',
                    }}>
                    <Text
                      style={{
                        color: '#313450',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      Work Phone
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: '5%',
                      width: '90%',
                      borderColor: '#ECECEC',
                      paddingBottom: '3%',
                    }}>
                    <Text style={{color: '#313450', fontSize: 14}}>
                      {data.work_phone ? data.work_phone : ' - '}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  locations={[0.0, 0.99]}
                  colors={['#E0CCFF', '#C1FFF1']}
                  style={{
                    position: 'absolute',
                    zIndex: 9,
                    marginLeft: '8%',
                    marginTop: '1.5%',
                    width: 50,
                    height: 20,
                    borderRadius: 20,
                  }}>
                  <View style={{marginTop: '4%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: '800',
                      }}>
                      Position
                    </Text>
                  </View>
                </LinearGradient>
                <View
                  style={{
                    marginLeft: '3%',
                    marginTop: '5%',
                    marginRight: '3%',
                    paddingBottom: '5%',
                    borderWidth: 1,
                    borderColor: '#D6D6D6',
                    borderRadius: 10,
                    backgroundColor: '#FBFBFB',
                  }}>
                  <View style={{marginTop: '4%'}}>
                    <View
                      style={{
                        marginLeft: '5%',
                        borderBottomWidth: 1,
                        width: '90%',
                        borderColor: '#ECECEC',
                      }}>
                      <Text
                        style={{
                          color: '#313450',
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                        Department
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: '5%',
                        width: '90%',
                        borderColor: '#ECECEC',
                        paddingBottom: '3%',
                      }}>
                      <Text style={{color: '#313450', fontSize: 14}}>
                        {data.department_id == false
                          ? ' - '
                          : data.department_id[0]}
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop: '2%'}}>
                    <View
                      style={{
                        marginLeft: '5%',
                        borderBottomWidth: 1,
                        width: '90%',
                        borderColor: '#ECECEC',
                      }}>
                      <Text
                        style={{
                          color: '#313450',
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                        Job Title
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: '5%',
                        width: '90%',
                        borderColor: '#ECECEC',
                        paddingBottom: '3%',
                      }}>
                      <Text style={{color: '#313450', fontSize: 14}}>
                        {data.job_id == false ? ' - ' : data.job_id[1]}
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop: '2%'}}>
                    <View
                      style={{
                        marginLeft: '5%',
                        borderBottomWidth: 1,
                        width: '90%',
                        borderColor: '#ECECEC',
                      }}>
                      <Text
                        style={{
                          color: '#313450',
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                        Manager
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: '5%',
                        width: '90%',
                        borderColor: '#ECECEC',
                        paddingBottom: '3%',
                      }}>
                      <Text style={{color: '#313450', fontSize: 14}}>
                        {data.parent_id == false ? ' - ' : data.parent_id[1]}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{height: 50, marginTop: '5%'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FF6B6B',
                    height: 40,
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 25,
                    justifyContent: 'center',
                  }}
                  onPress={() => logout()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: '700',
                    }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: '10%'}} />
            </ScrollView>
          </View>
        </View>

        {/* <View style={styles.listMenuProfile}>

           <FlatList
            data={dataMenuProfile}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => _renderItem(item, navigate)}
            ItemSeparatorComponent = {() => _itemSeparator()}
          />
          <View style={{height:50}}>
            <TouchableOpacity
              style={{backgroundColor:'#FF6B6B', height:40, width:'50%', alignSelf:'center', borderRadius:25, justifyContent:'center'}}
              onPress={() => logout()}
            >
              <Text style={{textAlign:'center', color:'#fff', fontWeight:'700'}}>Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
         */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  boxField: {
    //flex: 0.7,
    //backgroundColor:'#fff',
    position: 'absolute',
    //zIndex:999,
    backgroundColor: '#fff',
    width: '92%',
    height: '100%',
    marginTop: '55%',
    marginLeft: '4%',
    marginRight: '4%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.26,
    shadowRadius: 10.68,
    elevation: 5,
  },
  boxProfile: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom:'1%',
    backgroundColor: '#005243',
    borderRadius: 25,
    margin: '4%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  listMenuProfile: {
    flex: 0.7,
    backgroundColor: '#fff',
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '3%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});

export default Profile;
