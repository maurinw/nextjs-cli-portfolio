import { useReducer, useRef, useEffect } from "react";
import { commands } from "../commands/Commands";
import { useTheme } from "../context/ThemeContext";
import { ReactNode } from "react";

import CommandInput from "../commands/CommandInput";
import Welcome from "./Welcome";

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

    dispatch({
      type: "ADD_ENTRY",
      entry: (
        <div>
          <span className="text-green-300">{">"}</span> {input}
        </div>
      ),
    });

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
    <div className="h-screen bg-[var(--background)] text-[var(--foreground)] font-mono flex flex-col items-center">
      <div className="w-full flex justify-center mt-8">
        <Welcome />
      </div>
      <div className="w-full max-w-screen-md md:w-3/5 p-4 border border-[var(--foreground)] rounded-lg shadow-lg overflow-y-auto mt-4">
        {state.history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <CommandInput onExecute={handleCommand} />
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
