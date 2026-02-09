"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EntityList } from "@/components/EntityList";
import { DetailPanel } from "@/components/DetailPanel";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { relatoriosMock } from "@/lib/mockData";
import {
  createRelatorio,
  listRelatorios,
  removeRelatorio,
  updateRelatorio
} from "@/lib/repositories/relatorios";

export default function RelatoriosPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    tipo: "",
    operacao: "",
    status: ""
  });

  const dataSource = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.titulo,
        meta: `${item.tipo ?? "tipo"} • ${
          item.operacao ?? "sem operação"
        }`
      })),
    [items]
  );

  function resetForm() {
    setEditingId(null);
    setForm({ titulo: "", tipo: "", operacao: "", status: "" });
  }

  async function load() {
    setStatus("loading");
    if (!isSupabaseConfigured) {
      setItems(relatoriosMock);
      setStatus("mock");
      return;
    }

    try {
      const data = await listRelatorios();
      setItems(data);
      setStatus("ready");
    } catch (error) {
      setItems(relatoriosMock);
      setStatus("error");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    if (editingId) {
      await updateRelatorio(editingId, form);
    } else {
      await createRelatorio(form);
    }
    resetForm();
    await load();
  }

  async function handleDelete(id) {
    if (!isSupabaseConfigured) return;
    await removeRelatorio(id);
    if (editingId === id) resetForm();
    await load();
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      titulo: item.titulo ?? "",
      tipo: item.tipo ?? "",
      operacao: item.operacao ?? "",
      status: item.status ?? ""
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios"
        description="Gere relatórios consolidados com poucos cliques."
        actions={[
          <button
            key="gerar"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Gerar relatório
          </button>
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <EntityList
          title="Relatórios"
          actions={["Título", "Tipo", "Operação"]}
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
              { label: "Registros", value: `${items.length} relatórios` }
            ]}
          />
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">
              {editingId ? "Editar relatório" : "Novo relatório"}
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
                placeholder="Tipo"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.tipo}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, tipo: event.target.value }))
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

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700">
          Relatórios integrados
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Selecione módulos e gere um PDF único com ERBs, extratos e vínculos.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1">ERBs</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Extratos</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Vínculos</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Qualificados</span>
        </div>
      </section>
    </div>
  );
}
