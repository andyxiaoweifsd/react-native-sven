/*
 * @Date: 2020-03-20 18:29:38
 * @LastEditors: Save
 * @LastEditTime: 2020-05-10 01:47:25
 * @FilePath: /src/lib/base-loading/base.tsx
 * @Description: loading
 */
import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { screen } from '../../util/info'
const { width, height } = screen
interface IProps {
  size?: any,
  color?: string,
  flag: boolean,
  msg?: any,
  newHeight?: number,
  newWidth?: number
}
class BaseLoading extends PureComponent<IProps> {
  constructor (props: IProps) {
    super(props)
  }
  render () {
    let { size = 'large', color = '#000000', flag, newHeight = height / 1.5, newWidth = width } = this.props
    return flag ? <View style = {{
        position: 'absolute',
        zIndex: 999999,
        height: newHeight,
        width: newWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size={size} color={color} />
    </View> : null
  }
}

export {
  BaseLoading
}