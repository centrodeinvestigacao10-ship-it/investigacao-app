import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function listQualificados({ limit = 20 } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("qualificados")
    .select("id,nome,cpf,operacao")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createQualificado(payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("qualificados")
    .insert(payload)
    .select("id,nome,cpf,operacao")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateQualificado(id, payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("qualificados")
    .update(payload)
    .eq("id", id)
    .select("id,nome,cpf,operacao")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function removeQualificado(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("qualificados").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
