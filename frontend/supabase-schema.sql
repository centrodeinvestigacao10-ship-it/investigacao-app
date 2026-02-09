-- Schema inicial para Supabase (Postgres)

create table if not exists operacoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  status text default 'ativa',
  descricao text,
  created_at timestamp with time zone default now()
);

create table if not exists qualificados (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cpf text,
  rg text,
  telefone text,
  operacao text,
  observacoes text,
  created_at timestamp with time zone default now()
);

create table if not exists alvos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cpf text,
  telefone text,
  risco text,
  operacao text,
  created_at timestamp with time zone default now()
);

create table if not exists conexoes (
  id uuid primary key default gen_random_uuid(),
  origem_id uuid not null,
  origem_tipo text not null,
  destino_id uuid not null,
  destino_tipo text not null,
  descricao text,
  created_at timestamp with time zone default now()
);

create table if not exists erb_registros (
  id uuid primary key default gen_random_uuid(),
  operacao text,
  local text,
  datahora timestamp with time zone,
  telefone text,
  created_at timestamp with time zone default now()
);

create table if not exists extrato_registros (
  id uuid primary key default gen_random_uuid(),
  operacao text,
  telefone text,
  tipo text,
  datahora timestamp with time zone,
  numero_destino text,
  created_at timestamp with time zone default now()
);

create table if not exists analises (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  operacao text,
  status text default 'em_andamento',
  resumo text,
  created_at timestamp with time zone default now()
);

create table if not exists relatorios (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  tipo text,
  operacao text,
  status text default 'gerado',
  created_at timestamp with time zone default now()
);
