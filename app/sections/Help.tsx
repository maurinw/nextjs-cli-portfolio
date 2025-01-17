export default function Help() {
  return (
    <div className="p-4 border rounded-lg w-fit bg-[var(--background)] border-[var(--foreground)]">
      <h2 className="text-lg font-bold underline mb-2 text-[var(--foreground)]">
        Available Commands:
      </h2>
      <ul className="list-none space-y-1">
        <li>
          <span className="font-semibold text-blue-500 dark:text-yellow-400">
            help
          </span>{" "}
          - Lists all available commands
        </li>
        <li>
          <span className="font-semibold text-blue-500 dark:text-yellow-400">
            about
          </span>{" "}
          - Displays information about me
        </li>
        <li>
          <span className="font-semibold text-blue-500 dark:text-yellow-400">
            projects
          </span>{" "}
          - Lists my projects
        </li>
        <li>
          <span className="font-semibold text-blue-500 dark:text-yellow-400">
            contact
          </span>{" "}
          - Shows contact information
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
    </div>
  );
}
