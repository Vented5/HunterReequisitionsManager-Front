"use client";
import React, { useState, useEffect, createContext } from 'react';
import Authentication from '../../components/Authentication';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import DetailedRequest from '../../components/DetaliedRequest';
import CreateRequestFrom from '../../components/CreateRequestForm';

export const ReqContext = createContext()


const AdminRequests = () => {
 
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [showForm, setShowForm] = useState(false);//Make request show control
  
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

  const handleSort = (key) => {
    let order = 'asc';
    if (sortKey === key && sortOrder === 'asc') {
      order = 'desc';
    }
    setSortKey(key);
    setSortOrder(order);
  };

  

  const sortedRequests = filteredRequests.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
    <Authentication>
    <NavBar/>

    <div className='flex h-[90%] text-xs md:text-base'>
      <SideBar/>
      
      <section className="container overflow-y-auto mx-2 px-4 py-2 h-fit shadow-lg lg:mx-auto ">

        {selectedRequest ? (    /// Vista detallada
        
          <ReqContext.Provider value={{ selectedRequest, setSelectedRequest, requests, setRequests}}>
            <DetailedRequest/>
          </ReqContext.Provider>
        
        ) : ( 
          showForm ? (        /// Creacion de request

            <ReqContext.Provider value={{showForm, setShowForm, requests, setRequests}}>
              <CreateRequestFrom/>
            </ReqContext.Provider>

          ) : (       /// Main
            <>
            <h1 className="md:text-xl font-bold mb-4">All Requisitions</h1>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by requestor, department, or product description"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className='max-h-96 overflow-auto'>
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
                    <td className="border p-2">{request.department}</td>
                    <td className="border p-2">{request.createdAt}</td>
                    <td className="border p-2">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            
            <button onClick={() => setShowForm(true)} className='mt-4 font-medium text-white border-solid border-2 bg-blue-500 rounded-md px-4 py-2  focus:ring-2 focus:ring-blue-400 focus:font-semibold'> Create requisition +</button>
            </>
          )
      )}  
    </section>
    
    </div>
    </Authentication>
    </>
  );
};

export default AdminRequests;
