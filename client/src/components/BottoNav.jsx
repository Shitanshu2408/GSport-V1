/* eslint-disable no-unused-vars */
import {
    Badge,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    CalendarIcon,
    UsersIcon,
    FolderIcon,
    InboxIcon,
  } from "@heroicons/react/24/solid";
  import { Link, useParams, useLocation } from "react-router-dom";
  
  const bottomNavItems = [
    {
      linkTo: "dashboard",
      icon: PresentationChartBarIcon,
      label: "Dashboard",
      hasBadge: true,
      badgeValue: 14,
    },
    {
      linkTo: "calendar",
      icon: CalendarIcon,
      label: "Calendar",
      hasBadge: false,
      badgeValue: 0,
    },
    {
      linkTo: "tournament-tracking",
      icon: FolderIcon,
      label: "Tournament",
      hasBadge: false,
      badgeValue: 0,
    },
    {
      linkTo: "messages",
      icon: InboxIcon,
      label: "Messages",
      hasBadge: false,
      badgeValue: 0,
    },
    {
      linkTo: "ranking",
      icon: UsersIcon,
      label: "Ranking",
      hasBadge: false,
      badgeValue: 0,
    },
  ];
  
  // eslint-disable-next-line react/prop-types
  function BottomNavBar() {
    let { id } = useParams();
    const location = useLocation();
  
    return (
      <div
        className="fixed bottom-0 w-full bg-white border-t border-gray-300 shadow-lg flex flex-row justify-between "
        value={location.pathname.split("/")[2] || "dashboard"}
      >
        {bottomNavItems.map((item, key) => (
          <div
            key={key}
            value={item.linkTo}
          >
            <Link to={item.linkTo} className="flex flex-col items-center justify-between mt-1  text-[12px] px-3 pb-5">
              <item.icon 
              className={`h-7 ${
                location.pathname.includes(item.linkTo)
                  ? "text-orange-500 border-t-[3px] border-orange-500"
                  : " text-blue-gray-700"
              }`}
              />
              <span className="text-blue-gray-700">{item.label}</span>
              
            </Link>
          </div>
        ))}
      </div>
    );
  }
  
  const BottomNav = () => {
    return <BottomNavBar />;
  };
  
  export default BottomNav;
  