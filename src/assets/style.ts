/*
 * @Date: 2020-03-16 23:35:08
 * @LastEditors: Save
 * @LastEditTime: 2020-03-18 14:42:30
 * @FilePath: /src/assets/style/index.ts
 * @Description: 自定义项目文件描述
 */
import { StyleSheet } from 'react-native';

/**
 * Padding
 * @param top 
 * @param right 
 * @param bottom 
 * @param left 
 * @param 两个参数对应上下左右
 */
export function Padding (top: number = 0, right: number = 0, bottom: number = 0, left: number = 0) {
  if (bottom === 0 && left === 0) {
    bottom = top
    left = right
  }
  return {
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left,
  }
}


/**
 * 
 * @param top 
 * @param right 
 * @param bottom 
 * @param left 
 * @param 两个参数对应上下左右
 */
export function Margin (top: number = 0, right: number = 0, bottom: number = 0, left: number = 0) {
  if (bottom === 0 && left === 0) {
    bottom = top
    left = right
  }
  return {
    marginTop: top,
    marginRight: right,
    marginBottom: bottom,
    marginLeft: left,
  }
}

/**
 * width and height
 * @param width 
 * @param height 
 * @params 传一个值的时候代表这两个都是相同的值
 */
export function WidthAndHeight (width: number = 0, height: number = 0) {
  if (height === 0) {
    height = width
  }
  return {
    width: width,
    height: height
  }
}

// flex 布局
const flexStyle = StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  column: {
    flexDirection: 'column'
  },
  rowBetween: {
    flexDirection :'row',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection :'row',
    justifyContent: 'space-around'
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  CenterVertically: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export const flex = {...flexStyle}

// 字体颜色
const colorStyles = StyleSheet.create({
  bg: {
    color: '#F1A811'
  }
})
export const color = {...colorStyles}

// border边框颜色
const borderStyles = StyleSheet.create({
  white: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 1
  }
})
export const border = {...borderStyles}

// link 下划线
const linkStyles = StyleSheet.create({
  link: {
    height: 1,
    backgroundColor: '#E8E8E8'
  }
})
export const link  = {...linkStyles}