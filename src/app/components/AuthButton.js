"use client";

import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

import { signIn } from "../functions";

export default function AuthButton({ provider }) {
  let providers = {
    google: {
      name: "Google",
      icon: <FcGoogle size={25} className="ml-4 mr-6" />,
    },
    facebook: {
      name: "Facebook",
      icon: <BsFacebook size={25} color="#4267B2" className="ml-4 mr-6" />,
    },
  };

  return (
    <button
      className="flex w-1/2 max-w-[250px] h-16 bg-gray-100 items-center hover:bg-gray-200 rounded-lg"
      onClick={() => signIn(provider)}
    >
      <div className="flex">
        {providers[provider].icon}
        <p>{`Sign with ${providers[provider].name}`}</p>
      </div>
    </button>
  );
}
