import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function listErbs({ limit = 50 } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("erb_registros")
    .select("id,operacao,local,datahora,telefone")
    .order("datahora", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createErb(payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("erb_registros")
    .insert(payload)
    .select("id,operacao,local,datahora,telefone")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateErb(id, payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("erb_registros")
    .update(payload)
    .eq("id", id)
    .select("id,operacao,local,datahora,telefone")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function removeErb(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("erb_registros").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function insertErbs(payloads) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("erb_registros").insert(payloads);

  if (error) {
    throw error;
  }
}
