import Link from "next/link";

const quickLinks = [
  { label: "Fluxo", href: "/fluxo" },
  { label: "Qualificados", href: "/qualificados" },
  { label: "Alvos", href: "/alvos" },
  { label: "Conexões", href: "/conexoes" },
  { label: "ERBs", href: "/erbs" },
  { label: "Extratos", href: "/extratos" }
];

export function TopBar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between md:hidden">
          <span className="text-sm font-semibold text-slate-900">
            Controle de Investigação
          </span>
          <Link
            href="/alvos"
            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
          >
            Novo alvo
          </Link>
        </div>

        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:max-w-md">
            <span className="text-xs font-semibold text-slate-400">Busca</span>
            <input
              placeholder="Buscar alvos, qualificados, telefones..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
            />
          </label>
          <nav className="flex flex-wrap gap-2 text-xs text-slate-600 md:text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full bg-slate-100 px-3 py-1 hover:bg-slate-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="text-right text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Equipe Alfa</p>
            <p>Setor de Inteligência</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-200" />
        </div>
      </div>
    </header>
  );
}
