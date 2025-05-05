import NextAuth from "next-auth";
import { authOptions } from "../../../../../auth";
export const maxDuration = 60;
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
