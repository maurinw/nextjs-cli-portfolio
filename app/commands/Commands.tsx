import About from "../sections/About";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import { ReactNode } from "react";

export type Command = {
  description: string;
  execute: () => string | ReactNode | void;
};

export const commands: Record<string, Command> = {
  help: {
    description: "Lists all available commands",
    execute: () => "Available commands: help, about, projects, contact, clear",
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
  clear: {
    description: "Clears the terminal",
    execute: () => "",
  },
};
