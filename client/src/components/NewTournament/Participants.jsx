/* eslint-disable no-unused-vars */
import React from "react";
import { Typography } from "@material-tailwind/react";
const Participants = () => {
  const tData = [];
  return (
    <div>
      <div className=" w-full overflow-hidden">
        {tData.map(({ team_players, name }, index) => (
          <div key={index}>
            {team_players.map((items, index) => (
              <tr
                key={index}
                className="bg-white rounded-md shadow-sm flex items-center justify-evenly mb-4"
              >
                <td className="p-4">
                  <div className="rounded-full h-10 overflow-hidden">
                    <img
                      alt="content"
                      className="object-cover object-center h-full w-full"
                      src={items.player.profile_url}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {items.player.full_name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {items.player.college}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {items.player.email_id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {name}
                  </Typography>
                </td>

                <td className="p-4">
                  <button className="bg-orange-400 px-4 py-2 rounded-lg text-white text-sm hover:bg-orange-600">
                    Refund
                  </button>
                </td>
              </tr>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
