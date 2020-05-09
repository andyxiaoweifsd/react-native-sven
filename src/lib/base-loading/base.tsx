/*
 * @Date: 2020-03-20 18:29:38
 * @LastEditors: Save
 * @LastEditTime: 2020-05-09 20:33:59
 * @FilePath: /src/lib/base-loading/base.tsx
 * @Description: 自定义项目文件描述
 */
import React, { PureComponent } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
let { width, height } = Dimensions.get('window')
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
    let { size = 'large', color = '#000000', flag, msg = '', newHeight = height / 1.5, newWidth = width } = this.props
    return flag ? <View style = {{
        position: 'absolute',
        zIndex: 999999,
        height: newHeight,
        width: newWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {
          msg === '' ? <ActivityIndicator size={size} color={color}/> :
          <ActivityIndicator size={size} color={'white'} />
        }
    </View> : null
  }
}

export {
  BaseLoading
}