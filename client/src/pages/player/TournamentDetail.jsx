/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest, postRequest, patchRequest } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Team", "Matches", "Win", "Loose", "Points"];
const TABLE_HEAD2 = ["Player", "College", "Email", "Team", "Action"];

const TournamentDetail = () => {
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

  const [commentVisible, setCommentVisible] = useState(true);
  const [squadVisible, setSquadVisible] = useState(false);
  const [pointsTable, setPointsTable] = useState(false);

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
        if (data.data.organizer_id === userData.id) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        if (data.data.commentry) {
          setCommentry(data.data.commentry);
        }
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
  }, [id, token, userData.id]);

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
        <div className=" flex flex-col pt-10 md:pt-0">
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
                <div className="flex flex-col  md:items-center md:text-center justify-center">
                  <h2 className="font-medium title-font text-gray-900 text-lg md:text-lg">
                    {org.organizer_name}
                  </h2>
                  <div className="w-12 h-1 bg-yellow-500 rounded mt-2 mb-4"></div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col items-start text-sm md:text-md">
                      <p className="mb-1">
                        Starts on : {new Date(org.start_date).getDate()}/
                        {new Date(org.start_date).getMonth()}/
                        {new Date(org.start_date).getFullYear()}
                      </p>
                      <p className="mb-1">Badminton</p>
                    </div>

                    <div className="flex flex-col items-start md:text-md text-sm">
                      <p className="mb-1">Prize : 20000</p>
                      <p className="mb-1">Total teams : 8</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 md:text-center sm:text-left">
                <p className="leading-relaxed md:text-lg md:mb-4">
                  {org.organizer_info}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-7 md:pt-10 pt-5">
          {isStarted ? (
            <>
              {
                <div className="col-start-1 col-end-5 ">
                  {matchSchedule.map((item, index) => (
                    <div key={index} className="">
                      <div className=" p-4 bg-white shadow-lg rounded-lg rounded-b-[55px] mb-10 w-[22.5rem] md:w-full">
                        <div className="flex flex-row justify-between items-center mb-4 border-b-2 pb-2 text-sm md:text-md">
                          <p>24 March 2023</p>
                          <p>Venue: PICT Campus </p>
                        </div>

                        <div className="flex flex-row items-center md:justify-between md:px-4 md:py-2 mb-2 pb-3">
                          <div className="flex flex-row items-center justify-between md:gap-4 gap-1">
                            <div className="rounded-full">
                              <img
                                className="md:w-20 md:h-20 w-8 h-8 rounded-full object-cover"
                                src="https://i0.wp.com/www.poornima.edu.in/wp-content/uploads/2023/11/cricbuzz-womens-points-table-2023_c6a15de7f.jpg?strip=all"
                                alt="Player 2"
                              />
                            </div>

                            <div className=" flex flex-col items-start">
                              <h2 className="md:text-lg text-[12px]">
                                {item.team1.name}
                              </h2>
                              <p className="md:text-md text-[10px] font-semibold">
                                {item.team1.admin.college}
                              </p>
                            </div>
                            <div className="mb-2 md:ml-10">
                              <div className="flex flex-row items-center  md:gap-4">
                                <div>
                                  <p className="bg-gray-100 border md:p-5 p-2 font-black md:text-md text-[12px]">
                                    {item.team1.score}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-1/4 md:p-4 flex flex-col items-center">
                            <h2 className="md:text-lg text-[12px] font-semibold md:mb-2">
                              Timer
                            </h2>
                            <div className="md:text-2xl text-[12px] font-bold">{`${Math.floor(
                              timer / 60
                            )
                              .toString()
                              .padStart(2, "0")}:${(timer % 60)
                              .toString()
                              .padStart(2, "0")}`}</div>
                          </div>

                          <div className="flex flex-row items-center md:gap-4 gap-1">
                            <div className="mb-2 md:mr-10">
                              <div className="flex flex-row items-center  md:gap-4">
                                <div>
                                  <p className="bg-gray-100 border md:p-5 p-2 md:text-md text-[12px] font-black">
                                    {item.team2.score}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-full">
                              <img
                                className="md:w-20 md:h-20 w-8 h-8  rounded-full object-cover"
                                src="https://i0.wp.com/www.poornima.edu.in/wp-content/uploads/2023/11/cricbuzz-womens-points-table-2023_c6a15de7f.jpg?strip=all"
                                alt="Player 2"
                              />
                            </div>

                            <div className=" flex flex-col items-start">
                              <h2 className="md:text-lg text-[12px]">
                                {item.team2.name}
                              </h2>
                              <p className="md:text-md text-[10px] font-semibold">
                                {item.team2.admin.college}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-200 -m-4 p-4 rounded-b-full">
                          {timer == 0 ? (
                            <>
                              <div className="px-6 flex flex-row items-center justify-center gap-4">
                                <div>
                                  {item.team1.score > item.team2.score ? (
                                    <>
                                      <p className="text-sm font-semibold">
                                        Won by {item.team1.name} from{" "}
                                        {item.team1.admin.college} by{" "}
                                        {item.team1.score - item.team2.score}{" "}
                                        points
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="text-sm font-semibold">
                                        Won by {item.team2.name} from{" "}
                                        {item.team2.admin.college} by{" "}
                                        {item.team2.score - item.team1.score}{" "}
                                        points
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="w-[22.5rem] md:w-full">
                    <div className="flex flex-row gap-4 mb-4 ">
                      <button
                        className={`${
                          commentVisible
                            ? "bg-orange-400 md:p-3 p-2 rounded-xl text-white "
                            : "p-3"
                        } `}
                        onClick={() => {
                          if (commentVisible == false) {
                            setCommentVisible(true);
                            setSquadVisible(false);
                            setPointsTable(false);
                          } else setCommentVisible(true);
                        }}
                      >
                        <p className="md:text-md text-[12px]">Commentry</p>
                      </button>

                      <button
                        className={`${
                          squadVisible
                            ? "bg-orange-400 md:p-3 p-2 rounded-xl text-white "
                            : "p-3"
                        } `}
                        onClick={() => {
                          if (squadVisible == false) {
                            setCommentVisible(false);
                            setPointsTable(false);
                            setSquadVisible(true);
                          } else setSquadVisible(true);
                        }}
                      >
                        <p className="md:text-md text-[12px]">Squads</p>
                      </button>

                      <button
                        className={` md:hidden ${
                          pointsTable
                            ? "bg-orange-400 md:p-3 p-2 rounded-xl text-white "
                            : "p-3"
                        } `}
                        onClick={() => {
                          if (pointsTable == false) {
                            setSquadVisible(false);
                            setCommentVisible(false);
                            setPointsTable(true);
                          } else setPointsTable(true);
                        }}
                      >
                        <p className="md:text-md text-[12px]">Points Table</p>
                      </button>
                    </div>

                    {commentVisible ? (
                      <>
                        {commentry.map((item, index) => (
                          <div key={index}>
                            {item.comment ? (
                              <>
                                <div className="bg-gray-50 my-2 text-gray-800  p-4 rounded-2xl text-[14px] flex flex-row justify-between items-center">
                                  <p>{item.comment}</p>

                                  <p className="text-xs text-gray-600">
                                    {new Date(item.createdAt).toLocaleString(
                                      "en-US",
                                      {
                                        hour: "numeric",
                                        minute: "numeric",
                                        second: "numeric",
                                        hour12: true,
                                      }
                                    )}
                                  </p>
                                </div>
                              </>
                            ) : null}
                          </div>
                        ))}
                      </>
                    ) : null}
                    {squadVisible ? (
                      <>
                        <div className=" w-full overflow-hidden">
                          {tData.map(({ team_players, name }, index) => (
                            <div key={index}>
                              {team_players.map((items, index) => (
                                <tr
                                  key={index}
                                  className="bg-white rounded-md shadow-sm flex items-center justify-evenly mb-4"
                                >
                                  <td className="p-4">
                                    <div className="rounded-full h-10 overflow-hidden">
                                      <img
                                        alt="content"
                                        className="object-cover object-center h-full w-full"
                                        src={items.player.profile_url}
                                      />
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {items.player.full_name}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {items.player.college}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography
                                      as="a"
                                      href="#"
                                      variant="small"
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      {items.player.email_id}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography
                                      as="a"
                                      href="#"
                                      variant="small"
                                      color="blue-gray"
                                      className="font-medium"
                                    >
                                      {name}
                                    </Typography>
                                  </td>

                                  {/* <td className="p-4">
                           <button className="bg-orange-400 px-4 py-2 rounded-lg text-white text-sm hover:bg-orange-600">
                            Refund
                           </button>
                          </td> */}
                                </tr>
                              ))}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}

                    {pointsTable ? (
                      <>
                        <Card className=" w-full overflow-hidden">
                          <table className="w-full min-w-max table-auto text-left">
                            <thead>
                              <tr>
                                {TABLE_HEAD.map((head) => (
                                  <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                  >
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal text-[12px] leading-none opacity-70"
                                    >
                                      {head}
                                    </Typography>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tData.map(
                                (
                                  { name, matches, win, loose, points },
                                  index
                                ) => (
                                  <tr
                                    key={name}
                                    className="even:bg-blue-gray-50/50"
                                  >
                                    <td className="p-4">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold text-[12px]"
                                      >
                                        {name}
                                      </Typography>
                                    </td>
                                    <td className="p-4">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal text-[12px]"
                                      >
                                        {matches}
                                      </Typography>
                                    </td>
                                    <td className="p-4">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal text-[12px]"
                                      >
                                        {win}
                                      </Typography>
                                    </td>
                                    <td className="p-4">
                                      <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium text-[12px]"
                                      >
                                        {loose}
                                      </Typography>
                                    </td>
                                    <td className="p-4">
                                      <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium text-[14px]"
                                      >
                                        {points}
                                      </Typography>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </Card>
                      </>
                    ) : null}
                  </div>
                </div>
              }
            </>
          ) : (
            <>
              <div className="col-start-1 col-end-5 ">
                {isRegistered ? (
                  <>
                    <p>registered</p>
                  </>
                ) : (
                  <>
                    <div className="col-start-1 col-end-5">
                      <Link
                        to={`/organizer/register/player-details/${id}`}
                        className="flex-shrink-0 ml-[21rem] shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg sm:mt-0"
                      >
                        Register
                      </Link>

                      <button
                        onClick={addToWishlist}
                        className="flex-shrink-0 ml-10 shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg sm:mt-0"
                      >
                        Add to wishlist
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          <div className="col-start-5 col-end-8 pl-24 hidden md:block">
            <Card className=" w-full overflow-hidden">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                  {tData.map(
                    (
                      { name, matches, win, loose, points, team_players },
                      index
                    ) => (
                      <tr key={name} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {matches}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {win}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {loose}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {points}
                          </Typography>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TournamentDetail;
