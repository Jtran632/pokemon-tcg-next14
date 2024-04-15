import Credentials from "next-auth/providers/credentials";
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //@ts-ignore
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/login");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [Credentials], // Add providers with an empty array for now
};
