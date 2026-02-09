"use client";

import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { GraphView } from "@/components/GraphView";
import { TimelinePanel } from "@/components/TimelinePanel";
import { PageHeader } from "@/components/PageHeader";
import { EntityList } from "@/components/EntityList";
import { DetailPanel } from "@/components/DetailPanel";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import {
  createConexao,
  listConexoes,
  removeConexao,
  updateConexao
} from "@/lib/repositories/conexoes";

export default function ConexoesPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    origem_id: "",
    origem_tipo: "",
    destino_id: "",
    destino_tipo: "",
    descricao: ""
  });

  const dataSource = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: `${item.origem_tipo}:${item.origem_id} → ${item.destino_tipo}:${item.destino_id}`,
        meta: item.descricao ?? ""
      })),
    [items]
  );

  const graphData = useMemo(() => {
    if (items.length === 0) {
      return {
        nodes: [
          { id: "a1", label: "alvo:a1" },
          { id: "a2", label: "alvo:a2" },
          { id: "q1", label: "qualificado:q1" }
        ],
        edges: [
          { from: "a1", to: "a2" },
          { from: "a1", to: "q1" }
        ]
      };
    }

    const nodesMap = new Map();
    const edges = items.map((item) => {
      const origemKey = `${item.origem_tipo}:${item.origem_id}`;
      const destinoKey = `${item.destino_tipo}:${item.destino_id}`;

      if (!nodesMap.has(origemKey)) {
        nodesMap.set(origemKey, { id: origemKey, label: origemKey });
      }
      if (!nodesMap.has(destinoKey)) {
        nodesMap.set(destinoKey, { id: destinoKey, label: destinoKey });
      }

      return { from: origemKey, to: destinoKey };
    });

    return { nodes: Array.from(nodesMap.values()), edges };
  }, [items]);

  function resetForm() {
    setEditingId(null);
    setForm({
      origem_id: "",
      origem_tipo: "",
      destino_id: "",
      destino_tipo: "",
      descricao: ""
    });
  }

  async function load() {
    setStatus("loading");
    if (!isSupabaseConfigured) {
      setItems([]);
      setStatus("not_configured");
      return;
    }

    try {
      const data = await listConexoes();
      setItems(data);
      setStatus("ready");
    } catch (error) {
      console.error("Erro ao carregar conexoes:", error);
      setItems([]);
      setStatus("error");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    if (editingId) {
      await updateConexao(editingId, form);
    } else {
      await createConexao(form);
    }

    resetForm();
    await load();
  }

  async function handleDelete(id) {
    if (!isSupabaseConfigured) return;
    await removeConexao(id);
    if (editingId === id) {
      resetForm();
    }
    await load();
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      origem_id: item.origem_id ?? "",
      origem_tipo: item.origem_tipo ?? "",
      destino_id: item.destino_id ?? "",
      destino_tipo: item.destino_tipo ?? "",
      descricao: item.descricao ?? ""
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conexões"
        description="Visualize vínculos entre alvos, qualificados e eventos."
        actions={[
          <button
            key="novo"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Novo vínculo
          </button>,
          <button
            key="grafo"
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
          >
            Abrir grafo
          </button>
        ]}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Conexões ativas" value="128" subtitle="Últimos 30 dias" />
        <MetricCard title="Nós críticos" value="7" subtitle="Alvos em foco" />
        <MetricCard title="Alertas" value="3" subtitle="Revisar hoje" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <GraphView nodes={graphData.nodes} edges={graphData.edges} />
        <TimelinePanel
          title="Vínculos recentes"
          items={[
            { label: "Alvo A ↔ Alvo B", meta: "Operação Atlas • ERB Norte" },
            { label: "Qualificado C ↔ Alvo D", meta: "Extrato 55 9xxxx-4321" },
            { label: "Alvo E ↔ Alvo F", meta: "Operação Delta • 2 eventos" }
          ]}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <EntityList
          title="Conexões registradas"
          actions={["Origem", "Destino", "Descrição"]}
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
              { label: "Registros", value: `${items.length} conexões` }
            ]}
          />
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">
              {editingId ? "Editar conexão" : "Nova conexão"}
            </h3>
            <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
              <input
                placeholder="Origem ID"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.origem_id}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, origem_id: event.target.value }))
                }
              />
              <input
                placeholder="Origem tipo (alvo/qualificado)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.origem_tipo}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    origem_tipo: event.target.value
                  }))
                }
              />
              <input
                placeholder="Destino ID"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.destino_id}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    destino_id: event.target.value
                  }))
                }
              />
              <input
                placeholder="Destino tipo (alvo/qualificado)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.destino_tipo}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    destino_tipo: event.target.value
                  }))
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
                  <span className="text-slate-500">{item.descricao}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
