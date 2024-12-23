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

async function addClassroomNamesToEvents(
  events: any[],
  ctx: any
): Promise<any[]> {
  const updatedEvents = await Promise.all(
    events.map(async (event) => {
      const classroom = await ctx.db
        .query("classrooms")
        .filter((q: any) => q.eq(q.field("_id"), event.classroom))
        .collect();
      return {
        ...event,
        classroomName: classroom[0]?.name, // Add classroom name to each event, safely access name
      };
    })
  );
  return updatedEvents;
}

export const getEvents = query({
  args: {},
  async handler(ctx, args) {
    const events = await ctx.db.query("event").collect();
    const updatedEvents = addClassroomNamesToEvents(events, ctx);
    return updatedEvents;
  },
});

export const getFacultyEvents = query({
  args: {
    id: v.id("faculty"),
  },
  async handler(ctx, args) {
    const events = await ctx.db
      .query("event")
      .filter((q) => q.eq(q.field("faculty"), args.id))
      .collect();
    const updatedEvents = addClassroomNamesToEvents(events, ctx);
    return updatedEvents;
  },
});

export const getClassroomEvents = query({
  args: {
    id: v.id("classrooms"),
  },
  async handler(ctx, args) {
    const events = await ctx.db
      .query("event")
      .filter((q) => q.eq(q.field("classroom"), args.id))
      .collect();
    const updatedEvents = addClassroomNamesToEvents(events, ctx);
    return updatedEvents;
  },
});

export const deleteEvent = mutation({
  args: {
    id: v.id("event"),
  },
  async handler(ctx, args) {
    await ctx.db.delete(args.id);
  },
});
