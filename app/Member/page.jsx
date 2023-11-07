import { options } from "@/libs/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Member = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/Member');
  }
  return (
    <div>
      <h1>Memeber Server Session</h1>
      <p>{session.user?.name}</p>
      <p>{session.user?.email}</p>
      <p>{session.user?.role}</p>
    </div>
  );
};

export default Member;
