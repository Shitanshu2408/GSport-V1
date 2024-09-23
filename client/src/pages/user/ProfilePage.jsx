/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  PresentationChartBarIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Typography, Avatar } from "@material-tailwind/react";
import {
  Select as MSelect,
  Option,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { patchRequest } from "../../api/api";
import { MdEdit } from "react-icons/md";
import DatePicker from "react-datepicker";


const ProfilePage = () => {
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");

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


  const get = ()=>{
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
   }
  useEffect(() => {

   get();
  }, []);

  const userInformation = {
    mobile_number: userData.phone_no,
    name: userData.full_name,
    verified: userData.verified,
    createdAt: userData.createdAt,
    email_id: userData.email_id,
    dob: userData.dob,
    profile_img: userData.profile_url,
    id: userData.id,
    gender: userData.gender,
    college: userData.college,
    address: userData.address
  };


  console.log('====================================');
  console.log(userData);
  console.log('====================================');

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userInformation.name);
  const [editedEmail, setEditedEmail] = useState(userInformation.email_id);
  const [editedMobile, setEditedMobile] = useState(userInformation.mobile_number);
  const [editedCollege, setEditedCollege] = useState(userInformation.college);
  const [editedGender, setEditedGender] = useState(userInformation.gender);
  const [editedAddress, setEditedAddress] = useState(userInformation.address);
  const [editedDOB, setEditedDOB] = useState(userInformation.dob);




  const saveDetails = () => {
    const jsonData = {
      email_id: editedEmail ? editedEmail : userInformation.email_id,
      full_name: editedName ? editedName : userInformation.name,
      phone_no: editedMobile ? editedMobile : userInformation.mobile_number,
      college: editedCollege ? editedCollege : userInformation.college,
      address: editedAddress ? editedAddress : userInformation.address,
      gender: editedGender ? editedGender : userInformation.gender,   
      profile_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJJ7NRetidOXGwJVnAJXbKD-aTCpm2iDzT6g&usqp=CAU",
      id: userInformation.id
    };


    patchRequest(
      "/users/details",
      jsonData,
      token
    )
      .then((data) => {
        localStorage.setItem('userData', JSON.stringify(jsonData));
       get();
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
    <div>
      <section className="text-gray-600 body-font">
        <div className=" mx-auto flex px-20 md:flex-row flex-col item-start justify-center">
          <div className=" bg-gray-100 shadow-xl rounded-md h-[50rem] fixed left-6 ">
            <div className=" px-16 ">
              <div className="">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="text-3xl mb-6"
                >
                  Account Settings
                </Typography>
              </div>
              <List>
                <ListItem className="mb-2 bg-orange-400">
                  <ListItemPrefix>
                    <UserCircleIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Personal info</p>
                </ListItem>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Update payment details</p>
                </ListItem>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Security setting</p>
                </ListItem>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Permissions</p>
                </ListItem>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <InboxIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Email notifications</p>
                  <ListItemSuffix>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>

                <ListItem className=" mt-[22rem] hover:bg-red-500 bg-red-600">
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-6 w-6 text-white font-bold" />
                  </ListItemPrefix>
                  <p className="text-white">Log out</p>
                </ListItem>
              </List>
            </div>
          </div>

          <div className="mx-auto pb-10 col-start-3 col-end-6 ml-[30rem] mr-[8rem] w-full">
            <div className="flex flex-row items-center justify-between w-full mb-8">
              <div className="flex flex-row gap-4">
                <Avatar
                  variant="circular"
                  size="xl"
                  alt="User Profile"
                  src={userInformation?.profile_img}
                  className=" border"
                />
                <div className=" flex flex-col justify-center items-center ">
                  <div className=" font-normal  flex">
                    <p className="text-[16px] font-semibold">
                      {"G-Sport ID : "}
                    </p>
                    <p className="text-black ml-2 font-bold">
                      {userData.id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <button
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                      saveDetails();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className={`flex mx-autox-row items-center gap-4 text-white ${
                    isEditing
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-orange-500 hover:bg-orange-600"
                  } py-2 px-6 focus:outline-none  rounded-md text-lg`}
                >
                  <p>
                    <MdEdit />
                  </p>
                  {isEditing ? <>Save</> : <>Edit</>}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        value={userData.full_name}
                        type="text"
                        id="name"
                        name="name"
                        disabled
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    College
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        value={editedCollege}
                        onChange={(e) => setEditedCollege(e.target.value)}
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        value={userData.college}
                        type="text"
                        id="name"
                        name="name"
                        disabled
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Contact Number
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedMobile}
                        onChange={(e) => setEditedMobile(e.target.value)}
                        className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        value={userData.phone_no}
                        type="text"
                        disabled
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        disabled
                        value={userData.email_id}
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="p-2 w-1/2">
                <div className="relative flex flex-col">
                  <label className="leading-7 text-sm text-gray-600">
                    Date of birth
                  </label>
                  {isEditing ? (
                    <>
                       <DatePicker
                            selected={editedDOB}
                            onChange={(date) => {
                              setEditedDOB(date);
                            }}
                            className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            placeholderText="Enter birth date"
                            selectsStart
                            name="Birth Date"
                            dateFormat="yyyy-MM-dd"
                          />
                    </>
                  ) : (
                    <>
                     <DatePicker
                            // selected={userData.dob}
                            disabled
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            
                            selectsStart
                            name="Birth Date"
                            dateFormat="yyyy-MM-dd"
                          />
                    </>
                  )}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Gender
                  </label>
                  {isEditing ? (
                    <>
                      <MSelect
                        onChange={() => {
                          setEditedGender();
                        }}
                        color="orange"
                        className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      >
                        <Option key={0} value={0}>
                          Female
                        </Option>
                        <Option key={1} value={1}>
                          Male
                        </Option>
                        <Option key={2} value={2}>
                          Prefer not to say
                        </Option>
                      </MSelect>
                    </>
                  ) : (
                    <>
                      <MSelect
                        disabled
                        value={"Male"}
                        color="orange"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      ></MSelect>
                    </>
                  )}
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Address
                  </label>
                  {isEditing ? (
                    <>
                      <textarea
                      value={editedAddress}
                      onChange={(e) => setEditedAddress(e.target.value)}
                     
                        className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      ></textarea>
                    </>
                  ) : (
                    <>
                      <textarea
                        disabled
                        value={userData.address}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      ></textarea>
                    </>
                  )}
                </div>

                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
