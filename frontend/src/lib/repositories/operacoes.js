import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function listOperacoes({ limit = 20 } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("operacoes")
    .select("id,nome,status,descricao")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function createOperacao(payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("operacoes")
    .insert(payload)
    .select("id,nome,status,descricao")
    .single();

  if (error) throw error;
  return data;
}

export async function updateOperacao(id, payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("operacoes")
    .update(payload)
    .eq("id", id)
    .select("id,nome,status,descricao")
    .single();

  if (error) throw error;
  return data;
}

export async function removeOperacao(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("operacoes").delete().eq("id", id);
  if (error) throw error;
}
