import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
