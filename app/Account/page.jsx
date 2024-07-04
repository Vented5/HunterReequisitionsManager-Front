"use client";
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import Link from "next/link";

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

const Account = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userType: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    // Simulate fetching user details from an API
    const fetchUserDetails = async () => {
      // Replace with actual API call
      const userFromApi = await new Promise((resolve) =>
        setTimeout(() =>
          resolve({
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '123-456-7890',
            email: 'john.doe@example.com',
            userType: 'Admin',
            image: 'https://via.placeholder.com/150',
          }), 1000)
      );
      setUserDetails(userFromApi);
    };

    fetchUserDetails();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (password === '') {
      alert('Please enter your password to save changes.');
      return;
    }

    // Handle save logic here (e.g., API call)
    console.log('Saving changes with password:', password);
    console.log('New user details:', userDetails);
    if (newImage) {
      console.log('New image:', newImage);
    }

    setIsEditing(false);
    setPassword('');
  };

  return (
    <>
      <NavBar/>
      <div className='flex'>
        <SideBar/>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Account Details</h1>
      <div className="max-w-lg mx-auto bg-white p-4 rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img
            src={newImage ? URL.createObjectURL(newImage) : userDetails.image}
            alt="User"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        {isEditing && (
          <div className="flex justify-center mb-4">
            <input type="file" onChange={handleImageChange} />
          </div>
        )}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded`}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded`}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded`}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded`}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">User Type</label>
            <input
              type="text"
              name="userType"
              value={userDetails.userType}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded`}
            />
          </div>
          {isEditing && (
            <div className="flex flex-col">
              <label className="font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="p-2 border border-blue-500 rounded"
              />
            </div>
          )}
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded"
              >
                <AiOutlineSave className="mr-2" />
                Save
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
              >
                <AiOutlineEdit className="mr-2" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
      </div>
    </>
  );
};

export default Account;
