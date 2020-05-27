/*
 * @Date: 2020-05-09 20:45:35
 * @LastEditors: Save
 * @LastEditTime: 2020-05-28 00:23:09
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
import { SvenBase, SvenBaseIState, SvenBaseIProps } from './base';

export interface SvenBaseComponentIState extends SvenBaseIState {}
export interface SvenBaseComponentIProps extends SvenBaseIProps {}
class BaseComponent<T extends SvenBaseComponentIProps, S extends SvenBaseComponentIState> extends SvenBase<T, S> {
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