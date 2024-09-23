/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CustomizedSteppers from "./Stepper";
import { Link, useParams, useNavigate } from "react-router-dom";
import { postRequest, getRequest } from "../../api/api";
import { GoNorthStar } from "react-icons/go";
import axios from "axios";
import { toast } from "react-toastify";


const PlayerDetails = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [imgName, setImgName] = useState("");
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState("");
  const [team, setTeam] = useState("");
  const [token, setToken] = useState("");
const [tID, setTID] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();


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
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
  }, []);


  const handleUpload = async () => {
    if (imgData) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Adjust the URL based on your FastAPI server address
        const apiUrl = "http://127.0.0.1:8000/organizer/files";

        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImgName(response.data);
        console.log("File uploaded successfully:", response.data);
        // Handle success, e.g., update state or display a success message
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error, e.g., display an error message
      }
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();

    setImgData(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };



  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `tournaments/${id}/games`;
        const data = await getRequest(url, token);
        setTID(data.data[0])
      } catch (error) {
        console.error('Error fetching tournament data:', error);
      }
    };
    fetchTournamentData();
  }, [id, tID, token]);
  


  const saveDetails = () => {
    const jsonData = {

      name: team,
      admin_id: userData.id,
      tournament_id: id,
      tournament_game_id: tID.id,
      no_of_boys: tID.min_boys,
      no_of_girls: tID.min_girls,
      image: imgName,
      payment_id: "",
      matches: 0,
      win: 0,
      loose: 0,
      points: 0,
      score: 0,
      verified: false


    };

    // console.log('====================================');
    // console.log(jsonData);
    // console.log('====================================');
    postRequest(
      "/players/create_team",
      jsonData,
      token
    )
      .then((data) => {
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

        console.log('====================================');
        console.log(data);
        console.log('====================================');
        navigate(`/organizer/register/payments/${id}/${data.data}`)
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
    <div className="w-full  bg-white shadow-md rounded-lg">
      <div className="w-full py-10">
        <CustomizedSteppers step={0} />
      </div>

      <section>
        <div className="grid grid-cols-7 gap-4">
          <div className="col-start-1 col-end-3 justify-center items-center flex flex-col gap-4 mx-10 pb-[98px] pt-7">
            <div className="flex flex-col items-center justify-center w-full h-[21rem] pb-20 border-dashed border-[2px] border-gray-400 ">
              <div className="flex flex-col items-center mt-8">
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg">
                    Browse
                  </div>
                </label>
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-[32rem] h-[21rem] object-fill rounded-md mt-4" // Adjust width and height as needed
                  />
                ) : (
                  <>
                    <p className="text-sm mt-2">Upload your image</p>
                  </>
                )}
              </div>

              <div></div>
            </div>
            {imgName ? (
              <>
                <button className="bg-green-500 text-white font-bold py-2 px-4  w-full rounded-lg">
                  Uploaded
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleUpload}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4  w-full rounded-lg"
                >
                  Upload
                </button>
              </>
            )}
          </div>

          <div className="mx-auto pb-10 col-start-3 col-end-6">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                  value={userData.full_name}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600 flex flex-row gap-1">
                    Team Name
                    <p className="text-red-500 pt-1"><GoNorthStar size={9}/></p>
                  </label>
                  <input
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                    type="text"
                   
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Contact number
                  </label>
                  <input
                  value={userData.phone_no}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                  value={userData.email_id}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Date of birth
                  </label>
                  <input
value={`${new Date(userData.dob).getDate()} / ${new Date(userData.dob).getMonth()} / ${new Date(userData.dob).getFullYear()}`}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    College
                  </label>
                  <input
                  value={userData.college}
                    type="text"
                    disabled
                   
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Address
                  </label>
                  <textarea
                  value={userData.address}
                  disabled
                    id="message"
                    name="message"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 mt-8 flex flex-row items-center justify-center w-full">
                <button
                onClick={saveDetails}
                  
                  className="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded-md text-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayerDetails;
