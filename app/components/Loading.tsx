import { useEffect, useState } from "react";

export default function LoadingBar() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "."));
    }, 500);

    return () => {
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)]">
      <h2 className="text-xl mb-4 font-mono tracking-wide">
        Loading CLI
        <span className="inline-block w-[20px]">{dots}</span>{" "}
      </h2>
    </div>
  );
}
