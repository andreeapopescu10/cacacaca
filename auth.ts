import NextAuth, { AuthError, DefaultSession } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { getUserFromDb } from "@/features/authentication/actions";
import { ZodError } from "zod";

export class CustomAuthError extends AuthError {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

// Extend DefaultSession to include `id`
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const data = await getUserFromDb(
            credentials.email,
            credentials.password,
          );
          if (data == null) throw new CustomAuthError("Something went wrong");
          if (data?.user === false) {
            throw new CustomAuthError(
              "There's no account with this email, please sign up",
            );
          } else if (data.error) {
            throw new CustomAuthError(data.error);
          }
          user = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            token: data.token,
          };

          return user;
        } catch (error) {
          if (error instanceof ZodError)
            throw new CustomAuthError("Invalid Credentials");
          throw new CustomAuthError(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // authorized: async ({ auth }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth;
    // },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
});
