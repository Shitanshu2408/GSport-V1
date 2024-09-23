/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottoNav";
import Navbar  from "../components/Navbar";
import Sidebar  from "../components/USidebar";

const Players = () => {
  return (
    <div className="w-full border-solid bg-gray-100 ">
      <div className="md:pl-[23rem]">
      <Navbar />
      </div>
      <div className="flex h-full w-full bg-gray-100">
     
        <div className="absolute md:hidden bg-gray-100">
          <Sidebar /> 
        </div>
        
        <div className=" block bg-gray-100">
          <Sidebar /> 
        </div>

          <div className=" w-full h-full md:p-5 p-4 bg-gray-100  font-poppins md:pl-[23rem] md:pt-[7rem] mb-20">
            <Outlet />
          </div>
          
      </div>
      
      <div className="md:hidden">
      <BottomNav/>
      </div>
    </div>
  );
};

export default Players;
