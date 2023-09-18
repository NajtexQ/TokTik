"use client";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import axios from "axios";

import Video from "../components/Video";

import { useState, useEffect } from "react";

export default function ForYou({ user }) {
  const [videosCount, setVideosCount] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(1);

  const [video, setVideo] = useState({});
  const [author, setAuthor] = useState({});

  const getVideoCount = async () => {
    try {
      const res = await axios.get("/api/video/count");
      setVideosCount(res.data);
      console.log("videosCount", res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getVideo = async () => {
    const params = new URLSearchParams([["value", currentVideo]]);

    try {
      const res = await axios.get("/api/video/get", { params });

      if (res.status == 200) {
        setVideo(res.data);
        setAuthor(res.data.author);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVideoCount();
  }, []);

  useEffect(() => {
    getVideo();
  }, [currentVideo]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 gap-12">
      {videosCount > 0 ? (
        <>
          <AiOutlineArrowLeft
            size={45}
            className="bg-gray-200 p-2 rounded-full cursor-pointer"
          />
          <Video
            videoId={video?.id}
            title={video?.title}
            description={video?.desc}
            src={video?.url}
            authorImg={author?.image}
            authorName={author?.name}
            authorUsername={author?.username}
            likedByUser={true}
            likes={100}
            comments={[]}
          />
          <AiOutlineArrowRight
            size={45}
            className="bg-gray-200 p-2 rounded-full cursor-pointer"
          />
        </>
      ) : (
        <p>No videos yet.</p>
      )}
    </div>
  );
}