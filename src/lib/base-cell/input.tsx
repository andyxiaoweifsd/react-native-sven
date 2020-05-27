import React, { PureComponent, ReactElement, Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleProp, TextStyle } from 'react-native';
import { flex, WidthAndHeight, Padding } from '../../assets/style';
import { SvenIcons } from '../icons';
import { SvenCellWrap } from './cell'
import { IPropsCellInput } from './type'


interface IState {
  value: string
}
class SvenCellInput extends PureComponent<IPropsCellInput, IState> {
  readonly state: IState = {
    value: this.props.value || ''
  }
  constructor(props: IPropsCellInput) {
    super(props)
  }
  valueMsg(msg: string): void {
    this.setState({
      value: msg
    }, () => {
      this.props.callBackMsg(msg)
    })
  }
  render() {
    const {
      rightElement,
      placeholder,
      inputObj
    } = this.props
    const { 
      value
    } = this.state
    return (
      <SvenCellWrap {...this.props}>
        <View style = {[
          flex.rowBetween,
          flex.alignItemsCenter,
        ]}>
          <TextInput
            // ref = {e => this.textInputRef = e}
            placeholder = {placeholder}
            placeholderTextColor = {'#999999'}
            value = {value}
            style = {{
              fontSize: 16,
              width: 230,
              height: 43,
            }}
            onChangeText = {(msg) => {
              this.valueMsg(msg)
            }}
            {...inputObj}
          />
          <View style = {{width: 20}}>
            {
              value.length ?
              <TouchableOpacity 
                style = {[
                  WidthAndHeight(20), 
                  flex.alignItemsCenter, 
                  flex.justifyContentCenter,
                ]}
                onPress = {() => {
                  this.valueMsg('')
                  // this.textInputRef.clear()
                  // console.log(this.textInputRef)
                }}
              >
                <SvenIcons 
                  type = {'Feather'}
                  typeName = {'x-circle'}
                  color = {'#999999'}
                  size = {20}
                />
              </TouchableOpacity> : null
            }
          </View>
          {rightElement}
        </View>
      </SvenCellWrap>
    )
  }
}

// 密码输入框
interface IStatePasswordCell {
  secureTextEntry: boolean,
  value: string
}
interface IPropsPasswordCell extends IPropsCellInput {

}
class SvenPasswordCellInput extends PureComponent<IPropsPasswordCell, IStatePasswordCell> {
  readonly state: IStatePasswordCell = {
    secureTextEntry: true,
    value: ''
  }
  constructor(props: IPropsPasswordCell) {
    super(props)
  }
  _secureFlagIcon(value: string, secureTextEntry: boolean) {
    if (value.length) {
      return (
        <TouchableOpacity
          onPress = {() => {
            this.setState({
              secureTextEntry: !secureTextEntry
            })
          }}
        >
          <SvenIcons 
            type = {'Entypo'}
            typeName = {secureTextEntry ? 'eye' : 'eye-with-line'}
            size = {20}
            color = {'#B3B3B3'}
          />
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }
  render() {
    const { secureTextEntry, value } = this.state
    const { rightElement, placeholder, inputObj, callBackMsg } = this.props
    return (
      <SvenCellWrap {...this.props}>
        <View style = {[
          flex.rowBetween,
          flex.alignItemsCenter
        ]}>
          <TextInput 
            secureTextEntry = {secureTextEntry}
            placeholderTextColor = {'#999999'}
            placeholder = {placeholder}
            value = {value}
            style = {{
              fontSize: 16,
              width: 230,
              height: 43,
            }}
            onChangeText = {(msg) => {
              this.setState({
                value: msg
              }, () => {
                callBackMsg(msg)
              })
              
            }}
            {...inputObj}
          />
          {this._secureFlagIcon(value, secureTextEntry)}
          {rightElement}
        </View>
      </SvenCellWrap>
    )
  }
}

interface LeftMsgAndInputIprops extends IPropsCellInput {
  leftMsg?: string,
  leftMsgStyle?: StyleProp<TextStyle>,
}
class SvenLeftMsgAndInputCell extends PureComponent<LeftMsgAndInputIprops, IState> {
  readonly state: IState = {
    value: ''
  }
  constructor(props: LeftMsgAndInputIprops) {
    super(props)
  }
  render() {
    const { placeholder, inputObj, callBackMsg, leftMsg, leftMsgStyle, rightElement } = this.props
    return (
      <SvenCellWrap {...this.props}>
        <View
          style = {[
            {
              height: 44
            },
            flex.rowBetween,
            flex.alignItemsCenter,
            flex.justifyContentCenter
          ]}
        >
          <Text 
            style = {[
              {
                color: '#0F0C0A', fontSize: 16, width: '30%'
              },
              leftMsgStyle
            ]}
          >{leftMsg}</Text>
          <View
            style = {[
              {
                width: '70%'
              },
              flex.row,
              flex.alignItemsCenter
            ]}
          >
            <TextInput
              placeholder = {placeholder}
              style = {{
                fontSize: 16,
                flex: 1,
                textAlign: 'right'
              }}
              onChangeText = {(msg) => {
                this.setState({
                  value: msg
                }, () => {
                  callBackMsg(msg)
                })
                
              }}
              {...inputObj}
            />
            {rightElement}
          </View>
        </View>
      </SvenCellWrap>
    )
  }
}

export { SvenCellInput, SvenPasswordCellInput, SvenLeftMsgAndInputCell }