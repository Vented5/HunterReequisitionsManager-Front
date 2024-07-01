'use client'
import { FaBars } from "react-icons/fa";
import { Context } from "../context/Context";
import { useContext } from "react";

function NavBar() {
    const [toggle, setToggle] = useContext(Context)

    return (
        <div className="bg-white flex justify-between items-center px-4 h-12 mb-4">
            <button onClick={() => setToggle(!toggle)}>
                <FaBars className="cursor-pointer" />
            </button>
            {toggle ? 'open' : 'closed'}
            <h1>Hunter Requisitions Manager</h1>
            <p>User</p>
        </div>
    )
}


export default NavBar