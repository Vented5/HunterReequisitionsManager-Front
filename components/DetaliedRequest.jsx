import { ReqContext } from "../app/RequestsG/page"
import { Context } from "../context/Context";
import { useState, useContext, useEffect } from "react"
import StepsProgressBar from './StepsProgressBar'


export default function DetailedRequest() {
    const {selectedRequest, setSelectedRequest, requests, setRequests} = useContext(ReqContext)
    const { user } = useContext(Context)
    const [denyReason, setDenyReason] = useState('');

    const [itemsLists, setItemsLists] = useState([]);

    const handleBackButtonClick = () => {
        setSelectedRequest(null);
      };

    const handleDenyRequest = async () => {
        const updatedRequest = selectedRequest
        updatedRequest.status = 'denied'
        await fetch(`http://localhost:3010/requisitions/${selectedRequest.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(updatedRequest)
        })
        setRequests(requests.map(request => 
            request.id === selectedRequest.id? { ...request, status:'denied'} : request
        ))
        setSelectedRequest(null);
      };

      async function validateRequest () {
        console.log(selectedRequest)
        const updatedRequest = selectedRequest
        updatedRequest.status = 'validated'
        await fetch(`http://localhost:3010/requisitions/${selectedRequest.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(updatedRequest)
        })
        setRequests(requests.map(request => 
            request.id === selectedRequest.id? { ...request, status:'validated'} : request
        ))
        setSelectedRequest(null);
    }

    async function fetchItemsLists(reqId) {
      const response = await fetch(`http://localhost:3010/itemsLists/${reqId}`, {
        method: 'GET'
      })
      const data = await response.json()
      console.log("Responese: ", response)
      console.log("Data: ", data) //resultado: Array [ {...} ] 
      setItemsLists(data)
      console.log("ItemsLists: ", itemsLists)//resultado: Array []
    }

    useEffect(() => {
      fetchItemsLists(selectedRequest.id)
    }, [])
    
    useEffect(() => {
      // Efecto para manejar cambios en itemsLists
      console.log("ItemsLists actualizado: ", itemsLists);
    }, [itemsLists]); // Se ejecuta cada vez que itemsLists cambia*/
  

    return (
        <div>
        <h1 className="text-2xl font-bold mb-4">Requisition no. {selectedRequest.id} </h1>
    
          <section className="h-full mx-auto my-4 p-6 border rounded shadow-lg max-w-screen-lg space-y-4">
            <div className="flex space-x-32">
              <div className="w-full">
                <span className="flex justify-between"><strong>Requestor:</strong><p>{selectedRequest.requisitor.name}</p></span>
                <span className="flex justify-between"><strong>Department:</strong><p> {selectedRequest.department.name}</p></span>
              </div>

              <div className="w-full">
                <span className="flex justify-between"><strong>Dues On:</strong><p> {selectedRequest.dueDate}</p></span>
                <span className="flex justify-between"><strong>Requested On:</strong><p> {selectedRequest.createdAt}</p></span>
                
              </div>
            </div>

            <hr/>
              <div>
                <h2 className="text-xl font-bold text-center mb-2">Status</h2>
                <StepsProgressBar/>
              </div>
            <hr/>

            {selectedRequest.status.toLowerCase() === 'denied' && (
               <><p><strong>Deny Reason: </strong>{selectedRequest.denyReason}Ajajaja valio verdura</p>
               <hr/></>
            ) }

            {selectedRequest.status.toLowerCase() === 'validated' && (
               <><p><strong>Validated by:</strong> {selectedRequest.approver}</p>
               <hr/></>
            ) }

            <div><strong>Product Description:</strong><p> {selectedRequest.description}</p></div>
            
            <div><strong>Justification:</strong><p> {selectedRequest.justification}</p></div>
            
            <div>
              <table className="w-full text-left border">
                <thead className="bg-gray-200 border-b text-sm">
                  <tr>
                    <th className="pl-4">Id</th>
                    <th className="pl-4">Item</th>
                    <th className="pl-4">Category</th>
                    <th className="pl-4">Price/u</th>
                    <th className="pl-4">Units</th>
                    <th className="pl-4">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsLists.map(itemsList => 
                    <tr key={itemsList.id}>
                      <td className="pl-4">{itemsList.item.id}</td>
                      <td className="pl-4">{itemsList.item.name}</td>
                      <td className="pl-4">{itemsList.item.category.name}</td>
                      <td className="pl-4">{itemsList.item.price}</td>
                      <td className="pl-4">{itemsList.quantity}</td>
                      <td className="pl-4">{itemsList.price}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              
            </div>

            <div className="flex space-x-32">
              <div className="w-full">
                <span className="flex justify-between"><strong>Provider:</strong> <p>{selectedRequest.provider.name}</p></span>
                <span className="flex justify-between"><strong>Preferred Vendors:</strong><p> {selectedRequest.preferredVendors}</p></span>
              </div>
              
            </div>
            
            
            
            <div className="flex space-x-4">
              <button type="button" onClick={handleBackButtonClick} className="w-full px-4 py-2 bg-gray-500 text-white rounded" >
                Back
              </button>
         
              {selectedRequest.status.toLowerCase() !== 'denied' && user.role === 'Admin' && (
                  <>
                  <input type="text" placeholder="Deny Reason" value={denyReason} onChange={(e) => setDenyReason(e.target.value)} className="p-2 border border-gray-300 rounded mb-2 hidden"/>
                  <button type="button" onClick={handleDenyRequest} className="w-full px-4 py-2 bg-red-500 text-white rounded">
                    Deny Request
                  </button>
                  </>
              )}

              {selectedRequest.status.toLowerCase() === 'requested'  && user.role === 'Admin' && (
                  <button type="button" onClick={validateRequest} className="w-full px-4 py-2 bg-green-500 text-white rounded">
                      Validate Request
                  </button>
              )}
            
          </div>
          </section>
        
        </div>
    )
}