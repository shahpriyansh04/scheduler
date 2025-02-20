import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

type Event = {
  classroom: string;
  start: string;
  end: string;
};

type Vacancy = {
  start: string;
  end: string;
};

type Classroom = {
  _id: string;
  name: string;
};

export const emptyAndPopulateWeekTable = mutation({
  args: {},
  async handler(ctx, args) {
    // Empty the week table
    const week = await ctx.db.query("week").collect();
    for (const weekItem of week) {
      await ctx.db.delete(weekItem._id);
    }

    const events = await ctx.db.query("event").collect();
    const nextWeekEvents = events.map((event) => {
      const today = new Date();
      const currentDay = today.getDay();
      const daysUntilNextWeek = 7 - currentDay + parseInt(event.day, 10);
      const nextWeekDate = new Date(today);
      nextWeekDate.setDate(today.getDate() + daysUntilNextWeek);
      return {
        ...event,
        nextWeekDate: nextWeekDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      };
    });

    // Assuming you want to update the events in the database
    for (const event of nextWeekEvents) {
      await ctx.db.insert("week", {
        date: event.nextWeekDate,
        classroom: event.classroom,
        faculty: event.faculty,
        day: event.day,
        isCustomEvent: false,
        start: event.start,
        end: event.end,
        name: event.name,
        type: event.type,
      });
    }
  },
});

export const addWeekItem = mutation({
  args: {
    date: v.string(),
    classroom: v.id("classrooms"),
    faculty: v.id("faculty"),
    day: v.string(),
    start: v.string(),
    end: v.string(),
    name: v.string(),
    type: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("week", {
      date: args.date,
      classroom: args.classroom,
      faculty: args.faculty,
      day: args.day,
      start: args.start,
      end: args.end,
      name: args.name,
      isCustomEvent: true,
      type: args.type,
    });
  },
});

export const getVacancyForDay = query({
  args: {
    day: v.string(),
  },
  async handler(ctx, args) {
    const events: Event[] = await ctx.db
      .query("week")
      .filter((q) => q.eq(q.field("day"), args.day))
      .collect();

    // Fetch classroom names
    const classrooms: Classroom[] = await ctx.db.query("classrooms").collect();
    const classroomMap = classrooms.reduce(
      (acc: { [key: string]: string }, classroom) => {
        acc[classroom._id] = classroom.name;
        return acc;
      },
      {}
    );

    // Assuming the day starts at 08:00 and ends at 18:00
    const dayStart = "08:00";
    const dayEnd = "18:00";

    // Convert time to minutes for easier comparison
    const timeToMinutes = (time: string): number => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const dayStartMinutes = timeToMinutes(dayStart);
    const dayEndMinutes = timeToMinutes(dayEnd);

    // Group events by classroom
    const eventsByClassroom = events.reduce(
      (acc: { [key: string]: Event[] }, event) => {
        if (!acc[event.classroom]) {
          acc[event.classroom] = [];
        }
        acc[event.classroom].push(event);
        return acc;
      },
      {}
    );

    const vacanciesByClassroom: { [key: string]: Vacancy[] } = {};

    for (const [classroom, classroomEvents] of Object.entries(
      eventsByClassroom
    )) {
      // Sort events by start time
      classroomEvents.sort(
        (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
      );

      const vacancies: Vacancy[] = [];
      let lastEnd = dayStartMinutes;

      for (const event of classroomEvents) {
        const eventStart = timeToMinutes(event.start);
        const eventEnd = timeToMinutes(event.end);

        if (eventStart > lastEnd) {
          vacancies.push({
            start: minutesToTime(lastEnd),
            end: minutesToTime(eventStart),
          });
        }

        lastEnd = Math.max(lastEnd, eventEnd);
      }

      if (lastEnd < dayEndMinutes) {
        vacancies.push({
          start: minutesToTime(lastEnd),
          end: minutesToTime(dayEndMinutes),
        });
      }

      vacanciesByClassroom[classroomMap[classroom]] = vacancies;
    }

    return vacanciesByClassroom;
  },
});

// Helper function to convert minutes back to time format
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
};
