"use client";

import Nav from "../components/Nav";
import Video from "../components/Video";

import axios from "axios";

import getCurrentUser from "../actions/getCurrentUser";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { useState, useEffect } from "react";

export default async function Home() {
  return (
    <div>
      <Nav />
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100 gap-12">
        <AiOutlineArrowLeft
          size={45}
          className="bg-gray-200 p-2 rounded-full cursor-pointer"
        />
        <Video
          videoId="569598e4-650b-46bd-8b70-128a799ec372"
          title="First video"
          description="This is the first video on my tiktok channel. Hello everyone"
          src="http://localhost:3000/uploads/videos/toktik.mp4"
          authorImg={""}
          authorName="Najt"
          authorUsername="najt"
          likedByUser={true}
          likes={100}
          comments={[]}
        />
        <AiOutlineArrowRight
          size={45}
          className="bg-gray-200 p-2 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}
