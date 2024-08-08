import { useState, useContext, useEffect } from "react"
import { Context } from "../context/Context";
import { ReqContext } from "../app/RequestsG/page"
import { stringify } from "postcss";

export default function CreateRequestFrom() {
    const { requests, setRequests } = useContext(ReqContext)
    const { user, showForm, setShowForm, } = useContext(Context)
    const [formData, setFormData] = useState({
        requestor: user.id,
        department: "",  
        dueDate: "2024-08-12",
        description: "",
        justification: "",
        category: "",
        provider: "",
        itemLists: [], 
      });
      const [categories, setCategories] = useState([]);
      const [providers, setProviders] = useState([]);
      
      const [itemDropDown, setItemDropDown] = useState(false)
      
      const [newItem, setNewItem] = useState({
        name: "",
        price: 20.00,
        quantity: 200,
        category: "Especial"
      })


      useEffect(() => {
          setCategories(["Electroinics", "Office Material", "Special"]);
        
    
        const fetchProviders = async () => {
          // Replace with actual API call
          const providersFromApi = await new Promise((resolve) =>
            setTimeout(
              () => resolve(["Vallarta Electronics", "Picaso Electronics", "Office depot"]),
              1000
            )
          );
          setProviders(providersFromApi);
        };
    
        fetchProviders();
      }, []);



    //----------------- Form submit --------------------  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Form submitted:", formData);

            const response = await fetch(`http://localhost:3010/requisitions/`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            
            const data = await response.json(); // O response.json() si esperas JSON

            
            console.log("Response from server:", data);
            console.log("Las requests son:", requests)
            
            const newRequisition = data.requisition
            setRequests(prevRequests => [...prevRequests, newRequisition])
            setShowForm(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log("Estado actualizado de: ", name, " a :", value)
    };

    function addNewItem () {
      console.log("formData: ", formData)
      const array = formData.itemLists
      if(newItem.name) {
        array.push(newItem)
        setFormData({ ...formData, itemLists: array})
      } 
      console.log("Updated formData: ", formData)
    }

    function changeItem(e) {
        const { name, value } = e.target;
        setNewItem(prevState => ({
          ...prevState,
          [name]: name === 'price' ? parseFloat(value) || '' : value
        }));
      }

    const handleBackButtonClick = () => {
        setShowForm(false);
      };

    return  (
        <>
        <h1 className="text-2xl font-bold mb-4">Create Request</h1>
        
        <div className="w-full mx-auto p-4 border rounded shadow-lg ">
        <h1 className="text-2xl font-bold mb-4">
 
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-nowrap">
            <div className="flex space-x-2 items-center  ">
                
                <label className=" mb-2 w-24 font-semibold" htmlFor="department">Department: *</label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    placeholder="Ej. Human Resources"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <label className=" mb-2 font-semibold" htmlFor="dueDate">
                Due Date *
                </label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            
           
            <div>
            
            </div>
            <div>
              <label className="block mb-2 font-semibold" htmlFor="description">
                  Product Description *
              </label>
              <textarea  id="description" name="description" value={formData.description} placeholder="Insert description...." onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold" htmlFor="justification">
                  Justification *
              </label>
              <textarea id="justification" name="justification"value={formData.justification} placeholder="Insert justification..." onChange={handleChange}  required className="mb-2 w-full p-2 border border-gray-300 rounded"></textarea>
            </div>

            <label htmlFor="" className="font-semibold">Items</label>

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
                {formData.itemLists.map((item, index) => 
                    <tr key={index}>
                      <td className="pl-4">{index +1}</td>
                      <td className="pl-4">{item.name}</td>
                      <td className="pl-4">{item.category}</td>
                      <td className="pl-4">{item.price}</td>
                      <td className="pl-4">{item.quantity}</td>
                      <td className="pl-4">{item.price * item.quantity}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              
            </div>

            <button type="button" onClick={() => (setItemDropDown(!itemDropDown))} className="border-2 border-blue-500 px-2 py-1 rounded focus:font-semibold focus:ring shadow-md">Add item + </button>
            
            { itemDropDown ? (
              <section className="flex flex-wrap items-center border ">
              <div className="flex space-x-2 mr-2">
                <label htmlFor="name">Product:</label>
                <input type="text" id="name" name="name" value={newItem.name} onChange={changeItem} placeholder="Product name" required className="w-auto p-1 border border-gray-300 rounded "/>

                <div className="flex space-x-1 border border-gray-300 rounded items-center">
                  <button type="button" onClick={() => (setNewItem({...newItem, quantity: newItem.quantity -1}))} className="w-full h-full hover:bg-gray-300 px-2 py-1">-</button>
                  <input id="quantity" name="quantity" className="w-8  text-center px-0.5" value={newItem.quantity} onChange={changeItem} placeholder="0"></input>
                  <button type="button" onClick={() => (setNewItem({...newItem, quantity: newItem.quantity +1}))}className="w-full h-full hover:bg-gray-300 px-2 py-1">+</button>  
                </div>  

              </div>
              
              <div className="space-x-2 mr-2">
                <label  htmlFor="category">Category *</label>
                <select
                    id="category"
                    name="category"
                    value={newItem.category}
                    onChange={changeItem}
                    className="w-fit p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="Category2">Select Category</option>
                    {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
              </div>
             
              <div className="space-x-2">
                <label htmlFor="text">Price:</label>
                <input type="number" id="price" name="price"  value={newItem.price} onChange={changeItem} className="w-auto p-1 border border-gray-300 rounded"></input>
              </div>

              <button type="button" onClick={addNewItem} className="bg-tertiary w-full p-1 text-white rounded">Add</button>

            </section>
            ) : ''}

            
          
            
            <div>
            <label className="block mb-2" htmlFor="provider">
                Provider *
            </label>
            <select
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            >
                <option value="Provider1">Select Provider</option>
                {providers.map((provider, index) => (
                <option key={index} value={provider}>
                    {provider}
                </option>
                ))}
            </select>
            </div>
            <div className="flex items-center space-x-4">
            <button
                type="button"
                onClick={handleBackButtonClick}
                className="px-4 py-2 bg-gray-500 text-white rounded w-full"
            >
                Back
            </button>
            <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-emerald-500 rounded w-full"
            >
                Submit
            </button>
            
            {/*selectedDraft && (
                <button
                type="button"
                onClick={saveDraft}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded w-full"
                >
                <AiOutlineSave className="mr-2" />
                Save Draft
                </button>
            )*/}
            </div>
        </form>
        </div>
        </>
    )
}