/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import { initializeApp } from '@react-native-firebase/app';
// const firebaseConfig = {
//     // Your Firebase project config
//   };
  
//   initializeApp(firebaseConfig);
  

AppRegistry.registerComponent(appName, () => App);
