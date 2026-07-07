export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-card border border-ink-100 bg-surface p-5 shadow-soft ${className}`}>{children}</div>
  );
}
