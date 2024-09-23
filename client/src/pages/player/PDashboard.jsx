/* eslint-disable no-unused-vars */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/api";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { IoMdOptions } from "react-icons/io";
import { MdNewLabel } from "react-icons/md";
import { BsPlayFill, BsCheck2Circle } from "react-icons/bs";
import { BiCheckCircle, BiPlay, BiPlus } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";

const cards = [
  {
    label: "Total Earnings",
    value: "$1500",
    desc: "+1 from yesterday",
    iconBg: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-500",
    linkTo: "/organizer/total-earning",
  },
  {
    label: "Organizations",
    value: "6",
    desc: "",
    iconBg: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-500",
    linkTo: "/organizer/your-organizations",
  },
  {
    label: "Tournaments",
    value: "16",
    desc: "+2 from yesterday",
    iconBg: "bg-light-blue-500",
    bgColor: "bg-light-blue-50",
    textColor: "text-light-blue-500",
    linkTo: "/organizer/your-tournaments",
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
                className={`rounded-full ${item.iconBg} md:w-10 md:h-10 h-8 w-8 flex items-center justify-center text-white text-xl`}
              >
                <item.icon />
              </div>
              <h1 className={`${item.textColor} capitalize md:text-lg text-sm`}>
                {item.label}
              </h1>
            </div>
            <h1 className={`${item.textColor} md:text-4xl text-2xl pl-2 font-bold`}>
              {item.heading}
            </h1>
            <p className={`${item.textColor} text-sm`}>{item.subheading}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const PDashboard = () => {
  const [org, setOrg] = useState([]);
  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `tournaments/getalltournament`;
        const data = await getRequest(url);
        setOrg(data.data);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    fetchTournamentData();
  }, []);

  return (
    <div className="h-full bg-gray-100 min-h-screen w-full">
      <section className="text-gray-600 body-font mt-12 ">
        <div className="">
          <div className="flex md:flex-row flex-col justify-between items-center w-full md:mb-10  pb-4 ">
            <div className="lg:w-1/2 w-full ">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Dashboard
              </h1>
              <div className="h-1 w-20 bg-yellow-500 rounded"></div>
            </div>

            <div className="flex flex-col mt-1 md:mt-0 md:flex-row gap-4">
             <div className="flex flex-row gap-4">
             <div className="bg-white p-3 col-span-2 md:col-span-3 h-full w-full rounded-lg flex items-center text-sm md:text-[14px] justify-center gap-2 px-4">
                <BiSearch className="text-blue-gray-700" />
                <input
                  placeholder="search"
                  className="w-full h-full bg-white  !outline-none"
                />
              </div>
              <button className="bg-orange-400 px-6 rounded-md text-white hover:bg-orange-600 text-[12px] md:text-[14px]">
                Search
              </button>
             </div>
              <div className="md:col-span-1 text-[12px] md:text-md bg-white p-3 pr-5 hover:bg-gray-200 text-blue-gray-700 flex gap-2 h-full rounded-lg hover:cursor-pointer items-center justify-center ">
                {" "}
                <HiOutlineDownload /> Download
              </div>
              {/* <div className="md:col-span-1  bg-gray-50 p-[10px] hover:bg-gray-200 text-blue-gray-700 flex items-center justify-center w-max px-2 text-xl h-full rounded-lg hover:cursor-pointer">
                <IoMdOptions
                  className="w-7 h-7  rounded-md"
                  onClick={() => {}}
                />
              </div> */}
            </div>
          </div>

          <div className="flex flex-row md:items-center  md:justify-center"><p className="md:text-lg text-sm font-semibold text-gray-900">Tournament Updates</p></div>

          <TournamentsUpdate />




          <div className="flex flex-row items-center md:justify-center py-6"><p className="md:text-lg text-sm font-semibold text-gray-900">Game Updates</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow ">
            
            {cards.map((card, index) => (
              <Link
                to={`${card.linkTo}`}
                key={index}
                className={`p-5 bg-white rounded-lg h-[17rem] space-y-5 shadow-sm`}
              >
                <div className="flex flex-row justify-between items-center">
                  <p className={`md:text-md text-sm font-bold text-blue-gray-700`}>
                    {card.label}
                  </p>
                  <div className={`md:w-12 md:h-12  p-2 rounded-lg ${card.iconBg}`}>
                    <div className="w-full h-full text-white flex justify-center items-center">
                      {card.label === "New" ? (
                        <HiDocumentText className="w-full h-full" />
                      ) : card.label === "In Progress" ? (
                        <BiPlay className="w-full h-full" />
                      ) : (
                        <BiCheckCircle className="w-full h-full" />
                      )}
                    </div>
                  </div>
                </div>
                <p className={`md:text-3xl text-xl font-bold ${card.textColor}`}>
                  {card.value}
                </p>
                <p className="text-sm text-gray-700">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PDashboard;
