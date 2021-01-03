import React from 'react';
import {View, Image, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import Splash from './src/modules/Splash/Splash';
import Login from './src/modules/Login/Login';
import Home from './src/modules/Home/Home';
import Profile from './src/modules/Profile/Profile';
import Notification from './src/modules/Notification/Notification';

import Attendance from './src/modules/Attendance/Attendance';
import AttendanceRev from './src/modules/AttendanceRev/AttendanceRev';
import AttendanceHistory from './src/modules/AttendanceHistory/AttendanceHistory';
import AttendanceRevForm from './src/modules/AttendanceRev/AttendanceRevForm';

import Overtime from './src/modules/Overtime/Overtime';
import OvertimeForm from './src/modules/Overtime/OvertimeForm';

import Leaves from './src/modules/Leaves/Leaves';
import LeavesRequest from './src/modules/Leaves/LeavesRequest';
import LeavesCancelRequest from './src/modules/Leaves/LeavesCancelRequest';
import LeavesHistory from './src/modules/Leaves/LeavesHistory';
import LeavesStatus from './src/modules/Leaves/LeavesStatus';

import Expense from './src/modules/Expense/Expense';
import ExpenseReport from './src/modules/Expense/ExpenseReport';
import ExpenseForm from './src/modules/Expense/ExpenseForm';

import WorkInformation from './src/modules/Profile/WorkInformation';
import PrivateInformation from './src/modules/Profile/PrivateInformation';
import Insurance from './src/modules/Profile/Insurance';
import FamilyData from './src/modules/Profile/FamilyData';
import BpjsNpwp from './src/modules/Profile/BpjsNpwp';

import Contact from './src/modules/Contact/Contact';
import GroupContact from './src/modules/Contact/GroupContact';
import Approval from './src/modules/Approval/Approval';

import ChangePassword from './src/modules/ChangePassword/ChangePassword';
import Payslip from './src/modules/Profile/Payslip';
import MapsAttendance from './src/modules/MapsAttendance/MapsAttendance';

const Icon = (image, width, height) => (
  <View style={{marginTop: '2%', justifyContent: 'center'}}>
    <Image source={image} style={{width: width, height: height}} />
  </View>
);

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
      title: null,
      headerBackTitle: null,
    },
  },
  WorkInformation: {
    screen: WorkInformation,
    navigationOptions: {
      title: 'Information',
      headerBackTitle: null,
    },
  },
  PrivateInformation: {
    screen: PrivateInformation,
    navigationOptions: {
      title: 'Information',
      headerBackTitle: null,
    },
  },
  Insurance: {
    screen: Insurance,
    navigationOptions: {
      title: 'Insurance',
      headerBackTitle: null,
      headerLeft: null,
      header: null,
    },
  },
  FamilyData: {
    screen: FamilyData,
    navigationOptions: {
      title: 'Family Data',
      headerBackTitle: null,
    },
  },
  BpjsNpwp: {
    screen: BpjsNpwp,
    navigationOptions: {
      title: 'BPJS & NPWP',
      headerBackTitle: null,
    },
  },
  Payslip: {
    screen: Payslip,
    navigationOptions: {
      title: 'Payslip',
      headerBackTitle: null,
    },
  },
});

const TabBarComponent = (props) => (
  <BottomTabBar
    style={{
      backgroundColor: '#fff',
      // height:50,
      borderTopWidth: -1,
      // borderRadius:20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 20,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
    }}
    {...props}
  />
);

const HomeScreen = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerLeft: null,
        header: null,
        headerBackTitle: null,
        tabBarIcon: Icon(require('./src/images/home.png'), 20, 20),
      },
    },
    // Notification: {
    //   screen: Notification,
    //   navigationOptions: {
    //     header: null,
    //     headerBackTitle: null,
    //     tabBarIcon: Icon(require('./src/images/notification.png'), 20, 20),
    //   },
    // },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        header: null,
        headerBackTitle: null,
        tabBarIcon: Icon(require('./src/images/account.png'), 16, 20),
      },
    },
  },

  {
    tabBarComponent: (props) => <TabBarComponent {...props} />,
  },
);

const AppNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
      headerBackTitle: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
      headerBackTitle: null,
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
      headerLeft: null,
      headerBackTitle: null,
    },
  },
  Attendance: {
    screen: Attendance,
    navigationOptions: {
      title: 'Attendance',
      headerBackTitle: null,
    },
  },
  AttendanceRev: {
    screen: AttendanceRev,
    navigationOptions: {
      title: 'Attendance Revision',
      headerBackTitle: null,
    },
  },
  AttendanceHistory: {
    screen: AttendanceHistory,
    navigationOptions: {
      title: 'Attendance History',
      headerBackTitle: null,
    },
  },
  MapsAttendance: {
    screen: MapsAttendance,
    navigationOptions: {
      title: 'Maps Attendance',
      headerBackTitle: null,
    },
  },
  AttendanceRevForm: {
    screen: AttendanceRevForm,
    navigationOptions: {
      title: 'Revision Form',
      headerBackTitle: null,
    },
  },
  Overtime: {
    screen: Overtime,
    navigationOptions: {
      title: 'Overtime',
      headerBackTitle: null,
    },
  },
  OvertimeForm: {
    screen: OvertimeForm,
    navigationOptions: {
      title: 'Overtime Form',
      headerBackTitle: null,
    },
  },

  Leaves: {
    screen: Leaves,
    headerLeft: null,
        header: null,
    navigationOptions: {
    title: 'Leaves ',
    //headerBackTitle: null,
    },
  },
  LeavesRequest: {
    screen: LeavesRequest,
    navigationOptions: {
      title: 'Apply For Leaves',
      //headerBackTitle: null,
    },
  },
  LeavesCancelRequest: {
    screen: LeavesCancelRequest,
    navigationOptions: {
      title: 'Leaves Cancel Form',
      headerBackTitle: null,
    },
  },
  LeavesStatus: {
    screen: LeavesStatus,
    navigationOptions: {
    title: 'Status',
    //headerBackTitle: null,
  },
  },
  LeavesHistory: {
    screen: LeavesHistory,
    navigationOptions: {
      title: 'History',
      //headerBackTitle: null,
    },
  },
  Expense: {
    screen: Expense,
    navigationOptions: {
      title: 'Expenses',
      headerBackTitle: null,
    },
  },
  ExpenseReport: {
    screen: ExpenseReport,
    navigationOptions: {
      title: 'Expense Report',
      headerBackTitle: null,
    },
  },
  ExpenseForm: {
    screen: ExpenseForm,
    navigationOptions: {
      title: 'Expense Form',
      headerBackTitle: null,
    },
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      title: 'Contact',
      headerBackTitle: null,
    },
  },
  GroupContact: {
    screen: GroupContact,
    navigationOptions: {
      title: 'Contact',
      headerBackTitle: null,
    },
  },
  Approval: {
    screen: Approval,
    navigationOptions: {
      title: 'Contact',
      headerBackTitle: null,
    },
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      title: 'Change Password',
      headerBackTitle: null,
    },
  },
});

// const testNav = createStackNavigator({
//   Test : {
//     screen : Carousel,
//     navigationOptions : {
//       // title : 'Contact',
//       // headerBackTitle: null,
//       // header : null
//     }
//   }
// })

export default createAppContainer(AppNavigator);
// export default createAppContainer(testNav)
