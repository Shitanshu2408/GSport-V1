/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrgDetails = () => {
    const [org, setOrg] = useState([]);

  let { id } = useParams();
  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `tournaments/${id}`;
        const data = await getRequest(url);
        setOrg(data.data);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    fetchTournamentData();
  }, [id]);





  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
        <div className=" flex flex-col">
       
            <div className="lg:w-4/6 mx-auto">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={`http://127.0.0.1:8000/organizer/images/${org.image}`}
                />
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font text-gray-900 text-lg">
                      {org.organizer_name}
                    </h2>
                    <div className="w-12 h-1 bg-yellow-500 rounded mt-2 mb-4"></div>
                    <p>
                        Close on
                    </p>
                    <p className="text-base">
                     {org.end_date}
                    </p>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p className="leading-relaxed text-lg mb-4">
                    {org.organizer_info}
                  </p>
                 
                </div>
              </div>
            </div>
         
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="">
          <div className="flex flex-wrap w-full mb-20">
            
          </div>










          <div className="flex flex-wrap -m-4">
      
        <Link
        to = {`/organizer/organization-details/${org.id}`}
         className="xl:w-1/4 md:w-1/2 p-4">
          <div className="bg-white p-6 rounded-lg">
            <img
              className="h-40 rounded w-full object-cover object-center mb-6"
              src={`http://127.0.0.1:8000/organizer/images/${org.image}`}
              alt="content"
            />
            <h3 className="tracking-widest text-xs font-medium title-font">
              {org.is_active ? <><p className="text-green-500">Active</p></> : <><p className="text-red-500">Closed</p></>}
            </h3>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
              {org.name}
            </h2>
            <p className="leading-relaxed text-base">{org.about}</p>
          </div>
        </Link>
    
    </div>

        </div>
      </section>
    </div>
  );
};

export default OrgDetails;
