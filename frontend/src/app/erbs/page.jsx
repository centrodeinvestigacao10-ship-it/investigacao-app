"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EntityList } from "@/components/EntityList";
import { DetailPanel } from "@/components/DetailPanel";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { erbsMock } from "@/lib/mockData";
import { parseCsvWithHeaders } from "@/lib/csv";
import { CsvMapper } from "@/components/CsvMapper";
import {
  createErb,
  insertErbs,
  listErbs,
  removeErb,
  updateErb
} from "@/lib/repositories/erbs";

export default function ErbsPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    operacao: "",
    local: "",
    datahora: "",
    telefone: ""
  });
  const [csvRows, setCsvRows] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvMapping, setCsvMapping] = useState({});
  const [importStatus, setImportStatus] = useState("idle");

  const dataSource = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: `${item.local ?? "Local não informado"}`,
        meta: `${item.datahora ?? "Data?"} • ${item.telefone ?? "Telefone?"}`
      })),
    [items]
  );

  function resetForm() {
    setEditingId(null);
    setForm({
      operacao: "",
      local: "",
      datahora: "",
      telefone: ""
    });
  }

  async function load() {
    setStatus("loading");
    if (!isSupabaseConfigured) {
      setItems(erbsMock);
      setStatus("mock");
      return;
    }

    try {
      const data = await listErbs();
      setItems(data);
      setStatus("ready");
    } catch (error) {
      setItems(erbsMock);
      setStatus("error");
    }
  }

  const mappingFields = [
    { key: "operacao", label: "Operação" },
    { key: "local", label: "Local" },
    { key: "datahora", label: "Datahora" },
    { key: "telefone", label: "Telefone" }
  ];

  function mapRowWithMapping(row) {
    const result = {};
    mappingFields.forEach((field) => {
      const header = csvMapping[field.key];
      if (header) {
        result[field.key] = row[header] ?? "";
        return;
      }
      result[field.key] = row[field.key] ?? "";
    });
    return result;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    if (editingId) {
      await updateErb(editingId, form);
    } else {
      await createErb(form);
    }

    resetForm();
    await load();
  }

  async function handleDelete(id) {
    if (!isSupabaseConfigured) return;
    await removeErb(id);
    if (editingId === id) {
      resetForm();
    }
    await load();
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      operacao: item.operacao ?? "",
      local: item.local ?? "",
      datahora: item.datahora ?? "",
      telefone: item.telefone ?? ""
    });
  }

  async function handleImport() {
    if (!isSupabaseConfigured || csvRows.length === 0) return;
    setImportStatus("importing");
    const payloads = csvRows.map(mapRowWithMapping);
    await insertErbs(payloads);
    setCsvRows([]);
    setCsvHeaders([]);
    setCsvMapping({});
    setImportStatus("done");
    await load();
  }

  function handleCsvFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const { headers, rows } = parseCsvWithHeaders(text);
      setCsvHeaders(headers);
      setCsvRows(rows);
      const initialMapping = mappingFields.reduce((acc, field) => {
        const match = headers.find((header) => header === field.key);
        acc[field.key] = match || "";
        return acc;
      }, {});
      setCsvMapping(initialMapping);
      setImportStatus("ready");
    };
    reader.readAsText(file);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="ERBs"
        description="Importação e análise por data, local e telefone."
        actions={[
          <button
            key="importar"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
          >
            Importar ERB
          </button>,
          <button
            key="filtros"
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
          >
            Filtros rápidos
          </button>
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <EntityList
          title="Registros"
          actions={["Local", "Data", "Telefone", "Operação"]}
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
              { label: "Registros", value: `${items.length} ERBs` }
            ]}
          />
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700">
              {editingId ? "Editar ERB" : "Novo ERB"}
            </h3>
            <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
              <input
                placeholder="Operação"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.operacao}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, operacao: event.target.value }))
                }
              />
              <input
                placeholder="Local"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.local}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, local: event.target.value }))
                }
              />
              <input
                placeholder="Data/hora (ISO)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.datahora}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, datahora: event.target.value }))
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
              Importar CSV
            </h3>
            <input
              type="file"
              accept=".csv"
              className="mt-3 block w-full text-xs text-slate-600"
              onChange={handleCsvFile}
              disabled={!isSupabaseConfigured}
            />
            <CsvMapper
              headers={csvHeaders}
              fields={mappingFields}
              mapping={csvMapping}
              onChangeMapping={(key, value) =>
                setCsvMapping((prev) => ({ ...prev, [key]: value }))
              }
              rowCount={csvRows.length}
              status={importStatus}
              onImport={handleImport}
              disabled={!isSupabaseConfigured}
            />
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
                  <span className="text-slate-500">{item.local}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
