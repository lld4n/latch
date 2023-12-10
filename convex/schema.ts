import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    username: v.string(),
    password_hash: v.string(),
    photo: v.optional(v.string()),
  }),
  items: defineTable({
    kp_id: v.number(),
    name: v.string(),
    poster: v.string(),
    seriesLength: v.number(),
    type: v.string(),
    rating: v.object({
      kp: v.number(),
      imdb: v.number(),
    }),
    ageRating: v.number(),
    backdrop: v.string(),
    genres: v.array(v.string()),
    movieLength: v.number(),
    year: v.number(),
    description: v.string(),
  }).searchIndex("search_name", {
    searchField: "name",
  }),
  grade: defineTable({
    items_id: v.id("items"),
    users_id: v.id("users"),
    rating: v.union(
      v.literal(1),
      v.literal(2),
      v.literal(3),
      v.literal(4),
      v.literal(5),
      v.literal(6),
      v.literal(7),
      v.literal(8),
      v.literal(9),
      v.literal(10),
    ),
    emoji: v.optional(v.string()),
  }).index("by_users_id", ["users_id"]),
});
