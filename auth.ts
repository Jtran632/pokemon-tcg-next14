import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  DefaultSession,
  getServerSession,
  Session,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "@/server";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
async function fetchUser(
  email: string
): Promise<{
  id: string;
  email: string;
  name: string | null;
  password: string | null;
  image: string | null;
  emailVerified: boolean | null;
} | null> {
  try {
    const userResponse = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return userResponse[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       email: string;
//       password: string & DefaultSession["user"];
//     };
//   }
// }
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name?: string | null | undefined;
      email: string;
      image?: string | null | undefined;
      id: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}
// import DiscordProvider from "next-auth/providers/discord";
// https://github.com/nextauthjs/next-auth/discussions/4394
// If I want to use credentials I have to use jwt,
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: any;
      user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        id?: string | null | undefined;
      };
    }) {
      if (session?.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  // callbacks: {
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //     },
  //   }),
  // },
  adapter: DrizzleAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // DiscordProvider({
    //   //@ts-ignore
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   //@ts-ignore
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET,
    // }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        // console.log(
        //   "logging in with",
        //   parsedCredentials.data?.email,
        //   parsedCredentials.data?.password
        // );
        if (parsedCredentials.success) {
          // console.log("here");
          const { email, password } = parsedCredentials.data;
          const user = await fetchUser(email);

          console.log("user", user);
          if (!user) return null;
          //couldnt get bcrypt to work so using simple compare as placeholder
          if (password === user.password) {
            // console.log("logged in with user", user);
            return {
              id: user.id,
              email: user.email,
              name: user?.name,
              image: user?.image,
              emailVerified: user?.emailVerified,
            };
          }
        }
        console.log("invalid credentials");
        return null;
      },
    }),
  ],
};

export const getServerAuthSession = () =>
  getServerSession(authOptions) as Promise<Session | null>;
