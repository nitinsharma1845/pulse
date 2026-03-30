"use client";
import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>Unauthorized</p>;

  return (
    <div>
      <h1>Welcome {session.user.username} 😎</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Dashboard;
