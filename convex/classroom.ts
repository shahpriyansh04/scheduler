import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

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
    const availableClassrooms: Doc<"classrooms">[] = [];
    for (const classroom of classrooms) {
      let isAvailable = true;
      for (const event of events) {
        if (event.classroom === classroom._id && event.day === args.day) {
          if (!(event.end <= args.start || event.start >= args.end)) {
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

export const getClassrooms = query({
  async handler(ctx, args) {
    const classrooms = await ctx.db.query("classrooms").collect();
    //customise the name to include CR if type is cr and Lab is type is lab
    classrooms.map((classroom) => {
      if (classroom.type === "cr") {
        classroom.name = "CR " + classroom.name;
      } else {
        classroom.name = "Lab " + classroom.name;
      }
    });
    return classrooms;
  },
});

export const getClassroomById = query({
  args: {
    id: v.id("classrooms"),
  },
  async handler(ctx, args) {
    const classroom = await ctx.db
      .query("classrooms")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .collect();
    return classroom;
  },
});
