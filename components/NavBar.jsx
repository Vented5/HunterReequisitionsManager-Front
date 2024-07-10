'use client'
import { Context } from "../context/Context"
import { useContext, useState} from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation'; 


//Icons
import { FaBars, FaUserAstronaut } from "react-icons/fa"
import { IoIosLogOut } from "react-icons/io"

function NavBar() {
    const [toggle, setToggle, auth, setAuth] = useContext(Context)
    const [dropdown, setDropdown] = useState(false)
    const router = useRouter()

    const logout = async () => {
        setAuth(null)
        Cookies.remove('auth_token', { path: '/', domain: 'localhost'}) 
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
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        console.log("Logout clicked")
      };
    

    return (
        <div className="bg-white flex justify-between items-center px-4 h-12 mb-4 relative">
            <button onClick={() => setToggle(!toggle)}>
                <FaBars className="cursor-pointer" />
            </button>
            {toggle ? 'open' : 'closed'}
            <h1>Hunter Requisitions Manager</h1>
            { auth ? auth : 'Not auth' }
            <div className="relative">
        <div onClick={() => setDropdown(!dropdown)} className="cursor-pointer">
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
              <li
                onClick={logout}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <IoIosLogOut />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
        
    )
}


export default NavBar