"use client";
import React, { useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';

const MakeRequest = () => {
  const [formData, setFormData] = useState({
    requestorName: '',
    department: '',
    requestDate: '',
    dueDate: '',
    productDescription: '',
    justification: '',
    preferredVendors: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log('Form submitted:', formData);
  };

  const saveDraft = () => {
    // Save draft logic here
    console.log('Draft saved:', formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Requestor Name</label>
          <input
            type="text"
            name="requestorName"
            value={formData.requestorName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
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
          />
        </div>
        <div>
          <label className="block mb-2">Product Description</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Justification</label>
          <textarea
            name="justification"
            value={formData.justification}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Preferred Vendors (optional)</label>
          <input
            type="text"
            name="preferredVendors"
            value={formData.preferredVendors}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Category (optional)</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={saveDraft}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded"
          >
            <AiOutlineSave className="mr-2" />
            Save Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeRequest;
