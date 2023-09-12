import Image from "next/image";

import { HiShare } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { BiSend } from "react-icons/bi";

export default function Video(props) {
  return (
    <div className="flex">
      <div className="">
        <video className="w-96 rounded-lg" controls>
          <source src={props.src} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
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
              <AiFillHeart className="cursor-pointer" size={25} />
              <span className="ml-2 text-sm">{props.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                className="rounded-full py-1 px-4 w-60 bg-gray-100 focus:outline-none"
                type="text"
                placeholder="Add a comment"
              />
              <BiSend className="cursor-pointer" size={22} />
            </div>
          </div>

          {/* Comments section */}
          <div className="w-full p-4">
            <h1 className="font-semibold">
              Comments &#x2022; {props.comments.length}
            </h1>
            {props.comments.length == 0 && (
              <p className="text-sm mt-4">No comments yet</p>
            )}
          </div>

          {/* Author section */}
          <div className="flex flex-row items-center mt-auto justify-between self-end w-full h-20 p-4">
            <div className="flex flex-row">
              <Image
                className="rounded-full cursor-pointer"
                src={props.authorImg}
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
