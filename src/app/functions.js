import { signIn as authSignIn, signOut } from "next-auth/react";

const signIn = async (provider) => {
  return authSignIn(provider, { callbackUrl: "/home" });
};

const logOut = async () => {
  console.log("logout");
  return signOut({ callbackUrl: "/signin" });
};

export { signIn, logOut };
