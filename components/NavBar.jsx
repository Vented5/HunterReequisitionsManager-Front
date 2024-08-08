'use client'
import { Context } from "../context/Context"
import { useContext, useEffect, useState} from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'; 


//Icons
import { FaBars, FaUserAstronaut } from "react-icons/fa"
import { IoIosLogOut } from "react-icons/io"

function NavBar() {
    const {user, setUser, toggle, setToggle} = useContext(Context)
    const [dropdown, setDropdown] = useState(false)
    const router = useRouter()

 
    const logout = async () => { ///NO TOCAR ==== SE DESMADRA
        setUser(null)
        localStorage.removeItem('token')
        const response = await fetch('http://localhost:3010/auth/logout', {  
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })
        if (response.ok) {
          console.log('Cookie eliminada exitosamente desde el backend');
          router.push('/Login'); // Redirigir al usuario después de eliminar la cookie
        } else {
          console.error('Error al intentar eliminar la cookie desde el backend');
          // Manejar el error de manera adecuada según tu aplicación
        }
        ///NO TOCAR ==== SE DESMADRA
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'; 
        console.log("Logout clicked")
      };
    

    return (
        <div className="bg-white flex justify-between items-center px-4 h-[7%] mb-4 relative shadow-md text-xs md:text-base">
            <div className="flex space-x-4">
              <button onClick={() => setToggle(!toggle)}>
                  <FaBars className="cursor-pointer" />
              </button>
              <h1>Hunter Requisitions Manager</h1>  
            </div>
            <div className="relative flex space-x-4">
              <h1>{ user ? user.name : 'no user' }</h1>
              <div onClick={() => setDropdown(!dropdown)} className="cursor-pointer mt-1">
                <FaUserAstronaut />
              </div>
              {dropdown&& (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                  <ul className="py-1">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      <Link href="/Account" className="flex items-center">
                        Account
                      </Link>
                    </li>
                    <li onClick={logout} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                      <IoIosLogOut/>
                    </li>
                  </ul>
                </div>
              )}
      </div>
    </div>
        
    )
}


export default NavBar