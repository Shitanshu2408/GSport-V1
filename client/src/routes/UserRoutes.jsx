/* eslint-disable no-unused-vars */

import ErrorPage from "../error-page";
import Discover from "../layout/Homepage";
import AboutUS from "../pages/user/AboutUS";
import Blog from "../pages/user/Blog";
import Features from "../pages/user/Features";
import HomePage from "../pages/user/HomePage";
import ProfilePage from "../pages/user/ProfilePage";

export const UserRoutes = {
    
    path: "/user",
    element: <Discover/>,
    errorElement: <ErrorPage/>,
    children: [     
        { 
            path: "home",
            element: <HomePage/>,
        },
        {
            path: "aboutus",
            element: <AboutUS/>,
        },
        {
            path: "features",
            element: <Features/>,
        },
        {
            path: "blogs",
            element: <Blog/>,
        },
        {
            path: "profile",
            element: <ProfilePage/>,
        },
        
    ]
    
}