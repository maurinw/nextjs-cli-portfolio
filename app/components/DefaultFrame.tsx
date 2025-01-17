export default function DefaultFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 w-fit bg-[var(--background)] mt-2 mb-2">
      <h2 className="text-lg font-bold underline mb-3 text-[var(--foreground)]">
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
