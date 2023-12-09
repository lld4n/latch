import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    id_hash: v.string(),
    email: v.string(),
    username: v.string(),
    password_hash: v.string(),
    photo: v.optional(v.string()),
  }),
});
