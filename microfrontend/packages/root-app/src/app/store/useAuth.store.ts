import { toast } from 'react-toastify'
import create from 'zustand'
import { useHistory } from '../../bootstrap'
import agent from '../api/agent'
import { IAuth } from './types/auth.types'
import { combineAndImmer } from './types/combine-Immer'

export const useAuthStore = create(
  combineAndImmer(
    {
      token: window.localStorage.getItem('token') ?? (null as string | null),
      appLoaded: false,
      isLoading: false
    },
    (set, get) => ({
      isLoggedIn: () => !!get().token,
      login: async (_: IAuth) => {
        try {
          // const result = await agent.Auth.login(data)
          const result = {
            accessToken: 'test-token'
          }
          set(s => {
            s.token = result.accessToken
          })
          console.log(result.accessToken)
          window.localStorage.setItem('token', result.accessToken)
          useHistory.push('/todo')
        } catch (error) {}
      },
      register: async (_: IAuth) => {
        try {
          // const result = await agent.Auth.signup(data)
          const result = {
            accessToken: 'test-token'
          }
          set(s => {
            s.token = result.accessToken
          })
          window.localStorage.setItem('token', result.accessToken)
          useHistory.push('/todo')
        } catch (error: unknown) {}
      }
    })
  )
)
