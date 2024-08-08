"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineSave } from "react-icons/ai";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Authentication from "../../components/Authentication";
import CreateRequestFrom from "../../components/CreateRequestForm";

const MakeRequest = () => {
  

  return (
    <>
    <Authentication>
    <NavBar/>
    <div className="flex h-[93%]">
      <SideBar/>
      <CreateRequestFrom/>
    </div>
    </Authentication>
    </>
  );
};

export default MakeRequest;
