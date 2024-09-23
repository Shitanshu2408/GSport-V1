/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import {
  Button,
  Carousel,
  IconButton,
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import { BiCalendarAlt } from "react-icons/bi";
import { BiCheckCircle, BiPlay, BiPlus } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaBoxes } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoMdOptions } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getRequest } from "../../api/api";
import { MdNewLabel } from "react-icons/md";
import { BsPlayFill, BsCheck2Circle } from "react-icons/bs";
const TABLE_HEAD = ["Tournaments", "Start Date", "Due Date", "Team", "Edit"];

const TABS = [
  {
    label: "New",
    value: "New",
  },
  {
    label: "In Progress",
    value: "Progress",
  },
  {
    label: "Completed",
    value: "Completed",
  },
];


function TournamentsUpdate() {
  const tuItems = [
    {
      icon: MdNewLabel,
      label: "new",
      heading: 1,
      subheading: "+1 from yesterday",
      color: "pink",
      iconBg: "bg-pink-300",
      textColor: "text-pink-300",
    },
    {
      icon: BsPlayFill,
      label: "in progress",
      heading: 1,
      subheading: "+1 from yesterday",
      color: "orange",
      iconBg: "bg-orange-300",
      textColor: "text-orange-300",
    },
    {
      icon: BsCheck2Circle,
      label: "completed",
      heading: "16/20",
      subheading: "+1 from yesterday",
      color: "blue",
      iconBg: "bg-blue-300",
      textColor: "text-blue-300",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 flex-grow py-4">
        {tuItems.map((item, index) => (
          <div
            key={index}
            className={`bg-${item.color}-50 flex-1 flex-grow rounded-lg space-y-5  flex flex-col items-start py-5 pl-5 gap-4 shadow-md `}
          >
            <div className="flex items-center justify-center gap-2">
              <div
                className={`rounded-full ${item.iconBg} w-10 h-10 flex items-center justify-center text-white text-xl`}
              >
                <item.icon />
              </div>
              <h1 className={`${item.textColor} capitalize text-lg`}>
                {item.label}
              </h1>
            </div>
            <h1 className={`${item.textColor} text-4xl pl-2 font-bold`}>
              {item.heading}
            </h1>
            <p className={`${item.textColor} text-sm`}>{item.subheading}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Team() {
  return (
    <div className="flex items-center -space-x-4">
      <Avatar
        variant="circular"
        alt="user 1"
        size="sm"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
      <Avatar
        variant="circular"
        alt="user 2"
        size="sm"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
      />
      <Avatar
        variant="circular"
        alt="user 3"
        size="sm"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
      />
      <Avatar
        variant="circular"
        alt="user 4"
        size="sm"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
      />
    </div>
  );
}

const OTournamentTracking = () => {
  const [tournament, setTournament] = useState([]);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = "tournaments/getalltournament";
        const data = await getRequest(url);

        setTournament(data.data);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    fetchTournamentData();
  }, []);


  const navigate = useNavigate();
  const [org, setOrg] = useState([]);
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    
    const fetchTournamentData = async () => {
      let uid
      const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userDataObject = JSON.parse(userDataString);
        uid = userDataObject.id
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
      try {
        const url = `tournaments/userid/${uid}`;
        const data = await getRequest(url);
        setOrg(data.data);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    fetchTournamentData();
  }, []);


  return (
    <div className="w-full min-h-screen flex flex-col gap-5 ">
      <section className="text-gray-600 body-font my-10 mr-6">
        <div className="">
          <div className=" flex flex-col sm:flex-row sm:items-center items-start mx-auto">
            <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
              Elevate your sporting events with seamless tournament creation and
              management. <br></br>Let the games begin!{" "}
            </h1>

            <Link
              to="/organizer/new-tournament/step1"
              className="flex-shrink-0 shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg mt-10 sm:mt-0"
            >
              New Tournament
            </Link>
          </div>
        </div>
      </section>


      <div className="w-full h-full flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full h-full gap-4 flex flex-col xl:pr-4 ">
          
          <div>


            <TournamentsUpdate/>

            <div className="w-full flex justify-between py-4">
              <p className="text-xl md:text-2xl font-bold text-blue-gray-700">
                Tournament details
              </p>
              <div className="flex space-x-4 text-blue-gray-700">
                <IconButton
                  className="cursor-pointer bg-gray-200 text-blue-gray-700 p-2"
                  size="sm"
                >
                  <IoMdOptions
                    className="w-7 h-7 p-1 rounded-md"
                    onClick={() => {}}
                  />
                </IconButton>
                <IconButton
                  className="cursor-pointer bg-gray-200 text-blue-gray-700 p-2"
                  size="sm"
                >
                  <FaBoxes
                    className="w-7 h-7 bg-gray-200 p-1 rounded-md"
                    onClick={() => {}}
                  />
                </IconButton>
                <IconButton
                  className="cursor-pointer bg-gray-200 text-blue-gray-700 p-2"
                  size="sm"
                >
                  <FiFilter
                    className="w-7 h-7 bg-gray-200 p-2 rounded-md"
                    onClick={() => {}}
                  />
                </IconButton>
              </div>
            </div>

            <div className="scroll-smooth">
              <Card className="h-full w-full">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none"
                >
                   <div className="flex flex-col items-center justify-between gap-4 md:flex-row z-50">


          <Tabs value="all" className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-2/5 z-0">
            <TabsHeader className="p-1">
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value} className="text-xs md:text-md p-4 rounded-full">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>

          
          <div className="text-sm z-50  rounded-lg flex justify-center items-center gap-2">
                <p className="text-xs ">Sort by: Due date</p>
                <input 
                    type="date"
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    id="birthday"
                    name="birthday" 
                    className=" px-4 py-2 z-50 rounded-lg border focus:outline-none  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-xs md:text-normal"
                />
            </div>
        </div>


                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row z-50">
                    
                  </div>
                </CardHeader>
                <CardBody className="overflow-hidden px-0">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {org.map((row, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 transition-all cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/organizer/tournament-details/${row.id}`
                            )
                          }
                        >
                          <td className="py-4 px-4 border-b">
                            <div className="flex items-center gap-3">
                              <Avatar
                                src={`http://127.0.0.1:8000/organizer/images/${row.image}`}
                                alt={row.name}
                                size="sm"
                                className="mr-8"
                              />
                              <div className="flex flex-col">
                                <Typography
                                  variant="large"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {row.name}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {row.organizer_name}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className="border-b">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal flex items-center space-x-3"
                            >
                              <BiCalendarAlt />
                              <p>{row.start_date}</p>
                            </Typography>
                          </td>
                          <td className="border-b">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal flex items-center space-x-3"
                            >
                              <BiCalendarAlt />
                              <p>{row.end_date}</p>
                            </Typography>
                          </td>

                          <td className="border-b">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <Team />
                            </Typography>
                          </td>

                          <td className="border-b">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal flex items-center ml-4"
                            >
                              <p>{row.organizer_name}</p>
                            </Typography>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTournamentTracking;
