"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import Authentication from '../../components/Authentication';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import DetailedRequest from '../../components/DetaliedRequest';
import CreateRequestFrom from '../../components/CreateRequestForm';
import { Context } from '../../context/Context';

export const ReqContext = createContext()


const AdminRequests = () => {
 
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const {showForm, setShowForm} = useContext(Context);//Make request show control
  
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
    request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

    <div className='flex h-[93%] text-xs md:text-base'>
      
    
        <SideBar/>
      
      
      
      <section className="container overflow-y-auto mx-2 px-4 py-2 h-fit shadow-lg lg:mx-auto ">

        {selectedRequest ? (    /// Vista detallada
        
          <ReqContext.Provider value={{ selectedRequest, setSelectedRequest, requests, setRequests}}>
            <DetailedRequest/>
          </ReqContext.Provider>
        
        ) : ( 
          showForm ? (        /// Creacion de request

            <ReqContext.Provider value={{requests, setRequests}}>
              <CreateRequestFrom/>
            </ReqContext.Provider>

          ) : (       /// Main
            <>
            <h1 className="md:text-2xl font-bold mb-4">All Requisitions</h1>
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
                <tr className='bg-secondary text-slate-200'>
                  <th className="border border-secondary p-2 cursor-pointer" onClick={() => handleSort('id')}>Id</th>
                  <th className="border border-secondary p-2 cursor-pointer" onClick={() => handleSort('requestorName')}>Requestor</th>
                  <th className="border border-secondary p-2 cursor-pointer" onClick={() => handleSort('progressStage')}>Department</th>
                  <th className="border border-secondary p-2 cursor-pointer" onClick={() => handleSort('dueDate')}>Due Date</th>
                  <th className="border border-secondary p-2 cursor-pointer" onClick={() => handleSort('progressStage')}>Progress Stage</th>
                </tr>
              </thead>
              <tbody className='cursor-pointer'>
                {sortedRequests.map((request, index) => (
                  <tr key={request.id} onClick={() => handleRequestClick(request)} className={index%2==0? "bg-gray-200 hover:bg-gray-200 hover:ring-2 hover:ring-inset hover:ring-tertiary": "bg-slate-100 hover:ring-2 hover:ring-tertiary hover:ring-inset"}>
                    <td className="border border-secondary p-2">{request.id}</td>
                    <td className="border border-secondary p-2">{request.requisitor.name.charAt(0).toUpperCase() + request.requisitor.name.slice(1)}</td>
                    <td className="border border-secondary p-2">{request.department}</td>
                    <td className="border border-secondary p-2">{formatDate(request.dueDate)}</td>
                    <td className="border border-secondary p-2">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            
            <button onClick={() => setShowForm(true)} className='mt-4 font-semibold border-solid border-2 text-white bg-tertiary rounded-md px-4 py-2  focus:ring-2 focus:ring-blue-400 focus:font-semibold'> Create requisition +</button>
            </>
          )
      )}  
    </section>
    
    </div>
    </Authentication>
    </>
  );
};

function formatDate(dateString) {
  const date = new Date(dateString);

  // Array de nombres de los meses en español
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  // Obtener el nombre del mes
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Formatear la fecha en el formato deseado
  return `${day} ${month} ${year}`;
}

export default AdminRequests;
