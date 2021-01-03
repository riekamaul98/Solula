import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {regenerateToken} from '../../services/LoginService';
import {attendanceList} from '../../services/AttendanceService';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment-timezone';

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

const AttendanceHistory = (props) => {
  const {navigate, goBack} = props.navigation;

  const [order, setOrder] = useState('id desc');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const _renderItem = (item, index) => (
    <View
      style={{
        height: 80,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <View>
        <Text style={{textAlign: 'center'}}>
          {moment(item.check_in).tz('Asia/Jakarta').format('DD/MM/YYYY')}
        </Text>
      </View>
      <View style={{flexDirection: 'row', width: '100%', height: 50}}>
        <TouchableOpacity
          style={{
            width: '45%',
            height: '100%',
            justifyContent: 'center',
            marginLeft: '5%',
          }}
          onPress={() => {
            item.x_latitude == false
              ? Alert.alert(
                  'Information',
                  "You haven't checked in",
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        return false;
                      },
                    },
                  ],
                  {cancelable: false},
                )
              : navigate('MapsAttendance', {
                  latitude: item.y_latitude,
                  longitude: item.x_longitude,
                  type: 'hadir',
                });
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center'}}>
              <Image
                source={require('../../images/markerCheckin.png')}
                style={{alignSelf: 'center', width: 30, height: 30}}
              />
            </View>
            <View
              style={{
                borderRightWidth: 1,
                marginLeft: '5%',
                marginRight: '5%',
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text>Check in</Text>
              <Text>
                {item.check_in == false
                  ? '-'
                  : moment
                      .utc(item.check_in)
                      .tz('Asia/Jakarta')
                      .format('HH:mm')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '45%',
            height: '100%',
            justifyContent: 'center',
            marginRight: '5%',
          }}
          onPress={() => {
            item.y_latitude_out == false
              ? Alert.alert(
                  'Information',
                  "You haven't checked out",
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        return false;
                      },
                    },
                  ],
                  {cancelable: false},
                )
              : navigate('MapsAttendance', {
                  latitude: item.y_latitude_out,
                  longitude: item.x_longitude_out,
                  type: 'pulang',
                });
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center'}}>
              <Image
                source={require('../../images/markerCheckout.png')}
                style={{alignSelf: 'center', width: 30, height: 30}}
              />
            </View>
            <View
              style={{
                borderRightWidth: 1,
                marginLeft: '5%',
                marginRight: '5%',
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text>Check out</Text>
              <Text>
                {item.check_out == false
                  ? '-'
                  : moment
                      .utc(item.check_out)
                      .tz('Asia/Jakarta')
                      .format('HH:mm')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const data = async () => {
    setLoading(true);
    await regenerateToken();
    const response = await attendanceList(
      await AsyncStorage.getItem('employee_id'),
      order,
      offset,
      limit,
    );
    console.log(await AsyncStorage.getItem('employee_id'));
    if (response.status >= 200 && response.status < 300) {
      const resJson = await response.json();
      console.log(resJson);
      setDataSource(resJson.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    data();
  }, []);

  const loadMore = () => {
    setOffset(offset + 10);
  };

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
        <View style={styles.containerList}>
          <FlatList
            style={styles.flatStyle}
            data={dataSource}
            keyExtractor={(item) => `item-${item.id}`}
            renderItem={({item, index}) => _renderItem(item, index)}
            ItemSeparatorComponent={() => _itemSeparator()}
            onEndReached={loadMore}
            onEndReachedThreshold={1}
            scrollEventThrottle={150}
          />
        </View>
        <View style={{height: '20%'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: '5%', marginLeft: '5%'}}>
              <TouchableOpacity style={styles.btnOrder}>
                <Text
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  ASC
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{marginTop: '5%', marginLeft: 'auto', marginRight: '5%'}}>
              <TouchableOpacity style={styles.btnOrder}>
                <Text
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                  DESC
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

AttendanceHistory.navigationOptions = ({navigation}) => ({
  title: 'Attendance History',
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
    opacity: 0.85,
    height: '55%',
    marginBottom: '1%',
    backgroundColor: '#2180D9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },

  containerList: {
    marginTop: '2%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: '85%',
    width: '95%',
    marginRight: '1%',
    // borderColor:'#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,
    elevation: 3,
    borderRadius: 5,
  },

  flatStyle: {
    borderRadius: 30,
  },
  btnOrder: {
    width: 60,
    height: 50,
    borderColor: '#C7C7C7',
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: 'center',
  },
});

export default AttendanceHistory;
