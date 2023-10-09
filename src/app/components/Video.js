"use client";

import Image from "next/image";

import { HiShare } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { VscReport } from "react-icons/vsc";
import { BiSend } from "react-icons/bi";

import { URL } from "../constants";

import Comments from "./Comments";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Video(props) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(props.likes);

  const [comment, setComment] = useState("");

  const [copied, setCopied] = useState(false);

  const fetchComments = async () => {
    console.log("Fetching comments");
    try {
      const params = new URLSearchParams([["videoId", props.videoId]]);

      const res = await axios.get("/api/comments", { params });
      console.log(res.data);
      return res.data;
    } catch (err) {
      return [];
    }
  };

  const getUrl = () => {
    navigator.clipboard.writeText(URL + "/video?id=" + props.videoId);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 800);
  };

  const reportVideo = async () => {
    const params = new URLSearchParams([["videoId", props.videoId]]);

    const res = await axios.post("/api/report/create/", null, { params });

    if (res.data.error) {
      alert(res.data.error);
    } else {
      alert("Video has been reported!");
    }
  };

  useEffect(() => {
    console.log("New video");
    setLiked(props.likedByUser);
    setLikes(props.likes);
    console.log(props.likedByUser);

    const com = fetchComments();
    com.then((data) => {
      setComments(data);
    });
  }, [props]);

  const addComment = async (comment) => {
    const res = await fetch(`/api/comments/create`, {
      method: "POST",
      body: JSON.stringify({ comment, videoId: props.videoId }),
    });
    if (res.status == 200) {
      const com = fetchComments();
      com.then((data) => {
        setComments(data);
      });
    }
  };

  const likeVideo = async () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
      const res = await fetch(`/api/like/remove/${props.videoId}`, {
        method: "DELETE",
      });
      if (res.status != 200) {
        setLiked(true);
        setLikes(likes + 1);
      }
      return;
    } else {
      setLiked(true);
      setLikes(likes + 1);
      const res = await fetch(`/api/like/add/${props.videoId}`, {
        method: "POST",
      });
      if (res.status != 200) {
        setLiked(false);
        setLikes(likes - 1);
      }
    }
  };
  return (
    <div className="flex absolute top-24 flex-col md:static md:flex-row">
      <div className="">
        {props.src != undefined ? (
          <video className="w-96 rounded-lg" controls>
            <source
              src={URL + "/api/videofile/get?videoId=" + props.src}
              type="video/mp4"
            />
            Your browser does not support HTML video.
          </video>
        ) : null}
      </div>
      <div className="bg-white w-96 rounded-lg">
        <div className="flex flex-col items-center w-full h-full">
          {/* Header section */}
          <div className="p-4 w-full rounded-t-lg flex justify-between items-center">
            <div>
              <h1 className="font-bold">{props.title}</h1>
              <h2 className="mt-2 text-sm">{props.description}</h2>
            </div>
            {props.isOwner ? (
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={props.deleteVideo}
              >
                <AiFillDelete size={25} />
                <h1 className="text-xs">Delete</h1>
              </div>
            ) : (
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={reportVideo}
              >
                <VscReport size={25} />
                <h1 className="text-xs">Report</h1>
              </div>
            )}
          </div>

          {/* Likes and comment section */}
          <div className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center">
              {liked ? (
                <AiFillHeart
                  className="cursor-pointer"
                  size={25}
                  color="#ff0000"
                  onClick={likeVideo}
                />
              ) : (
                <AiOutlineHeart
                  className="cursor-pointer"
                  size={25}
                  onClick={likeVideo}
                />
              )}
              <span className="ml-2 text-sm">{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                className="rounded-full py-1 px-4 w-60 bg-gray-100 focus:outline-none"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <BiSend
                className="cursor-pointer"
                size={22}
                onClick={() => {
                  addComment(comment);
                  setComment("");
                }}
              />
            </div>
          </div>

          {/* Comments section */}
          <div className="w-full p-4">
            <h1 className="font-semibold">
              Comments &#x2022; {comments.length}
            </h1>
            {comments.length == 0 ? (
              <p className="text-sm mt-4">No comments yet</p>
            ) : (
              <Comments comments={comments} />
            )}
          </div>

          {/* Author section */}
          <div className="flex flex-row items-center mt-auto justify-between self-end w-full h-20 p-4">
            <div className="flex flex-row">
              <Image
                className="rounded-full cursor-pointer"
                src={props.authorImg}
                alt="profile"
                width={50}
                height={50}
                onClick={() => {
                  window.location.href = "/profile/" + props.authorUsername;
                }}
              />
              <div className="ml-4 flex flex-col">
                <h1
                  className="font-bold p-0 m-0 cursor-pointer"
                  onClick={() => {
                    window.location.href = "/profile/" + props.authorUsername;
                  }}
                >
                  {props.authorName}
                </h1>
                <h2 className="p-0 m-0">@{props.authorUsername}</h2>
              </div>
            </div>
            <div className="cursor-pointer">
              <div
                className={
                  copied
                    ? "absolute bg-gray-800 text-white rounded-lg p-1 text-sm -translate-y-10 -translate-x-12"
                    : "hidden"
                }
              >
                Copied to clipboard
              </div>
              <HiShare size={25} onClick={getUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
