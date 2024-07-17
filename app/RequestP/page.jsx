"use client";
import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Authentication from '../../components/Authentication';

const RequestProgress = () => {
  const stages = [
    'Make Request',
    'Validate Request',
    'Advise on Request',
    'Purchase',
    'Ordered',
    'Received',
    'Delivered and In Stock'
  ];

  const [currentStage, setCurrentStage] = useState(0);
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Mock fetch function to simulate fetching requests from an API
    const fetchRequests = async () => {
      const mockRequests = [
        { id: 1, requestDate: '2023-01-01', requestorName: 'John Doe', productName: 'Laptop', currentStage: 2 },
        { id: 2, requestDate: '2023-02-01', requestorName: 'Jane Smith', productName: 'Office Chair', currentStage: 4 },
      ];
      setRequests(mockRequests);
    };

    fetchRequests();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const results = requests.filter(request =>
      request.requestDate.includes(searchQuery) ||
      request.requestorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRequests(results);
    setSelectedRequest(null);
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setCurrentStage(request.currentStage);
  };

  const advanceStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handleSubmit = () => {
    // Example submission logic
    if (name.trim() === '') {
      alert('Name field is required.');
      return;
    }

    // Handle submission logic here (e.g., API call)
    console.log(`Submitted Name: ${name}`);
    // Reset fields after submission
    setName('');
    setSelectedRequest(null);
  };

  return (
    <>
    <Authentication>
    <NavBar/>
    <div className='flex'>
      <SideBar/>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Request Progress</h1>
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Date, Requestor, or Product"
          className="p-2 border border-gray-300 rounded w-full max-w-4xl"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-2">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="border p-2 rounded cursor-pointer bg-white flex justify-between items-center w-full"
              onClick={() => handleRequestClick(request)}
            >
              <div>
                <p className="font-semibold">Requestor: {request.requestorName}</p>
                <p>Request Date: {request.requestDate}</p>
                <p>Product: {request.productName}</p>
                <p>Status: {stages[request.currentStage]}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedRequest && (
          <div className="mt-8 border p-4 rounded bg-white w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Review Request</h2>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <label htmlFor="name" className="w-24 text-right mr-2">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full max-w-md"
                required
              />
            </div>
            <div className="flex justify-center mb-4">
              <button
                onClick={advanceStage}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                Advance
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
            <div className="flex items-center justify-center w-full mt-4">
              <div className="w-full flex items-center justify-between">
                {stages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center w-1/7">
                    <div className={`flex items-center ${index <= currentStage ? 'text-green-500' : 'text-gray-500'}`}>
                      {index <= currentStage && <AiFillCheckCircle className="text-lg mr-1" />}
                      <span>{stage}</span>
                    </div>
                    {index < stages.length - 1 && (
                      <div className={`h-1 w-full mt-1 ${index < currentStage ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    </Authentication>
    </>
  );
};

export default RequestProgress;
