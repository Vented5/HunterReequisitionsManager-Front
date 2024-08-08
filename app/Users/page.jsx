"use client"
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Authentication from '../../components/Authentication';
import { Context } from '../../context/Context';

const Users = ( ) => {
  //const {user} = useContext(Context)
  const router = useRouter()
  
  async function getUsers() {
    fetch('http://localhost:3010/users',{ method: 'GET'})
    .then(response => response.json())
    .then(data => {
      //console.log(data[0])
      setUsers(data)
    })
    
  } 
  const [users, setUsers] = useState([]);
  //const [users, setUsers] = useState();
  
  const [newUser, setNewUser] = useState({ name: '', role: 'Purchase Requester', email: '', pwd: '' });
  const [editingUser, setEditingUser] = useState(null);
  
  useEffect( () => {
    /*if(!Cookies.get('auth_token')){
      router.push('/Login')
    } */ 
    getUsers();
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditChange = (e, id) => {
    const { name, value } = e.target;
    setUsers(users.map(user => (user.id === id ? { ...user, [name]: value } : user)));
  };

  const saveChanges = async (id) => {
      let editedUser = {}  
      users.map(user => (user.id === id ? editedUser = user : user))
        
      console.log("Usuario editado: ", editedUser)
      const response = await fetch(`http://localhost:3010/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
      })
      console.log("Res del patch:", await response.json())

      setEditingUser(null)
  }

  const handleAddUser = async () => {
    console.log("new user sent to the sever:", newUser)
    const response = await fetch("http://localhost:3010/users/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    const data = response.json()
    

    setUsers([...users, newUser ]);
  };

  const handleDeleteUser = async (id) => {
    setUsers(users.filter(user => user.id !== id));

    const response = await fetch(`http://localhost:3010/users/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log(data)
  };

  return (
   <>
   <Authentication>
    <NavBar/>
    <div className='flex h-[93%]'>
      <SideBar/>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Users</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className='bg-secondary text-slate-200'>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Role</th>
              <th className="py-2 px-4 border-b border-gray-300">Email</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={(e) => handleEditChange(e, user.id)}
                      className="p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {editingUser === user.id ? (
                    <><select
                      name="role"
                      value={user.role}
                      onChange={(e) => handleEditChange(e, user.id)}
                      className="p-1 border border-gray-300 rounded"
                    >
                      <option value="Purchase Requester">Purchase Requester</option>
                      <option value="Purchase Validator">Purchase Validator</option>
                      <option value="Admin">Admin</option>
                      <option value="Business Owner">Business Owner</option>
                    </select>
                    <button type='button' onClick={(e) => saveChanges(user.id)} className="ml-2 bg-secondary space-x-1 text-slate-100 items-center rounded px-1 py-0.5">
                      save
                      </button></>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {user.role != "Admin" ? (
                    <div className='flex w-32 justify-center mx-auto space-x-4'>
                    <button
                      onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                      className="flex bg-tertiary text-slate-100 items-center rounded p-0.5 space-x-1"
                    > <p>Edit</p>
                      <AiOutlineEdit />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="flex bg-rose-600 space-x-1 text-slate-100 items-center rounded p-0.5">
                      <p>Delete</p>
                      <AiOutlineDelete />
                    </button>
                  </div>) : ""}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <div className="flex space-x-4">
          <input type="text" name="name" value={newUser.name} onChange={handleChange} placeholder="Name" className="p-2 border border-gray-300 rounded w-full"/>
          <select name="role" value={newUser.role} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" >
            <option value="Purchase Requester">Purchase Requester</option>
            <option value="Purchase Validator">Purchase Validator</option>
            <option value="Admin">Admin</option>
            <option value="Business Owner">Business Owner</option>
          </select>
          
          <input type="text" name="email" id="email" value={newUser.email} onChange={handleChange} placeholder='Email' className="p-2 border border-gray-300 rounded w-full"/>
          <input type="password" name="pwd" id="pwd" value={newUser.pwd} onChange={handleChange} placeholder='Password' className="p-2 border border-gray-300 rounded w-full"/>
          <button
            onClick={handleAddUser}
            className="flex items-center px-4 py-2 text-nowrap bg-green-500 text-white rounded"
          >
            <AiOutlinePlus className="mr-2" />
            Add User
          </button>
        </div>
      </div>
    </div>
      
    </div>
    </Authentication>
   </>
  );
};

export default Users;
