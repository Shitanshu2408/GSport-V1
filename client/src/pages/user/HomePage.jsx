/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Typography,
  Button,
  Card
} from "@material-tailwind/react";
import {CheckIcon,} from "@heroicons/react/24/outline";

import {
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="w-full bg-gray-100  mb-10">
      
      
    <div className=" mx-auto md:mt-16 px-4 flex flex-col items-center -mt-10">
      <Typography variant="h1" color="blue-gray" className="text-center text-3xl lg:text-3xl xl:text-4xl">
        Enter your Arena
      </Typography>
      <Typography variant="h6" className="text-center font-normal text-gray-600">
        Play to win / Build your game
      </Typography>
      <div className="container mx-auto mt-8 px-4 flex flex-col lg:flex-row justify-center items-center lg:justify-center lg:items-start lg:gap-32">
      <Card className="bg-gray-900 w-full max-w-[20rem] p-8 transition-all  mb-10">
      <div className="bg-blue-500 h-4 w-full absolute left-0 top-0 rounded-t-lg"></div>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex  gap-1 text-4xl font-normal"
          >
            <span className="mt-2 text-4xl text-left"></span>Personal{" "}
            
          </Typography>
          <Typography
            variant="small"
            
            className="font-normal text-left mt-4 text-2xl"
          >
            Perfect for participants
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              
              <Typography color="white" className="font-bold text-3xl">Karan Chitroda</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-blue-500 bg-blue-500 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
              </span>
              <Typography className="font-normal">Played 7 games</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-blue-500 bg-blue-500 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
              </span>
              <Typography className="font-normal">Participated in 30+ tournaments.</Typography>
            </li>
            <li className="flex items-center gap-4">
            <span className="rounded-full border border-blue-500 bg-blue-500 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
              </span>
              <Typography className="font-normal">Smart ananlytics</Typography>
            </li>
            <li className="flex items-center gap-4">
            <span className="rounded-full border border-blue-500 bg-blue-500 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
              </span>
              <Typography className="font-normal">Player ranking</Typography>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="mt-10 p-0">


        <Link to={"/player/dashboard"}>

          <Button
            size="lg"
            
            className=" bg-gray-900 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
            Enter
          </Button>
          </Link>

        </CardFooter>
      </Card>
      <div className="lg:mt-0 lg:ml-8">
      <Card className="bg-gray-900 w-full max-w-[20rem] p-8 transition-all ">
      <div className="bg-red-200 h-4 w-full absolute left-0 top-0 rounded-t-lg"></div>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex  gap-1 text-4xl font-normal"
          >
            <span className="mt-2 text-4xl text-left"></span>Organization{" "}
            
          </Typography>
          <Typography
            variant="small"
            
            className="font-normal text-left mt-4 text-2xl"
          >
            Perfect for organizers
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              
              <Typography color="white" className="font-bold text-3xl">Karan Chitroda</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-gray-500 bg-red-200 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
              </span>
              <Typography className="font-normal">Organized 20+ tournaments from 5 org</Typography>
            </li>
            <li className="flex items-center gap-4">
            <span className="rounded-full border border-gray-500 bg-red-200 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
              </span>
              <Typography className="font-normal">Admin in 7 tournaments</Typography>
            </li>
            <li className="flex items-center gap-4">
            <span className="rounded-full border border-gray-500 bg-red-200 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
              </span>
              <Typography className="font-normal">Smart analytics</Typography>
            </li>
            <li className="flex items-center gap-4">
            <span className="rounded-full border border-gray-500 bg-red-200 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3 text-white" />
              </span>
              <Typography className="font-normal">Experienced in XYZ games</Typography>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="mt-10 p-0">
        <Link to={"/organizer/dashboard"}>
          <Button
            size="lg"
            
            className=" bg-gray-900  hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
            Enter
          </Button>
          </Link>
        </CardFooter>
      </Card>
      </div>
    </div>
  </div>
  </div>
  )
}

export default HomePage