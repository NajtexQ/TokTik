"use client";
import { useEffect, useState } from "react";

export default function Najt() {
  const [state, setState] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  function click() {
    console.log("click");
    setState(!state);
  }

  return (
    <div>
      <h1>Hello Najt</h1>
      <p>Page</p>
      <button onClick={click}>Click</button>
      <p>{state ? "true" : "false"}</p>
    </div>
  );
}
