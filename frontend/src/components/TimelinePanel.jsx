export function TimelinePanel({ title, items }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
            <div>
              <p className="font-semibold text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-500">{item.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
