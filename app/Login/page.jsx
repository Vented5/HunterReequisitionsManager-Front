"use client"
import { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'; 
import { Context } from '../../context/Context';


const LoginPage = () => {
  const [toggle, setToggle, auth, setAuth] = useContext(Context)

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')

  const router = useRouter()

  const login = async (e) => {
      e.preventDefault()
      
      const res = await fetch('http://localhost:3010/auth', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ user, pwd }),
      });

      if(res.status === 200) {
        console.log('Ahueso tenemos login')
        setAuth('Alice')
        router.push('/RequestsG')
      }else {
        console.log("Algo salio mal")
        console.log(res.json().message)
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
              //type="email"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
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
