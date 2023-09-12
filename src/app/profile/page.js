import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authConfig } from "@/lib/auth";

import Image from "next/image";

import logo from "../images/toktik-logo.png";

import Nav from "../components/Nav";

export default async function Profile() {
  const session = await getServerSession(authConfig);

  return (
    <>
      <Nav />
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-full max-w-[720px] h-1/2 rounded-lg drop-shadow-lg bg-gray-50 flex flex-col items-center justify-center gap-10">
          <Image
            src={session.user.image}
            alt="TokTik Logo"
            width={80}
            height={80}
            priority
            className="rounded-full"
          />
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-semibold text-xl">{session.user.name}</h1>
            <h1>@{session.user.username}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
