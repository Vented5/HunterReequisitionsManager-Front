"use client"
import React, { useState, useEffect } from 'react';
import { AiOutlineUpload, AiOutlineEdit, AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Authentication from '../../components/Authentication';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    providerName: '',
    uploaderName: '',
    category: '',
    document: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Simulate fetching categories from a database
    const fetchCategories = async () => {
      // Replace with actual API call
      const categoriesFromApi = await new Promise((resolve) =>
        setTimeout(() => resolve(['Electronics', 'Furniture', 'Stationery']), 1000)
      );
      setCategories(categoriesFromApi);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSupplier = {
      ...formData,
      dateAdded: new Date().toLocaleDateString(),
    };

    if (editingIndex !== null) {
      const updatedSuppliers = [...suppliers];
      updatedSuppliers[editingIndex] = newSupplier;
      setSuppliers(updatedSuppliers);
      setEditingIndex(null);
    } else {
      setSuppliers([...suppliers, newSupplier]);
    }

    setFormData({
      providerName: '',
      uploaderName: '',
      category: '',
      document: null,
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const supplierToEdit = suppliers[index];
    setFormData({
      providerName: supplierToEdit.providerName,
      uploaderName: supplierToEdit.uploaderName,
      category: supplierToEdit.category,
      document: supplierToEdit.document,
    });
  };

  const handleDelete = (index) => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
  };

  return (
  <>
  <Authentication>
  <NavBar/>
  <div className='flex'>
    <SideBar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Provider Name</label>
          <input
            type="text"
            name="providerName"
            value={formData.providerName}
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
        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Upload Document (optional)</label>
          <input
            type="file"
            name="document"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
        >
          {editingIndex !== null ? <AiOutlineCheck className="mr-2" /> : <AiOutlineUpload className="mr-2" />}
          {editingIndex !== null ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Current Suppliers</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Provider Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Uploader Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Category</th>
              <th className="py-2 px-4 border-b border-gray-300">Document</th>
              <th className="py-2 px-4 border-b border-gray-300">Date Added</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">{supplier.providerName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{supplier.uploaderName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{supplier.category}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {supplier.document ? supplier.document.name : 'No Document'}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{supplier.dateAdded}</td>
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

export default SupplierManagement;