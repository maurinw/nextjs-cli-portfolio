"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingBar from "./components/Loading";

const Terminal = dynamic(() => import("./components/Terminal"), { ssr: false });

export default function Landing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    // Prevent scrolling with ArrowUp and ArrowDown keys
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div>{loading ? <LoadingBar /> : <Terminal />}</div>;
}
