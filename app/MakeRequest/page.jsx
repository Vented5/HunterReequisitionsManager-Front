"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineSave } from "react-icons/ai";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Authentication from "../../components/Authentication";

const MakeRequest = () => {
  const [formData, setFormData] = useState({
    requestorName: "",
    department: "",
    requestDate: "",
    dueDate: "",
    productDescription: "",
    justification: "",
    preferredVendors: "",
    category: "",
    provider: "",
  });
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Simulate fetching categories, providers, and drafts from a database
    const fetchCategories = async () => {
      // Replace with actual API call
      const categoriesFromApi = await new Promise((resolve) =>
        setTimeout(
          () => resolve(["Category 1", "Category 2", "Category 3"]),
          1000
        )
      );
      setCategories(categoriesFromApi);
    };

    const fetchProviders = async () => {
      // Replace with actual API call
      const providersFromApi = await new Promise((resolve) =>
        setTimeout(
          () => resolve(["Provider 1", "Provider 2", "Provider 3"]),
          1000
        )
      );
      setProviders(providersFromApi);
    };

    const fetchDrafts = async () => {
      // Replace with actual API call
      const draftsFromApi = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: 1,
                requestorName: "John Doe",
                department: "IT",
                requestDate: "2023-06-15",
                dueDate: "2023-07-15",
                productDescription: "New Laptops",
                justification: "Upgrade",
                preferredVendors: "Vendor 1",
                category: "Electronics",
                provider: "Provider 1",
              },
              {
                id: 2,
                requestorName: "Jane Smith",
                department: "HR",
                requestDate: "2023-06-16",
                dueDate: "2023-07-16",
                productDescription: "Office Chairs",
                justification: "Replacement",
                preferredVendors: "Vendor 2",
                category: "Furniture",
                provider: "Provider 2",
              },
            ]),
          1000
        )
      );
      setDrafts(draftsFromApi);
    };

    fetchCategories();
    fetchProviders();
    fetchDrafts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log("Form submitted:", formData);
  };

  const saveDraft = () => {
    // Save draft logic here
    console.log("Draft saved:", formData);
  };

  const handleDraftClick = (draft) => {
    setFormData(draft);
    setSelectedDraft(draft.id);
    setShowForm(true);
  };

  const handleNewRequestClick = () => {
    setFormData({
      requestorName: "",
      department: "",
      requestDate: "",
      dueDate: "",
      productDescription: "",
      justification: "",
      preferredVendors: "",
      category: "",
      provider: "",
    });
    setSelectedDraft(null);
    setShowForm(true);
  };

  const handleBackButtonClick = () => {
    setShowForm(false);
  };

  return (
    <>
    <Authentication>
    <NavBar/>
    <div className="flex">
      <SideBar/>

      <div className="container mx-auto p-4">
      
      <button onClick={handleNewRequestClick} className="w-full px-4 py-2 bg-blue-500 mb-4 text-white rounded">Make Request</button>
     
      <div className="flex">

        <div className="w-full p-2">

          <h2 className="text-xl font-bold mb-4">Drafts</h2>
          <ul className="space-y-2">
            {drafts.map((draft) => (
              <li
                key={draft.id}
                onClick={() => handleDraftClick(draft)}
                className={`p-2 border rounded cursor-pointer ${
                  selectedDraft === draft.id
                    ? "bg-gray-200"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                <div className="font-semibold">{draft.requestorName}</div>
                <div className="text-sm">{draft.department}</div>
                <div className="text-sm">{draft.requestDate}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`w-full p-4 ${showForm ? "block" : "hidden"}`}>
          <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">
              {selectedDraft ? "Edit Draft" : "Make Request"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2" htmlFor="requestorName">
                  Requestor Name *
                </label>
                <input
                  type="text"
                  id="requestorName"
                  name="requestorName"
                  value={formData.requestorName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="department">
                  Department *
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="requestDate">
                  Request Date *
                </label>
                <input
                  type="date"
                  id="requestDate"
                  name="requestDate"
                  value={formData.requestDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="dueDate">
                  Due Date *
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="productDescription">
                  Product Description *
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block mb-2" htmlFor="justification">
                  Justification *
                </label>
                <textarea
                  id="justification"
                  name="justification"
                  value={formData.justification}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block mb-2" htmlFor="preferredVendors">
                  Preferred Vendors (optional)
                </label>
                <input
                  type="text"
                  id="preferredVendors"
                  name="preferredVendors"
                  value={formData.preferredVendors}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2" htmlFor="provider">
                  Provider *
                </label>
                <select
                  id="provider"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Provider</option>
                  {providers.map((provider, index) => (
                    <option key={index} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleBackButtonClick}
                  className="px-4 py-2 bg-gray-500 text-white rounded w-full"
                >
                  Back
                </button>
                {selectedDraft && (
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded w-full"
                  >
                    <AiOutlineSave className="mr-2" />
                    Save Draft
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
    </div>
    </Authentication>
    </>
  );
};

export default MakeRequest;
