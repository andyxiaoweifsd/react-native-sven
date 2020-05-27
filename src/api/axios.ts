/*
 * @Date: 2019-12-13 16:17:06
 * @LastEditors: Save
 * @LastEditTime: 2020-05-27 18:25:18
 * @FilePath: /src/api/axios.ts
 * @Description: axios 请求文件
 */

import axios, { AxiosRequestConfig, AxiosError } from 'axios'

export interface configObj extends AxiosRequestConfig {
  url: string,
  headers?: any,
  data?: {
    [pageName: string]: any
  }
}
export interface requestConfig {
  code: string,
  data: any,
  info: string,
  status: string
}
export interface GlobarAxiosIprops {
  obj: configObj
  alertMsg: string
}
class SvenAxios {
  obj: configObj
  alertMsg: string
  constructor (
    obj: configObj,
    alertMsg?: string,
  ) {
    this.obj = this.config(obj)
    this.alertMsg = alertMsg || ''
  }
  public config(obj: any) {
    let headers = obj.headers || {}
    delete obj.headers
    let data = {
      headers: {
        'Accept': 'application/json',
        ...headers
      },
      ...obj.data,
      ...obj
    }
    return data
  }
  
  // 添加新的 header
  static async HeaderConfig(res: configObj): Promise<configObj> {
    return res
  }

  async _axios(config: AxiosRequestConfig): Promise<requestConfig> {
    try {
      const res: requestConfig | any = await axios(config)
      console.log(`Axios---${this.alertMsg}---返回的结果：`, res.data)
      return res.data
    } catch (err) {
      this.svenError(err)
      return err
    }
  }

  svenError(err: AxiosError) {
    console.log('Network', err)
    return err
  }

  async mergeConfig (method = 'get', data: any): Promise<requestConfig> {
    let res = {
      ...this.obj,
      method: method,
      ...data
    }
    res = await SvenAxios.HeaderConfig(res)
    console.log(`${method}---${this.alertMsg}---请求的配置项：`, res)
    return await this._axios(res);
  }

  async post(data: any = ''): Promise<requestConfig> {
    return this.mergeConfig('post', {data:data});
  }
  async get(data: any = ''): Promise<requestConfig> {
    return this.mergeConfig('get', {params:data});
  }
  async put(data: any = ''): Promise<requestConfig> {
    return this.mergeConfig('put', {data: data});
  }
  async delete (data: any = '', flag = 1): Promise<requestConfig> {
    let config:configIProps = {};
     flag === 1
      ?  config['data'] =  data
      :  config['params'] =  data;
    return this.mergeConfig('delete', config);
  }
}

interface configIProps {
  data?: any,
  params?: any
}

export { SvenAxios }