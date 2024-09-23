/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getRequest } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Game from "../../components/Game";
import Participants from "../../components/NewTournament/Participants";

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState(true);
  const [squadVisible, setSquadVisible] = useState(false);
  const [oparation, setOparation] = useState(false);
  const [rosters, setRosters] = useState(false);
  const [certification, setCertification] = useState(false);
  let { id } = useParams();
  const [game, setGame] = useState([]);
  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `tournaments/games/${id}`;
        const data = await getRequest(url);
        setGame(data);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    fetchTournamentData();
  }, [id]);

  console.log('====================================');
  console.log(game);
  console.log('====================================');

  return (
    <div className="min-h-screen">
       <div className="lg:w-1/2 w-full mb-10">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Active Tournament
              </h1>
              <div className="h-1 w-20 bg-yellow-500 rounded"></div>
            </div>
 
      <div className="flex flex-row items-center justify-center gap-5 mb-4 bg-orange-500 w-[40%] p-2 rounded-md text-white">
        <button
          className={`${
            gameDetails ? "bg-white text-orange-500 md:p-3 p-2 rounded-xl " : "p-3"
          } `}
          onClick={() => {
            if (gameDetails == false) {
              setGameDetails(true);
              setSquadVisible(false);
              setRosters(false);
              setCertification(false);
              setOparation(false);
            } else setGameDetails(true);
          }}
        >
          <p className="md:text-md text-[12px]">Game Details</p>
        </button>

        <button
          className={`${
            squadVisible ? "bg-white text-orange-500 md:p-3 p-2 rounded-xl " : "p-3"
          } `}
          onClick={() => {
            if (squadVisible == false) {
              setGameDetails(false);
              setOparation(false);
              setRosters(false);
              setCertification(false);
              setSquadVisible(true);
            } else setSquadVisible(true);
          }}
        >
          <p className="md:text-md text-[12px]">Participants</p>
        </button>

        <button
          className={`${
            oparation ? "bg-white text-orange-500 md:p-3 p-2 rounded-xl " : "p-3"
          } `}
          onClick={() => {
            if (oparation == false) {
              setGameDetails(false);
              setRosters(false);
              setSquadVisible(false);
              setCertification(false);
              setOparation(true)
            } else setOparation(true);
          }}
        >
          <p className="md:text-md text-[12px]">Set operations</p>
        </button>


        <button
          className={`${
            rosters ? "bg-white text-orange-500 md:p-3 p-2 rounded-xl " : "p-3"
          } `}
          onClick={() => {
            if (rosters == false) {
              setGameDetails(false);
              setCertification(false);
              setSquadVisible(false);
              setOparation(false);
              setRosters(true)
            } else setRosters(true);
          }}
        >
          <p className="md:text-md text-[12px]">Rosters</p>
        </button>


        <button
          className={`${
            certification ? "bg-white text-orange-500 md:p-3 p-2 rounded-xl " : "p-3"
          } `}
          onClick={() => {
            if (certification == false) {
              setGameDetails(false);
              setSquadVisible(false);
              setOparation(false);
              setRosters(false);
              setCertification(true)
            } else setCertification(true);
          }}
        >
          <p className="md:text-md text-[12px]">Certifications</p>
        </button>


      </div>



      {
        gameDetails
        ?
        <>
        <Game person={game} />
        </>
        :
        null
      }
      {
        squadVisible
        ?
        <>
        <Participants/>
        </>
        :
        null
      }
    </div>
  );
};

export default GameDetails;
