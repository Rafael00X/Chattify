import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;
if (!googleId || !googleSecret)
  throw new Error("Failed to load Google Auth Credentials");

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
};
