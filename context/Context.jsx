'use client'
import { createContext, useContext, useState} from 'react'

export const Context = createContext()

export function ContextProvider({children}) {
    
    const [toggle, setToggle] = useState(true)
    const [user, setUser] = useState(null)
    const [showForm, setShowForm] = useState(false);

    return (
        <Context.Provider value={{toggle, setToggle, user, setUser, showForm, setShowForm}}>
            {children}
        </Context.Provider>
    )
} 