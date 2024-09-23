/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Select as MSelect,
  Option,
} from "@material-tailwind/react";

import EditIcon from "@mui/icons-material/Edit";
import { FaFemale, FaMale } from "react-icons/fa";

import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";

import DatePicker from "react-datepicker";

import { toast } from "react-toastify";

import { useNavigate, useParams, Link } from "react-router-dom";
import { getRequest, postRequest } from "../../api/api";

function UpdateDialog() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [qualification, setQualification] = useState("Single Elimination");
  const [game, setGame] = useState(null);
  const [whoCanParticipate, setWhoCanParticipate] = useState(2);

  const initialValues = {
    name: null, // string
    tournament_id: null, //string
    game_id: null, // hardcoded from database 1 -> cricket
    info: null, // string
    prize_pool: null,
    participation_fees: null,
    team_size: null,
    max_teams: null,
    total_rounds: null,
    min_boys: null,
    min_girls: null,
    open_to: whoCanParticipate,
    min_age: null,
    max_age: null,

    // field to be added

    type: qualification, // select field
    num_groups: 0,
    teams_per_group: 0,
    avg_duration: 45,

    start_date: startDate, // string
    end_date: endDate, //string
  };

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

  const addGameToDB = async () => {
    setValues({
      ...values,
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
    });
  };

  const successGames = true;
  return (
    <div>
      <Button
        color="amber"
        variant="outlined"
        onClick={handleOpen}
        className="hover:text-white hover:bg-orange-500 flex gap-2 items-center border-none"
      >
        <EditIcon />
        <p>Edit</p>
      </Button>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="lg:scroll-smooth shadow-none"
      >
        <DialogHeader className="flex justify-between">
          <p className=" text-xl text-center font-poppins font-bold">
            Add new Game
          </p>
          <p
            onClick={handleOpen}
            className="w-8 h-8 rounded-lg bg-red-400 p-2 text-white hover:bg-red-600 cursor-pointer"
          >
            <ImCross className="w-4 h-4" />
          </p>
        </DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
          {/* GAme details div starts */}
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
                  {successGames ? (
                    <Option className="capitalize">1</Option>
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
          {/* GAme details div ends */}

          {/* Participants div starts */}
          <div className="lg:p-4 border border-black-100 rounded-lg space-y-4">
            <div className="flex gap-4">
              <p className="font-semibold font-poppins text-blue-gray-700">
                Who can participate?
              </p>
            </div>
            <div className="w-1/3 flex flex-col lg:flex-row gap-5">
              {/* <GenderRadioButtons key={gameIndex} gameIndex={gameIndex}/> */}
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
          {/* Participants div ends */}

          {/* Prize and schedule div starts */}
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

            {/* Schedule div starts */}
            <div className="w-full flex flex-col gap-4">
              <p className="font-semibold font-poppins text-blue-gray-700">
                Schedule{" "}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <DatePicker
                  selected={startDate}
                  showTimeSelect
                  onChange={(date) => {
                    setStartDate(date);
                    values.start_date = new Date(date).toISOString();
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
                    values.end_date = new Date(date).toISOString();
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
            {/* Schedule div ends */}
          </div>
          {/* Prize and schedule div ends */}

          <div className="w-full flex justify-center items-center">
            <Button
              onClick={addGameToDB}
              className="flex justify-center items-center"
              color="orange"
            >
              {/* {isAddingGame ? <Spinner color="amber" /> : "Add game"} */}
              Add Game
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

const GameCard = () => {
  let { id } = useParams();

  const [gid, setGid] = useState('');

  const [org, setOrg] = useState([]);
  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `/tournaments/${id}/games`;
        const data = await getRequest(url);

        // Update state only if data is available
        if (data && data.data) {
          setOrg(data.data);
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };

    fetchTournamentData();
  }, [id]);

  console.log("====================================");
  console.log(org);
  console.log("====================================");
  return (

    
    <div className="flex flex-row gap-4">
       {org.map((item) => (
          <Card key={item.id} className=" border font-poppins">
             <Link
             to={`game/${item.id}`}
             >
             
          <CardBody className="flex flex-col gap-4">
    
            <div className="flex flex-col lg:flex-row justify-between gap-2">
              <div className="flex flex-col ">
                <Typography
                  variant="h5"
                  className="font-poppins capitalize flex gap-4 justify-start items-center"
                >
                  
                  <p>{item.name}</p>
                  <p className="text-sm font-normal text-orange-500 bg-orange-50 p-1 px-2 rounded-lg">
                    Cricket
                  </p>
                </Typography>
                <Typography variant="h6" className="font-poppins">
                  <p>Single Elimination</p>
                </Typography>
              </div>
    
              <p className="border-2 border-yellow-500 w-fit h-fit rounded-lg p-1 px-2 bg-gray-100 border-dashed">
                Prize Pool
              </p>
            </div>
    
            <div className="flex flex-col gap-3">
              <div className="font-poppins text-sm text-justify  py-2">
                The place is close to Barceloneta Beach and bus stop just 2 min by
                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                night life in Barcelona. The place is close to Barceloneta Beach and
                bus stop just 2 min by walk and near to &quot;Naviglio&quot; where
                you can enjoy the main night life in Barcelona.
              </div>
              <div className="flex justify-between">
                <p className="bg-gray-100 p-1 px-2 rounded-lg">Only boys</p>
                <div className="flex gap-2">
                  <p className="bg-pink-50 text-pink-500 flex flex-row items-center p-1 px-2 rounded-lg">
                    <FaFemale />
                    <p>4</p>
                  </p>
                  <p className="bg-blue-50 text-blue-500 flex flex-row items-center p-1 px-2 rounded-lg">
                    <FaMale />
                    <p>5</p>
                  </p>
                </div>
              </div>
              <Typography className="flex flex-col sm:flex-row justify-between gap-4 font-poppins">
                <div className="flex gap-4 text-xs lg:text-sm items-center">
                  <p className="p-1 px-2 h-fit bg-green-50  text-green-500 rounded-lg">
                    Start Date
                  </p>
                  <p className="p-1 px-2 h-fit bg-red-50  text-red-500 rounded-lg">
                    End Date
                  </p>
                </div>
    
                <UpdateDialog />
              </Typography>
            </div>
          </CardBody>
          </Link>
        </Card>
    
        ))}
        </div>
       
  );
};

export default GameCard;
