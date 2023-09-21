"use client";
import { useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

import axios from "axios";

import Video from "../components/Video";

export default function DisplayVideo() {
  const id = useSearchParams().get("id");

  const [video, setVideo] = useState({});
  const [author, setAuthor] = useState({});

  const getVideo = async () => {
    try {
      const res = await axios.get("/api/video/get/" + id);

      if (res.status == 200) {
        setVideo(res.data);
        setAuthor(res.data.author);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div>
      <Video
        videoId={video?.id}
        title={video?.title}
        description={video?.desc}
        src={video?.url}
        authorImg={author?.image}
        authorName={author?.name}
        authorUsername={author?.username}
        likedByUser={video?.likedByUser}
        likes={video?.likes}
        comments={[]}
      />
    </div>
  );
}
