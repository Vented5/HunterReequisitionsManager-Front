"use client"
import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Purchase Requester' },
    { id: 2, name: 'Jane Smith', role: 'Purchase Validator' },
    { id: 3, name: 'Mike Johnson', role: 'Admin' },
    { id: 4, name: 'Emily Davis', role: 'Business Owner' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', role: 'Purchase Requester' });
  const [editingUser, setEditingUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditChange = (e, id) => {
    const { name, value } = e.target;
    setUsers(users.map(user => (user.id === id ? { ...user, [name]: value } : user)));
  };

  const handleAddUser = () => {
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: '', role: 'Purchase Requester' });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Users</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Role</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
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
                    <select
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
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                    className="mr-2 text-blue-500"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="text-red-500">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="Purchase Requester">Purchase Requester</option>
            <option value="Purchase Validator">Purchase Validator</option>
            <option value="Admin">Admin</option>
            <option value="Business Owner">Business Owner</option>
          </select>
          <button
            onClick={handleAddUser}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded"
          >
            <AiOutlinePlus className="mr-2" />
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
