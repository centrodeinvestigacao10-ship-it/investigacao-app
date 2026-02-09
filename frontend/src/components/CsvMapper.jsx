export function CsvMapper({
  headers,
  fields,
  mapping,
  onChangeMapping,
  rowCount,
  status,
  onImport,
  disabled
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700">Importar CSV</h3>
      <p className="mt-2 text-xs text-slate-500">
        {rowCount} linhas prontas • {status}
      </p>
      <div className="mt-3 space-y-3">
        {fields.map((field) => (
          <div key={field.key} className="flex items-center gap-2">
            <span className="w-28 text-xs text-slate-500">{field.label}</span>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700"
              value={mapping[field.key] ?? ""}
              onChange={(event) =>
                onChangeMapping(field.key, event.target.value)
              }
              disabled={disabled}
            >
              <option value="">Não mapear</option>
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button
        className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
        onClick={onImport}
        disabled={disabled || rowCount === 0}
      >
        Importar agora
      </button>
    </div>
  );
}
