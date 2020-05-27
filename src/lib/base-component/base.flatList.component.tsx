/*
 * @Date: 2020-03-23 09:14:05
 * @LastEditors: Save
 * @LastEditTime: 2020-04-15 11:52:43
 * @FilePath: /src/component/global/base/base.flatList.component.tsx
 * @Description: 基类 flatList
 */
import React, { Fragment, ReactElement } from 'react';
import { FlatList, FlatListProps, SectionListProps, StyleProp, ViewStyle, View, Text, SectionList } from 'react-native';
import { BaseScrollComponent, BaseScrollComponentIState } from './base.scroll.component';
import { WidthAndHeight, flex } from '../../assets/style';
import { BaseIProps } from './base';

export interface BaseFlatListComponentIState extends BaseScrollComponentIState {
  flatList: any[],
  latListStyle?: StyleProp<ViewStyle>,
  EndReachedCount?: number,
  emptyFlag?: boolean
}

export interface BaseFlatListComponentIProps extends BaseIProps {}
class BaseFlatListComponent<T extends BaseFlatListComponentIProps, P extends BaseFlatListComponentIState> extends BaseScrollComponent<T, P> {
  onEndReachedCalledDuringMomentum: boolean = false
  pageIndex: number = 0
  pageSize: number = 15

  readonly state: P  = {
    ...this.state,
    flatList: []
  }
  constructor(props: T) {
    super(props)
  }
  renderItem<ItemT>(item: ItemT, index: number): React.ReactElement | null {
    return null
  }
  keyExtractor(item: any, index: number) {
    return index + ' '
  }
  onEndReached() {}
  onOptions<ItemT>(): FlatListProps<ItemT> | Object {
    return {}
  }
  flatListData(): any {
    return []
  }
  initFlatListOptions<ItemT>(latListStyle: StyleProp<ViewStyle>): FlatListProps<ItemT> | Object  {
    return {
      scrollIndicatorInsets: { right: 1 }, // iPhoneX 以上滚动条偏移解决思路
      style: [{backgroundColor: '#fff', width: '100%'}, latListStyle],
      keyExtractor: (item, key) => this.keyExtractor(item, key),
      onEndReachedThreshold: 0.3,
      onEndReached: () => {
        if (typeof this.onEndReached === 'undefined') return
        setTimeout(() => {
          if (this.onEndReachedCalledDuringMomentum) {
            this.onEndReachedCalledDuringMomentum = false
            this.onEndReached()
          }
        }, 300);
      },
      onMomentumScrollBegin: () => {
        this.onEndReachedCalledDuringMomentum = true
      },
      ListFooterComponent: () => {
        return (
          <Fragment>
            {this.ListFooterComponent()}
            <View style = {{height: 30}}></View>
          </Fragment>
        )
      },
      ListEmptyComponent: this.ListEmptyComponent(),
      ...this.renderRefreshControl(),
      ...this.onOptions()
    }
  }
  ListFooterComponent(): ReactElement | null {
    const { EndReachedCount = 0 } = this.state
    switch (EndReachedCount) {
      case 0:
        return null
      case 1:
        return <View style = {{height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
          <Text style = {{color: '#999691', fontSize: 16}}>正在加载更多...</Text>
        </View>
      case 2:
        return <View style = {{height: 30, justifyContent: 'center', alignItems: 'center'}}>
          <View style = {{width: 200, height: 1, backgroundColor: '#e8e8e8', opacity: 1}}></View>
        </View>
      default:
        return null
    }
  }
  ListEmptyComponent() {
    const { emptyFlag = false } = this.state
    if (!emptyFlag) return null
    return (
      <View 
      style = {[
        flex.alignItemsCenter,
      ]}
    >
      <View style = {[
        {
          marginTop: 132,
          backgroundColor: '#2E2F30'
        },
        WidthAndHeight(119, 94)
      ]}></View>
      <Text style = {{marginTop: 10}}>暂无数据</Text>
    </View>
    )
  }
  renderComponent(): React.ReactNode {
    const { flatList, latListStyle = {} } = this.state
    return (
      <Fragment>
        <FlatList 
          data = {flatList}
          renderItem = {({ item, index }): React.ReactElement | null  => this.renderItem(item, index)}
          {...this.initFlatListOptions(latListStyle)}
        />
      </Fragment>
    )
  }
}
export interface BaseSectionListComponentIState extends BaseFlatListComponentIState {}
export interface BaseSectionListComponentIProps extends BaseFlatListComponentIProps {}
class BaseSectionListComponent<T extends BaseSectionListComponentIProps, P extends BaseSectionListComponentIState> extends BaseFlatListComponent<T, P> {
  readonly state: P = {
    ...this.state
  }
  constructor(props: T) {
    super(props)
  }

  onOptions<ItemT>(): SectionListProps<ItemT> | Object {
    return {}
  }

  renderComponent() {
    const { flatList, latListStyle = {} } = this.state
    return (
      <Fragment>
        <SectionList
          sections = {flatList}
          renderItem = {({ item, index }): React.ReactElement | null  => this.renderItem(item, index)}
          {...this.initFlatListOptions(latListStyle) as SectionListProps<T>}
        />
      </Fragment>
    )
  }
}
export {
  BaseFlatListComponent,
  BaseSectionListComponent
}