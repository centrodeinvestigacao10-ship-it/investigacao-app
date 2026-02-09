const steps = [
  { label: "Buscar", description: "Nome, CPF, telefone, ERB" },
  { label: "Selecionar", description: "Alvo ou qualificado" },
  { label: "Conectar", description: "Vínculos e eventos" },
  { label: "Analisar", description: "ERBs, extratos, alertas" },
  { label: "Consolidar", description: "Relatório integrado" }
];

export function FlowStepper() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-700">
        Fluxo unificado (poucos cliques)
      </h3>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step.label} className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">
              {index + 1}. {step.label}
            </p>
            <p className="mt-1 text-xs text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
