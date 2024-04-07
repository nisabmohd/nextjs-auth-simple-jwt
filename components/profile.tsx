"use client";

import useUser from "./useUser";

export default function Profile() {
  const { loading, user } = useUser();
  if (loading) return "Loading...";
  return <div>{user?.email}</div>;
}
