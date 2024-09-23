/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/api";
import { Link } from "react-router-dom";
const ORegistration = () => {
  const [token, setToken] = useState("");
  const [org, setOrg] = useState([]);

  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };
    const jwtToken = getCookie('jwt_auth_token');
    if (jwtToken) {
      setToken(jwtToken);
    } else {
      console.log('JWT Token not found in cookies');
    }
  }, []);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `/players/previous_participation?token=${token}`;
        const data = await getRequest(url);
        setOrg(data.data);
        
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    if (token) {
      fetchTournamentData();
    }
  }, [token]);

  return (
    <div className='h-screen'>
      

     
  <section className="text-gray-600 body-font mt-20">
  <div className="">
    <div className="flex flex-row items-center justify-between w-full mb-10 border-b pb-4 border-gray-300">
      

      
      <div className="lg:w-1/2 w-full ">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Your Registrations</h1>
        <div className="h-1 w-20 bg-yellow-500 rounded"></div>
      </div>
    </div>
    <div className="flex flex-wrap -m-4">
      {org.map((card, index) => (
        <Link
        to = {`/organizer/tournament-details/${card.tournament_game.tournament.id}`}
         key={index} className="xl:w-1/4 md:w-1/2 p-4">
          <div className="bg-white rounded-lg shadow-lg">
            <img
              className="h-40 rounded w-full object-cover object-center mb-6"
              src={`http://127.0.0.1:8000/organizer/images/${card.tournament_game.tournament.image}`}
              alt="content"
            />
            
            <div className="flex flex-row justify-between items-center pr-3">

            
            <h3 className="tracking-widest text-xs font-medium title-font pl-3">
              {card.tournament_game.tournament.is_active ? <><p className="text-green-500">Active</p></> : <><p className="text-red-500">Closed</p></>}
            </h3>
<p>Ends on : 24 March 2023</p>

            </div>

            <div className="flex flex-row justify-between items-center pr-3">

            
            <h2 className="text-lg text-gray-900 font-medium title-font  pl-3">
              {card.tournament_game.tournament.name}
            </h2>

            <p>
              Prize : 20000
            </p>

            </div>

            <div className="flex flex-row justify-between items-center pr-3 pb-6">

            
            <p className="leading-relaxed text-base pl-3">{card.tournament_game.tournament.about}</p>
<p className="bg-blue-300 text-white px-2  rounded-full">Badminton</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  </section>
  



    </div>
  )
}

export default ORegistration