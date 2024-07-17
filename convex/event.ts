import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createEvent = mutation({
  args: {
    name: v.string(),
    faculty: v.id("faculty"),
    day: v.string(),
    classroom: v.id("classrooms"),
    start: v.string(),
    end: v.string(),
    type: v.string(),
  },
  async handler(ctx, args) {
    const event = await ctx.db.insert("event", {
      classroom: args.classroom,
      day: args.day,
      end: args.end,
      faculty: args.faculty,
      name: args.name,
      start: args.start,
      type: args.type,
    });
    return event;
  },
});

export const getEvents = query({
  args: {},
  async handler(ctx, args) {
    const events = await ctx.db.query("event").collect();
    return events;
  },
});
