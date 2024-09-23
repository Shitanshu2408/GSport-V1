/* eslint-disable no-unused-vars */
import { AiOutlineClose } from "react-icons/ai";
import {
  Card,
  ListItemPrefix,
  ListItemSuffix,
  Chip, 
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  CalendarIcon,
  UsersIcon,
  FolderIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams, useLocation } from "react-router-dom";

const sidebarItems = [
  {
    linkTo: "dashboard",
    icon: PresentationChartBarIcon,
    label: "Dashboard",
    hasSuffix: false,
  },
  {
    linkTo: "calendar",
    icon: CalendarIcon,
    label: "Calendar",
    hasSuffix: false,
  },
  // {
  //   linkTo: "registration",
  //   icon: UsersIcon,
  //   label: "Registrations",
  //   hasSuffix: false,
  // },
  {
    linkTo: "tournament-tracking",
    icon: FolderIcon,
    label: "Tournament tracking",
    hasSuffix: false,
  },
  {
    linkTo: "messages",
    icon: UsersIcon,
    label: "Teams",
    hasSuffix: false,
  },
  {
    linkTo: "messages",
    icon: InboxIcon,
    label: "Messages",
    hasSuffix: false,
  },
];

// eslint-disable-next-line react/prop-types
function SidebarItems() {
  let { id } = useParams();
  const location = useLocation();

  return (
    <Card className={`bg-gray-100 border border-gray-300 shadow-lg p-4 h-[55rem] mt-2 text-sm`}>
        <Link
            to="user/home"
            className={`flex title-font font-medium items-center text-gray-900  mb-4 ml-9`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
             
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">G Sport</span>
          </Link>

      {sidebarItems.map((item, key) => (
        <div
        className={`group  rounded-xl mb-2 ${
          location.pathname.includes(item.linkTo)
            ? "bg-orange-400 text-black"
            : "focus:bg-orange-400 focus:text-black hover:bg-orange-50 hover:text-orange-500"
        }`}
         key={key}>
          <Link className="flex flex-row items-center  justify-start py-4 px-3" to={item.linkTo}>

          <ListItemPrefix>
                <item.icon className="h-5 w-5 " />
              </ListItemPrefix>
            <a
              
            >
              
              <p className=" text-blue-gray-700">{item.label}</p>
              {item.hasSuffix && (
                <ListItemSuffix>
                  <Chip
                    value="14"
                    size="sm"
                    variant="ghost"
                    color="orange"
                    className={`${!open && "scale-0"} rounded-full`}
                  />
                </ListItemSuffix>
              )}
            </a>
          </Link>
        </div>
      ))}
    </Card>
  );
}

const Sidebar = () => {
  const isOpen = true;

  return (
    <div
      className={`${
        isOpen ? " fixed top-0 h-full md:block" : "hidden md:sticky h-full"
      } w-[20rem] md:inline-block md:top-0 mx-5 my-3 `}
    >
      
      {/* Content div starts */}
      <div className="md:hidden relative p-4">
        <AiOutlineClose className="absolute top-5 right-9" />
      </div>
      <div className="pt-4 md:pt-0 ">
        
        <SidebarItems />
      </div>
      {/* Content div ends */}
    </div>
  );
};

export default Sidebar;
