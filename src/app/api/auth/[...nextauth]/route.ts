import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text" },
        code: { label: "code", type: "text" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch(
          `${process.env.BACKEND_BASE_URL}/auth/verify-2fa`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              code: credentials?.code,
            }),
          }
        );
        const token = await res.json();

        if (token?.status !== 401) {
          return {
            id: token.id,
            token: token?.access_token,
            user: {
              name: "test",
            },
          };
        } else {
          throw new Error("Verification failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/verify",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.access_token = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.access_token = token.access_token;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
