"use client";
import { useSession } from "next-auth/react";
import React from "react";

const TestSession = () => {
  const session = useSession();
  return (
    <div>
      <p>Client Session</p>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default TestSession;
