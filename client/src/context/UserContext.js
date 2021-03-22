import { createContext } from 'react'

export const UserContext = createContext({
    token: null,
    userId: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false
})
