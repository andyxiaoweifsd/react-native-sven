/*
 * @Date: 2020-05-09 19:57:28
 * @LastEditors: Save
 * @LastEditTime: 2020-05-09 23:51:51
 * @FilePath: /index.ts
 * @Description: 
 */

import { NativeModules } from 'react-native';

const { RNReactNativeSven } = NativeModules;

export default RNReactNativeSven;

export * from './src/lib/base-component'
export * from './src/lib/base-loading'
