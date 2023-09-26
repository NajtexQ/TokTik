import Nav from "../components/Nav";

import ForYou from "./ForYou";

import getCurrentUser from "../actions/getCurrentUser";

import { redirect } from "next/navigation";

export default function Home() {
  const user = getCurrentUser();

  if (!user) {
    redirect("/signin");
    return <div></div>;
  }

  return (
    <div>
      <Nav />
      <ForYou user={user} />
    </div>
  );
}
