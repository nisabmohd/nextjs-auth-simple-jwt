import { login } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function AuthPage() {
  async function handleAuth(formData: FormData) {
    "use server";
    await login({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    redirect("/");
  }

  return (
    <form
      className="flex flex-col mx-auto gap-3 max-w-[300px] p-5 mt-8"
      action={handleAuth}
    >
      <Input required placeholder="Email" name="email" type="email" />
      <Input required placeholder="Password" name="password" type="password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
