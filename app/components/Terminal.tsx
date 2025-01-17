"use client";
import { useReducer, useRef, useEffect } from "react";
import { commands } from "../commands/Commands";
import CommandInput from "../commands/CommandInput";
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
    history: [
      "Welcome to my CLI Portfolio.",
      "Type 'help' to see available commands.",
    ],
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.history]);

  const handleCommand = (input: string) => {
    const commandKey = input.toLowerCase();
    const command = commands[commandKey];

    dispatch({ type: "ADD_ENTRY", entry: `> ${input}` });

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
      className="h-screen bg-black text-green-400 font-mono p-4 overflow-y-auto"
      onClick={() => terminalEndRef.current?.scrollIntoView()}
    >
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
