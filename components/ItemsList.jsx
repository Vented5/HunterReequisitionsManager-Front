import { useContext, useEffect, useState} from "react"
import { ReqContext } from "../app/RequestsG/page"

export default function ItemsList() {

    const [itemsLists, setItemsLists] = useState([])
    //const {itemsLists, setItemsLists, selectedRequest}  = useContext(ReqContext)
    const {selectedRequest}  = useContext(ReqContext)


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
                      <td className="pl-4">{itemsList.id}</td>
                      <td className="pl-4">{itemsList.name}</td>
                      <td className="pl-4">{itemsList.category}</td>
                      <td className="pl-4">{itemsList.price}</td>
                      <td className="pl-4">{itemsList.quantity}</td>
                      <td className="pl-4">{itemsList.price * itemsList.quantity}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              
            </div>
    )
}