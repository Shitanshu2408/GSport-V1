/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
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

const Game = ({person}) => {

   
    
  return (
    <div>
        
        <div className="space-y-4 shadow-sm md:p-4 w-full ">
          <div className="w-full lg:p-4 border border-black-100 rounded-lg flex flex-col gap-6">
            <p className="font-semibold font-poppins text-blue-gray-700">
              Enter game details{" "}
            </p>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/2 gap-x-2">
                <Input
                  value={person.name}
                 
                  label="Enter the name of Game"
                  className="min-w-1/3"
                  color="orange"
                  name="name"
                />
              </div>
              <div className="w-full lg:w-1/2 text-sm">
                <MSelect
                 
                  color="orange"
                  label="select game to be played"
                >
                  {/* {gameOptions ? (
                    gameOptions.map((o, index) => (
                      <Option key={index} className="capitalize" value={o.value}>
                        {o.label}
                      </Option>
                    ))
                  ) : (
                    <Option>game 1</Option>
                  )} */}
                  <Option>game 1</Option>
                </MSelect>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                value={person.avg_duration}
                type="number"
               
                label="Average duration (in minutes)"
                color="orange"
                name="avg_duration"
              />
              <MSelect
                
                color="orange"
                label="Type of Game"
              >
                {/* {qualificationOptions.map((op, index) => (
                  <Option key={index} className="capitalize" value={op.value}>
                    {op.label}
                  </Option>
                ))} */} heh
              </MSelect>
            </div>

            {person.type === 2 && (
              <div className={`w-full flex flex-col lg:flex-row gap-5`}>
                <Input
                  value={person.num_groups}
                  type="number"
                  
                  label="Number of Groups"
                  color="orange"
                  name="num_groups"
                />
                <Input
                  value={person.teams_per_group}
                  type="number"
                 
                  label="Teams per group"
                  color="orange"
                  name="teams_per_group"
                />
              </div>
            )}

            <div className="w-full flex flex-col lg:flex-row gap-5">
              <Input
                value={person.team_size}
               
                label="Team Size"
                color="orange"
                name="team_size"
                type="number"
              />
              <Input
                value={person.max_teams}
               
                label="Maximum Team"
                color="orange"
                name="max_teams"
                type="number"
              />
              <Input
                value={person.total_rounds}
                
                label="Total Rounds to be played"
                color="orange"
                name="total_rounds"
                type="number"
              />
            </div>

            <Textarea
              value={person.info}
              
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
                
                color="orange"
                label="Who can participate"
                value={0}
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
              {person.open_to === 2 && (
                <div className={`w-2/3 flex flex-col lg:flex-row gap-5`}>
                  <Input
                    value={person.min_boys}
                    type="number"
                   
                    label="Minimum boys"
                    color="orange"
                    name="min_boys"
                  />
                  <Input
                    value={person.min_girls}
                    type="number"
                    
                    label="Minimum girls"
                    color="orange"
                    name="min_girls"
                  />
                </div>
              )}
            </div>
            <div className={`w-full flex flex-col lg:flex-row gap-5`}>
              <Input
                value={person.min_age}
                type="number"
                
                label="Minimum age"
                color="orange"
                name="min_age"
              />
              <Input
                value={person.max_age}
                
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
                  value={person.prize_pool}
                  
                  label="Prize pool Rs"
                  color="orange"
                  name="prize_pool"
                  type="number"
                />
                <Input
                  value={person.participation_fees}
                  
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
                {/* <DatePicker
                  selected={person.start_date}
                  showTimeSelect
                  
                  className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm md:text-normal"
                  placeholderText="Select start Date"
                  selectsStart
                  name="start_date"
                  dateFormat="yyyy-MM-dd hh:mm:aa"
                  startDate={person.start_date}
                  endDate={person.end_date}
                /> */}
                {person.start_date}
                <p className="font-poppins p-2 bg-gray-100 rounded-lg">To</p>
                {/* <DatePicker
                  selected={person.end_date}
                  showTimeSelect
                  
                  className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-sm md:text-normal"
                  placeholderText="Select End Date"
                  selectsStart
                  name="end_date"
                  dateFormat="yyyy-MM-dd hh:mm:aa"
                  startDate={person.start_date}
                  endDate={person.end_date}
                  minDate={person.start_date}
                /> */}
                {
                    person.end_date
                }
              </div>
            </div>
          </div>
          
        </div>

        
    </div>
  )
}   

export default Game