import { PageHeader } from "@/components/PageHeader";

export default function NovoQualificadoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Novo qualificado"
        description="Formulário rápido para cadastro inicial."
      />

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Nome completo
              </label>
              <input className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">CPF</label>
              <input className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">RG</label>
              <input className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Telefone
              </label>
              <input className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">Status</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-100 px-3 py-1">Ativo</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">
                Observação
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1">
                Risco
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">Ações</h3>
            <button className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
              Salvar qualificado
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
