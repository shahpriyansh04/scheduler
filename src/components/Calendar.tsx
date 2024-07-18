"use client";
import moment from "moment";
import { useState } from "react";
//@ts-ignore
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";

export default function CalendarView({ events, defaultView }: any) {
  const localizer = momentLocalizer(moment);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views[defaultView]);

  const views = ["week", "day"];

  const handleDateChange = (date: Date) => setCurrentDate(date);
  const handleViewChange = (view: string[]) => {
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
  function getOccurrence(day: string, start: string, end: string) {
    // Convert day to an integer (1-7, where 1 is Monday)
    const dayInt = parseInt(day);

    // Get the current date and time
    const now = new Date();

    const currentDay = now.getDay() === 0 ? 7 : now.getDay();

    let daysUntilNext = (dayInt - currentDay + 7) % 7;

    let occurrenceDate = new Date(now);

    if (daysUntilNext === 0) {
      if (occurrenceDate < now) {
        occurrenceDate.setDate(now.getDate() - 7);
      } else {
        occurrenceDate.setDate(now.getDate());
      }
    } else if (
      daysUntilNext < 0 ||
      (daysUntilNext > 0 && daysUntilNext < 7 - currentDay)
    ) {
      occurrenceDate.setDate(now.getDate() + daysUntilNext);
    } else {
      occurrenceDate.setDate(now.getDate() + daysUntilNext - 7);
    }

    const year = occurrenceDate.getFullYear();
    const month = occurrenceDate.getMonth();
    const date = occurrenceDate.getDate();

    const [startHours, startMinutes] = start.split(":").map(Number);
    const startDate = new Date(
      year,
      month,
      date,
      startHours,
      startMinutes,
      0,
      0
    );

    const [endHours, endMinutes] = end.split(":").map(Number);
    const endDate = new Date(year, month, date, endHours, endMinutes, 0, 0);

    return {
      startDate,
      endDate,
    };
  }

  const formattedEvents = events.map((event: any) => {
    const { startDate, endDate } = getOccurrence(
      event.day,
      event.start,
      event.end
    );
    event.title = event.name + ` ${event.type}` + ` ${event.classroomName}`;
    return { ...event, startDate, endDate };
  });

  return (
    <Calendar
      date={currentDate}
      defaultDate={new Date()}
      defaultView={defaultView}
      startAccessor="startDate"
      endAccessor="endDate"
      localizer={localizer}
      onNavigate={handleDateChange}
      events={formattedEvents}
      showMultiDayTimes
      onView={handleViewChange}
      step={30}
      views={views}
      view={currentView}
      onSelectEvent={(event: any) => {}}
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
