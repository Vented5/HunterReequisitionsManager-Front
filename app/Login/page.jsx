"use server"
//"use client"
//import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // or 'react-router-dom' depending on your routing library
import { login } from '../../lib'

function handleLogin () {
    login()
}


const LoginPage = () => {
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');

  /*async function handleLogin (e) {
    useEffect( async () => {
      try {
        const response = await fetch('/api/auth', {
          'method': 'GET',  'mode': 'cors',
          'headers': {
              'Access-Control-Allow-Origin': '*',
          }
          
        })
        if(response.status == 200){
          console.log("Ahueso tenemos conexion");
        }
       } catch (e){
        console.log(e);
       }
    }, [])
  
    
   
  };
*/
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/26236827/pexels-photo-26236827/free-photo-of-monkey.jpeg)' }}>
        {/* Left side with background image */}
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form className="w-3/4 max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              //value={password}
              //onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded mt-4"
          >
            Login
          </button>
        </form>

        <button onClick={handleLogin()} 
            
            className="w-full py-2 bg-blue-500 text-white font-bold rounded mt-4"
          >
            Login
          </button>
        <div className="mt-4">
          <Link href="/RecoverPassword" className="text-blue-500 hover:underline">Recover Password</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
