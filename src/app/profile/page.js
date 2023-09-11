import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import Image from "next/image";

import logo from "../images/toktik-logo.png";

import Nav from "../components/Nav";

export default async function Profile() {
  const session = await getServerSession(authConfig);

  console.log(session.user.image);

  return (
    <>
      <Nav />
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-1/2 h-1/2 rounded-lg drop-shadow-lg bg-gray-50 flex flex-col items-center justify-center gap-10">
          <Image
            src={session.user.image}
            alt="TokTik Logo"
            width={100}
            height={100}
            priority
            className="rounded-xl"
          />
          <h1>Profile</h1>
        </div>
      </div>
    </>
  );
}
