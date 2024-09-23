/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/api";
import { Link } from "react-router-dom";


const YourOrg = () => {
  const [userData, setUserData] = useState("");
  const [org, setOrg] = useState([]);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `tournaments/userid/${userData.id}`;
        const data = await getRequest(url);
        setOrg(data.data);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    fetchTournamentData();
  }, [userData.id]);

  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font mt-14">
        <div className="">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Your Organizations
              </h1>
              <div className="h-1 w-20 bg-orange-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Navigate the complexities of your multiple organizations
              effortlessly with GSort. Our platform is your compass, guiding you
              through seamless coordination, enhanced productivity, and
              unparalleled success across every venture.
            </p>
          </div>













          <div className="flex flex-wrap -m-4">
      {org.map((card, index) => (
        <Link
        to = {`/organizer/organization-details/${card.id}`}
         key={index} className="xl:w-1/4 md:w-1/2 p-4">
          <div className="bg-white p-6 rounded-lg">
            <img
              className="h-40 rounded w-full object-cover object-center mb-6"
              src={`http://127.0.0.1:8000/organizer/images/${card.image}`}
              alt="content"
            />
            <h3 className="tracking-widest text-xs font-medium title-font">
              {card.is_active ? <><p className="text-green-500">Active</p></> : <><p className="text-red-500">Closed</p></>}
            </h3>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
              {card.organizer_name}
            </h2>
            <p className="leading-relaxed text-base">{card.about}</p>
          </div>
        </Link>
      ))}
    </div>











        </div>
      </section>
    </div>
  );
};

export default YourOrg;
