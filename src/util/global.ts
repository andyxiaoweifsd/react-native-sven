/*
 * @Date: 2020-04-03 10:35:38
 * @LastEditors: Save
 * @LastEditTime: 2020-05-27 23:37:50
 * @FilePath: /src/util/global.ts
 * @Description: 公共函数
 */

/**
 * 正则匹配手机号码变成星号
 * @param mobile 手机号
 * @returns 带有星号的手机号
 */
function SvenMobildAndPohoneIsStart(mobile: string): string {
  if (typeof mobile !== 'string' || !mobile.length) return ''
  const reg = /^(\d{3})\d*(\d{4})$/;
  const msg = mobile.replace(reg, "$1****$2")
  return msg
}
export {
  SvenMobildAndPohoneIsStart
}