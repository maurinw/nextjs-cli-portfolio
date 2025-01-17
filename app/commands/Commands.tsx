import About from "../sections/About";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import Help from "../sections/Help";
import Snake from "../sections/Snake";
import { ReactNode } from "react";

export type Command = {
  description: string;
  execute: (onGameOver?: () => void) => string | ReactNode | void;
};

export const commands: Record<string, Command> = {
  help: {
    description: "Lists all available commands",
    execute: () => <Help />,
  },
  about: {
    description: "Displays information about me",
    execute: () => <About />,
  },
  projects: {
    description: "Lists my projects",
    execute: () => <Projects />,
  },
  contact: {
    description: "Contact information",
    execute: () => <Contact />,
  },
  snake: {
    description: "Play Snake",
    execute: (onGameOver) => <Snake onGameOver={onGameOver} />,
  },
  clear: {
    description: "Clears the terminal",
    execute: () => "",
  },
};
