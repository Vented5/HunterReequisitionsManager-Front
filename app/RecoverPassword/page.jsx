"use client"
import React, { useState } from 'react';
import Link from 'next/link'; // or 'react-router-dom' depending on your routing library

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    // Handle password recovery logic here
    console.log(`Recover password for email: ${email}`);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <h1 className="text-3xl font-bold mb-6">Recover Password</h1>
        <form onSubmit={handleRecoverPassword} className="w-3/4 max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded mt-4"
          >
            Send Recovery Email
          </button>
        </form>
        <div className="mt-4">
          <Link href="/Login" className="text-blue-500 hover:underline">Back to Login</Link>
        </div>
      </div>
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/2213575/pexels-photo-2213575.jpeg?auto=compress&cs=tinysrgb&w=600)' }}>
        {/* Right side with background image */}
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
