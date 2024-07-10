'use client'
import { createContext, useContext, useState} from 'react'

export const Context = createContext()

export function ContextProvider({children}) {
    
    const [toggle, setToggle] = useState(true)
    const [auth, setAuth] = useState(null)

    return (
        <Context.Provider value={[toggle, setToggle, auth, setAuth]}>
            {children}
        </Context.Provider>
    )
} 