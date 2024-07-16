"use client";
import moment from "moment";
import { useState } from "react";
//@ts-ignore
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";

export default function CalendarView({ events }: any) {
  const localizer = momentLocalizer(moment);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.WEEK);

  const views = ["week", "day"];

  const handleDateChange = (date: Date) => setCurrentDate(date);
  const handleViewChange = (view: string[]) => {
    console.log(view);
    setCurrentView(view);
  };
  const eventStyleGetter = () => {
    var style = {
      backgroundColor: "#2463EB",
      color: "white",
      borderRadius: "5px",
      border: "1px solid #3174ad",
      display: "block",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
      padding: "4px 8px",
      fontSize: "0.875rem",
      fontWeight: "bold",
    };
    return {
      style: style,
    };
  };
  const customDayFormat = (date: any, culture: any, localizer: any) =>
    localizer.format(date, "dddd", culture);
  const CustomToolbar = ({ onView }: any) => {
    return (
      <div className="w-full flex items-center justify-center gap-12 mb-6">
        <Button onClick={() => onView("week")}>Week</Button>
        <Button onClick={() => onView("day")}>Day</Button>
      </div>
    );
  };
  return (
    <Calendar
      date={currentDate}
      defaultDate={new Date()}
      defaultView="week"
      localizer={localizer}
      onNavigate={handleDateChange}
      events={events}
      showMultiDayTimes
      onView={handleViewChange}
      step={30}
      views={views}
      view={currentView}
      onSelectEvent={(event: any) => console.log(event)}
      eventPropGetter={eventStyleGetter}
      style={{ height: 800 }}
      formats={{
        dayFormat: customDayFormat,
      }}
      components={{
        toolbar: CustomToolbar,
      }}
      selectable
      min={new Date(0, 0, 0, 8, 0)}
      max={new Date(0, 0, 0, 18, 0)}
    />
  );
}
