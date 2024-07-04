'use client'
import { Context } from "../context/Context";
import { useContext, useState} from "react";
import Link from "next/link"; 

//Icons
import { FaBars, FaUserAstronaut } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function NavBar() {
    const [toggle, setToggle] = useContext(Context)
    const [dropdown, setDropdown] = useState(false);

    const handleLogoutClick = () => {
        // Add logout click handling logic here
        console.log("Logout clicked");
      };
    

    return (
        <div className="bg-white flex justify-between items-center px-4 h-12 mb-4 relative">
            <button onClick={() => setToggle(!toggle)}>
                <FaBars className="cursor-pointer" />
            </button>
            {toggle ? 'open' : 'closed'}
            <h1>Hunter Requisitions Manager</h1>
            <p>User</p>
            <div className="relative">
        <div onClick={() => setDropdown(!dropdown)} className="cursor-pointer">
          <FaUserAstronaut />
        </div>
        {dropdown&& (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
            <ul className="py-1">
              <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                <Link href="/Account" className="flex items-center">
                  Account
                </Link>
              </li>
              <li
                onClick={handleLogoutClick}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <IoIosLogOut />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
        
    )
}


export default NavBar