import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { IAuth, IToken } from '../store/types/auth.types'

axios.defaults.baseURL = 'http://localhost:3030'

axios.interceptors.request.use(config => {
  // const token = store.commonStore.token;
  // if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  const { data, status, config, headers } = error.response!
  switch (status) {
    case 400:
      if (data.error) {
        console.log(data, data.message[0])
        toast.error(data.message[0])
      }
      break
    case 401:
      if (
        status === 401 &&
        headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')
      ) {
        toast.error('Session expired - please login again')
      }
      break
  }
  return Promise.reject(error)
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
  get: <T>(url: string, params?: any) =>
    axios
      .get<T>(url, {
        params
      })
      .then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Auth = {
  login: (data: IAuth) => requests.post<IToken>(`/auth/signin`, data),
  signup: (data: IAuth) => requests.post<IToken>(`/auth/signup`, data)
}

const agent = {
  Auth
}

export default agent
