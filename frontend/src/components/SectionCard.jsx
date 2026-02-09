import Link from "next/link";

export function SectionCard({ title, description, href }) {
  return (
    <Link
      href={href}
      className="block w-full min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-400"
    >
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  );
}
