import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { clearLS, getAccessTokenToLS, setAccessTokenToLS } from './auth'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenToLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/api',
      // transformRequest: (data, headers) => {
      // 	if (Array.isArray(data)) {
      // 		headers['Content-Type'] = 'application/json'
      // 		return JSON.stringify(data)
      // 	}
      // 	return data
      // },
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
const http = new Http().instance
export default http
