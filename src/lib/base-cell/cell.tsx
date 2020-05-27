/*
 * @Date: 2020-03-18 14:35:55
 * @LastEditors: Save
 * @LastEditTime: 2020-05-27 18:37:43
 * @FilePath: /src/lib/base-cell/cell.tsx
 * @Description: cell
 */
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleProp, TextStyle, ImageSourcePropType, ImageStyle } from 'react-native';
import { IPropsCellWrap } from './type'
import { Padding, link, flex, WidthAndHeight } from '../../assets/style';
import { SvenIcons } from '../icons';
import { CachedImage } from '../base-image-cache';

class SvenCellWrap<T extends IPropsCellWrap, P> extends PureComponent<T, any> {
  constructor(props: T) {
    super(props)
  }
  protected Wrap() {
    const { 
      children, 
      WrapHeight = 44,
      linkFlag = true,
      linkStyle,
      wrapStyle
    } = this.props
    return (
      <View style = {{position: 'relative'}}>
        <View style = {[
          {
            height: WrapHeight
          },
          Padding(0, 10),
          wrapStyle
        ]}>
          {children}
        </View>
        {
          linkFlag ? 
          <View 
            style = {[
              link.link, 
              {
                backgroundColor: '#E8E8E8',
                marginLeft: 10,
                position: 'absolute',
                bottom: -0.5,
                width: '100%',
                borderTopLeftRadius: 0.5,
                borderBottomLeftRadius: 0.5
              }, 
              linkStyle
            ]}
          ></View> : null
        }
      </View>
    )
  }
  render() {
    return this.Wrap()
  }
}

interface CellIprops extends IPropsCellWrap {
  children?: React.ReactNode,
  customFlag?: boolean,
  customElement?: React.ReactNode,
  leftMsg?: string,
  leftMsgStyle?: StyleProp<TextStyle>,
  rightMsg?: string,
  rightMsgStyle?: StyleProp<TextStyle>
}

const SvenCell = (props: CellIprops) => {
  let { customFlag = false, customElement, children, leftMsg, leftMsgStyle, rightMsg, rightMsgStyle } = props
  return (
    <SvenCellWrap {...props}>
      <View 
        style = {[
          {
            height: props.WrapHeight || 44
          },
          flex.alignItemsCenter,
          flex.rowBetween
        ]}
      >
        <View>
          <Text style = {[{color: '#333333', fontSize: 16}, leftMsgStyle]}>{leftMsg}</Text>
        </View>
        <View style = {[flex.row, flex.alignItemsCenter]}>
          <Text style = {[{color: '#333333', fontSize: 16}, rightMsgStyle]}>{rightMsg}</Text>
          {children}
          {rightElementFunc(customFlag, customElement)}
        </View>
      </View>
    </SvenCellWrap>
  )
}

interface TapCellIprops extends CellIprops {
  callBack: () => void
}
const SvenTapCell = (props: TapCellIprops) => {
  let { customFlag = true, callBack, children } = props
  return (
    <TouchableOpacity
      onPress = {callBack}
    >
      <SvenCell {...props} customFlag = {customFlag}>
        {children}
      </SvenCell>
    </TouchableOpacity>
  )
}

interface TapCellIconIprops extends TapCellIprops {
  iconUrl: () => ImageSourcePropType,
  Wh?: StyleProp<ImageStyle>
}
const SvenTapCellIcon = (props: TapCellIconIprops) => {
  const { callBack, WrapHeight = 44, iconUrl, Wh = {}, customFlag = true, wrapStyle = {paddingLeft: 0, paddingRight: 5} } = props
  return (
    <TouchableOpacity style = {[{height: WrapHeight}, flex.row]}
      onPress = {callBack}
    >
      <View 
        style = {[
          WidthAndHeight(WrapHeight),
          flex.CenterVertically
        ]}
      >
        <CachedImage 
          style = {[WidthAndHeight(24), Wh]}
          source = {iconUrl()}
        />
      </View>
      <View style = {flex.flex}>
        <SvenCell 
          {...props} 
          customFlag = {customFlag} 
          wrapStyle = {wrapStyle}
          linkStyle = {{marginLeft: 0}}
        />
      </View>
    </TouchableOpacity>
  )
}

export function rightElementFunc(customFlag: boolean, children?: React.ReactNode) {
  return (
    <View style = {{marginTop: 2}}>
    {
      customFlag ? 
      <SvenIcons 
        type = {'Feather'}
        typeName = {'chevron-right'}
        color = {'#999999'}
        size = {23}
      /> : children
    }
  </View>
  )
}

export {
  SvenCellWrap,
  SvenCell,
  SvenTapCell,
  SvenTapCellIcon
}