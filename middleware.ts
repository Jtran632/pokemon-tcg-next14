import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// export default NextAuth(authConfig).auth;
export const config = {
  matcher: ["/((?!api_next/static|_next/images|.*\\.png$).*)"],
};
export { authOptions as middleware } from "./auth";
