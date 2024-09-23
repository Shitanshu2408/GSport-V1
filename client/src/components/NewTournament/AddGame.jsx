/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Textarea,
  Spinner,
  Select as MSelect,
  Option,
} from "@material-tailwind/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
    postRequest,
  } from "../../api/api";
  

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
          <p className="font-poppins text-xl">Game added Succesfully</p>
          <p className="font-poppins text-sm text-gray-600">
            Now you can procced to the payment
          </p>
        </div>
      </div>
    );
  }


const AddGame = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [qualification, setQualification] = useState("Single Elimination");
  const [whoCanParticipate, setWhoCanParticipate] = useState(2);
  let { id } = useParams();
  const navigate = useNavigate()
  const [ isSuccess, setIsSuccess] = useState(false);
  const [isAddingGame, setIsAddingGame] = useState(false);
  const [token, setToken] = useState("");
  const initialValues = {
    name: null,
    tournament_id: id.toString(),
    info: null, 
    prize_pool: null,
    participation_fees: null,
    team_size: null,
    max_teams: null,
    total_rounds: null,
    min_boys: 0,
    min_girls: 0,
    open_to: whoCanParticipate,
    min_age: null,
    max_age: null,
    type: qualification,
    num_groups: 0,
    teams_per_group: 0,
    avg_duration: 45,
    start_date: startDate,
    end_date: endDate,
  };

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

  const [values, setValues] = useState(initialValues);

  const handleInputChangeString = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChangeNumber = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: Number(value),
    });
  };

  const qualificationOptions = [
    {
      value: 1,
      label: "Single Elimination",
    },
    {
      value: 2,
      label: "League",
    },
  ];

  const handleQualification = (selectedOption) => {
    console.log(selectedOption);
    setQualification(selectedOption.label);
    setValues({
      ...values,
      type: selectedOption,
    });
  };

  const gameOptions = [
    {
      value: 1,
      label: "Cricket",
    },
    {
      value: 2,
      label: "Football",
    },
    {
      value: 3,
      label: "Badminton",
    }
  ];
  const handleGameChange = (selectedId) => {
    setValues({
      ...values,
      game_id: selectedId,
    });
  };

  const handleParticipantRadio = (value) => {
    setWhoCanParticipate(value);
    setValues({
      ...values,
      open_to: value,
    });

    if (value === 0) {
      setValues({
        ...values,
        min_girls: values.team_size,
        min_boys: 0,
        open_to: 0,
      });
    } else if (value === 1) {
      setValues({
        ...values,
        min_boys: values.team_size,
        min_girls: 0,
        open_to: 1,
      });
    } else if (value === 2) {
      setValues({
        ...values,
        min_boys: values.min_boys,
        min_girls: values.min_girls,
        open_to: value,
      });
    }
  };

  
  const addGameToDB = () =>{
    setIsAddingGame(true);
    if (values) {
      postRequest(`organizer/tournament/${id}/games`, values, token)
        .then((data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          toast.success("Operation was successful!", {
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
        //   navigate("/user/home");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            console.error("API error: Invalid Creedentials");
            toast.error("Error", {
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
    }
  }

  return (
    <div  className="w-full gap-8 py-5 border-t-2 ">
      {isSuccess ? (
         <>
         <Success />
         
         </>
      ) : (
        <div className="space-y-4 shadow-sm md:p-4 w-full ">
          <div className="w-full lg:p-4 border border-black-100 rounded-lg flex flex-col gap-6">
            <p className="font-semibold font-poppins text-blue-gray-700">
              Enter game details{" "}
            </p>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/2 gap-x-2">
                <Input
                  value={values.name}
                  onChange={handleInputChangeString}
                  label="Enter the name of Game"
                  className="min-w-1/3"
                  color="orange"
                  name="name"
                />
              </div>
              <div className="w-full lg:w-1/2 text-sm">
                <MSelect
                  onChange={handleGameChange}
                  color="orange"
                  label="select game to be played"
                >
                  {gameOptions ? (
                    gameOptions.map((o, index) => (
                      <Option key={index} className="capitalize" value={o.value}>
                        {o.label}
                      </Option>
                    ))
                  ) : (
                    <Option>game 1</Option>
                  )}
                </MSelect>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                value={values.avg_duration}
                type="number"
                onChange={handleInputChangeNumber}
                label="Average duration (in minutes)"
                color="orange"
                name="avg_duration"
              />
              <MSelect
                onChange={handleQualification}
                color="orange"
                label="Type of Game"
              >
                {qualificationOptions.map((op, index) => (
                  <Option key={index} className="capitalize" value={op.value}>
                    {op.label}
                  </Option>
                ))}
              </MSelect>
            </div>

            {values.type === 2 && (
              <div className={`w-full flex flex-col lg:flex-row gap-5`}>
                <Input
                  value={values.num_groups}
                  type="number"
                  onChange={handleInputChangeNumber}
                  label="Number of Groups"
                  color="orange"
                  name="num_groups"
                />
                <Input
                  value={values.teams_per_group}
                  type="number"
                  onChange={handleInputChangeNumber}
                  label="Teams per group"
                  color="orange"
                  name="teams_per_group"
                />
              </div>
            )}

            <div className="w-full flex flex-col lg:flex-row gap-5">
              <Input
                value={values.team_size}
                onChange={handleInputChangeNumber}
                label="Team Size"
                color="orange"
                name="team_size"
                type="number"
              />
              <Input
                value={values.max_teams}
                onChange={handleInputChangeNumber}
                label="Maximum Team"
                color="orange"
                name="max_teams"
                type="number"
              />
              <Input
                value={values.total_rounds}
                onChange={handleInputChangeNumber}
                label="Total Rounds to be played"
                color="orange"
                name="total_rounds"
                type="number"
              />
            </div>

            <Textarea
              value={values.info}
              onChange={handleInputChangeString}
              className="w-full "
              label="Tournament Description"
              color="orange"
              name="info"
            />
          </div>
          <div className="lg:p-4 border border-black-100 rounded-lg space-y-4">
            <div className="flex gap-4">
              <p className="font-semibold font-poppins text-blue-gray-700">
                Who can participate?
              </p>
            </div>
            <div className="w-1/3 flex flex-col lg:flex-row gap-5">
              <MSelect
                onChange={handleParticipantRadio}
                color="orange"
                label="Who can participate"
              >
                <Option key={0} value={0}>
                  Only girls
                </Option>
                <Option key={1} value={1}>
                  Only boys
                </Option>
                <Option key={2} value={2}>
                  Both
                </Option>
              </MSelect>
              {values.open_to === 2 && (
                <div className={`w-2/3 flex flex-col lg:flex-row gap-5`}>
                  <Input
                    value={values.min_boys}
                    type="number"
                    onChange={handleInputChangeNumber}
                    label="Minimum boys"
                    color="orange"
                    name="min_boys"
                  />
                  <Input
                    value={values.min_girls}
                    type="number"
                    onChange={handleInputChangeNumber}
                    label="Minimum girls"
                    color="orange"
                    name="min_girls"
                  />
                </div>
              )}
            </div>
            <div className={`w-full flex flex-col lg:flex-row gap-5`}>
              <Input
                value={values.min_age}
                type="number"
                onChange={handleInputChangeNumber}
                label="Minimum age"
                color="orange"
                name="min_age"
              />
              <Input
                value={values.max_age}
                onChange={handleInputChangeNumber}
                label="Maximum age"
                color="orange"
                name="max_age"
              />
            </div>
          </div>
          <div className="w-full lg:p-4  border border-black-100 flex md:justify-between flex-col lg:flex-row gap-4">
            <div className="w-full flex flex-col gap-4 ">
              <p className="font-semibold font-poppins text-blue-gray-700">
                Fess and Prizes{" "}
              </p>
              <div className="flex flex-col lg:flex-row gap-5">
                <Input
                  value={values.prize_pool}
                  onChange={handleInputChangeNumber}
                  label="Prize pool Rs"
                  color="orange"
                  name="prize_pool"
                  type="number"
                />
                <Input
                  value={values.participation_fees}
                  onChange={handleInputChangeNumber}
                  label="Participation fees"
                  color="orange"
                  name="participation_fees"
                  type="number"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <p className="font-semibold font-poppins text-blue-gray-700">
                Schedule{" "}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <DatePicker
                  selected={startDate}
                  showTimeSelect
                  onChange={(date) => {
                    setStartDate(date)
                    values.start_date = new Date(date).toISOString()

                  }}
                  className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm md:text-normal"
                  placeholderText="Select start Date"
                  selectsStart
                  name="start_date"
                  dateFormat="yyyy-MM-dd hh:mm:aa"
                  startDate={startDate}
                  endDate={endDate}
                />
                <p className="font-poppins p-2 bg-gray-100 rounded-lg">To</p>
                <DatePicker
                  selected={endDate}
                  showTimeSelect
                  onChange={(date) => {
                    setEndDate(date);
                    values.end_date = new Date(date).toISOString()
                  }}
                  className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-sm md:text-normal"
                  placeholderText="Select End Date"
                  selectsStart
                  name="end_date"
                  dateFormat="yyyy-MM-dd hh:mm:aa"
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <Button
              onClick={addGameToDB}
              className="flex justify-center items-center"
              color="orange"
            >
              {isAddingGame ? <Spinner color="amber" /> : "Add game"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGame;
