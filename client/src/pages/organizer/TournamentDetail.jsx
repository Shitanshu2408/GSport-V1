/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest, postRequest, patchRequest } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { FaUndoAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import GameCard from "../../components/NewTournament/GameCard";

const TABLE_HEAD = ["Team", "Matches", "Win", "Loose", "Points"];

const TournamentDetail = () => {
  const [commentVisible, setCommentVisible] = useState(true);
  const [squadVisible, setSquadVisible] = useState(false);
  const [org, setOrg] = useState([]);
  const [commentry, setCommentry] = useState([]);
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStarted, setIsStarted] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [tData, setTData] = useState([]);
  const navigate = useNavigate();
  const [adminComment, setAdminComment] = useState("");
  let { id } = useParams();
  let initialDuration = 20;

  const [timer, setTimer] = useState(initialDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };
    const jwtToken = getCookie("jwt_auth_token");
    if (jwtToken) {
      setToken(jwtToken);
    } else {
      console.log("JWT Token not found in cookies");
    }
  }, []);

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
        const url = `tournaments/${id}`;
        const data = await getRequest(url);
        setOrg(data.data);
        console.log('====================================');
        console.log(data);
        console.log('====================================');

        if (data.data.organizer_id === userData.id) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setCommentry(data.data.commentry);

        const teamData = await getRequest(
          `players/team/tournament_id/${id}?token=${token}`
        );

        const sortedData = [...teamData.data].sort(
          (a, b) => b.points - a.points
        );
        setTData(sortedData);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    const intervalId = setInterval(fetchTournamentData, 1000);
    return () => clearInterval(intervalId);
  }, [commentry, id, token, userData.id]);



  useEffect(() => {
    let countdown;

    if (isTimerRunning) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isTimerRunning, tData]);

  const toggleTimer = () => {
    setIsTimerRunning((prevIsTimerRunning) => !prevIsTimerRunning);
  };
  function generateMatchSchedule(teams) {
    const schedule = [];
    const numberOfTeams = teams.length;
    const isOddNumberOfTeams = numberOfTeams % 2 !== 0;
    for (let i = 0; i < numberOfTeams - 1; i++) {
      for (let j = i + 1; j < numberOfTeams; j++) {
        const match = {
          team1: teams[i],
          team2: teams[j],
        };
        const isTeam1Bye = isOddNumberOfTeams && j === numberOfTeams - 1;
        const isTeam2Bye = isOddNumberOfTeams && i === numberOfTeams - 1;
        const isMatchUnique =
          !schedule.some(
            (existingMatch) =>
              (existingMatch.team1 === match.team1 &&
                existingMatch.team2 === match.team2) ||
              (existingMatch.team1 === match.team2 &&
                existingMatch.team2 === match.team1)
          ) &&
          !isTeam1Bye &&
          !isTeam2Bye;

        if (isMatchUnique) {
          schedule.push(match);
        }
      }
    }
    return schedule;
  }
  const matchSchedule = generateMatchSchedule(tData);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const incrementScore = (
    player,
    team_id,
    team_score,
    team_name,
    team_collegeName
  ) => {
    const jsonData = {
      score: team_score + 1,
    };
    patchRequest(`/players/create_team/${team_id} `, jsonData, token)
      .then((data) => {
        if (data.status == "success") {
          toast.success("Updates successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const jsonString = {
            comment: `${team_name} from ${team_collegeName} scores 1 score. Now total score of ${team_name} is ${jsonData.score}`,
          };
          postRequest(
            `/organizer/tournament/${id}/comments`,
            jsonString,
            token
          );
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error("API error");
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.error("API error:", error);
        }
      });
  };

  const handleComment = () => {
    const jsonString = {
      comment: adminComment,
    };
    postRequest(`/organizer/tournament/${id}/comments`, jsonString, token);

    setAdminComment("");
  };

  const decrementScore = (player) => {
    if (player === "player1" && player1Score > 0) {
      setPlayer1Score(player1Score - 1);
    } else if (player === "player2" && player2Score > 0) {
      setPlayer2Score(player2Score - 1);
    }
  };
  const addToWishlist = () => {
    const jsonData = {
      user_id: userData.id,
      tournament_id: id,
    };
    postRequest("/players/add_to_wishlist", jsonData, token)
      .then((data) => {
        toast.success("Added to Wishlist!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error("API error");
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.error("API error:", error);
        }
      });
  };

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

                  <p className="mb-1">
                    Starts on : {new Date(org.start_date).getDate()}/
                    {new Date(org.start_date).getMonth()}/
                    {new Date(org.start_date).getFullYear()}
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


      <GameCard/>

         </div>
  );
};

export default TournamentDetail;
