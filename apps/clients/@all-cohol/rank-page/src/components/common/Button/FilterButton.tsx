export default function FilterButton({
  className = '',
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    //  rounded, border-2, border-neutral-400
    <div
      role={'filterButton'}
      className={`h-10 cursor-pointer rounded-2xl border border-slate-200 px-3 py-2 text-sm hover:bg-neutral-100 ${className}`}
    >
      {children}
    </div>
  );
}
