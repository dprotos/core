import NextAuth from "next-auth";
import { nextAuthConfig } from "@/entities/user/next-auth-config";

const authHandler = NextAuth(nextAuthConfig);

export { authHandler as GET, authHandler as POST };
