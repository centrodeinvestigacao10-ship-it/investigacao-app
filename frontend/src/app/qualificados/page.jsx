"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SectionCard } from "@/components/SectionCard";
import { EntityList } from "@/components/EntityList";
import { DetailPanel } from "@/components/DetailPanel";
import { PageHeader } from "@/components/PageHeader";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { listQualificados } from "@/lib/repositories/qualificados";
import {
  createQualificado,
  removeQualificado,
  updateQualificado
} from "@/lib/repositories/qualificados";

export default function QualificadosPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    rg: "",
    telefone: "",
    operacao: ""
  });

  const dataSource = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.nome,
        meta: `${item.cpf ?? "CPF não informado"} • ${item.operacao ?? "Sem operação"}`
      })),
    [items]
  );

  function resetForm() {
    setEditingId(null);
    setForm({
      nome: "",
      cpf: "",
      rg: "",
      telefone: "",
      operacao: ""
    });
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      setStatus("loading");

      if (!isSupabaseConfigured) {
        if (mounted) {
          setItems([]);
          setStatus("not_configured");
        }
        return;
      }

      try {
        const data = await listQualificados();
        if (mounted) {
          setItems(data);
          setStatus("ready");
        }
      } catch (error) {
        console.error("Erro ao carregar qualificados:", error);
        if (mounted) {
          setItems([]);
          setStatus("error");
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    if (editingId) {
      await updateQualificado(editingId, form);
    } else {
      await createQualificado(form);
    }

    resetForm();
    const data = await listQualificados();
    setItems(data);
  }

  async function handleDelete(id) {
    if (!isSupabaseConfigured) return;
    await removeQualificado(id);
    if (editingId === id) {
      resetForm();
    }
    const data = await listQualificados();
    setItems(data);
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      nome: item.nome ?? "",
      cpf: item.cpf ?? "",
      rg: item.rg ?? "",
      telefone: item.telefone ?? "",
      operacao: item.operacao ?? ""
    });
  }

  return (
    <div className="space-y-6">
      {!isSupabaseConfigured && (
        <div className="rounded-lg bg-red-50 border-2 border-red-200 p-4">
          <p className="text-sm font-semibold text-red-800">
            ⚠️ ATENÇÃO: Sistema em modo offline
          </p>
          <p className="text-xs text-red-600 mt-1">
            As variáveis de ambiente do Supabase não estão configuradas. 
            Operações de criar/editar/excluir estão desabilitadas.
          </p>
        </div>
      )}
      
      <PageHeader
        title="Qualificados"
        description="Cadastre, edite, remova e vincule qualificados."
        actions={[
          <Link
            key="novo"
            href="/qualificados/novo"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Novo qualificado
          </Link>
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <EntityList
          title="Lista geral"
          actions={["Nome", "CPF", "Operação", "Status"]}
          items={dataSource}
        />

        <div className="space-y-4">
          <DetailPanel
            title="Resumo rápido"
            sections={[
              {
                label: "Fonte",
                value:
                  status === "ready"
                    ? "✅ Supabase conectado"
                    : status === "not_configured"
                    ? "❌ Supabase não configurado"
                    : status === "error"
                    ? "⚠️ Erro ao conectar"
                    : "Carregando..."
              },
              { label: "Vínculos", value: "3 alvos conectados." },
              { label: "Alertas", value: "1 pendência de revisão." }
            ]}
          />
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">
              {editingId ? "Editar qualificado" : "Novo qualificado"}
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
                placeholder="RG"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.rg}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, rg: event.target.value }))
                }
              />
              <input
                placeholder="Telefone"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.telefone}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    telefone: event.target.value
                  }))
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
          <SectionCard
            title="Vincular a alvos"
            description="Conecte qualificados a alvos e eventos."
            href="/qualificados"
          />
          <SectionCard
            title="Anexar documentos"
            description="Inclua RG, CNH e outros documentos."
            href="/qualificados"
          />
        </div>
      </section>
    </div>
  );
}
