# 🚨 Sistema de Investigação Policial

Sistema completo para controle de investigações policiais com análise de vínculos, ERBs, extratos telefônicos e gestão de alvos.

## 🎯 Funcionalidades

- **Dashboard Completo**: Métricas, ações rápidas e visão geral das operações
- **Gestão de Alvos**: CRUD completo com informações cadastrais e nível de risco
- **Análise de Vínculos**: Grafo interativo com zoom, drag e filtros
- **ERBs e Extratos**: Importação CSV com mapeamento inteligente de colunas
- **Qualificados**: Cadastro de pessoas qualificadas nas investigações
- **Operações e Análises**: Gestão completa do ciclo de investigação
- **Relatórios**: Geração e acompanhamento de relatórios

## 🛠️ Tecnologias

- **Frontend**: Next.js 14 + React + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Grafos**: vis-network
- **Deploy**: Vercel
- **Versionamento**: GitHub

## 🚀 Quick Start

### Desenvolvimento Local

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:3000

### Variáveis de Ambiente

Crie o arquivo `frontend/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ctsfcpjyqdaoefomtnzw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

## 📦 Estrutura do Projeto

```
investigacao-app/
├── frontend/
│   ├── src/
│   │   ├── app/              # Páginas Next.js (App Router)
│   │   ├── components/       # Componentes reutilizáveis
│   │   └── lib/              # Utilitários e repositórios
│   ├── public/               # Arquivos estáticos
│   └── package.json
├── claude-code-litellm/      # Configuração Claude Code + LiteLLM
└── DEPLOY-INSTRUCTIONS.md    # Instruções detalhadas de deploy
```

## 🌐 URLs

- **App em Produção**: https://investigacao-app.vercel.app
- **Repositório**: https://github.com/centrodeinvestigacao10-ship-it/investigacao-app
- **Supabase Dashboard**: https://supabase.com/dashboard/project/ctsfcpjyqdaoefomtnzw

## 📖 Documentação

- [Instruções de Deploy](./DEPLOY-INSTRUCTIONS.md)
- [Schema do Banco de Dados](./frontend/supabase-schema.sql)

## 🔐 Segurança

- RLS (Row Level Security) habilitado em todas as tabelas
- Autenticação via Supabase Auth
- Variáveis de ambiente para credenciais sensíveis
- Tokens e chaves nunca commitados no Git

## 🎨 Componentes Principais

- `AppShell`: Layout principal com sidebar e topbar
- `GraphView`: Visualização interativa de vínculos
- `CsvMapper`: Importação CSV com mapeamento de colunas
- `EntityList`: Lista genérica de entidades com ações
- `DetailPanel`: Painel de detalhes lateral
- `PageHeader`: Cabeçalho padrão de páginas

## 📊 Banco de Dados

### Tabelas Principais

- `operacoes`: Operações policiais
- `alvos`: Alvos das investigações
- `qualificados`: Pessoas qualificadas
- `conexoes`: Vínculos entre entidades
- `erb_registros`: Registros de ERB
- `extrato_registros`: Extratos telefônicos
- `analises`: Análises realizadas
- `relatorios`: Relatórios gerados

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Uso restrito para fins policiais e investigativos.

---

**Desenvolvido para o Centro de Investigação**
