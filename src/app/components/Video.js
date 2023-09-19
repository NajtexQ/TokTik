"use client";

import Image from "next/image";

import { HiShare } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiSend } from "react-icons/bi";

import { URL } from "../constants";

import Comments from "./Comments";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Video(props) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/?videoId=${props.videoId}`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    setLiked(props.likedByUser);

    const com = fetchComments();
    com.then((data) => {
      setComments(data);
    });
  }, []);

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
      const res = await fetch(`/api/like/remove/${props.videoId}`, {
        method: "DELETE",
      });
      if (res.status != 200) {
        setLiked(true);
      }
      return;
    } else {
      setLiked(true);
      const res = await fetch(`/api/like/add/${props.videoId}`, {
        method: "POST",
      });
      if (res.status != 200) {
        setLiked(false);
      }
    }
  };
  return (
    <div className="flex">
      <div className="">
        {props.src != undefined ? (
          <video className="w-96 rounded-lg" controls>
            <source src={URL + props.src} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        ) : null}
      </div>
      <div className="bg-white w-96 rounded-lg">
        <div className="flex flex-col items-center w-full h-full">
          {/* Header section */}
          <div className="p-4 w-full rounded-t-lg">
            <h1 className="font-bold">{props.title}</h1>
            <h2 className="mt-2 text-sm">{props.description}</h2>
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
              <span className="ml-2 text-sm">{props.likes}</span>
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
              />
              <div className="ml-4 flex flex-col">
                <h1 className="font-bold p-0 m-0 cursor-pointer">
                  {props.authorName}
                </h1>
                <h2 className="p-0 m-0">@{props.authorUsername}</h2>
              </div>
            </div>
            <div className="cursor-pointer">
              <HiShare size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
