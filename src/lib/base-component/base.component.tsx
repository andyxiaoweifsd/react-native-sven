/*
 * @Date: 2020-05-09 20:45:35
 * @LastEditors: Save
 * @LastEditTime: 2020-05-09 20:49:37
 * @FilePath: /src/lib/base-component/base.component.tsx
 * @Description: 
 */
/*
 * @Date: 2020-03-22 23:42:21
 * @LastEditors: Save
 * @LastEditTime: 2020-05-09 20:45:38
 * @FilePath: /src/lib/base-component/base.component.tsx
 * @Description: 基类
 */
import React from 'react';
import { Base, BaseIState, BaseIProps } from './base';

export interface BaseComponentIState extends BaseIState {}
export interface BaseComponentIProps extends BaseIProps {}
class BaseComponent<T extends BaseComponentIProps, S extends BaseComponentIState> extends Base<T, S> {
  readonly state: S = {
    ...this.state
  }
  constructor(props: T) {
    super(props)
  }
}

export {
  BaseComponent
}