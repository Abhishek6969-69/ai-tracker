import { getServerSession } from "next-auth";

export async function getSessionUser() {
  const { authOptions } = await import("@/lib/auth-options");
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  return session.user;
}
