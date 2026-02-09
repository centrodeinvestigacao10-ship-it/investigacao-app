import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function listRelatorios({ limit = 20 } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("relatorios")
    .select("id,titulo,tipo,operacao,status")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function createRelatorio(payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("relatorios")
    .insert(payload)
    .select("id,titulo,tipo,operacao,status")
    .single();

  if (error) throw error;
  return data;
}

export async function updateRelatorio(id, payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("relatorios")
    .update(payload)
    .eq("id", id)
    .select("id,titulo,tipo,operacao,status")
    .single();

  if (error) throw error;
  return data;
}

export async function removeRelatorio(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("relatorios").delete().eq("id", id);
  if (error) throw error;
}
