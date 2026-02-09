export function PageHeader({ title, description, actions }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description ? (
            <p className="text-sm text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap gap-2 text-xs">{actions}</div>
        ) : null}
      </div>
    </section>
  );
}
