import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  classrooms: defineTable({
    name: v.string(),
    type: v.string(),
  }),
  faculty: defineTable({
    name: v.string(),
  }),
  event: defineTable({
    name: v.string(),
    faculty: v.id("faculty"),
    day: v.string(),
    classroom: v.id("classrooms"),
    start: v.string(),
    end: v.string(),
    type: v.string(),
  }),
  week: defineTable({
    date: v.string(),
    name: v.string(),
    faculty: v.id("faculty"),
    day: v.string(),
    classroom: v.id("classrooms"),
    start: v.string(),
    end: v.string(),
    type: v.string(),
    isCustomEvent: v.boolean(),
  }),
});
