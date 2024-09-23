/* eslint-disable no-unused-vars */
import React from 'react'
import CustomizedSteppers from './Stepper'
import {Link} from "react-router-dom"
import { ImWhatsapp } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { MdEmail } from "react-icons/md";
const AddMembers = () => {
  return (
    <div className='w-full  bg-white shadow-md rounded-lg'>
                 <div className="w-full py-10">
        <CustomizedSteppers step={2} />
      </div>


      <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="mb-10 md:mb-0 bg-red-200">
      <img className="  rounded" alt="hero" src="https://c1.img2qr.com/images/simple_qrcode.png?x-oss-process=image/quality,Q_80"/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"> </h1>
      <p className="mb-8 mt-4 leading-relaxed">Chillwave portland ugh, knausgaard fam polaroid iPhone. Man braid swag typewriter affogato, hella selvage wolf narwhal dreamcatcher.</p>
      <div className="flex w-full md:justify-start justify-center items-end">
        <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
          
          <input type="text" id="hero-field" value={"https://chat.openai.com/c/6d843ea7-0d01-4c41-b75f-f7fcd5bc8023"} name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:bg-transparent focus:border-orange-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <button className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg">Copy</button>
      </div>
      <p className="text-sm mt-2 text-gray-500 mb-8 w-full">Share on social media</p>
      <div className="flex lg:flex-row md:flex-col">
        <button className="bg-gray-100 inline-flex py-3 px-5 hover:text-green-500 rounded-lg items-center hover:bg-gray-100 focus:outline-none">
        <ImWhatsapp size={25} />

        </button>
        <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:text-red-300 lg:ml-4 md:ml-0 ml-4 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-100 focus:outline-none">
        <BsInstagram size={25} />

        </button>

        <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:text-blue-400 lg:ml-4 md:ml-0 ml-4 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-100 focus:outline-none">
        <SiLinkedin size={25}/>

        </button>

        <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:text-brown-500 lg:ml-4 md:ml-0 ml-4 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-100 focus:outline-none">
        <MdEmail size={34}/>

        </button>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default AddMembers