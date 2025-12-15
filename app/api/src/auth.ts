import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, openAPI } from "better-auth/plugins";
import { db } from "./database/connection";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
    maxPasswordLength: 18,
    autoSignIn: true,
    sendResetPasswordEmail: async (user: any, url: string) => {
      console.log(`Password reset link for ${user.email}: ${url}`);
      // TODO: Implement email sending (Resend, SendGrid, etc.)
    },
  },
  user: {
    additionalFields: {
      plan: {
        type: "string",
        input: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [openAPI(), bearer(), expo()],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAgeUntilAndLeeway: 60 * 60 * 24, // Update session every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  socialProviders: {
    // GitHub OAuth configuration (optional)
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // },
    // Google OAuth configuration (optional)
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
  },
  appName: "Inventory Pal",
  baseURL: process.env.BASE_URL || "http://localhost:3000",
  basePath: "/api/auth",
  trustedOrigins: (
    process.env.TRUSTED_ORIGINS || "http://localhost:3000"
  ).split(","),
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
});

export type Session = typeof auth.$Infer.Session;
