import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0">
      {/* Icon Placeholder - Red/Grey Circle thing */}
      <div className="size-10 rounded-full border-[4px] border-dashed border-primary/80 flex items-center justify-center">
        {/* Simple geometric approximation */}
        <div className="size-6 bg-secondary/80 rounded-full animate-pulse" />
      </div>

      <div className="flex flex-col">
        <span className="font-clash font-semibold text-xl leading-none tracking-tight text-foreground">
          ALLBRICK
        </span>
        <span className="font-rubik text-sm font-medium leading-none tracking-widest text-foreground">
          PAVERS
        </span>
        <span className="text-[0.5rem] uppercase tracking-widest text-[#6B7280] leading-tight mt-0.5">
          Full Service Installations
        </span>
      </div>
    </Link>
  );
}
