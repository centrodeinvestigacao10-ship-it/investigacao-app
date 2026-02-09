export function GraphPlaceholder({ title, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
          Grafo
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-500 md:grid-cols-5">
        <div className="rounded-lg bg-white p-3 text-center">Alvo A</div>
        <div className="rounded-lg bg-white p-3 text-center">Alvo B</div>
        <div className="rounded-lg bg-white p-3 text-center">Qualif. C</div>
        <div className="rounded-lg bg-white p-3 text-center">ERB 12</div>
        <div className="rounded-lg bg-white p-3 text-center">Extrato</div>
      </div>
    </div>
  );
}
