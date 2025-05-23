import { initTRPC, TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { connectToMongoDB } from '@/db/mongoose';
import User from '@/models/user';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface CreateContextOptions {
  req?: Request;
}

export const createContext = async (opts: CreateContextOptions) => {
  const { req } = opts;
  let user = null;

  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await connectToMongoDB();
        user = await User.findById(decoded.userId);
      } catch (error) {
        console.error('Token verification failed:', error);
      }
    }
  }

  return {
    user,
  };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authenticated',
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

