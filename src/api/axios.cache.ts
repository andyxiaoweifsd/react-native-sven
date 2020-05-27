/*
 * @Date: 2020-01-14 17:32:10
 * @LastEditors: Save
 * @LastEditTime: 2020-05-28 01:36:32
 * @FilePath: /src/api/axios.cache.ts
 * @Description: 长缓存
 */
import { SvenAxios, requestConfig, configObj } from './axios'
import { SvenStorage } from './async.storage'
const storage = new SvenStorage()

export interface wrapDataIprops {
  data: requestConfig,
  timestamp: number
}

class SvenAxiosCache extends SvenAxios {
  constructor(
    obj: configObj,
    alertMsg?: string
  ) {
    super(
      obj,
      alertMsg
    )
  }

  async axios(cacheUrl: string, method: string, data?: any) {
    const that: any = this
    return that[method](data).then((res: requestConfig) => {
      if (res.status === '1') {
        storage.setItem(cacheUrl, this._wrapData(res))
      }
      return res
    }) 
  }
  async setCacheUrl(cacheUrl: string): Promise<string> {
    return cacheUrl
  }
  async cache(cacheUrl: string, method: string = 'get', data?: any): Promise<requestConfig> {
    const setCacheUrl = await this.setCacheUrl(cacheUrl)
    return storage.getItem(setCacheUrl).then((cacheRef: wrapDataIprops) => {
      if (cacheRef) {
        if (SvenAxiosCache.checkTimestampValid(cacheRef.timestamp)) {
          console.log(`长缓存---${this.alertMsg} ---返回值`, cacheRef.data)
          return cacheRef.data
        } else {
          return this.axios(setCacheUrl, method, data)
        }
      } else {
        return this.axios(setCacheUrl, method, data)
      }
    })
  }

  setHours(hours: number = 5): number {
    return hours
  }

  _wrapData(data: requestConfig) {
    return {
      data: data,
      timestamp: new Date().getTime()
    }
  }
  async removeUrl(cacheUrl: string) {
    const NewCacheUrl = await this.setCacheUrl(cacheUrl)
    return new Storage().remove(NewCacheUrl)
  }
  static checkTimestampValid (timestamp: number) {
    const currentDate = new Date()
    const targetDate = new Date()
    targetDate.setTime(timestamp)
    if (currentDate.getMonth() !== targetDate.getMonth()) return false
    if (currentDate.getDate() !== targetDate.getDate()) return false
    if ((currentDate.getHours() - targetDate.getHours()) > 5) return false
    if ((currentDate.getMinutes() - targetDate.getMinutes()) > 1) return false
    return timestamp
  }
}
export {
  SvenAxiosCache
}