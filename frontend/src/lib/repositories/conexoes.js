import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function listConexoes({ limit = 30 } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("conexoes")
    .select("id,origem_id,origem_tipo,destino_id,destino_tipo,descricao")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createConexao(payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("conexoes")
    .insert(payload)
    .select("id,origem_id,origem_tipo,destino_id,destino_tipo,descricao")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateConexao(id, payload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { data, error } = await supabase
    .from("conexoes")
    .update(payload)
    .eq("id", id)
    .select("id,origem_id,origem_tipo,destino_id,destino_tipo,descricao")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function removeConexao(id) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase nao configurado");
  }

  const { error } = await supabase.from("conexoes").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
