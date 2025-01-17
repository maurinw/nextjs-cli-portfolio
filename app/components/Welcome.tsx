export default function Welcome() {
  return (
    <div className="w-full flex flex-col items-center mt-8">
      <p className="text-[var(--foreground)] text-center italic mt-2">
        Welcome to my CLI Portfolio. Type{" "}
        <span className="text-[var(--info)]">'help'</span> to see available
        commands.
      </p>
    </div>
  );
}
