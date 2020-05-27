/*
 * @Date: 2020-03-16 19:10:31
 * @LastEditors: Save
 * @LastEditTime: 2020-05-10 01:30:18
 * @FilePath: /src/util/info.ts
 * @Description: 手机信息
 */
import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';

/**
 * 屏幕信息
 */
const { height, width } =  Dimensions.get('window');
const screen = {
  width : width,
  height : height
};

const screenDim = Dimensions.get("screen")

const DEVICE = {
  width:width,
  height:height,
  screenWidth: Platform.OS == 'ios'? width : screenDim.width,
  screenHeight:Platform.OS == 'ios'? height : screenDim.height,
  StatusBarHeight: getStatusBarHeight(isIphoneX()),
  android:Platform.OS === 'android',
  ios:Platform.OS == 'ios',
  isIphoneX: isIphoneX,
  getBottomSpace: getBottomSpace
}

export {
  screen,
  DEVICE
}