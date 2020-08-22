/*
 * @Date: 2019-12-13 16:17:06
 * @LastEditors: Save
 * @LastEditTime: 2020-05-28 10:56:55
 * @FilePath: /src/api/axios.ts
 * @Description: axios 请求文件
 */

import axios, { AxiosRequestConfig, AxiosError } from 'axios'

export interface SvenConfigObj extends AxiosRequestConfig {
  url: string,
  headers?: any,
  data?: {
    [pageName: string]: any
  },
  params?: {
    [pageName: string]: any
  }
}
export interface SvenRequestConfig {
  code: string,
  data: any,
  info: string,
  status: string
}

export interface GlobarAxiosIprops {
  obj: SvenConfigObj
  alertMsg: string
}

interface configIProps {
  data?: any,
  params?: any
}
class SvenAxios {
  obj: SvenConfigObj
  alertMsg: string
  constructor (
    obj: SvenConfigObj,
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

  async _axios(config: AxiosRequestConfig): Promise<SvenRequestConfig> {
    try {
      const res: SvenRequestConfig | any = await axios(config)
      console.log(`Axios---${this.alertMsg}---返回的结果：`, res.data)
      this.svenFinish(res)
      return res.data
    } catch (err) {
      this.svenError(err)
      return err
    }
  }

  async mergeConfig (method = 'get', data: any): Promise<SvenRequestConfig> {
    let res = {
      ...this.obj,
      method: method,
      ...data
    }
    res = await this.HeaderConfig(res)
    console.log(`${method}---${this.alertMsg}---请求的配置项：`, res)
    return await this._axios(res);
  }

  async post(data: any = ''): Promise<SvenRequestConfig> {
    return this.mergeConfig('post', {data:data});
  }
  async get(data: any = ''): Promise<SvenRequestConfig> {
    return this.mergeConfig('get', {params:data});
  }
  async put(data: any = ''): Promise<SvenRequestConfig> {
    return this.mergeConfig('put', {data: data});
  }
  async delete (data: any = '', flag = 1): Promise<SvenRequestConfig> {
    let config:configIProps = {};
     flag === 1
      ?  config['data'] =  data
      :  config['params'] =  data;
    return this.mergeConfig('delete', config);
  }

  // 添加新的 header
  async HeaderConfig(res: SvenConfigObj): Promise<SvenConfigObj> {
    return res
  }

  svenFinish(res: SvenRequestConfig): void {}
  
  svenError(err: AxiosError) {
    return err
  }
}

export { SvenAxios }