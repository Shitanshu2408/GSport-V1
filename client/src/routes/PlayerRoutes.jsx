import ErrorPage from "../error-page"
import Players from "../layout/Players"
import OCalendar from "../pages/organizer/OCalendar"
import PDashboard from "../pages/player/PDashboard"
import PTournamentTracking from "../pages/player/PTournamentTracking"
import TournamentDetail from "../pages/player/TournamentDetail"





export const PlayerRoutes = {
    
    path: "/player",
    element: <Players/>,
    errorElement: <ErrorPage/>,
    children: [     
        { 
            path: "dashboard",
            element: <PDashboard/>,
        },
        {
            path: "calendar",
            element: <OCalendar/>
        },
        {
            path: "tournament-tracking",
            element: <PTournamentTracking/>
        },
        { 
            path: "tournament-details/:id",
            element: <TournamentDetail/>
          },
        
    ]
    
}