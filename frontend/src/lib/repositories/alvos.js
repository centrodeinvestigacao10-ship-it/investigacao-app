import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function listAlvos({ limit = 20 } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("alvos")
    .select("id,nome,cpf,telefone,risco,operacao")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createAlvo(payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("alvos")
    .insert(payload)
    .select("id,nome,cpf,telefone,risco,operacao")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateAlvo(id, payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("alvos")
    .update(payload)
    .eq("id", id)
    .select("id,nome,cpf,telefone,risco,operacao")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function removeAlvo(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("alvos").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
