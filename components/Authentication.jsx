import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../context/Context";

const Authentication = ({children}) => {
    const { user, setUser } = useContext(Context)
    const router = useRouter() 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            router.push('Login')
        } else {
            const fetcher = async () => {
                const response = await fetch(`http://localhost:3010/auth/${token}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json'},
                })
                const data = await response.json()
                setUser(data.session)
            }  
            fetcher()
        }

    },[router]);

    return children
}

export default Authentication