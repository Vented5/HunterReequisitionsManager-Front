'use client'
import { createContext, useContext, useState} from 'react'

export const Context = createContext()

export function ContextProvider({children}) {
    
    const [toggle, setToggle] = useState(true)

    return (
        <Context.Provider value={[toggle, setToggle]}>
            {children}
        </Context.Provider>
    )
} 