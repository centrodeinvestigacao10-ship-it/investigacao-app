import { QuickActions } from "@/components/QuickActions";
import { SectionCard } from "@/components/SectionCard";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Painel de Investigação</h1>
            <p className="mt-2 text-sm text-slate-200">
              Fluxos rápidos, conexões inteligentes e análises em poucos cliques.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-3">
            <div className="rounded-xl bg-white/10 px-3 py-2">
              <p className="text-slate-300">Casos ativos</p>
              <p className="text-lg font-semibold">12</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2">
              <p className="text-slate-300">Alvos em foco</p>
              <p className="text-lg font-semibold">27</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2">
              <p className="text-slate-300">Alertas</p>
              <p className="text-lg font-semibold">5</p>
            </div>
          </div>
        </div>
      </section>

      <QuickActions />

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Qualificados"
          description="Gerencie cadastros, documentos e vínculos."
          href="/qualificados"
        />
        <SectionCard
          title="Alvos e Conexões"
          description="Crie relações, eventos e vínculos entre pessoas."
          href="/alvos"
        />
        <SectionCard
          title="ERBs"
          description="Importe e filtre registros por data e local."
          href="/erbs"
        />
        <SectionCard
          title="Extratos Telefônicos"
          description="Analise chamadas, SMS e conexões telefônicas."
          href="/extratos"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Fila de análise</h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-600">
            <li className="flex items-center justify-between">
              <span>ERB - Região Sul</span>
              <span className="text-xs text-slate-400">Hoje</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Extrato 55 9xxxx-4321</span>
              <span className="text-xs text-slate-400">Ontem</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Conexões Operação Atlas</span>
              <span className="text-xs text-slate-400">2 dias</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Mapas rápidos</h3>
          <p className="mt-3 text-sm text-slate-600">
            Visualize conexões, eventos e presença em ERBs com um clique.
          </p>
          <button className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
            Abrir mapa de vínculos
          </button>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Últimas ações</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Qualificado Ana S. atualizado</li>
            <li>Nova conexão registrada</li>
            <li>Extrato importado</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
