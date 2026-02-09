import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function listAnalises({ limit = 20 } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("analises")
    .select("id,titulo,operacao,status,resumo")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function createAnalise(payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("analises")
    .insert(payload)
    .select("id,titulo,operacao,status,resumo")
    .single();

  if (error) throw error;
  return data;
}

export async function updateAnalise(id, payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("analises")
    .update(payload)
    .eq("id", id)
    .select("id,titulo,operacao,status,resumo")
    .single();

  if (error) throw error;
  return data;
}

export async function removeAnalise(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("analises").delete().eq("id", id);
  if (error) throw error;
}
