/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import QRCode from 'qrcode.react';
import { 
  Input, 
  Button, 
  Switch, 
  IconButton
} from '@material-tailwind/react';
import Select from "react-select";

import check from "../../assets/icons/check.png"
import copy from "../../assets/icons/copy.png"
import CustomizedSteppers from '../Stepper';
import { useNavigate, useParams } from 'react-router-dom';
const Step4 = () => {

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

  const options = [
    {
        value: "Organizer",
        label: "Organizer"
    },
    {
        value: "Umpire",
        label: "Umpire"
    },
    {
        value: "Referee",
        label: "Referee"
    }
  ]

  const [idName, setIdName] = useState();
  const navigate = useNavigate();
  let { id } = useParams();


  return (
    <div className="w-full py-5 px-4 bg-white shadow-md rounded-lg  gap-4 ">

      <div className="w-full ">
        <CustomizedSteppers step={3} />
      </div>

      <div className='gap-4  mt-4 flex flex-col'>
        <p className='text-2xl lg:text-2xl font-bold text-blue-gray-700'>Add Collaborators</p>
      

      <div className='w-full flex flex-col lg:flex-row gap-4 justify-between items-center '>
        <div className='w-full lg:w-1/2'>
          <Input
          value={idName}
          onChange={(e) => setIdName(e.target.value)}
          label="Enter username / email"
          className=""
          color="orange"
          name="compName"
          />
        </div>
        <div className="w-full lg:w-1/4">
            <Select
            placeholder="Select role"
            onChange={()=> {}}
            options={options}
            name="game"
            />
        </div>
        <div className=''>
          <Button 
            onClick={()=> {}}
            color='orange'
            >Send Invite
          </Button>
        </div>
      </div>
      <div className="w-full">
          <Select
          placeholder="View invite list"
          onChange={()=> {}}
          options={options}
          name="game"
          />
      </div>
      </div>
      <div className='w-full flex flex-col lg:flex-row gap-4 mt-4 '>
      
        <div className='w-full lg:w-1/2 lg:border-r-2 p-4 items-center justify-center  space-y-4'>
          <div>
            <p className='text-blue-gray-700 text-xl font-semibold text-center '>Share code / Invite Link</p>
          </div>
          <div className='w-full flex items-center justify-center '>
            {textToCopy && <QRCode value={textToCopy} />}
          </div>
        </div>

        <div className='w-full lg:w-1/2 p-4 space-y-4'>
          <div className='border-2 flex justify-between lg:px-8 py-2  rounded-xl'>
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
              <div className='flex flex-col sm:flex-row gap-4  items-center'>
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
      <div className='w-full p-2 flex flex-row items-center justify-center gap-4 border-y mt-4'>
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

      <div className="w-full flex flex-row  items-center justify-between lg:justify-between gap-4  mt-28">
        <Button color='orange' onClick={()=> navigate(`/organizer/new-tournament/step3/${id}`)} >
          Prev
        </Button>
        <Button color='orange' onClick={()=> navigate(`/organizer/new-tournament/step5/${id}`)} >
          Next
        </Button>
      </div>

    </div>
  );
};

export default Step4;