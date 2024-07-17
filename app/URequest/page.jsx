"use client"
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineSync } from 'react-icons/ai';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Authentication from '../../components/Authentication';

const RequestsInbox = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    requestorName: '',
    department: '',
    requestDate: '',
    dueDate: '',
    productDescription: '',
    justification: '',
    preferredVendors: '',
    category: '',
    status: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Fetch initial data from the "database"
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    // Mock fetch function
    const mockRequests = [
      { id: 1, requestorName: 'John Doe', department: 'IT', requestDate: '2023-01-01', dueDate: '2023-01-15', productDescription: 'Laptop, 15 inch, Black', justification: 'Replacement for old laptop', preferredVendors: 'Vendor A', category: 'Electronics', status: 'Needs Update' },
      { id: 2, requestorName: 'Jane Smith', department: 'HR', requestDate: '2023-02-01', dueDate: '2023-02-10', productDescription: 'Office Chairs, Ergonomic, Blue', justification: 'New chairs for office', preferredVendors: 'Vendor B', category: 'Furniture', status: 'Canceled' },
    ];
    setRequests(mockRequests);
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
    const updatedRequests = [...requests];
    updatedRequests[editingIndex] = formData;
    setRequests(updatedRequests);
    setEditingIndex(null);
    setFormData({
      id: '',
      requestorName: '',
      department: '',
      requestDate: '',
      dueDate: '',
      productDescription: '',
      justification: '',
      preferredVendors: '',
      category: '',
      status: '',
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(requests[index]);
  };

  return (
    <>
    <Authentication>
    <NavBar/>
    <div className='flex'>
      <SideBar/>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Requests Inbox</h1>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Requests Needing Action</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Requestor Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Department</th>
              <th className="py-2 px-4 border-b border-gray-300">Request Date</th>
              <th className="py-2 px-4 border-b border-gray-300">Due Date</th>
              <th className="py-2 px-4 border-b border-gray-300">Product Description</th>
              <th className="py-2 px-4 border-b border-gray-300">Justification</th>
              <th className="py-2 px-4 border-b border-gray-300">Status</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-300">{request.requestorName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{request.department}</td>
                <td className="py-2 px-4 border-b border-gray-300">{request.requestDate}</td>
                <td className="py-2 px-4 border-b border-gray-300">{request.dueDate}</td>
                <td className="py-2 px-4 border-b border-gray-300">{request.productDescription}</td>
                <td className="py-2 px-4 border-b border-gray-300">{request.justification}</td>
                <td className="py-2 px-4 border-b border-gray-300">{request.status}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleEdit(index)}
                    className="mr-2 text-blue-500"
                  >
                    <AiOutlineEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingIndex !== null && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <h2 className="text-xl font-semibold mb-4">Edit Request</h2>
          <div>
            <label className="block mb-2">Requestor Name</label>
            <input
              type="text"
              name="requestorName"
              value={formData.requestorName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Request Date</label>
            <input
              type="date"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Product Description</label>
            <input
              type="text"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Justification</label>
            <input
              type="text"
              name="justification"
              value={formData.justification}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Preferred Vendors</label>
            <input
              type="text"
              name="preferredVendors"
              value={formData.preferredVendors}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded"
          >
            <AiOutlineCheck className="mr-2" />
            Resubmit Request
          </button>
        </form>
      )}
    </div>
    </div>
    </Authentication>
    </>
  );
};

export default RequestsInbox;