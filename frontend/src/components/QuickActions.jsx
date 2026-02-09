import Link from "next/link";

const actions = [
  { label: "Novo qualificado", href: "/qualificados/novo" },
  { label: "Novo alvo", href: "/alvos" },
  { label: "Importar ERB", href: "/erbs" },
  { label: "Importar extrato", href: "/extratos" }
];

export function QuickActions() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold">Ações rápidas</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-slate-400"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
