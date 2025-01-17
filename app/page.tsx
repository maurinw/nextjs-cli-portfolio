"use client";
import dynamic from "next/dynamic";

const Terminal = dynamic(() => import("./components/Terminal"), { ssr: false });

export default function Landing() {
  return <Terminal />;
}