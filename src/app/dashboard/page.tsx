"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  console.log("dashboard", session);
  return (
    <div>
      {session && (
        <h1 className="text-3xl text-green-500 font-bold">
          Welcome back {session.user?.name}
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
