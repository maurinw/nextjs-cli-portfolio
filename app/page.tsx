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

    return () => clearTimeout(timer);
  }, []);

  return <div>{loading ? <LoadingBar /> : <Terminal />}</div>;
}
