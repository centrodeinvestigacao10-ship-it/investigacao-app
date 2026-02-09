"use client";

import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { TimelinePanel } from "@/components/TimelinePanel";
import { PageHeader } from "@/components/PageHeader";
import { EntityList } from "@/components/EntityList";
import { DetailPanel } from "@/components/DetailPanel";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { operacoesMock } from "@/lib/mockData";
import {
  createOperacao,
  listOperacoes,
  removeOperacao,
  updateOperacao
} from "@/lib/repositories/operacoes";

export default function OperacoesPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    status: "",
    descricao: ""
  });

  const dataSource = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.nome,
        meta: `${item.status ?? "sem status"} • ${
          item.descricao ?? "sem descrição"
        }`
      })),
    [items]
  );

  function resetForm() {
    setEditingId(null);
    setForm({ nome: "", status: "", descricao: "" });
  }

  async function load() {
    setStatus("loading");
    if (!isSupabaseConfigured) {
      setItems(operacoesMock);
      setStatus("mock");
      return;
    }

    try {
      const data = await listOperacoes();
      setItems(data);
      setStatus("ready");
    } catch (error) {
      setItems(operacoesMock);
      setStatus("error");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    if (editingId) {
      await updateOperacao(editingId, form);
    } else {
      await createOperacao(form);
    }
    resetForm();
    await load();
  }

  async function handleDelete(id) {
    if (!isSupabaseConfigured) return;
    await removeOperacao(id);
    if (editingId === id) resetForm();
    await load();
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      nome: item.nome ?? "",
      status: item.status ?? "",
      descricao: item.descricao ?? ""
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operações"
        description="Organize casos, equipes e alvos por operação."
        actions={[
          <button
            key="nova"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Nova operação
          </button>
        ]}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Operações ativas" value="9" subtitle="Em andamento" />
        <MetricCard title="Equipes" value="4" subtitle="Unidades conectadas" />
        <MetricCard title="Alertas" value="3" subtitle="Ações pendentes" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <EntityList
          title="Operações"
          actions={["Nome", "Status", "Descrição"]}
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
              { label: "Registros", value: `${items.length} operações` }
            ]}
          />
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">
              {editingId ? "Editar operação" : "Nova operação"}
            </h3>
            <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
              <input
                placeholder="Nome"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.nome}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, nome: event.target.value }))
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
                placeholder="Descrição"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.descricao}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    descricao: event.target.value
                  }))
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
                  <span className="text-slate-500">{item.nome}</span>
                </div>
              ))}
            </div>
          </div>
          <TimelinePanel
            title="Linha do tempo"
            items={[
              { label: "Briefing Operação Atlas", meta: "Hoje • 08:30" },
              { label: "Coleta ERB Zona Sul", meta: "Hoje • 11:00" },
              { label: "Revisão de extratos", meta: "Hoje • 15:00" }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
