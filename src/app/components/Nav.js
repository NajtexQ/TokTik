"use client";

import React, { useState } from "react";
import Button from "./Button";
import { FaBeer } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

import { logOut } from "../functions";

import { URL } from "../constants";

export default function Nav() {
  let Links = [
    { name: "For You", link: "/home" },
    { name: "Profile", link: "/profile/" },
  ];
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const searchTags = () => {
    location.replace(`/search?name=${search}`);
  };

  return (
    <div className="shadow-md w-full absolute md:fixed top-0 left-0 z-999">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          TokTik
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <AiOutlineClose /> : <FiMenu />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-999 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <button
                onClick={() => {
                  location.replace(link.link);
                }}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </button>
            </li>
          ))}
          <div className="flex gap-4 md:gap-2 md:ml-6">
            <div className="flex justify-center items-center gap-2 cursor-pointer">
              <input
                className="rounded-full border border-gray-300 py-2 px-4 w-36 md:w-72"
                placeholder="Search for tags"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <AiOutlineSearch size={25} onClick={searchTags} />
            </div>

            <Button
              text="Create video"
              style="rounded md:rounded-full bg-indigo-500"
              func={() => location.replace("/create-video")}
            />
            <Button
              text="Logout"
              style="rounded md:rounded-full bg-rose-400 hover:bg-rose-500"
              func={() => logOut()}
            />
          </div>
        </ul>
      </div>
    </div>
  );
}
