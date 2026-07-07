import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "E-Mail & Passwort",
    credentials: {
      email: { label: "E-Mail", type: "email" },
      password: { label: "Passwort", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;
      const user = await db.user.findUnique({ where: { email: credentials.email.toLowerCase() } });
      if (!user?.passwordHash) return null;
      const ok = await bcrypt.compare(credentials.password, user.passwordHash);
      if (!ok) return null;
      return { id: user.id, email: user.email, name: user.name, image: user.image };
    },
  }),
];

// Google-OAuth nur aktivieren, wenn Credentials gesetzt sind (graceful).
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user, account }) {
      // Bei OAuth: User-Datensatz anlegen, falls neu.
      if (account?.provider === "google" && user.email) {
        await db.user.upsert({
          where: { email: user.email.toLowerCase() },
          update: { name: user.name ?? undefined, image: user.image ?? undefined },
          create: {
            email: user.email.toLowerCase(),
            name: user.name,
            image: user.image,
          },
        });
      }
      return true;
    },
    async jwt({ token }) {
      if (token.email && !token.uid) {
        const dbUser = await db.user.findUnique({ where: { email: token.email.toLowerCase() } });
        if (dbUser) token.uid = dbUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        (session.user as { id?: string }).id = token.uid as string;
      }
      return session;
    },
  },
};

/** Eingeloggten DB-User laden (Server Components / Route Handler). */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  const id = (session?.user as { id?: string } | undefined)?.id;
  if (!id) return null;
  return db.user.findUnique({ where: { id } });
}
