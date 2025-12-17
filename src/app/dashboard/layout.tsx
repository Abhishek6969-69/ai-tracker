import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Navbar from "@/components/Navbar";
import AuthSessionProvider from "@/components/AuthSessionProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <AuthSessionProvider session={session}>
      <div className="min-h-screen">
        <Navbar />
        <main className="p-0">{children}</main>
      </div>
    </AuthSessionProvider>
  );
}
