import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "@/server";
import bcrypt from "bcrypt";
import { api } from "@/server/trpc/server";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

interface IUser {
  id: number | null;
  email: string | null;
  password: string | null;
}
async function getUser(email: string): Promise<any | null> {
  try {
    const userResponse = await api.post.getUser(email);
    if (!userResponse) {
      console.error("User not found.");
      return null;
    } else {
      const userData: IUser = userResponse[0];
      return userData;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },

      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          //couldnt get bcrypt to work so using simple compare as placeholder
          if (password === user.password) {
            console.log("logged in with user", user);
            return user;
          }
        }
        console.log("invalid credentials");
        return null;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
