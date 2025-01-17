import DefaultFrame from "../components/DefaultFrame";

export default function Welcome() {
  return (
    <DefaultFrame title="Welcome">
      <p className="text-[var(--foreground)] text-center italic">
        Welcome to my CLI Portfolio. Type{" "}
        <span className="text-blue-500 dark:text-yellow-400">'help'</span> to
        see available commands.
      </p>
    </DefaultFrame>
  );
}
