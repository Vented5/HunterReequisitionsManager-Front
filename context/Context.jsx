'use client'
import { createContext, useContext, useState} from 'react'

export const Context = createContext()

export function ContextProvider({children}) {
    
    const [toggle, setToggle] = useState(true)
    const [user, setUser] = useState(null)

    return (
        <Context.Provider value={{toggle, setToggle, user, setUser}}>
            {children}
        </Context.Provider>
    )
} 