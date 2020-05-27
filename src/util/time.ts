/*
 * @Date: 2020-03-23 12:56:52
 * @LastEditors: Save
 * @LastEditTime: 2020-05-10 01:53:18
 * @FilePath: /src/util/time.ts
 * @Description: 格式化时间戳
 */
/**
 * 时间格式
 * formatDateArr => 时间格式数组
 * @param {时间戳, 时间戳格式} FormatTime
 * @param {时间戳格式} FlagIndex => 返回时间数组下标
 * @param {时间戳} localTime => 柬埔寨时间戳 offset => 7
 */
export const formatDateArr = ['yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd']

export function FormatTime (dateTime: number, format: string) {
  let localtime = dateTime // localTime(dateTime)
  let date = new Date(localtime)
  let keep = ''
  let y = date.getFullYear();
  let m: string | number = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let i = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  let index = FlagIndex(format)
  if (index === 0) {
    // yyyy-MM-dd HH:mm:ss
    keep = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
  } else if (index === 1) {
    // yyyy-MM-dd
    keep = y + '-' + m + '-' + d
  } else if (index === 2) {
    // yyyy/MM/dd
    keep = y + '/' + m + '/' + d
  } else if (index === 3) {
    // MM/dd
    keep = m + '/' + d
  }
  return keep
}
function FlagIndex (foramtString: string) {
  for (let i in formatDateArr) {
    if (formatDateArr[i] === foramtString) {
      return parseInt(i)
    }
  }
}

/**
 * 国际时间戳格式
 * @param time 时间戳格式
 * @param offset 时间偏移量
 */
export function localTime (time: number, offset: number = 7) {
  // 判断时间戳的长度 => 10位数为PHP返回的时间，需要乘以 1000
  if (typeof time === 'number' && time.toString().length === 10) {
    var d = new Date(time * 1000)
  } else {
    var d = new Date()
  }
  let localTime = d.getTime()
  let localoffset = d.getTimezoneOffset() * 60000
  let utc = localTime + localoffset
  let calctime = utc + ((3600 * 1000) * offset)
  return calctime
}