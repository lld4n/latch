import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    username: v.string(),
    password_hash: v.string(),
    photo: v.optional(v.string()),
  }),
});
