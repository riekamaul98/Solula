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
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {leaveStatusType, leaveSubmit} from '../../services/LeaveService';
import {regenerateToken} from '../../services/LoginService';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

const LeavesRequest = (props) => {
  const {navigate, goBack} = props.navigation;
  const [dataTypeLeave, setDataTypeLeave] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState('id desc');
  const [leaveTypeSelected, setLeaveTypeSelected] = useState(0);
  const [fromDateText, setFromDateText] = useState('From Date');
  const [toDateText, setToDateText] = useState('To Date');

  const [fromDateVal, setFromDateVal] = useState(moment().format('YYYY-MM-DD'));
  const [toDateVal, setToDateVal] = useState(moment().format('YYYY-MM-DD'));

  const [reportNote, setReportNote] = useState('');

  const [
    isDatePickerVisibleFromDate,
    setDatePickerVisibilityFromDate,
  ] = useState(false);

  const [isDatePickerVisibleToDate, setDatePickerVisibilityToDate] = useState(
    false,
  );

  // From Date
  const showDatePickerFromDate = () => {
    setDatePickerVisibilityFromDate(true);
  };

  const hideDatePickerFromDate = () => {
    setDatePickerVisibilityFromDate(false);
  };

  const handleConfirmFromDate = (date) => {
    console.log(date);
    setFromDateVal(moment(date).format('YYYY-MM-DD'));
    setFromDateText(moment(date).format('YYYY-MM-DD'));
    hideDatePickerFromDate();
  };

  // To Date

  const showDatePickerToDate = () => {
    console.log('show');
    setDatePickerVisibilityToDate(true);
  };

  const hideDatePickerToDate = () => {
    setDatePickerVisibilityToDate(false);
  };

  const handleConfirmToDate = (date) => {
    console.log('here');
    setToDateVal(moment(date).format('YYYY-MM-DD'));
    setToDateText(moment(date).format('YYYY-MM-DD'));
    hideDatePickerToDate();
  };

  // To Date

  const dataLeaveType = async () => {
    setLoading(true);
    const response = await leaveStatusType(
      await AsyncStorage.getItem('employee_id'),
      order,
    );
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      const resJson = await response.json();
      console.log('result resJson', resJson);
      let data = resJson.data;

      let dataModified = [];
      for (let i = 0; i < data.length; i++) {
        let dataDump = {};
        dataDump.id = data[i].id;
        dataDump.display_name = data[i].display_name;
        dataModified.push(dataDump);
      }

      setDataTypeLeave(dataModified);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataLeaveType();
  }, []);

  const submitLeave = async () => {
    setLoading(true);
    if (leaveTypeSelected == 0) {
      alert('please choose type');
      setLoading(false);
    } else {
      const response = await leaveSubmit(
        await AsyncStorage.getItem('employee_id'),
        leaveTypeSelected,
        fromDateVal,
        toDateVal,
        reportNote,
      );
      if (response.status >= 200 && response.status < 300) {
        const resJson = await response.json();
        Alert.alert(
          'Information',
          'Submit Leave Success',
          [
            {
              text: 'OK',
              onPress: () => goBack(),
            },
          ],
          {cancelable: false},
        );
        console.log(resJson);
        setLoading(false);
      } else {
        Alert.alert(
          'Attention',
          'Submit Leave Failed',
          [
            {
              text: 'OK',
              onPress: () => goBack(),
            },
          ],
          {cancelable: false},
        );
        setLoading(false);
      }
    }
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
        <View style={styles.box}>
          <View style={styles.textBox}>
            {/* <TextInput
              placeholder={'Leave Type'}
              placeholderTextColor={'#898A8F'}
              style={styles.textInput}
            /> */}
            <Picker
              selectedValue={leaveTypeSelected}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                setLeaveTypeSelected(itemValue)
              }>
              <Picker.Item label="Select" value="0" />
              {dataTypeLeave.map((x, idx) => (
                <Picker.Item key={idx} label={x.display_name} value={x.id} />
              ))}
              {/* <Picker.Item label="JavaScript" value="js" /> */}
            </Picker>
          </View>
          <View style={styles.textBox}>
            <TouchableOpacity onPress={showDatePickerFromDate}>
              <Text style={{marginLeft: '5%'}}>{fromDateText}</Text>
            </TouchableOpacity>
            {/* <TextInput
              placeholder={'From Date'}
              placeholderTextColor={'#898A8F'}
              style={styles.textInput}
            /> */}
          </View>
          <View style={styles.textBox}>
            <TouchableOpacity onPress={showDatePickerToDate}>
              <Text style={{marginLeft: '5%'}}>{toDateText}</Text>
            </TouchableOpacity>
            {/* <TextInput
              placeholder={'To Date'}
              placeholderTextColor={'#898A8F'}
              style={styles.textInput}
            /> */}
          </View>
          <View style={styles.textBoxArea}>
            <TextInput
              placeholder={'Remarks'}
              placeholderTextColor={'#898A8F'}
              style={styles.textInputArea}
              value={reportNote}
              onChangeText={(text) => setReportNote(text)}
              multiline={true}
              numberOfLines={5}
            />
          </View>
          <View style={{marginTop: '5%', marginBottom: '10%'}}>
            <View style={{alignSelf: 'center', width: '100%'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#005243',
                  height: 50,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  width: '60%',
                  borderRadius: 25,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: '800',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <DateTimePicker
        isVisible={isDatePickerVisibleFromDate}
        onConfirm={handleConfirmFromDate}
        onCancel={hideDatePickerFromDate}
      />
      <DateTimePicker
        isVisible={isDatePickerVisibleToDate}
        onConfirm={handleConfirmToDate}
        onCancel={hideDatePickerToDate}
      />
    </>
  );
};

LeavesRequest.navigationOptions = ({navigation}) => ({
  title: 'Apply For Leaves',
  headerBackTitle: null,
  header: (props) => {
    console.log(props);
    return (
      <View style={{height: 50, flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => navigation.goBack()}>
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <MaterialIcons
                style={{backgroundColor: 'transparent'}}
                name={'arrow-back-ios'}
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
  box: {
    height: '80%',
    marginBottom: '1%',
    margin: '2%',
    marginTop: '1%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 10.68,
    elevation: 5,
  },
  textBox: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 50,
    width: '90%',
    borderWidth: 0.5,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#D6D6D6',
  },
  textBoxArea: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 150,
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    borderColor: '#D6D6D6',
  },
  textInput: {
    justifyContent: 'center',
    paddingLeft: '5%',
    paddingTop: '3%',
    fontSize: 14,
    color: '#898A8F',
  },
  textInputArea: {
    justifyContent: 'flex-start',
    paddingLeft: '5%',
    paddingTop: '5%',
    fontSize: 14,
    color: '#898A8F',
  },
});

export default LeavesRequest;
