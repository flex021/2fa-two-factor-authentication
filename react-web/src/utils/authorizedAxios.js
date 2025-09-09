import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from './constants'

let authorizedAxiosInstance = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1000 * 60 * 10,
  withCredentials: true
})
authorizedAxiosInstance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

authorizedAxiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response?.status !== 410) {
    toast.error(error.response?.data?.message || error?.message)
  }

  return Promise.reject(error)
})

export default authorizedAxiosInstance
