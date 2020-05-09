/*
 * @Date: 2020-03-16 19:10:31
 * @LastEditors: Save
 * @LastEditTime: 2020-05-09 20:37:34
 * @FilePath: /src/util/info.ts
 * @Description: 手机信息
 */
import React from 'react';
import { StatusBar, Platform, Dimensions } from 'react-native';
import deviceInfo from 'react-native-device-info'
import { getBottomSpace } from 'react-native-iphone-x-helper';

/**
 * 屏幕信息
 */
const {height,width} =  Dimensions.get('window');
const screen = {
  width : width,
  height : height
};

// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;


const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
      (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
  )
}
function isIphoneXR() {
  return (
    Platform.OS === 'ios' &&
    ((SCREEN_HEIGHT === XR_HEIGHT && SCREEN_WIDTH === XR_WIDTH) ||
      (SCREEN_HEIGHT === XR_WIDTH && SCREEN_WIDTH === XR_HEIGHT))
  )
}

const screenDim= Dimensions.get("screen")
const DEVICE={
  width:width,
  height:height,
  screenWidth: Platform.OS == 'ios'? width : screenDim.width,
  screenHeight:Platform.OS == 'ios'? height : screenDim.height,
  StatusBarHeight:Platform.select({
    ios: isIphoneX() || isIphoneXR() ? 44 : 20, 
    // android: StatusBar.currentHeight, default: 0
    android: 0
  }),
  android:Platform.OS === 'android',
  ios:Platform.OS == 'ios',
  isIphoneX:isIphoneX() || isIphoneXR(),
  getBottomSpace: getBottomSpace
}

function getVersion(): string {
  let res =  deviceInfo.getVersion()
  return res
}
async function getUserClientId() {
  let res: string = deviceInfo.getUniqueId()
  return res
}

export {
  screen,
  getVersion,
  getUserClientId,
  DEVICE
}