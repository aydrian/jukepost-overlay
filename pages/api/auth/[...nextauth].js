import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-currently-playing",
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      const findUnique = await prisma.user.findUnique({
        select: {
          accounts: {
            select: {
              access_token: true,
              refresh_token: true
            },
            where: {
              provider: "spotify"
            }
          }
        },
        where: {
          id: user.id
        }
      });
      session.access_token = findUnique.accounts[0].access_token;
      session.refresh_token = findUnique.accounts[0].refresh_token;
      return session;
    }
  }
});
