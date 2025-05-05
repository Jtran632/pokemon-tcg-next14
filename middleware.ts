// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// export default NextAuth(authConfig).auth;
export const config = {
  matcher: ["/collection"],
};
export { authOptions as middleware } from "./auth";
