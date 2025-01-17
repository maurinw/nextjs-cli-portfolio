import DefaultFrame from "../components/DefaultFrame";

export default function Help() {
  return (
    <DefaultFrame title="Available Commands">
      <ul className="list-none space-y-2">
        <li>
          <span className="font-semibold text-[var(--foreground)">about</span> -
          Displays information about me
        </li>
        <li>
          <span className="font-semibold text-[var(--foreground)">
            projects
          </span>{" "}
          - Lists my projects
        </li>
        <li>
          <span className="font-semibold text-[var(--foreground)]">
            contact
          </span>{" "}
          - Shows contact information
        </li>
        <li>
          <span className="font-semibold text-[var(--info)]">clear</span> -
          Clears the terminal
        </li>
        <li>
          <span className="font-semibold text-[var(--info)]">dark</span> -
          Switches to beautiful mode
        </li>
        <li>
          <span className="font-semibold text-[var(--info)]">light</span> -
          Switches to the other mode ..
        </li>
        <li>
          <span className="font-semibold text-[var(--special)]">snake</span> -
          If you're bored...
        </li>
      </ul>
    </DefaultFrame>
  );
}
