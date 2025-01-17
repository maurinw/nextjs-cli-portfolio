"use client";
import { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to my CLI Portfolio.",
    "Type 'help' to see available commands.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands: { [key: string]: string | (() => string) } = {
    help: () =>
      "Available commands: " +
      `<span class="text-red-400">help</span>, ` +
      `<span class="text-red-400">about</span>, ` +
      `<span class="text-red-400">projects</span>, ` +
      `<span class="text-red-400">contact</span>, ` +
      `<span class="text-red-400">clear</span>`,
    about:
      "Hi, I'm Maurin. A developer passionate about technology and problem-solving.",
    projects: "tbd",
    contact: "Email: tbd | LinkedIn: tbd",
    clear: () => {
      setHistory([]);
      return "";
    },
  };

  const handleCommand = () => {
    if (!input.trim()) return;

    const command = input.toLowerCase();
    const output = commands[command];

    setHistory((prev) => [
      ...prev,
      `> ${input}`,
      typeof output === "function"
        ? output()
        : output || "Command not found. Type 'help' for a list of commands.",
    ]);

    setInput("");
  };

  return (
    <div
      className="h-screen bg-black text-green-400 font-mono p-4 overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, index) => (
        <div
          key={index}
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
      <div className="flex">
        <span className="text-green-300 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand()}
          className="bg-black text-green-400 border-none outline-none w-full"
          autoFocus
        />
      </div>
    </div>
  );
}
