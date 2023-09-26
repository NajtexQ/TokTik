"use client";

import Nav from "../components/Nav";

import ForYou from "./ForYou";

import { redirect } from "next/navigation";

import getCurrentUser from "../actions/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/signin");
  }

  return (
    <div>
      <Nav />
      <ForYou user={user} />
    </div>
  );
}
