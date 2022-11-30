import { createContext } from 'react'

export interface AuthContextInterface {
  id: number | string
}

export const AppCtx = createContext({} as AuthContextInterface)
