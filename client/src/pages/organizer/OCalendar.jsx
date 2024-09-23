/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import events from "./events";


const OCalendar = () => {

  return (
    <div className="text-[10px] md:text-[14px] md:min-h-screen pt-14 md:pt-0">
      <FullCalendar 
      height={600}
      
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        themeSystem="Simplex"
        plugins={[dayGridPlugin]} 
        initialView="dayGridMonth"
        events={events}
        displayEventEnd="true"
windowResize={true}
        eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
      />

    </div>
  );
};

export default OCalendar;
