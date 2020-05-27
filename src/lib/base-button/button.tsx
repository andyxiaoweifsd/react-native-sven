/*
 * @Date: 2020-03-17 20:29:54
 * @LastEditors: Save
 * @LastEditTime: 2020-05-10 02:55:19
 * @FilePath: /src/lib/base-button/button.tsx
 * @Description: 按钮
 */
import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, StyleProp } from 'react-native';
import { flex } from '../../assets/style'

export interface BaseButtonIProps {
  value: string,
  bgColor: string,
  borderColor: string,
  color: string,
  callBack: () => void,
  
  borderRadius?: number,
  fontSize?: number,
  height?: number,
  style?: StyleProp<ViewStyle>
}

const BaseButton = (props: BaseButtonIProps) => {
  let { value, bgColor, borderColor = '#fff', color, height, callBack, borderRadius = 5, fontSize = 17, style } = props
  if(!height) height = 50
  return <TouchableOpacity style = {[
    {

      height: height, 
      backgroundColor: bgColor, 
      borderColor: borderColor, 
      borderRadius: borderRadius,
      borderWidth: 1
    },
    flex.justifyContentCenter, flex.alignItemsCenter,
    style
  ]} onPress = {callBack}>
    <Text style = {{color: color, fontSize: fontSize}}>{value}</Text>
  </TouchableOpacity>
}

const BaseButtonMax = () => {
  return (
    <View></View>
  )
}

export { BaseButton, BaseButtonMax }