import { FlowStepper } from "@/components/FlowStepper";
import { EntityList } from "@/components/EntityList";
import { DetailPanel } from "@/components/DetailPanel";
import { GraphPlaceholder } from "@/components/GraphPlaceholder";
import { PageHeader } from "@/components/PageHeader";

export default function FluxoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Fluxo rápido"
        description="Um caminho único para buscar, conectar e analisar."
        actions={[
          <button
            key="novo"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Novo fluxo
          </button>
        ]}
      />

      <FlowStepper />

      <section className="grid gap-4 lg:grid-cols-[1.3fr,1fr]">
        <EntityList
          title="Resultados rápidos"
          actions={["Nome", "CPF", "Telefone", "Operação"]}
          items={[
            {
              id: "q1",
              name: "João A. (Qualificado)",
              meta: "CPF 000.000.000-00 • Operação Atlas"
            },
            {
              id: "a1",
              name: "Alvo B",
              meta: "Telefone +55 11 9xxxx-4321"
            },
            {
              id: "e1",
              name: "ERB Zona Sul",
              meta: "12 dispositivos • 2 vínculos"
            }
          ]}
        />
        <DetailPanel
          title="Detalhe selecionado"
          sections={[
            { label: "Resumo", value: "Vínculos com operação Atlas." },
            { label: "Alertas", value: "2 conexões críticas detectadas." },
            { label: "Próximo passo", value: "Cruzar com extratos." }
          ]}
        />
      </section>

      <GraphPlaceholder
        title="Visão integrada"
        description="Vínculos entre alvos, qualificados e eventos."
      />
    </div>
  );
}
