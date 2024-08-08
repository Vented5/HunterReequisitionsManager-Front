'use client'
import { useContext, useEffect } from "react"
import { Context } from "../context/Context"
import { ReqContext } from "../app/RequestsG/page";

import Link from "next/link";

//icons
import { MdRequestQuote, MdOutlineUpdate } from "react-icons/md";
import { GrValidate } from "react-icons/gr";
import { GrInProgress } from "react-icons/gr";
import { FaRegMoneyBillAlt, FaAngleRight, FaUsers } from "react-icons/fa";
import { PiGitPullRequestDuotone } from "react-icons/pi";
import { BsDatabaseFillLock } from "react-icons/bs";
import { useRouter } from "next/navigation";



function SideBar() {
    const {user, setUser, toggle, setToggle, setShowForm} = useContext(Context)

    const router = useRouter()
    function handleButton() {
      router.push('/Users')
    }

    return (
        <div className={`flex justify-start itmes-start shadow-lg min-h-fit ${ toggle ? "w-60" : "hidden"} `}>
        <aside
          className={`bg-secondary overflow-hideen transition-all px-4 pt-4 lg:w-60 h-full text-slate-200`}
        >
          <ul>
            <li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
             
                <Link href="/RequestsG" onClick={() => (setShowForm(false))} className="flex justify-start items-center p-2">
                    <MdRequestQuote className="mr-2" />Requisitions
                </Link>
              
              
                
            </li>

            <li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
                {router.pathname != '/RequestsG' ? (<Link href="/RequestsG" onClick={() => (setShowForm(true))} className="flex justify-start items-center p-2">
                    <PiGitPullRequestDuotone className="mr-2" />Make Request
                </Link>
                ) : (
                  <div onClick={() => (setShowForm(true))} className="flex justify-start items-center p-2">
                    <PiGitPullRequestDuotone className="mr-2" />Make Request
                  </div> 
                )}
                
            </li>

            {/*<li className="items-center hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/URequest" className="flex justify-start p-2">
                    <MdOutlineUpdate className="mr-2" />Update Request
                </Link>
            </li> */}

            {/*<li className="hover:bg-blue-200 hover:text-blue-800-rounded-px2 ">
              <Link href="/RequestG" className="flex justify-start p-2">
                    <GrValidate className="mr-2" />Request Validation
                </Link>
            </li> */}

            {/*<li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/Budget" className="flex justify-start items-center p-2">
                    <FaRegMoneyBillAlt className="mr-2" />Budget
              </Link>
            </li> */}

            { user? (user.role==='Admin'? (
              <li className=" hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
                <Link href="/Users" className="flex justify-start items-center p-2">
                      <FaUsers className="mr-2" />Users
                </Link>
              </li>
            ) : "") : ""}
            
            
            {/*<li className="hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/Category" className="flex justify-start items-center p-2">
                <BsDatabaseFillLock className="mr-2" />Category
              </Link>
            </li>*/}

            {/*<li className="hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/Suppliers" className="flex justify-start items-center p-2">
                <BsDatabaseFillLock className="mr-2" />Suppliers
              </Link>
            </li>*/}

            <li className="hover:bg-blue-200 hover:text-blue-800-rounded-px5 ">
              <Link href="/RequestsG" className="flex justify-start items-center p-2">
                <MdOutlineUpdate className="mr-2" />Admin Requests
              </Link>
            </li>

            
          </ul>
        </aside>
      </div>
    )
}

export default SideBar