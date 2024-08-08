"use client"
import React, { useState, useEffect } from 'react';
import { AiOutlineUpload, AiOutlineEdit, AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Authentication from '../../components/Authentication';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: '',
    uploaderName: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function fetchCategories() {
    const response = await fetch("http://localhost:3010/categories", {
      method: 'GET'
    })
    console.log("categories: ", await response.json())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      ...formData,
      dateAdded: new Date().toLocaleDateString(),
    };

    if (editingIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = newCategory;
      setCategories(updatedCategories);
      setEditingIndex(null);
    } else {
      setCategories([...categories, newCategory]);
    }

    setFormData({
      categoryName: '',
      uploaderName: '',
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const categoryToEdit = categories[index];
    setFormData({
      categoryName: categoryToEdit.categoryName,
      uploaderName: categoryToEdit.uploaderName,
    });
  };

  const handleDelete = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  useEffect(() => {
    fetchCategories()
  }, []) 

  return (
   <>
   <Authentication>
   <NavBar/>
   <div className='flex h-[93%]'>
    <SideBar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Category Name</label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Uploader Name</label>
          <input
            type="text"
            name="uploaderName"
            value={formData.uploaderName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
        >
          {editingIndex !== null ? <AiOutlineCheck className="mr-2" /> : <AiOutlineUpload className="mr-2" />}
          {editingIndex !== null ? 'Update Category' : 'Add Category'}
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Current Categories</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Category Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Uploader Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Date Added</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">{category.categoryName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{category.uploaderName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{category.dateAdded}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleEdit(index)}
                    className="mr-2 text-blue-500"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-500">
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
   </Authentication>
   </>
  );
};

export default CategoryManagement;