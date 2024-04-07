import { Button } from "@/components/ui/button";
import { getSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSession();
  if (!user) redirect("/auth");
  return (
    <div>
      <div>Logged in as : {user.email}</div>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/auth");
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}
