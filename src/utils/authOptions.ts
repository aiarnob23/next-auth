import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        // You can log the account details or perform checks here
        console.log("Account provider:", account?.provider);
        console.log("Profile:", profile);
        if (profile?.email) {
          (await cookies()).set({
            name: 'Manual Token',
            value:'34879rhfn98f7y5b t345rfjhnc5fhfhj895rh',
          })
        }

        // Optionally, return true or false to control if the sign-in should be allowed
        return true;
      }
      return false;
    },
  },

  secret: process.env.AUTH_SECRET,
};
