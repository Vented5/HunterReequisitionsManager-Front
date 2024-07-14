"use client"
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

const AdminPage = () => {
  const router = useRouter()

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if(!Cookies.get('auth_token')){
      router.push('/Login')
    }  
    // Fetch initial data from the "database"
    fetchItems();
  }, []);

  const fetchItems = () => {
    // Mock fetch function
    const mockItems = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
    ];
    setItems(mockItems);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      // Update item
      const updatedItems = items.map((item) =>
        item.id === formData.id ? formData : item
      );
      setItems(updatedItems);
      setEditing(false);
    } else {
      // Create new item
      setItems([
        ...items,
        { ...formData, id: items.length ? items[items.length - 1].id + 1 : 1 },
      ]);
    }
    setFormData({ id: '', name: '', description: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditing(true);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <>
    <NavBar/>
    <div className='flex'>
      <SideBar/>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin CRUD Interface</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
        >
          <AiOutlinePlus className="mr-2" />
          {editing ? 'Update Item' : 'Add Item'}
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">ID</th>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Description</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b border-gray-300">{item.id}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.description}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleEdit(item)}
                    className="mr-2 text-blue-500"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500"
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </>
  );
};

export default AdminPage;