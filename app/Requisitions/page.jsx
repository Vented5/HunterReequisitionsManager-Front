'use client'
import { useEffect, useState } from "react"

export default function Requisitions() {
    const [reqs, setReqs] = useState([])
    const url = 'http://localhost:3010/requisitions'
    useEffect(() => {
        fetch(url)
        .then((res) => {return res.json()})
        .then((data) => {
            console.log(data); 
            setReqs(data)
        })
    
    }, [])
   
    
    return (
        <>
            <div>
            <h1>Welcome to requisitions</h1>
            
            {reqs.map((req) => (
                <div key={req.id}>
                    <hr/>
                    <p>id: {req.id}</p>
                    <p>status: {req.status}</p>
                    <p>createdAt: {req.createdAt}</p>
                    <p>total: {req.total}</p>
                    <p>requisitorId: {req.requisitorId}</p>
                    <hr/>
                </div>
            ))}
            </div>
         
        </>
    )
}