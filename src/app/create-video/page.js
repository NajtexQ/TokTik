"use client";

import Nav from "../components/Nav";

import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import getCurrentUser from "../actions/getCurrentUser";

import { redirect } from "next/navigation";

export default async function CreateVideo() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/signin");
  }

  const [tags, setTags] = useState([]);

  const [error, setError] = useState("");

  const [currentTag, setCurrentTag] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Video not selected");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const addTag = () => {
    if (tags.length >= 3) {
      alert("You can only add 3 tags");
      return;
    }
    setTags([...tags, currentTag]);
    setCurrentTag("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFile(null);
      setFileName("Video not selected");
    }
  };

  const createVideo = async () => {
    if (!file) {
      setError("Please select a video");
      return;
    } else if (!title) {
      setError("Please enter a title");
      return;
    } else if (!desc) {
      setError("Please enter a description");
      return;
    }

    console.log("Test");

    const formData = new FormData();

    formData.append("video", file);
    formData.append("title", title);
    formData.append("desc", desc);

    const res = await fetch("/api/video/create", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    window.location.href = "/home";
  };

  return (
    <div>
      <Nav />
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-[720px] min-h-1/2 p-10 rounded-lg drop-shadow-lg bg-gray-50 flex flex-col items-center gap-10">
          <h1 className="font-semibold text-lg">Create Video</h1>

          {error && (
            <div className="max-w-full w-1/2 bg-rose-400 rounded-md py-2 px-4 text-white text-center">
              {error}
            </div>
          )}
          <div className="w-full h-full flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="Title"
              className="w-full h-10 rounded-md border-2 border-gray-300 px-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Description"
              className="w-full h-10 rounded-md border-2 border-gray-300 px-3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></input>
            <div className="flex flex-col items-center gap-2 my-2">
              <p>{fileName}</p>
              <label
                htmlFor="file-upload"
                className="bg-indigo-400 rounded-full py-2 px-4 text-white cursor-pointer"
              >
                {file ? "Change" : "Select"} Video
              </label>
            </div>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              onChange={(e) => handleFileChange(e)}
            />
            <div className="w-full h-10 flex gap-2">
              <input
                type="text"
                placeholder="Tag"
                className="w-full h-10 rounded-lg border-2 border-gray-300 px-3"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
              />
              <button
                className="w-32 h-10 rounded-full mt-auto bg-indigo-400 text-white"
                onClick={addTag}
              >
                Add
              </button>
            </div>
            <div className="max-w-max flex gap-2 mr-auto">
              {tags.map((tag) => (
                <div
                  className="flex bg-gray-200 rounded-lg py-2 pl-4 pr-2 justify-center items-center gap-2 hover:bg-gray-300 cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  <span>{tag}</span>
                  <AiOutlineClose size={10} />
                </div>
              ))}
            </div>
            <button
              className="w-64 h-10 rounded-full mt-auto bg-rose-400 text-white font-semibold"
              onClick={createVideo}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
