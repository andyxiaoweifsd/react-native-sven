/*
 * @Date: 2020-03-16 18:25:18
 * @LastEditors: Save
 * @LastEditTime: 2020-05-27 18:37:35
 * @FilePath: /src/lib/base-header/index.tsx
 * @Description: header
 */
import React, { PureComponent, ReactElement, ReactNode } from 'react';
import { View, StyleProp, TextStyle, ViewStyle, Text, TouchableOpacity } from 'react-native';
import { WidthAndHeight, flex } from '../../assets/style';
import { DEVICE } from '../../util/info';
const startHeight = DEVICE.StatusBarHeight || 0
import { Icons } from '../icons';

interface IPropsHeader {
  leftElement?: ReactNode,
  enterElement?: ReactElement,
  enterIconColor?: string,
  headerTitle?: string,
  centerStyle?: StyleProp<TextStyle>,
  rightElement?: ReactNode,
  headerStyle?: StyleProp<ViewStyle>,
  underline?: boolean
}
class Header extends PureComponent<IPropsHeader, any> {
  constructor(props: IPropsHeader) {
    super(props)
  }

  tapLeftGoBack() {}

  // 左边 element
  RenderLeftElement = (leftElement: ReactNode, enterIconColor: string = '#2C2925') => {
    if (typeof leftElement !== 'undefined') {
      return leftElement
    } else {
      return (
        <TouchableOpacity 
          style = {[
            WidthAndHeight(44, 50),
            flex.justifyContentCenter
          ]}
          onPress = {this.tapLeftGoBack}
        >
        <Icons 
          type = {'Feather'}
          typeName = {'chevron-left'}
          color = {enterIconColor}
          size = {24}
        />
      </TouchableOpacity>
      )
    }
  }
  // 中间 element
  RenderCenterElement(enterElement: ReactNode, headerTitle: string, centerStyle: StyleProp<TextStyle>): ReactNode {
    if (typeof enterElement !== 'undefined') {
      return enterElement
    } else {
      return (
        <Text 
          style = {[
            {color: '#0F0C0A', fontSize: 18, fontWeight: '500'},
            centerStyle
          ]}
        >
          {headerTitle}
        </Text>
      )
    }
  }
  RenderRightElement(rightElement: ReactNode): ReactNode {
    if (typeof rightElement !== 'undefined') {
      return rightElement
    } else {
      return null
    }
  }
  render() {
    const { 
      headerStyle,
      leftElement, 
      enterElement, headerTitle = '', centerStyle, enterIconColor, 
      rightElement,
      underline = false
    } = this.props
    return (
      <View
        style = {[
          {
            height: 44 + startHeight,
            backgroundColor: '#fff',
            position: 'relative',
          },
          underline ? {
            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            borderBottomWidth: 0.5
          } : null,
          headerStyle
        ]}
      >
        <View style = {[
          {
            height: 44,
            marginTop: startHeight
          }
        ]}>
          <View
            style = {[
              {
                position: 'absolute',
                zIndex: 999,
                left: 10,
                height: 44,
              },
              flex.justifyContentCenter,
            ]}
          >
            {this.RenderLeftElement(leftElement, enterIconColor)}
          </View>
          <View 
            style = {[
              flex.flex,
              flex.justifyContentCenter,
              flex.alignItemsCenter,
            ]}
          >
            {this.RenderCenterElement(enterElement, headerTitle, centerStyle)}
          </View>
          <View style = {[
            {
              position: 'absolute',
              zIndex: 999,
              right: 10,
              height: 44,
            },
            flex.justifyContentCenter,
          ]}>
            {this.RenderRightElement(rightElement)}
          </View>
        </View>
      </View>
    )
  }
}
export { Header }