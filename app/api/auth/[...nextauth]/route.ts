import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await user.comparePassword(
          credentials?.password
        );

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      await dbConnect();

      if (account?.provider === "credentials") {
        user.id = user?._id;
      } else {
        // Handle social login
        const existingUser = await User.findOne({ email: user?.email });

        if (!existingUser) {
          const newUser = new User({
            email: user?.email,
            name: user?.name,
            profilePicture: { url: profile?.image || user?.image },
            authProviders: [
              {
                provider: account?.provider,
                providerId: profile?.id || profile?.sub,
              },
            ],
          });

          await newUser.save();
          user.id = newUser._id;
        } else {
          const existingPrvider = existingUser.authProviders.find(
            (provider: { provider: string }) =>
              provider.provider === account?.provider
          );

          if (!existingPrvider) {
            existingUser.authProviders.push({
              provider: account?.provider,
              providerId: profile?.id || profile?.sub,
            });

            if (!existingUser.profilePicture.url) {
              existingUser.profilePicture = {
                url: profile?.image || user?.image,
              };
            }

            await existingUser.save();
          }

          user.id = existingUser._id;
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.user = user;
      } else {
        await dbConnect();

        const dbUser = await User.findById(token.user.id);
        if (dbUser) {
          token.user = dbUser;
        }
      }

      if (trigger === "update") {
        let updatedUser = await User.findById(token.user._id);

        if (session?.subscription) {
          updatedUser.subscription = session.subscription;
        }

        token.user = updatedUser;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;

      delete session.user.password;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(options);
export const POST = NextAuth(options);
