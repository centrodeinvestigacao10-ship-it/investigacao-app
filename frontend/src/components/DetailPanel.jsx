export function DetailPanel({ title, sections }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          Detalhes
        </span>
      </div>
      <div className="mt-4 space-y-4 text-sm text-slate-600">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-semibold uppercase text-slate-400">
              {section.label}
            </p>
            <p className="mt-2 text-sm text-slate-700">{section.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
