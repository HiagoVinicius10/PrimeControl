import { PrismaAdapter } from "@auth/prisma-adapter";
import  GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import PrismaClient from "@/lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(PrismaClient),

session: {
    strategy: "jwt",
  },

 providers: [
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  })
 ],
   callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};