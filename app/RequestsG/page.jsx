"use client";
import React, { useState, useEffect, createContext } from 'react';
import Authentication from '../../components/Authentication';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import DetailedRequest from '../../components/DetaliedRequest';

export const ReqContext = createContext()


const AdminRequests = () => {
 
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  

  useEffect(() => {
    // -------------- FETCH ------------------
    const fetchRequests = async () => {
      const response = await fetch('http://localhost:3010/requisitions', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json'}
      })
      const data = await response.json()
      setRequests(data);
    };

    fetchRequests();
  }, []);

  //  -------------- FILTERS --------------------------
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

  const filteredRequests = requests.filter((request) => 
    request.id == searchTerm ||
    request.requisitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.includes(searchTerm.toLowerCase())//||
    //request.createdAt.includes(searchTerm) //||
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

        {selectedRequest ? (
        
          <ReqContext.Provider value={{ selectedRequest, setSelectedRequest, requests, setRequests}}>
            <DetailedRequest/>
          </ReqContext.Provider>
        
        ) : (

          <>
          <h1 className="text-2xl font-bold mb-4">All Requisitions</h1>
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
                <th className="border p-2 cursor-pointer" onClick={() => handleSort('id')}>Id</th>
                <th className="border p-2 cursor-pointer" onClick={() => handleSort('requestorName')}>Requestor</th>
                <th className="border p-2 cursor-pointer" onClick={() => handleSort('progressStage')}>Department</th>
                
                <th className="border p-2 cursor-pointer" onClick={() => handleSort('requestDate')}>Request Date</th>
                <th className="border p-2 cursor-pointer" onClick={() => handleSort('progressStage')}>Progress Stage</th>
                
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map((request) => (
                <tr key={request.id} onClick={() => handleRequestClick(request)} className="cursor-pointer hover:bg-gray-100">
                  <td className="border p-2">{request.id}</td>
                  
                  <td className="border p-2">{request.requisitor.name}</td>
                  <td className="border p-2">{request.department.name}</td>
                  <td className="border p-2">{request.createdAt}</td>
                  <td className="border p-2">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</td>
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
