import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createGrade = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("grade", {
      items_id: args.items_id,
      users_id: args.users_id,
      rating: args.rating,
      emoji: args.emoji,
    });
  },
});
