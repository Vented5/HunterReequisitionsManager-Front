"use client"
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'; 
import { Context } from '../../context/Context';
import Cookies from 'js-cookie'

const LoginPage = () => {
  const {user, setUser} = useContext(Context)
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const router = useRouter()

  const login = async (e) => {
      e.preventDefault()
      
      try {
        const res = await fetch('http://localhost:3010/auth', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ email, pwd }),
        });

        if(res.status === 200) {
          console.log('Ahueso tenemos login')
          const data = await res.json()
          console.log("res: ", data.user, "token: ", data.token)
          
          setUser({
            name: data.user.name,
            accessLvl: data.user.accessLvl,
            token: data.token,
          })
          console.log("user: ", user)
          
          localStorage.setItem('token', data.token)

          router.push('/RequestsG')

        } else {
          console.log("algo salio mal")
          const errorData = await res.json()
          console.log("Error: ", errorData)
        }

      } catch (error){
        console.log('Error de la solicitud', error)
      }
  }
 
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/26236827/pexels-photo-26236827/free-photo-of-monkey.jpeg)' }}>
        {/* Left side with background image */}
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        
        <form onSubmit={login} className="w-3/4 max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">Usuario</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded mt-4"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <Link href="/RecoverPassword" className="text-blue-500 hover:underline">Recover Password</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
