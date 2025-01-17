import DefaultFrame from "../components/DefaultFrame";

export default function Help() {
  return (
    <DefaultFrame title="Available Commands">
      <ul className="list-none space-y-2">
        <li>
          <span className="font-semibold text-red-500 dark:text-red-400">
            about
          </span>{" "}
          - Displays information about me
        </li>
        <li>
          <span className="font-semibold text-red-500 dark:text-red-400">
            projects
          </span>{" "}
          - Lists my projects
        </li>
        <li>
          <span className="font-semibold text-red-500 dark:text-red-400">
            contact
          </span>{" "}
          - Shows contact information
        </li>
        <li>
          <span className="font-semibold text-blue-500 dark:text-yellow-400">
            help
          </span>{" "}
          - Lists all available commands
        </li>
        <li>
          <span className="font-semibold text-blue-500 dark:text-yellow-400">
            clear
          </span>{" "}
          - Clears the terminal
        </li>
        <li>
          <span className="font-semibold text-blue-500 dark:text-yellow-400">
            dark
          </span>{" "}
          - Switches to dark mode
        </li>
        <li>
          <span className="font-semibold text-blue-500 dark:text-yellow-400">
            light
          </span>{" "}
          - Switches to light mode
        </li>
      </ul>
    </DefaultFrame>
  );
}
