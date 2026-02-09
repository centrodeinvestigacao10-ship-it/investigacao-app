import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Controle de Investigação
        </Link>
        <nav className="flex w-full flex-wrap gap-3 text-xs text-slate-600 sm:w-auto sm:text-sm">
          <Link href="/qualificados">Qualificados</Link>
          <Link href="/alvos">Alvos</Link>
          <Link href="/erbs">ERBs</Link>
          <Link href="/extratos">Extratos</Link>
        </nav>
      </div>
    </header>
  );
}
