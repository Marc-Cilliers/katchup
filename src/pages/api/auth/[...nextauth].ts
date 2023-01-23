import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import axios from "axios";
import { base64encode } from "nodejs-base64";

export default NextAuth({
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  events: {
    async signIn(message) {
      const headers = {
        Authorization: `Bearer ${base64encode(
          `${process.env.KATCHUP_BE_TOKEN}`
        )}`,
      };
      const channel = message.user.name;

      await axios.post(
        `${process.env.KATCHUP_BE_URL}/api/bot/joinChannel`,
        { channel },
        { headers }
      );
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET,
});
