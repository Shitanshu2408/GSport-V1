/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom';
import React from 'react'

const RegistrationProcess = () => {
  return (
    <div className="w-full min-h-screen flex flex-col-reverse md:flex-row md:space-x-5">
    <div className="mt-4 md:mt-0   px-2 min-h-full w-full md:w-full  flex flex-col items-center ">
      <p className=" text-blue-gray-700 text-3xl font-bold my-4 lg:mt-0 w-full">
        
      </p>
      <Outlet/>
    </div>


    </div>
  )
}

export default RegistrationProcess