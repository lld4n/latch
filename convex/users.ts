import { mutation } from './_generated/server';
import { v } from 'convex/values';
export const createUser = mutation({
  args: {
    id_hash: v.string(),
    username: v.string(),
    email: v.string(),
    password_hash: v.string(),
    photo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const buffer = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    if (buffer.length > 0) {
      throw new Error('Пользователь с таким email уже зарегистрирован');
    }
    const user = await ctx.db.insert('users', {
      password_hash: args.password_hash,
      id_hash: args.id_hash,
      username: args.username,
      photo: args.photo,
      email: args.email,
    });

    return user;
  },
});
