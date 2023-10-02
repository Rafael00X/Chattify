"use client";

import { signOut } from "next-auth/react";

export default function UserScreen() {
  return (
    <div>
      <h1>UserScreen</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
