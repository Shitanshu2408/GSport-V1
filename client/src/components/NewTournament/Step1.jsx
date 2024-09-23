/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useCreateTournamentMutation } from "../../../redux/api/organizer/orgApi";
// import { useAppSelector } from "../../../redux/store";
import { Button, Spinner } from "@material-tailwind/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setTournamentDetails } from "../../../redux/features/tournamentSlice";
import CustomizedSteppers from "../../components/Stepper";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../api/api";
import axios from "axios";

function Success() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-6xl">
          <CheckCircleOutlineIcon
            fontSize="inherit"
            className="text-green-400"
          />
        </p>
        <p className="font-poppins text-xl">Tournament Created Succesfully</p>
        <p className="font-poppins text-sm text-gray-600">
          Now you can add games to tournament
        </p>
      </div>
    </div>
  );
}

const Step1 = () => {
  const navigate = useNavigate();
  const [organizationName, setOrganizationName] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [id, setId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [idParam, setIdParam] = useState("");
  const [image, setImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgName, setImgName] = useState("");

  const handleOrganizationNameChange = (event) => {
    setOrganizationName(event.target.value);
  };

  const handleOrganizationDescriptionChange = (event) => {
    setOrganizationDescription(event.target.value);
  };

  const handleTournamentNameChange = (event) => {
    setTournamentName(event.target.value);
  };

  const handleTournamentDescriptionChange = (event) => {
    setTournamentDescription(event.target.value);
  };

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
    // Fetch the item from localStorage
    const userId = localStorage.getItem("userData");
    if (userId) {
      try {
        const userData = JSON.parse(userId);
        setId(userData.id);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

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

  const handleProceed = async () => {
    // Validate organizationName
    if (!organizationName) {
      toast.error("Please enter Organization Name.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Validate organizationDescription
    if (!organizationDescription) {
      toast.error("Please enter About Organisation.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Validate tournamentName
    if (!tournamentName) {
      toast.error("Please enter Tournament Name.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Validate tournamentDescription
    if (!tournamentDescription) {
      toast.error("Please enter About Tournament.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Validate startDate and endDate
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const toSent = {
        id:"",
        name: tournamentName,
        about: tournamentDescription,
        organizer_id: id,
        organizer_name: organizationName,
        organizer_info: organizationDescription,
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
        is_payment_done: true,
        payment_id: "",
        image: imgName,
        is_active: true,
      };

      const response = await postRequest("organizer/tournament", toSent, token);
      setIdParam(response.data.id);
      toast.success("🦄 Congratulations!!!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsSuccess(true);
    } catch (error) {
      const errorMessage = error?.data?.detail || "An error occurred";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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

  const isLoading = false;

  return (
    <div className="w-full  bg-white shadow-md rounded-lg">
      <div className="w-full py-10">
        <CustomizedSteppers step={0} />
      </div>
      {isSuccess ? (
        <>
          <Success />
          <div className="w-full flex flex-row  items-center justify-center pt-10 gap-4">
            <Button
              color="orange"
              onClick={() =>
                navigate(`/organizer/new-tournament/step2/${idParam}`)
              }
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full space-y-4">
          <div className=" mt-2 md:mt-4 w-full sm:w-4/4 lg:w-full py-2 md:py-5 rounded-lg flex flex-col  justify-center items-center">
           
            <div className="grid grid-cols-6 gap-4">
              <div className="col-start-1 col-end-3 justify-center items-center flex flex-col gap-4 mx-10">
                <div className="flex flex-col items-center justify-center w-full h-full border-dashed border-[2px] border-gray-400 ">
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
                        className="w-[32rem] h-[28rem] rounded-md mt-4" // Adjust width and height as needed
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

              <div className="flex flex-col gap-4 justify-between col-start-3 col-end-5">
                <div className="flex flex-col justify-start w-full ">
                  <p className=" text-blue-gray-700 text-2xl  md:text-3xl font-poppins font-bold ">
                    Organisational Details
                  </p>

                   <div className="mt-4 font-poppins ">
                    <div className="text-sm w-full">
                      <label
                        htmlFor="organization"
                        className="block mb-1 mt-2  "
                      >
                        Organisation Name
                      </label>
                      <input
                        type="text"
                        id="organization"
                        className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 "
                        placeholder="Enter Organisation Name"
                        value={organizationName}
                        onChange={handleOrganizationNameChange}
                      />
                    </div>
                    <div className="text-sm mt-6">
                      <label htmlFor="description" className="block mb-1 mt-4">
                        About Organisation{" "}
                      </label>
                      <textarea
                        id="description"
                        className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 "
                        placeholder="Enter Organisation Description"
                        value={organizationDescription}
                        onChange={handleOrganizationDescriptionChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-start w-full ">
                  <p className=" text-blue-gray-700 text-2xl md:text-3xl font-bold  ">
                    Tournament Details
                  </p>
                  <div className="flex mt-4">
                    <div className="text-sm  w-full">
                      <label htmlFor="tournament" className="block mb-1 mt-2">
                        Tournament Name
                      </label>
                      <input
                        type="text"
                        id="tournament"
                        className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 "
                        placeholder="Enter Tournament Name"
                        value={tournamentName}
                        onChange={handleTournamentNameChange}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="text-sm l">
                      <label htmlFor="details" className="block mb-1 mt-4">
                        About Tournament{" "}
                      </label>
                      <textarea
                        id="details"
                        className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 "
                        placeholder="Enter Tournament Description"
                        value={tournamentDescription}
                        onChange={handleTournamentDescriptionChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
                    <DatePicker
                      selected={startDate}
                      showTimeSelect
                      onChange={(date) => setStartDate(date)}
                      className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm md:text-normal"
                      placeholderText="Select start Date"
                      selectsStart
                      dateFormat="Pp"
                      timeFormat="p"
                      startDate={startDate}
                      endDate={endDate}
                    />
                    <p className="font-poppins p-2 bg-gray-100 rounded-lg">
                      To
                    </p>
                    <DatePicker
                      selected={endDate}
                      showTimeSelect
                      onChange={(date) => setEndDate(date)}
                      className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-sm md:text-normal"
                      placeholderText="Select End Date"
                      selectsStart
                      dateFormat="Pp"
                      timeFormat="p"
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </div>
                </div>
              </div>





              
            </div>

            <div className="flex justify-center mt-8">
              <Button
                className="flex items-center justify-center bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-lg w-full"
                onClick={handleProceed}
              >
                {isLoading ? <Spinner color="amber" /> : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1;
