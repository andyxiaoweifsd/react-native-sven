/*
 * @Date: 2020-03-22 18:59:04
 * @LastEditors: Save
 * @LastEditTime: 2020-05-09 20:42:28
 * @FilePath: /src/lib/base-component/base.scroll.component.tsx
 * @Description: 自定义项目文件描述
 */
import React from 'react';
import { RefreshControlPropsAndroid, RefreshControl, ScrollView, ScrollViewProps, SafeAreaView, View } from 'react-native';
import { SvenBase, SvenBaseIState, SvenBaseIProps } from './base';
import { flex } from '../../assets/style';
export interface SvenBaseScrollComponentIState extends SvenBaseIState {
  refreshFlag?: boolean
}
export interface SvenBaseScrollComponentIProps extends SvenBaseIProps {}

class SvenBaseScrollComponent<T extends SvenBaseScrollComponentIProps, S extends SvenBaseScrollComponentIState> extends SvenBase<T, S> {
  scrollViewProps: ScrollViewProps | undefined // scrollview 配置项
  refreshFlag: boolean = false // 是否开启下拉刷新功能
  refreshObj: RefreshControlPropsAndroid | undefined // 下拉刷新的配置

  readonly state: S = {
    ...this.state,
    refreshFlag: false
  }
  constructor(props: T) {
    super(props)
  }

  // 上拉刷新方法
  refreshFun = () => {}
  renderRefreshControl() {
    const refreshFlag: boolean = this.state.refreshFlag as boolean
    if (!this.refreshFlag) return
    return {
      refreshControl: (
        <RefreshControl 
          refreshing = {refreshFlag}
          onRefresh = {this.refreshFun}
          {...this.refreshObj}
        />
      )
    }
  }
  renderComponent(): React.ReactNode {
    const renders: any = this.renderScrollComponent()
    const children = renders.props.children
    return (
      <ScrollView
        style = {[
          flex.flex
        ]}
        {...this.renderRefreshControl()}
        {...this.scrollViewProps}
      >
        {children}
      </ScrollView>
    )
  }
  renderScrollComponent(): React.ReactNode {
    return null
  }
}

export {
  SvenBaseScrollComponent
}