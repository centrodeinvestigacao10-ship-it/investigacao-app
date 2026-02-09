import Link from "next/link";

const primaryLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Fluxo rápido", href: "/fluxo" },
  { label: "Qualificados", href: "/qualificados" },
  { label: "Alvos", href: "/alvos" },
  { label: "Conexões", href: "/conexoes" },
  { label: "ERBs", href: "/erbs" },
  { label: "Extratos", href: "/extratos" }
];

const secondaryLinks = [
  { label: "Análises", href: "/analises" },
  { label: "Operações", href: "/operacoes" },
  { label: "Relatórios", href: "/relatorios" },
  { label: "Configurações", href: "/configuracoes" }
];

export function SidebarNav() {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
      <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        Controle de Investigação
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Principal
        </p>
        <nav className="flex flex-col gap-1 text-sm text-slate-700">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Gestão
        </p>
        <nav className="flex flex-col gap-1 text-sm text-slate-700">
          {secondaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto rounded-xl bg-slate-900 p-4 text-white">
        <p className="text-sm font-semibold">Nova investigação</p>
        <p className="mt-1 text-xs text-slate-200">
          Inicie rapidamente com um alvo e conexões.
        </p>
        <Link
          href="/alvos"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900"
        >
          Começar agora
        </Link>
      </div>
    </aside>
  );
}
