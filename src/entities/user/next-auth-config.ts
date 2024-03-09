import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { privateConfig } from "@/shared/config/private";
import { compact } from "lodash-es";
import { createUserUseCase } from "./_use-cases/create-user";

const prismaAdapter = PrismaAdapter(dbClient);

export const nextAuthConfig: AuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  adapter: {
    ...prismaAdapter,
    createUser: (user) => {
      return createUserUseCase.exec(user);
    },
  } as AuthOptions["adapter"],

  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: { ...session.user, id: user.id, role: user.role },
      };
    },
  },

  providers: compact([
    EmailProvider({
      server: {
        host: privateConfig.EMAIL_SERVER_HOST,
        port: parseInt(privateConfig.EMAIL_SERVER_PORT),
        auth: {
          user: privateConfig.EMAIL_SERVER_USER,
          pass: privateConfig.EMAIL_SERVER_PASSWORD,
        },
      },
      from: privateConfig.EMAIL_FROM,
    }),
    privateConfig.GITHUB_ID &&
      privateConfig.GITHUB_SECRET &&
      GitHubProvider({
        clientId: privateConfig.GITHUB_ID ?? "",
        clientSecret: privateConfig.GITHUB_SECRET ?? "",
      }),
  ]),
};
