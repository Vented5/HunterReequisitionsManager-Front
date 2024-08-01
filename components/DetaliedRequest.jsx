import { ReqContext } from "../app/RequestsG/page"
import { Context } from "../context/Context";
import { useState, useContext } from "react"


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

    return (
        <>
        <h1 className="text-2xl font-bold mb-4">Requisition no. {selectedRequest.id} </h1>
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
         
          {selectedRequest.status.toLowerCase() === 'denied' && (
            <p><strong>Deny Reason:</strong> {selectedRequest.denyReason}</p>
          )}
          <div className="flex items-center justify-between mt-4">
            <button type="button" onClick={handleBackButtonClick} className="px-4 py-2 bg-gray-500 text-white rounded" >
              Back
            </button>
            <div className="space-x-4">
            {selectedRequest.status.toLowerCase() !== 'denied' && user.role === 'Admin' && (
                <>
                <input type="text" placeholder="Deny Reason" value={denyReason} onChange={(e) => setDenyReason(e.target.value)} className="p-2 border border-gray-300 rounded mb-2 hidden"/>
                <button type="button" onClick={handleDenyRequest} className="px-4 py-2 bg-red-500 text-white rounded">
                  Deny Request
                </button>
                </>
            )}
            {selectedRequest.status.toLowerCase() !== 'validated' && user.role === 'Admin' && (
                <button type="button" onClick={validateRequest} className="px-4 py-2 bg-green-500 text-white rounded">
                    Validate Request
                </button>
            )}
             </div>
          </div>
        </div>
        </>
    )
}