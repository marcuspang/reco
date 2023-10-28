import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { useGlobalState } from "~~/services/store/store";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      useGlobalState.getState().setDiscordUser(user);
      return true;
    },
  },
});
