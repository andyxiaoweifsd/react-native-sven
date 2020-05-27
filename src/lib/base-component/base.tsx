/*
 * @Date: 2020-03-22 18:41:10
 * @LastEditors: Save
 * @LastEditTime: 2020-05-28 00:23:19
 * @FilePath: /src/lib/base-component/base.tsx
 * @Description: 基类的父类
 */

import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, Text, Image, TouchableOpacity } from "react-native";
import { flex, WidthAndHeight, Padding } from "../../assets/style";
import { SvenBaseLoading } from "../base-loading";
import { SVENDEVICE } from "../../util/info";
// import { RouteProp, ParamListBase } from "@react-navigation/native";

export interface SvenBaseIState {
  LOAD_STATE?: number,
  loadingFlag?: boolean
}
// interface route extends RouteProp<ParamListBase, string> {
//   params: any
// }
export interface SvenBaseIProps {
//  route: route,
//  navigation: any;
}

class SvenBase<T extends SvenBaseIProps, P = {}> extends Component<T, SvenBaseIState> {
  bgColor: string = '#F5F6FA'
  SetEntwork: any
  LOAD_RUN: number = 0 // 加载中
  LOAD_SUCCESS: number = 1 // 加载成功
  LOAD_NETWORK: number = 3 // 网络异常
  LOAD_ODD: number = 4 // 加载完成后页面异常或者因为页面数据到账崩溃

  readonly state: SvenBaseIState = {
    LOAD_STATE: this.LOAD_RUN,
    loadingFlag: false
  }
  constructor(props: T) {
    super(props)
    this.state = {
      ...this.state,
      ... (() => { 
        const State = this.initState()
        return State
       })()
    }
  }
  // 初始化 state 方法
  initState(): Object | null {
    return null
  }
  // 更新 setState 的方法
  onSetState<K extends keyof P>(
    state: ((prevState: Readonly<P>, props: Readonly<P>) => (Pick<P, K> | P | null)) | (Pick<P, K> | P | null),
    callback?: () => void
  ) {
    this.setState({
      ...state
    }, callback)
  }
  componentDidMount() {
    try {
      const { initData, initAxios } = this
      initData()
      initAxios()
    } catch(err) {
      console.log('err', err)
    }
  }
  // 初始化数据
  initData = (): void =>{}
  initAxios = (): void =>{}
  // 更新数据
  update(state: number, callback?: () => void) {
    const { LOAD_STATE } = this.state
    if (LOAD_STATE !== state) {
      this.setState({
        LOAD_STATE: state
      }, callback)
    }
  }
  loading(flag: boolean) {
    this.setState({
      loadingFlag: flag
    })
  }
  // 加载中
  renderLoadRun() {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={'#000000'} />
        <Text style={{ marginTop: 10, color: '#000000', fontSize: 15 }}>加载中...</Text>
      </View>
    )
  }

  // 网络异常
  renderNetwork() {
    let BarHeight = SVENDEVICE.StatusBarHeight = 20 + 44 + 50
    return (
      <View 
        style = {[
          flex.flex, 
          flex.CenterVertically, 
          {
            backgroundColor: '#F5F6FA'
          }
        ]}
      >
        <Image 
          source = {require('../../assets/image/Internet_slices/Internet.png')}
          style = {[WidthAndHeight(190, 150), {marginTop: -BarHeight}]}
        />
        <Text style = {{color: '#999999', fontSize: 16}}>网络连接异常</Text>
        <TouchableOpacity
          style = {[
            Padding(4, 12),
            {backgroundColor: '#F8A900', borderRadius: 3, marginTop: 15}
          ]}
          onPress = {() => {
            this.setState({
              LOAD_STATE: this.LOAD_RUN
            }, () => {
              this.initData()
            })
          }}
        >
          <Text style = {{color: '#fff', fontSize: 13}}>刷新</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // 加载异常
  renderOdd(): React.ReactNode {
    return null
  }
  // 头部
  renderHeader(): React.ReactNode {
    return null
  }
  // 主体
  renderComponent(): React.ReactNode {
    return null
  }
  // 兄弟组件
  renderSibling(): React.ReactNode {
    return null
  }
  // 其他组件
  renderOther(): React.ReactNode {
    return null
  }
  renderLoadStateComponents(): React.ReactNode {
    let { LOAD_STATE } = this.state
    if (this.LOAD_RUN === LOAD_STATE || LOAD_STATE === undefined) {
      // 加载中
      return this.renderLoadRun()
    } else if (LOAD_STATE === this.LOAD_SUCCESS) {
      try {
        // 加载成功
        return this.renderComponent();
      } catch(err) {
        // 加载成功但是由于未知原因导致页面异常
        return this.renderOdd()
      }
    } else if (LOAD_STATE === this.LOAD_NETWORK) {
      // 网络错误或者网络不稳定
      return this.renderNetwork()
    }
  }
  render() {
    const { loadingFlag = false } = this.state
    return (
      <View style = {{flex: 1, backgroundColor: this.bgColor}}>
        {this.renderHeader()}
        <View style = {{flex: 1}}>
          {this.renderLoadStateComponents()}
          {this.renderSibling()}
          <SvenBaseLoading flag = {loadingFlag} />
        </View>
        {this.renderOther()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  }
})

export {
  SvenBase
}