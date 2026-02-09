export function EntityList({ title, items, actions }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          {actions.map((action) => (
            <span key={action} className="rounded-full bg-slate-100 px-3 py-1">
              {action}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 p-4 text-sm text-slate-600"
          >
            <p className="font-semibold text-slate-800">{item.name}</p>
            <p className="text-xs text-slate-500">{item.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
