"use client";

import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { GraphPlaceholder } from "@/components/GraphPlaceholder";
import { TimelinePanel } from "@/components/TimelinePanel";
import { PageHeader } from "@/components/PageHeader";
import { EntityList } from "@/components/EntityList";
import { DetailPanel } from "@/components/DetailPanel";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { analisesMock } from "@/lib/mockData";
import {
  createAnalise,
  listAnalises,
  removeAnalise,
  updateAnalise
} from "@/lib/repositories/analises";

export default function AnalisesPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    operacao: "",
    status: "",
    resumo: ""
  });

  const dataSource = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.titulo,
        meta: `${item.operacao ?? "Sem operação"} • ${
          item.status ?? "sem status"
        }`
      })),
    [items]
  );

  function resetForm() {
    setEditingId(null);
    setForm({ titulo: "", operacao: "", status: "", resumo: "" });
  }

  async function load() {
    setStatus("loading");
    if (!isSupabaseConfigured) {
      setItems(analisesMock);
      setStatus("mock");
      return;
    }

    try {
      const data = await listAnalises();
      setItems(data);
      setStatus("ready");
    } catch (error) {
      setItems(analisesMock);
      setStatus("error");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    if (editingId) {
      await updateAnalise(editingId, form);
    } else {
      await createAnalise(form);
    }
    resetForm();
    await load();
  }

  async function handleDelete(id) {
    if (!isSupabaseConfigured) return;
    await removeAnalise(id);
    if (editingId === id) resetForm();
    await load();
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      titulo: item.titulo ?? "",
      operacao: item.operacao ?? "",
      status: item.status ?? "",
      resumo: item.resumo ?? ""
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Análises"
        description="Consolide ERBs, extratos e vínculos em análises rápidas."
        actions={[
          <button
            key="nova"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Nova análise
          </button>
        ]}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Análises ativas" value="6" subtitle="Em andamento" />
        <MetricCard title="Pendências" value="4" subtitle="Revisar hoje" />
        <MetricCard title="Alertas" value="2" subtitle="Vínculos críticos" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <GraphPlaceholder
          title="Consolidação automática"
          description="ERBs, extratos e vínculos em uma única visão."
        />
        <TimelinePanel
          title="Em progresso"
          items={[
            { label: "Operação Atlas", meta: "ERBs + Extratos + Qualificados" },
            { label: "Operação Delta", meta: "Vínculos com alvo crítico" },
            { label: "Operação Vortex", meta: "Conexões por região" }
          ]}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <EntityList
          title="Análises registradas"
          actions={["Título", "Operação", "Status"]}
          items={dataSource}
        />
        <div className="space-y-4">
          <DetailPanel
            title="Status"
            sections={[
              {
                label: "Fonte",
                value:
                  status === "ready"
                    ? "Supabase conectado."
                    : "Mock local (configure o Supabase)."
              },
              { label: "Registros", value: `${items.length} análises` }
            ]}
          />
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">
              {editingId ? "Editar análise" : "Nova análise"}
            </h3>
            <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
              <input
                placeholder="Título"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.titulo}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, titulo: event.target.value }))
                }
              />
              <input
                placeholder="Operação"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.operacao}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, operacao: event.target.value }))
                }
              />
              <input
                placeholder="Status"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.status}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, status: event.target.value }))
                }
              />
              <input
                placeholder="Resumo"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.resumo}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, resumo: event.target.value }))
                }
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                  disabled={!isSupabaseConfigured}
                >
                  {editingId ? "Salvar" : "Criar"}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                  onClick={resetForm}
                >
                  Limpar
                </button>
              </div>
            </form>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">Ações</h3>
            <div className="mt-3 space-y-2 text-xs text-slate-600">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <button
                    className="rounded-lg border border-slate-200 px-2 py-1"
                    onClick={() => handleEdit(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg border border-slate-200 px-2 py-1"
                    onClick={() => handleDelete(item.id)}
                    disabled={!isSupabaseConfigured}
                  >
                    Remover
                  </button>
                  <span className="text-slate-500">{item.titulo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
