import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"

export default function Discover ()  {
  return (
    <div className="min-h-screen bg-gray-100  font-poppins ">
        <div className="md:ml-[12rem]">
      <Navbar />
      </div>
      <div className="w-full h-full  font-poppins pt-[7rem]  ">
          <Outlet/>
      </div>
     
  </div>
  )
}