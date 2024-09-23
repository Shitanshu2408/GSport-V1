import Step1 from "../components/NewTournament/Step1"
import Step2 from "../components/NewTournament/Step2"
import Step3 from "../components/NewTournament/Step3"
import Step4 from "../components/NewTournament/Step4"
import Step5 from "../components/NewTournament/Step5"
import Step1Update from "../components/NewTournament/Updatable/Step1Update"
import AddMembers from "../components/Registration/AddMembers"
import PaymentOfParticipation from "../components/Registration/PaymentOfParticipation"
import PlayerDetails from "../components/Registration/PlayerDetails"
import ErrorPage from "../error-page"
import Organizers from "../layout/Organizers"
import Earnings from "../pages/organizer/Earnings"
import GameDetails from "../pages/organizer/GameDetails"
import NewTournament from "../pages/organizer/NewTournament"
import OCalendar from "../pages/organizer/OCalendar"
import ODashboard from "../pages/organizer/ODashboard"
import OMessages from "../pages/organizer/OMessages"
import ORegistration from "../pages/organizer/ORegistration"
import OrgDetails from "../pages/organizer/OrgDetails"
import OTournamentTracking from "../pages/organizer/OTournamentTracking"

import RegistrationProcess from "../pages/organizer/RegistrationProcess"
import TournamentDetail from "../pages/organizer/TournamentDetail"
import YourOrg from "../pages/organizer/YourOrg"
import YourTour from "../pages/organizer/YourTour"


export const OrganizerRoutes = {
    
    path: "/organizer",
    element: <Organizers/>,
    errorElement: <ErrorPage/>,
    children: [     
        { 
            path: "dashboard",
            element: <ODashboard/>,
        },
        { 
            path: "calendar",
            element: <OCalendar/>,
        },
        { 
            path: "messages",
            element: <OMessages/>,
        },
        { 
            path: "registration",
            element: <ORegistration/>,
        },
        { 
          path: "total-earning",
          element: <Earnings/>,
        },
        { 
          path: "your-organizations",
          element: <YourOrg/>
        },

        { 
          path: "your-tournaments",
          element: <YourTour/>
        },

        { 
          path: "organization-details/:id",
          element: <OrgDetails/>
        },
        { 
          path: "tournament-details/:id",
          element: <TournamentDetail/>
        },
        { 
          path: "tournament-details/:id/game/:id",
          element: <GameDetails/>
        },
        { 
            path: "tournament-tracking",
            element: <OTournamentTracking/>,
        },
        { 
          path: "register/",
          element: <RegistrationProcess/>,
          children: [
            { 
              path: "player-details/:id",
              element: <PlayerDetails/>,
            },
            { 
              path: "payments/:id/:id",
              element: <PaymentOfParticipation/>,
            },
            { 
              path: "add-members/:id",
              element: <AddMembers/>,
            },
          ]
        },
      
        {
            path: "new-tournament/",
            element: <NewTournament/>,
            children: [
              {
                path: "step1",
                element: <Step1/>
              },
              {
                path: "step1/:id",
                element: <Step1Update/>
              },
              {
                path: "step2/:id",
                element: <Step2/>,
              },
              {
                path: "step3/:id",
                element: <Step3/>,
              },
              {
                path: "step4/:id",
                element: <Step4/>,
              },
              {
                path: "step5/:id",
                element: <Step5/>,
              },
            ],
          },
        
    ]
    
}