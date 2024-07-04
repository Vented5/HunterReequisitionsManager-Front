"use client";
import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [denyReason, setDenyReason] = useState('');

  useEffect(() => {
    // Simulate fetching requests from a database
    const fetchRequests = async () => {
      const requestsFromApi = await new Promise((resolve) =>
        setTimeout(() => resolve([
          { id: 1, requestorName: 'John Doe', department: 'IT', requestDate: '2023-06-15', dueDate: '2023-07-15', productDescription: 'New Laptops', justification: 'Upgrade', preferredVendors: 'Vendor 1', category: 'Electronics', provider: 'Provider 1', approver: 'Manager A', status: 'Approved', progressStage: 'Ordered' },
          { id: 2, requestorName: 'Jane Smith', department: 'HR', requestDate: '2023-06-16', dueDate: '2023-07-16', productDescription: 'Office Chairs', justification: 'Replacement', preferredVendors: 'Vendor 2', category: 'Furniture', provider: 'Provider 2', approver: 'Manager B', status: 'Pending', progressStage: 'Validated' }
        ]), 1000)
      );
      setRequests(requestsFromApi);
    };

    fetchRequests();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let order = 'asc';
    if (sortKey === key && sortOrder === 'asc') {
      order = 'desc';
    }
    setSortKey(key);
    setSortOrder(order);
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  const handleDenyRequest = () => {
    if (selectedRequest) {
      // Update the request status to denied with a reason
      setRequests(requests.map(request =>
        request.id === selectedRequest.id
          ? { ...request, status: 'Denied', denyReason }
          : request
      ));
      setSelectedRequest(null);
      setDenyReason('');
    }
  };

  const handleBackButtonClick = () => {
    setSelectedRequest(null);
  };

  const filteredRequests = requests.filter((request) => 
    request.requestorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRequests = filteredRequests.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
    <NavBar/>
    <div className='flex'>
      <SideBar/>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Requests</h1>
      {selectedRequest ? (
        <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">Request Details</h2>
          <p><strong>Requestor:</strong> {selectedRequest.requestorName}</p>
          <p><strong>Department:</strong> {selectedRequest.department}</p>
          <p><strong>Request Date:</strong> {selectedRequest.requestDate}</p>
          <p><strong>Due Date:</strong> {selectedRequest.dueDate}</p>
          <p><strong>Product Description:</strong> {selectedRequest.productDescription}</p>
          <p><strong>Justification:</strong> {selectedRequest.justification}</p>
          <p><strong>Preferred Vendors:</strong> {selectedRequest.preferredVendors}</p>
          <p><strong>Category:</strong> {selectedRequest.category}</p>
          <p><strong>Provider:</strong> {selectedRequest.provider}</p>
          <p><strong>Approver:</strong> {selectedRequest.approver}</p>
          <p><strong>Status:</strong> {selectedRequest.status}</p>
          <p><strong>Progress Stage:</strong> {selectedRequest.progressStage}</p>
          {selectedRequest.status === 'Denied' && (
            <p><strong>Deny Reason:</strong> {selectedRequest.denyReason}</p>
          )}
          <div className="flex items-center space-x-4 mt-4">
            <button
              type="button"
              onClick={handleBackButtonClick}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Back
            </button>
            {selectedRequest.status !== 'Denied' && selectedRequest.status !== 'Approved' && (
              <div>
                <input
                  type="text"
                  placeholder="Deny Reason"
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  className="p-2 border border-gray-300 rounded mb-2"
                />
                <button
                  type="button"
                  onClick={handleDenyRequest}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Deny Request
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by requestor, department, or product description"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 cursor-pointer" onClick={() => handleSort('requestorName')}>Requestor</th>
                <th className="border p-2 cursor-pointer" onClick={() => handleSort('requestDate')}>Request Date</th>
                <th className="border p-2 cursor-pointer" onClick={() => handleSort('progressStage')}>Progress Stage</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map((request) => (
                <tr key={request.id} onClick={() => handleRequestClick(request)} className="cursor-pointer hover:bg-gray-100">
                  <td className="border p-2">{request.requestorName}</td>
                  <td className="border p-2">{request.requestDate}</td>
                  <td className="border p-2">{request.progressStage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
    </div>
    </>
  );
};

export default AdminRequests;
