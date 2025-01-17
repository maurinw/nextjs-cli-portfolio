import { useState, useRef, useEffect } from "react";

interface CommandInputProps {
  onExecute: (command: string) => void;
}

export default function CommandInput({ onExecute }: CommandInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onExecute(input);
      setInput("");
    }
  };

  return (
    <div className="flex">
      <span className="text-green-300 mr-2">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-[var(--background)] text-[var(--foreground)] border-none outline-none w-full"
        autoFocus
        aria-label="Command line input"
      />
    </div>
  );
}
