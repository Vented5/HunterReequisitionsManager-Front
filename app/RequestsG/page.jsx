"use client";
import React, { useState, useEffect } from 'react';
import Authentication from '../../components/Authentication';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Cookies from 'js-cookie';


const AdminRequests = () => {
 
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [denyReason, setDenyReason] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch('http://localhost:3010/requisitions', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json'}
      })
      const data = await response.json()

      //console.log(data)
      
      setRequests(data);
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
    request.requisitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.department.name.toLowerCase().includes(searchTerm.toLowerCase()) //||
    //request.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRequests = filteredRequests.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
    <Authentication>
    <NavBar/>
    <div className='flex'>
      <SideBar/>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Requests</h1>
      {selectedRequest ? (
        <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">Request Details</h2>
          <p><strong>Requestor:</strong> {selectedRequest.requisitor.name}</p>
          <p><strong>Department:</strong> {selectedRequest.department.name}</p>
          <p><strong>Request Date:</strong> {selectedRequest.createdAt}</p>
          <p><strong>Due Date:</strong> {selectedRequest.dueDate}</p>
          <p><strong>Product Description:</strong> {selectedRequest.description}</p>
          <p><strong>Justification:</strong> {selectedRequest.justification}</p>
          <p><strong>Preferred Vendors:</strong> {selectedRequest.preferredVendors}</p>
          <p><strong>Category:</strong> {selectedRequest.category.name}</p>
          <p><strong>Provider:</strong> {selectedRequest.provider.name}</p>
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
                  <td className="border p-2">{request.requisitor.name}</td>
                  <td className="border p-2">{request.createdAt}</td>
                  <td className="border p-2">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
    </div>
    </Authentication>
    </>
  );
};

export default AdminRequests;
