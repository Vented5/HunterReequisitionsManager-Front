"use client"
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'; 
import { Context } from '../../context/Context';
import Cookies from 'js-cookie'
//import coverImage from '../../public/images/cover.jpg';

const LoginPage = () => {
  const {user, setUser} = useContext(Context)
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [message, setMessage] = useState('')
  const [recoverPwd, setRecoverPwd] = useState(false)
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
        
        const data = await res.json()
        
        if(res.status === 200) {
          //console.log('Ahueso tenemos login')
          //console.log("res: ", data.user, "token: ", data.token)
          
          setUser({
            name: data.user.name,
            accessLvl: data.user.accessLvl,
            token: data.token,
          })
          console.log("user: ", user)
          
          localStorage.setItem('token', data.token)

          router.push('/RequestsG')

        } else {
          setMessage(data.message)
          console.log("algo salio mal")
          const errorData = await res.json()
          console.log("Error: ", errorData)
        }

      } catch (error){
        console.log('Error de la solicitud', error)
      }
  }
 
  return (
    <div className="flex h-screen w-full bg-primary">

      <div className='flex w-3/4 h-[75%] mx-auto my-auto overflow-hidden rounded-2xl'>
        <section className="w-1/3 min-w-96 text-wrap flex flex-col items-center justify-center space-y-4 p-5 bg-background">
          
          <h1 className='w-full py-6 text-center text-4xl font-semibold'>Hunter Requisitions Manager</h1>
          
          <hr className='w-full border-1 border-primary'/>
          
          <h1>Log in</h1>

          <hr className='w-full border-1 border-primary'/>

          

          <form onSubmit={login} className="w-3/4 max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">Usuario</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:border-tertiary"
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
                className="w-full p-2 border border-gray-300 rounded  focus:border-tertiary"
              />
            </div>
            {message? (<div className='bg-rose-400 w-full p-2 rounded'>{message}</div>) : ''}
            <button type="submit"
              className="w-full py-2 bg-secondary text-white font-bold rounded mt-4"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <div href="/RecoverPassword" onClick={() => (setRecoverPwd(!recoverPwd))} className="text-cyan-600 hover:underline">Recover Password</div>
          </div>
          {recoverPwd? (<div>Consulte un administrador</div>) : ''}
        </section>
        <div className='w-2/3 h-full overflow-hidden'>
        <img src="/images/cover.jpg" alt="Cover" className='object-cover w-full h-full'/>
        </div>
        
      </div>
      
    </div>
  );
};

export default LoginPage;
