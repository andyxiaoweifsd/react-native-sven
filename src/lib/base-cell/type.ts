/*
 * @Date: 2020-03-18 14:41:11
 * @LastEditors: Save
 * @LastEditTime: 2020-05-27 19:04:25
 * @FilePath: /src/lib/base-cell/type.ts
 * @Description: 自定义项目文件描述
 */
import React, { ReactElement } from 'react';
import { TextInputProps, StyleProp, ViewStyle } from 'react-native'

export interface IPropsCellWrap {
  WrapHeight?: number,
  wrapStyle?: StyleProp<ViewStyle>,
  linkFlag?: boolean,
  linkStyle?: StyleProp<ViewStyle>
}

export interface IPropsCellInput extends IPropsCellWrap {
  rightElement?: ReactElement,
  placeholder?: string,
  inputObj?: TextInputProps,
  callBackMsg: (msg: string) => void,
  value?: string
}
