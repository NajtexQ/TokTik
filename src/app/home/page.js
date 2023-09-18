"use client";

import Nav from "../components/Nav";

import ForYou from "./ForYou";

import getCurrentUser from "../actions/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div>
      <Nav />
      <ForYou user={user} />
    </div>
  );
}
