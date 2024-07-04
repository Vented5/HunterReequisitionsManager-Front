"use client";
import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineCheckCircle } from 'react-icons/ai';
import Link from 'next/link';

const ProductRecommendation = () => {
  // Simulated data
  const initialRequests = [
    { 
      id: 1, 
      requestDate: '2023-01-01', 
      requestorName: 'John Doe', 
      productName: 'Laptop', 
      currentStage: 2, 
      lastUpdatedBy: 'Jane Smith',
      reason: 'Need a powerful laptop for programming tasks.'
    },
    { 
      id: 2, 
      requestDate: '2023-02-01', 
      requestorName: 'Jane Smith', 
      productName: 'Office Chair', 
      currentStage: 4, 
      lastUpdatedBy: 'John Doe',
      reason: 'Old chair is broken and uncomfortable.'
    },
    { 
      id: 3, 
      requestDate: '2023-03-01', 
      requestorName: 'Alice Johnson', 
      productName: 'Desk', 
      currentStage: 6, 
      lastUpdatedBy: 'Alice Johnson',
      reason: 'Need a larger desk for more workspace.'
    }
  ];

  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [recommendationReason, setRecommendationReason] = useState('');

  useEffect(() => {
    // Simulate fetching requests from a database
    // Replace with actual API call if necessary
    const fetchRequests = async () => {
      // Simulated fetching
      setRequests(initialRequests);
    };

    fetchRequests();
  }, []);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleRecommendationChange = (e) => {
    setRecommendation(e.target.value);
  };

  const handleReasonChange = (e) => {
    setRecommendationReason(e.target.value);
  };

  const handleSubmitRecommendation = () => {
    if (recommendation.trim() === '') {
      alert('Recommendation is required.');
      return;
    }
    if (recommendationReason.trim() === '') {
      alert('Reason for recommendation is required.');
      return;
    }

    // Handle recommendation submission here (e.g., API call)
    console.log('Submitted Recommendation:', recommendation);
    console.log('Reason for Recommendation:', recommendationReason);

    // Reset the recommendation fields
    setRecommendation('');
    setRecommendationReason('');
    setSelectedRequest(null);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const stages = [
    'Make Request',
    'Validate Request',
    'Advise on Request',
    'Purchase',
    'Ordered',
    'Received',
    'Delivered and In Stock'
  ];

  return (
    <div className="container mx-auto p-4 bg-black text-gray-200 font-roboto-condensed">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Product Recommendation</h1>

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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Request Details */}
        {selectedRequest && (
          <div className="col-span-1 bg-gray-900 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-100">{selectedRequest.productName}</h2>
              <button onClick={handleCloseDetails} className="text-gray-400 hover:text-gray-200">
                Close
              </button>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-300"><strong>Request Date:</strong> {selectedRequest.requestDate}</p>
              <p className="text-sm text-gray-300"><strong>Requestor:</strong> {selectedRequest.requestorName}</p>
              <p className="text-sm text-gray-300"><strong>Current Stage:</strong> {stages[selectedRequest.currentStage]}</p>
              <p className="text-sm text-gray-300"><strong>Last Updated By:</strong> {selectedRequest.lastUpdatedBy}</p>
              <p className="text-sm text-gray-300"><strong>Reason:</strong> {selectedRequest.reason}</p>
            </div>
            {/* Recommendation Form */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-100">Provide a Recommendation</h3>
              <textarea
                value={recommendation}
                onChange={handleRecommendationChange}
                className="w-full p-3 border border-gray-600 rounded-lg mb-2 bg-gray-800 text-gray-100"
                rows="4"
                placeholder="Enter your recommendation here..."
              />
              <textarea
                value={recommendationReason}
                onChange={handleReasonChange}
                className="w-full p-3 border border-gray-600 rounded-lg mb-4 bg-gray-800 text-gray-100"
                rows="2"
                placeholder="Enter reason for recommendation..."
              />
              <button
                onClick={handleSubmitRecommendation}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400"
              >
                Submit Recommendation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRecommendation;
