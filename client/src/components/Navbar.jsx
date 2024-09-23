/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Cookies from "universal-cookie";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";

import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path: "/user/profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    path: "/user/editprofile",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    path: "/user/inbox",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    path: "/user/help",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    path: "/signout",
  },
];

function ProfileMenu({ image }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          size="sm"
          variant="text"
          color="orange"
          className="flex  items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-orange-500 p-0.5"
            src={image}
          />
          {/* <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          /> */}
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (path === "/signout") {
                  const cookies = new Cookies();
                  localStorage.removeItem("userData");
                  cookies.remove("jwt_auth_token");
                  navigate("/");
                } else {
                  navigate(path);
                }
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-6 w-6 mr-3 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal text-[15px]"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const Topbar = () => {
  const location = useLocation();
  const [profileUrl, setProfileUrl] = useState("");
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const { profile_url } = userData;
      setProfileUrl(profile_url);
    }
  }, []);

  const handleLogout = () => {
    const cookies = new Cookies();
    localStorage.removeItem("userData");
    cookies.remove("jwt_auth_token");
    navigate("/");
  };



  return (
    <div>
      <header className="text-gray-700 shadow-sm  body-font fixed md:top-5 rounded-2xl w-full md:w-[95rem] text-sm z-50 ">
        <div className="mx-auto flex flex-wrap flex-col md:flex-row md:items-center py-1 bg-gray-50 rounded-lg">
         
          <nav className="md:ml-auto md:mr-auto gap-8 flex-wrap items-center text-sm justify-center hidden md:block">
            <Link
              to="/user/home"
              className={`mr-10 hover:text-orange-500  cursor-pointer ${
                location.pathname === "/user/home" ? "text-orange-500 border-b-2 border-orange-500" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/user/aboutus"
              className={`mr-10 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/aboutus" ? "text-orange-500 border-b-2 border-orange-500" : ""
              }`}
            >
              About us
            </Link>
            <Link
              to="/user/features"
              className={`mr-10 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/features"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              Features
            </Link>
            <Link
              to="/user/blogs"
              className={`mr-10 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/blogs" ? "text-orange-500 border-b-2 border-orange-500" : ""
              }`}
            >
              Blog
            </Link>
          </nav>

          {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white h-full w-64 fixed right-0 shadow">
            {/* Drawer header */}
            <div className="p-2 flex flex-row items-center gap-4">
            <button
            onClick={toggleDrawer}>
            <IoIosArrowBack size={20}/>
            </button>
              <h1 className="text-lg font-semibold">Menu</h1>
            </div>

          
            <nav className="md:ml-auto md:mr-auto flex flex-col gap-4 items-start pl-4 mt-5 text-sm justify-center">
            <Link
              to="/user/home"
              className={`mr-4 hover:text-orange-500  cursor-pointer ${
                location.pathname === "/user/home" ? "text-orange-500 border-b-2 border-orange-500" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/user/aboutus"
              className={`mr-4 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/aboutus" ? "text-orange-500 border-b-2 border-orange-500" : ""
              }`}
            >
              About us
            </Link>
            <Link
              to="/user/features"
              className={`mr-4 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/features"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              Features
            </Link>
            <Link
              to="/user/blogs"
              className={`mr-4 hover:text-orange-500 cursor-pointer ${
                location.pathname === "/user/blogs" ? "text-orange-500 border-b-2 border-orange-500" : ""
              }`}
            >
              Blog
            </Link>
          </nav>


          </div>
        </div>
      )}


          <div className="flex flex-row md:items-center justify-end ">
         
            {profileUrl ? (
              <div>
                <ProfileMenu image={profileUrl} />
              </div>
            ) : (
              <div>
                <button
                  onClick={handleLogout}
                  className="inline-flex md:mr-4 items-center bg-gray-700 border-0 py-1 px-4 focus:outline-none hover:bg-gray-900 text-white rounded text-base mt-4 md:mt-0"
                >
                  Sign in
                </button>
              </div>
            )}

          <button
          onClick={toggleDrawer}
           className="md:hidden  mr-4">
          <GiHamburgerMenu size={25}/>
          </button>
          </div>

          
        </div>
      </header>


     
    </div>
  );
};

export default Topbar;
