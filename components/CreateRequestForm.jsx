import { useState, useContext, useEffect } from "react"
import { Context } from "../context/Context";
import { ReqContext } from "../app/RequestsG/page"
import { stringify } from "postcss";

export default function CreateRequestFrom() {
    const { showForm, setShowForm, requests, setRequests } = useContext(ReqContext)
    const { user } = useContext(Context)
    const [formData, setFormData] = useState({
        requestor: user.id,
        department: "RH",  
        dueDate: "2024-08-12",
        description: "500 pizzas",
        justification: "Tengo hambre we",
        preferredVendors: "pizzerola",
        category: "",
        provider: "",
      });
      const [categories, setCategories] = useState([]);
      const [providers, setProviders] = useState([]);
      const [drafts, setDrafts] = useState([]);

      useEffect(() => {
        // Simulate fetching categories, providers, and drafts from a database
        const fetchCategories = async () => {
          // Replace with actual API call
          const categoriesFromApi = await new Promise((resolve) =>
            setTimeout(
              () => resolve(["Category 1", "Category 2", "Category 3"]),
              1000
            )
          );
          setCategories(categoriesFromApi);
        };
    
        const fetchProviders = async () => {
          // Replace with actual API call
          const providersFromApi = await new Promise((resolve) =>
            setTimeout(
              () => resolve(["Provider 1", "Provider 2", "Provider 3"]),
              1000
            )
          );
          setProviders(providersFromApi);
        };
    
        const fetchDrafts = async () => {
          // Replace with actual API call
          const draftsFromApi = await new Promise((resolve) =>
            setTimeout(
              () =>
                resolve([
                  {
                    id: 1,
                    requestorName: "John Doe",
                    department: "IT",
                    requestDate: "2023-06-15",
                    dueDate: "2023-07-15",
                    productDescription: "New Laptops",
                    justification: "Upgrade",
                    preferredVendors: "Vendor 1",
                    category: "Electronics",
                    provider: "Provider 1",
                  },
                  {
                    id: 2,
                    requestorName: "Jane Smith",
                    department: "HR",
                    requestDate: "2023-06-16",
                    dueDate: "2023-07-16",
                    productDescription: "Office Chairs",
                    justification: "Replacement",
                    preferredVendors: "Vendor 2",
                    category: "Furniture",
                    provider: "Provider 2",
                  },
                ]),
              1000
            )
          );
          setDrafts(draftsFromApi);
        };
    
        fetchCategories();
        fetchProviders();
        fetchDrafts();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        
            const response = await fetch(`http://localhost:3010/requisitions/`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            
            const data = await response.json(); // O response.json() si esperas JSON
            console.log("Form submitted:", formData);
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
    };

    const handleBackButtonClick = () => {
        setShowForm(false);
      };

    return  (
        <>
        <h1 className="text-2xl font-bold mb-4">Create Request</h1>
        
        <div className="w-full mx-auto p-4 border rounded shadow-lg ">
        <h1 className="text-2xl font-bold mb-4">
 
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2 items-center text-nowrap ">
                <label className="w-fit mb-2 font-semibold" htmlFor="requestorName">
                    Requestor Name *
                </label>
                <input
                    type="text"
                    id="requestor"
                    name="requestor"
                    value={formData.requestor}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <label className=" mb-2 w-24 font-semibold" htmlFor="department">Department: *</label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
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
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            ></textarea>
            </div>
            <div>
            <label className="block mb-2 font-semibold" htmlFor="justification">
                Justification *
            </label>
            <textarea
                id="justification"
                name="justification"
                value={formData.justification}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            ></textarea>
            </div>
            <div>
            <label className="block mb-2 font-semibold" htmlFor="preferredVendors">
                Preferred Vendors (optional)
            </label>
            <input
                type="text"
                id="preferredVendors"
                name="preferredVendors"
                value={formData.preferredVendors}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
            />
            </div>
            <div>
            <label className="block mb-2" htmlFor="category">
                Category *
            </label>
            <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
                className="px-4 py-2 bg-blue-500 text-white rounded w-full"
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