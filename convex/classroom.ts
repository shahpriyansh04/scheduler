import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createClassroom = mutation({
  args: {
    name: v.string(),
    type: v.string(),
  },
  async handler(ctx, args) {
    const classroom = await ctx.db.insert("classrooms", {
      name: args.name,
      type: args.type,
    });
    return classroom;
  },
});

export const getAvailableClassrooms = query({
  args: {
    type: v.string(),
    start: v.string(),
    end: v.string(),
    day: v.string(),
  },
  async handler(ctx, args) {
    const classrooms = await ctx.db
      .query("classrooms")
      .filter((q) => q.eq(q.field("type"), args.type))
      .collect();

    const events = await ctx.db.query("event").collect();
    const availableClassrooms = [];
    for (const classroom of classrooms) {
      let isAvailable = true;
      for (const event of events) {
        if (event.classroom === classroom._id && event.day === args.day) {
          if (event.start <= args.start && event.end >= args.end) {
            isAvailable = false;
            break;
          }
        }
      }
      if (isAvailable) {
        availableClassrooms.push(classroom);
      }
    }
    return availableClassrooms;
  },
});
