/*
 * @Date: 2020-03-17 02:25:14
 * @LastEditors: Save
 * @LastEditTime: 2020-05-27 18:10:59
 * @FilePath: /src/lib/icons/index.tsx
 * @Description: icon
 */
import React, { PureComponent } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Ionicons from 'react-native-vector-icons/Ionicons'

interface IProps {
  type: string,
  typeName: string,
  size: number,
  color: string,
  icon?: any
}
class Icons extends PureComponent<IProps, any> {
  constructor(props: IProps) {
    super(props)
  }
  static iconType(type: string, Wrap?: any) {
    switch (type) {
      case 'AntDesign':
        return AntDesign
      case 'Entypo':
        return Entypo
      case 'EvilIcons':
        return EvilIcons
      case 'Feather':
        return Feather
      case 'Octicons':
        return Octicons
      case 'FontAwesome':
        return FontAwesome
      default:
        return Wrap
    }
  }
  render() {
    const { type, typeName, size, color, icon } = this.props
    let IconWrap: any = Icons.iconType(type, icon)
    return <IconWrap
      name = {typeName}
      size = {size} 
      style = {{color: color}}
    />
  }
}
interface IconProps {
  name: any,
  size: any,
  style: any
}
export { Icons }