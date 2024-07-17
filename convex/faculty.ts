import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFaculty = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const faculty = await ctx.db.insert("faculty", {
      name: args.name,
    });
  },
});

export const getFaculty = query({
  async handler(ctx, args) {
    const faculty = await ctx.db.query("faculty").collect();
    return faculty;
  },
});
