"use client";

import { signIn } from "next-auth/react";

export function GoogleSignIn() {
  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}

export function FacebookSignIn() {
  return (
    <button onClick={() => signIn("facebook")}>Sign in with Facebook</button>
  );
}
