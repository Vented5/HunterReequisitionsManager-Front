"use client";
import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineCheckCircle } from 'react-icons/ai';

const RequestInbox = () => {
  const stages = [
    'Make Request',
    'Validate Request',
    'Advise on Request',
    'Purchase',
    'Ordered',
    'Received',
    'Delivered and In Stock'
  ];

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Simulate fetching requests from a database
    const fetchRequests = async () => {
      // Replace with actual API call
      const requestsFromApi = await new Promise((resolve) =>
        setTimeout(() =>
          resolve([
            { id: 1, requestDate: '2023-01-01', requestorName: 'John Doe', productName: 'Laptop', currentStage: 2, lastUpdatedBy: 'Admin' },
            { id: 2, requestDate: '2023-02-01', requestorName: 'Jane Smith', productName: 'Office Chair', currentStage: 4, lastUpdatedBy: 'Admin' },
            { id: 3, requestDate: '2023-03-01', requestorName: 'Alice Johnson', productName: 'Monitor', currentStage: 3, lastUpdatedBy: 'Admin' },
          ]), 1000)
      );
      setRequests(requestsFromApi);
    };

    fetchRequests();
  }, []);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto p-4 bg-black text-gray-200 font-roboto-condensed">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-100">Request Inbox</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Requests List */}
        <div className="col-span-2">
          {requests.length === 0 ? (
            <p className="text-lg text-gray-400">No requests found.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
                  onClick={() => handleViewDetails(request)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-100">{request.productName}</p>
                    <p className="text-sm text-gray-400 capitalize">{stages[request.currentStage]}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="flex items-center text-orange-500 hover:text-orange-400"
                    >
                      <AiOutlineEye className="mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Request Details */}
        {selectedRequest && (
          <div className="col-span-1 bg-gray-900 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-100">{selectedRequest.productName}</h2>
              <button
                onClick={handleCloseDetails}
                className="text-gray-400 hover:text-gray-200"
              >
                Close
              </button>
            </div>
            <div className="flex items-center mb-4">
              <AiOutlineCheckCircle className="text-green-500 mr-2" />
              <p className="capitalize text-gray-300">{stages[selectedRequest.currentStage]}</p>
            </div>
            <p className="mb-2 text-gray-300">Request Date: {selectedRequest.requestDate}</p>
            <p className="mb-2 text-gray-300">Requestor: {selectedRequest.requestorName}</p>
            <p className="mb-2 text-gray-300">Last Updated By: {selectedRequest.lastUpdatedBy}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestInbox;
