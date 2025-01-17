export default function DefaultFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 border rounded-lg w-fit bg-[var(--background)] border-[var(--foreground)] mt-4 mb-4 shadow-lg">
      <h2 className="text-lg font-bold underline mb-3 text-[var(--foreground)] text-center">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
