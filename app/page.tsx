import Profile from "@/components/profile";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSession();
  if (!user) redirect("/auth");
  return (
    <div>
      Logged in as : {user.email}
      {/* client component below */}
      <Profile />
    </div>
  );
}
