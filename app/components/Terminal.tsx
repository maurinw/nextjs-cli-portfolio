"use client";
import { useReducer, useRef, useEffect } from "react";
import { commands } from "../commands/Commands";
import CommandInput from "../commands/CommandInput";
import { useTheme } from "../context/ThemeContext";
import Welcome from "../sections/Welcome";
import { ReactNode } from "react";

type HistoryEntry = string | ReactNode;

type State = {
  history: HistoryEntry[];
};

type Action = { type: "ADD_ENTRY"; entry: HistoryEntry } | { type: "CLEAR" };

function historyReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ENTRY":
      return { history: [...state.history, action.entry] };
    case "CLEAR":
      return { history: [] };
    default:
      return state;
  }
}

export default function Terminal() {
  const [state, dispatch] = useReducer(historyReducer, {
    history: [],
  });

  const { theme, setTheme } = useTheme();
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.history]);

  const handleCommand = (input: string) => {
    const commandKey = input.toLowerCase();

    console.log("Received command:", commandKey);

    dispatch({ type: "ADD_ENTRY", entry: `> ${input}` });

    if (commandKey === "dark") {
      console.log("Switching theme to dark...");
      setTheme("dark");
      dispatch({ type: "ADD_ENTRY", entry: "Switched to dark mode." });
      return;
    }
    if (commandKey === "light") {
      console.log("Switching theme to light...");
      setTheme("light");
      dispatch({ type: "ADD_ENTRY", entry: "Switched to light mode." });
      return;
    }

    const command = commands[commandKey];

    if (command) {
      if (commandKey === "clear") {
        dispatch({ type: "CLEAR" });
      } else {
        dispatch({ type: "ADD_ENTRY", entry: command.execute() ?? "" });
      }
    } else {
      dispatch({
        type: "ADD_ENTRY",
        entry: "Command not found. Type 'help' for a list of commands.",
      });
    }
  };

  return (
    <div
      className="h-screen bg-[var(--background)] text-[var(--foreground)] font-mono p-4 overflow-y-auto"
      onClick={() => terminalEndRef.current?.scrollIntoView()}
    >
      <Welcome /> {/* ✅ Show the Fancy Welcome Message */}
      {state.history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}
      <CommandInput onExecute={handleCommand} />
      <div ref={terminalEndRef} />
    </div>
  );
}
