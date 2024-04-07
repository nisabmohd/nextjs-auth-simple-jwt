import { getSession } from "@/lib/auth";
import { useEffect, useRef, useState } from "react";

export default function useUser() {
  const [user, setUser] =
    useState<Awaited<ReturnType<typeof getSession>>>(null);
  const [loading, setLoading] = useState(false);
  const isFirstTime = useRef(true);

  useEffect(() => {
    async function getUserSession() {
      isFirstTime.current = false;
      setLoading(true);
      const user = await getSession();
      setUser(user);
      setLoading(false);
    }
    if (isFirstTime.current) getUserSession();
  }, []);

  return { user, loading };
}
