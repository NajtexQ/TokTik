import Image from "next/image";

import logo from "../images/toktik-logo.png";

import AuthButton from "../components/AuthButton";

import Nav from "../components/Nav";

import getCurrentUser from "../actions/getCurrentUser";

import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getCurrentUser();
  if (user) {
    return redirect("/home");
  }

  return (
    <div className="bg-gray-100">
      {/* <Nav /> */}
      <div className="w-screen h-screen flex items-center justify-center z-0">
        <h1 className="absolute font-[Poppins] top-24 text-4xl font-bold">
          TokTik
        </h1>
        <div className="w-full h-1/2 max-w-[720px] rounded-lg drop-shadow-lg bg-white flex flex-col items-center justify-center gap-10">
          <Image
            src={logo}
            alt="TokTik Logo"
            width={100}
            height={100}
            priority
            className="rounded-xl"
          />
          <h1>Sign in to continue</h1>
          <div className="w-full flex flex-col items-center gap-2">
            <AuthButton provider="google" />
            <AuthButton provider="facebook" />
          </div>
        </div>
      </div>
    </div>
  );
}
