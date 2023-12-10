import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

export const getGrade = mutation({
  args: {
    items_id: v.id("items"),
    users_id: v.id("users"),
  },
  handler: async (ctx, args): Promise<Doc<"grade"> | null> => {
    const buffer = await ctx.db
      .query("grade")
      .filter((q) => q.eq(q.field("items_id"), args.items_id))
      .filter((q) => q.eq(q.field("users_id"), args.users_id))
      .collect();

    if (buffer.length > 0) {
      return buffer[0];
    } else {
      return null;
    }
  },
});

export const patchGrade = mutation({
  args: {
    id: v.id("grade"),
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
    await ctx.db.patch(args.id, {
      rating: args.rating,
      emoji: args.emoji,
    });
  },
});

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
