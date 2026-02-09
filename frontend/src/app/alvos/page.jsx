"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EntityList } from "@/components/EntityList";
import { DetailPanel } from "@/components/DetailPanel";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { alvosMock } from "@/lib/mockData";
import {
  createAlvo,
  listAlvos,
  removeAlvo,
  updateAlvo
} from "@/lib/repositories/alvos";

export default function AlvosPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    risco: "",
    operacao: ""
  });

  const dataSource = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.nome,
        meta: `${item.cpf ?? "CPF não informado"} • ${
          item.operacao ?? "Sem operação"
        }`
      })),
    [items]
  );

  function resetForm() {
    setEditingId(null);
    setForm({
      nome: "",
      cpf: "",
      telefone: "",
      risco: "",
      operacao: ""
    });
  }

  async function load() {
    setStatus("loading");
    if (!isSupabaseConfigured) {
      setItems(alvosMock);
      setStatus("mock");
      return;
    }

    try {
      const data = await listAlvos();
      setItems(data);
      setStatus("ready");
    } catch (error) {
      setItems(alvosMock);
      setStatus("error");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    if (editingId) {
      await updateAlvo(editingId, form);
    } else {
      await createAlvo(form);
    }

    resetForm();
    await load();
  }

  async function handleDelete(id) {
    if (!isSupabaseConfigured) return;
    await removeAlvo(id);
    if (editingId === id) {
      resetForm();
    }
    await load();
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      nome: item.nome ?? "",
      cpf: item.cpf ?? "",
      telefone: item.telefone ?? "",
      risco: item.risco ?? "",
      operacao: item.operacao ?? ""
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alvos e Conexões"
        description="Gerencie alvos, vínculos e eventos em um só fluxo."
        actions={[
          <button
            key="novo"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Novo alvo
          </button>,
          <button
            key="importar"
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
          >
            Importar
          </button>
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <EntityList
          title="Lista de alvos"
          actions={["Nome", "CPF", "Operação", "Risco"]}
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
              { label: "Registros", value: `${items.length} alvos` }
            ]}
          />
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">
              {editingId ? "Editar alvo" : "Novo alvo"}
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
                placeholder="CPF"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.cpf}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, cpf: event.target.value }))
                }
              />
              <input
                placeholder="Telefone"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.telefone}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, telefone: event.target.value }))
                }
              />
              <input
                placeholder="Risco"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.risco}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, risco: event.target.value }))
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
            <h3 className="text-sm font-semibold text-slate-700">
              Ações rápidas
            </h3>
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
        </div>
      </section>
    </div>
  );
}
