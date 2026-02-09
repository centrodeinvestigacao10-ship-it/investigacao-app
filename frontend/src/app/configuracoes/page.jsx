import { PageHeader } from "@/components/PageHeader";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Ajuste permissões, equipes e preferências do sistema."
      />

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Equipe</h3>
          <p className="mt-2 text-sm text-slate-600">
            Gerencie usuários, papéis e acesso por unidade.
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Preferências</h3>
          <p className="mt-2 text-sm text-slate-600">
            Notificações, alertas e políticas de auditoria.
          </p>
        </div>
      </section>
    </div>
  );
}
