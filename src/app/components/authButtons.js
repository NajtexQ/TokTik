"use client";

import { signIn } from "next-auth/react";

const auth = (provider) => {
  return signIn(provider, { callbackUrl: "/" });
};

export function GoogleSignIn() {
  return <button onClick={() => auth("google")}>Sign in with Google</button>;
}

export function FacebookSignIn() {
  return (
    <button onClick={() => auth("facebook")}>Sign in with Facebook</button>
  );
}
