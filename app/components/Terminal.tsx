import { useReducer, useRef, useEffect, useState } from "react";
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

export default function Terminal() {
  const [state, dispatch] = useReducer(historyReducer, { history: [] });
  const [isGameActive, setIsGameActive] = useState(false);
  const { theme, setTheme } = useTheme();
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.history]);

  const handleCommand = (input: string) => {
    if (isGameActive) return;

    const commandKey = input.toLowerCase();
    console.log("Received command:", commandKey);

    const commandOutput = (
      <div>
        <span className="text-[var(--symb)]">{">"}</span> {input}
      </div>
    );

    dispatch({ type: "ADD_ENTRY", entry: commandOutput });

    if (commandKey === "dark" || commandKey === "light") {
      handleThemeChange(commandKey, setTheme, dispatch);
      return;
    }

    handleCommandExecution(commandKey, dispatch, setIsGameActive);
  };

  return (
    <div className="h-screen bg-[var(--background)] text-[var(--foreground)] font-mono flex flex-col items-center pb-10">
      <Welcome />
      <div className="w-full max-w-screen-md md:w-3/5 p-4 rounded-lg overflow-y-auto mt-4 custom-scrollbar">
        {state.history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        {!isGameActive && <CommandInput onExecute={handleCommand} />}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}

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

const handleThemeChange = (
  commandKey: string,
  setTheme: Function,
  dispatch: Function
) => {
  if (commandKey === "dark") {
    console.log("Switching theme to dark...");
    setTheme("dark");
    dispatch({ type: "ADD_ENTRY", entry: "Switched theme to dark mode." });
  } else if (commandKey === "light") {
    console.log("Switching theme to light...");
    setTheme("light");
    dispatch({ type: "ADD_ENTRY", entry: "Switched theme to light mode." });
  }
};

const handleCommandExecution = (
  commandKey: string,
  dispatch: Function,
  setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const command = commands[commandKey];

  if (command) {
    if (commandKey === "clear") {
      dispatch({ type: "CLEAR" });
    } else if (commandKey === "snake") {
      setIsGameActive(true);
      dispatch({
        type: "ADD_ENTRY",
        entry: command.execute(() => {
          setIsGameActive(false);
          dispatch({
            type: "ADD_ENTRY",
            entry: <div className="text-[var(--warn)] mt-2">Game Over!</div>,
          });
        }),
      });
    } else {
      dispatch({ type: "ADD_ENTRY", entry: command.execute() ?? "" });
    }
  } else {
    dispatch({
      type: "ADD_ENTRY",
      entry: (
        <div className="text-[var(--warn)]">
          Command not found. Type{" "}
          <span className="text-[var(--info)] font-semibold">'help'</span> to
          see available commands.
        </div>
      ),
    });
  }
};
