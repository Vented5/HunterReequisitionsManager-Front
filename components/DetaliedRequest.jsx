import { ReqContext } from "../app/RequestsG/page"
import { Context } from "../context/Context";
import { useState, useContext, useEffect } from "react"
import StepsProgressBar from './StepsProgressBar'
import ItemsList from "./ItemsList";


export default function DetailedRequest() {
    const {selectedRequest, setSelectedRequest, requests, setRequests} = useContext(ReqContext)
    const { user } = useContext(Context)
    const [denyReason, setDenyReason] = useState('');
    
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
        console.log("Validated by: ", user.id)
        //console.log(selectedRequest)
        const updatedRequest = selectedRequest
        updatedRequest.status = 'validated'
        updatedRequest.validatorId = user.id
        await fetch(`http://localhost:3010/requisitions/${selectedRequest.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(updatedRequest)
        })
        setRequests(requests.map(request => 
            request.id === selectedRequest.id? { ...request, status:'validated', validatorId: user.id, validator: {name: user.name}} : request
        ))
        setSelectedRequest(null);
    }

    async function completeRequest () {
      const updatedRequest = selectedRequest
      updatedRequest.status = 'completed'
      await fetch(`http://localhost:3010/requisitions/${selectedRequest.id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'Application/json'},
          body: JSON.stringify(updatedRequest)
      })
      setRequests(requests.map(request => 
          request.id === selectedRequest.id? { ...request, status:'completed'} : request
      ))
      setSelectedRequest(null);
  }

    return (
        <div>
        <h1 className="text-2xl font-bold mb-4">Requisition no. {selectedRequest.id} </h1>
    
          <section className="h-full mx-auto my-4 p-6 border rounded shadow-lg min-w-fit  space-y-4">
            <div className="flex space-x-32">
              <div className="w-full">
                <span className="flex justify-between"><strong>Requestor:</strong><p>{selectedRequest.requisitor.name.charAt(0).toUpperCase() + selectedRequest.requisitor.name.slice(1)}</p></span>
                <span className="flex justify-between"><strong>Department:</strong><p> {selectedRequest.department}</p></span>
              </div>

              <div className="w-full">
                <span className="flex justify-between"><strong>Dues On:</strong><p> {formatDate(selectedRequest.dueDate)}</p></span>
                <span className="flex justify-between"><strong>Requested On:</strong><p> {formatDate(selectedRequest.createdAt)}</p></span>
                
              </div>
            </div>

            <hr/>
              <div>
                <h2 className="text-xl font-bold text-center mb-2">Status</h2>
                <StepsProgressBar/>
              </div>
            <hr/>

            {selectedRequest.status.toLowerCase() === 'denied' && (
               <div className="bg-rose-400 rounded p-2 flex space-x-3"><strong>Request denied</strong><p>{selectedRequest.denyReason}</p>
               <hr/></div>
            ) }

            {selectedRequest.status.toLowerCase() === 'validated' && (
               <div className="bg-emerald-400 rounded p-2 flex space-x-3"><strong>Validated by:</strong><p> {selectedRequest.validator? selectedRequest.validator.name : ""}    ( {selectedRequest.validator? selectedRequest.validator.role : ""} )</p>
               </div>
            ) }

            {selectedRequest.status.toLowerCase() === 'completed' && (
               <div className="bg-emerald-400 rounded p-2 flex space-x-3"><strong>Validated by:</strong><p> {selectedRequest.validator? selectedRequest.validator.name : ""}    ( {selectedRequest.validator? selectedRequest.validator.role : ""} )</p>
               </div>
            ) }

            <div><strong>Product Description:</strong><p> {selectedRequest.description}</p></div>
            
            <div><strong>Justification:</strong><p> {selectedRequest.justification}</p></div>
            
            <ItemsList/>

            <div className="flex justify-between">
                <span className="flex space-x-4"><strong>Provider:</strong> <p>{selectedRequest.provider.name}</p></span>
                <span className="flex space-x-4 pr-36"><strong>Total:</strong><p> {selectedRequest.total}</p></span>
              
            </div>
            
            
            
            <div className="flex space-x-4">
              <button type="button" onClick={handleBackButtonClick} className="w-full px-4 py-2 bg-gray-500 text-white rounded" >
                Back
              </button>
         
              {selectedRequest.status.toLowerCase() === 'validated' && user.role === 'Admin' && (
                  <>
                  <button type="button" onClick={completeRequest} className="w-full px-4 py-2 bg-emerald-500 text-white rounded">
                      Complete Request
                  </button>
                  </>
              )}

              {selectedRequest.status.toLowerCase() === 'requested'  && user.role === 'Admin' && (
                  <><button type="button" onClick={handleDenyRequest} className="w-full px-4 py-2 bg-red-500 text-white rounded">
                    Deny Request
                  </button>
                  <button type="button" onClick={validateRequest} className="w-full px-4 py-2 bg-emerald-500 text-white rounded">
                      Validate Request
                  </button></>
              )}
            
          </div>
          </section>
        
        </div>
    )
}

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