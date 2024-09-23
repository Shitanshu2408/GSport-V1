/* eslint-disable no-unused-vars */

// import { Input, Select, Option, ButtonGroup, Button, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import copy from "../../assets/icons/copy.png";
import check from "../../assets/icons/check.png"

import QRCode from 'qrcode.react';
import { 
  Input, 
  Button, 
  Switch, 
  IconButton
} from '@material-tailwind/react';

// import { 
//   Rosters, 
//   Details, 
//   SetOperations, 
//   Certifications, 
//   Participants 
// } from "../InProgress/StepOperations";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import CustomizedSteppers from "../../components/Stepper";


export default function Step5() {

  const navigate = useNavigate();
  let { id } = useParams();
  const [textToCopy, setTextToCopy] = useState("Text to be copied");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };

  const data = [
    {
      label: "DETAILS",
      value: "details",
      // desc: <Details/>,
    },
    {
      label: "PARTICIPANTS",
      value: "participants",
      // desc: <Participants/>,
    },
    {
      label: "OPERATIONS",
      value: "operations",
      // desc: <SetOperations/>,
    },
    {
      label: "ROSTERS",
      value: "rosters",
      // desc: <Rosters />,
    },
    {
      label: "CERTIFICATIONS",
      value: "certifications",
      // desc: <Certifications/>,
    },
  ];

  
  return (
    <div className="w-full flex flex-col py-5 px-4 mt-2 gap-2 lg:gap-8 bg-white shadow-md rounded-lg">
      <div className="w-full">
        <CustomizedSteppers step={4}/>
      </div>
      
    <div className='w-full flex flex-col lg:flex-row gap-4 '>
      
    <div className='w-full lg:w-1/2 lg:border-r-2 p-4 items-center justify-center  space-y-4'>
      <div>
        <p className='text-blue-gray-700 text-xl font-semibold text-center '>Share code / Invite Link</p>
      </div>
      <div className='w-full flex items-center justify-center '>
        {textToCopy && <QRCode value={textToCopy} />}
      </div>
    </div>

    <div className='w-full lg:w-1/2  space-y-4'>
      <div className='border-2 flex justify-between px-2 lg:px-8 py-2  rounded-xl'>
        <p className='text-blue-gray-700 text-sm lg:text-xl font-semibold'>Enable / disable code</p>
        
        <Switch
          id="custom-switch-component"
          ripple={false}
          className="h-full w-full checked:bg-[#ff9800]"
          containerProps={{
            className: "w-11 h-6",
          }}
          circleProps={{
            className: "before:hidden left-0.5 border-none",
          }}
          onChange={()=>{
            // enable disable function of code
          }}
        />
      </div>
      <div className='space-y-4'>
          <p className='text-blue-gray-700 text-sm lg:text-xl font-semibold'>Share this link :</p>
          <div className='flex flex-col sm:flex-row gap-4  items-center w-full '>
          <Input disabled 
            value={textToCopy}
            className="w-2/5"
          />
            <button
              onClick={handleCopyClick} 
              className='w-24 h-12  px-4 transition-all' 
            >{copySuccess ? 
              <img
              className="h-10 w-10  object-cover object-center p-1"
              src={check}
              alt="Copied"
            /> : 
            <img
            className="h-10 w-10 object-cover object-center p-2 rounded-lg bg-gray-100"
            src={copy}
            alt="copy"
            onClick={()=>{}}
          />
          }</button>
          </div>

      
      </div>
    </div>

  </div>
  <div className='w-full p-2 flex items-center justify-center gap-5 border-y mt-4'>
    <div className='item-center flex flex-col items-center justify-center '>
        <img
        className="h-10 w-10 rounded-full object-cover object-center border cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/128/10449/10449817.png"
        alt="Embed"
        onClick={()=>{}}
        
        />
      <p className='hidden lg:block text-blue-gray-700'>Embed</p>
    </div>
    <div className='item-center flex flex-col items-center justify-center '>
      <img
        className="h-10 w-10 rounded-full object-cover object-center  cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/128/4494/4494494.png"
        alt="Whatsapp"
        onClick={()=>{}}
      />
      <p className='hidden lg:block text-blue-gray-700'>Whatsapp</p>  
    </div>
    <div className='item-center flex flex-col items-center justify-center  cursor-pointer'>
      <img
        className="h-10 w-10 rounded-full object-cover object-center"
        src="https://cdn-icons-png.flaticon.com/128/3670/3670032.png"
        alt="Facebook"
        onClick={()=>{}}
      />
      <p className='hidden lg:block text-blue-gray-700'>Facebook</p>
    </div>
    <div className='item-center flex flex-col items-center justify-center  cursor-pointer'>
      <img
        className="h-10 w-10 rounded-full object-cover object-center"
        src="https://cdn-icons-png.flaticon.com/128/3670/3670211.png"
        alt="Twitter"
        onClick={()=>{}}
      />
      <p className=' hidden lg:block text-blue-gray-700'>Twitter</p>
    </div>
    <div className='item-center flex flex-col items-center justify-center cursor-pointer'>
      <img
        className="h-10 w-10 rounded-full object-cover object-center"
        src="https://cdn-icons-png.flaticon.com/128/552/552486.png"
        alt="Email"
        onClick={()=>{}}
      />
      <p className='hidden lg:block text-blue-gray-700'>Email</p>
    </div>
  </div>
    <div className="w-full flex justify-center lg:justify-end my-4">
    
      <div className='border-2 w-fit flex flex-col sm:flex-row items-center gap-4 lg:px-8 p-2  rounded-xl'>
        <p className='text-blue-gray-700 text-sm lg:text-lg font-semibold text-center'>The tournament will now be available at  
          <span className="text-orange-500"> In-progress </span> 
        section</p>
        <Button 
            onClick={()=> navigate("/organizer/tournament-tracking")}
            color='orange'
            >Done
        </Button>
      </div>
    </div>

      <div className="w-full flex flex-row  items-center justify-center lg:justify-start gap-4 ">
        <Button color='orange' onClick={()=> navigate(`/organizer/new-tournament/step4/${id}`)} >
          Prev
        </Button>
      </div>
    </div>
  );
}