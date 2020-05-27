/*
 * @Date: 2019-12-03 19:38:25
 * @LastEditors: Save
 * @LastEditTime: 2020-05-10 02:41:36
 * @FilePath: /src/api/async.storage.ts
 * @Description: 本地缓存
 */
import AsyncStorage from '@react-native-community/async-storage'

class Storage {
  // 添加存储
  async setItem (key: string, value: any) {
    try {
      value = JSON.stringify(value)
      await AsyncStorage.setItem(
        key,
        value
      )
    } catch (err) {
      console.log(err)
    }
  }
  // 查询存储并获取wrapDataIprops
  async getItem (key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(
        key,
        (error, result: any) => {
          if (!error) {
            resolve(JSON.parse(result))
          } else {
            reject(error)
          }
        }
      )
    })
  }
  // 查询存储并且获取(获取存储集合) => string[]
  async getmultiItem (keys: string[]) {
    return new Promise((resolve, reject) => {
      AsyncStorage.multiGet(
        keys,
        (error, result: any) => {
          if (error) {
            reject(error)
            return 
          }
          let newData: any= {}
          for (let i in result) {
            newData[result[i][0]] = JSON.parse(result[i][1])
          }
          resolve(newData)
        }
      )
    }).catch((err) => {
      console.warn(err)
    })
  }
  // 删除单个存储
  async remove (key: string) {
    try {
      AsyncStorage.removeItem(key)
    } catch (err) {
      console.log(err)
    }
  }
  // 删除集合
  multiRemove (keyArr: string[]) {
    try {
      AsyncStorage.multiRemove(keyArr, (error) => {
        console.warn('error is arr', error)
      })
    } catch (err) {
      console.log(err)
    }
  }
}
export { Storage }