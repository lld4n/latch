import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    username: v.string(),
    email: v.string(),
    password_hash: v.string(),
    photo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const buffer = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (buffer.length > 0) {
      throw new Error("Пользователь с таким email уже зарегистрирован");
    }
    return await ctx.db.insert("users", {
      password_hash: args.password_hash,
      username: args.username,
      photo: args.photo,
      email: args.email,
    });
  },
});

export const getUser = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
  },
});

export const getUserFromId = query({
  args: {
    users_id: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.users_id);
  },
});
