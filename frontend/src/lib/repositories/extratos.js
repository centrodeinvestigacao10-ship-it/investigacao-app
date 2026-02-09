import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function listExtratos({ limit = 50 } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("extrato_registros")
    .select("id,operacao,telefone,tipo,datahora,numero_destino")
    .order("datahora", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createExtrato(payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("extrato_registros")
    .insert(payload)
    .select("id,operacao,telefone,tipo,datahora,numero_destino")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateExtrato(id, payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("extrato_registros")
    .update(payload)
    .eq("id", id)
    .select("id,operacao,telefone,tipo,datahora,numero_destino")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function removeExtrato(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase
    .from("extrato_registros")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function insertExtratos(payloads) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("extrato_registros").insert(payloads);

  if (error) {
    throw error;
  }
}
