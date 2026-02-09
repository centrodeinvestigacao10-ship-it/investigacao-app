# 🚀 Instruções de Deploy - Investigação App

## ✅ O que já foi feito

### 1. GitHub
- ✅ Repositório criado: https://github.com/centrodeinvestigacao10-ship-it/investigacao-app
- ✅ Código enviado para o repositório
- ✅ Branch principal: `main`

### 2. Supabase
- ✅ Tabelas criadas com sucesso:
  - `operacoes`
  - `qualificados`
  - `alvos`
  - `conexoes`
  - `erb_registros`
  - `extrato_registros`
  - `analises`
  - `relatorios`
- ✅ RLS (Row Level Security) habilitado em todas as tabelas
- ✅ Políticas permissivas configuradas

### 3. Vercel
- ✅ Projeto criado: `investigacao-app`
- ⚠️ **PENDENTE**: Vincular ao GitHub e configurar variáveis de ambiente

---

## 📋 Próximos Passos (VOCÊ PRECISA FAZER)

### Passo 1: Configurar Vercel

1. Acesse o projeto no Vercel:
   ```
   https://vercel.com/centrodeinvestigacao10-ship-it/investigacao-app
   ```

2. Vá em **Settings** → **Git**
   - Clique em **Connect Git Repository**
   - Selecione o repositório: `centrodeinvestigacao10-ship-it/investigacao-app`
   - Branch de produção: `main`
   - Root Directory: `frontend`

3. Vá em **Settings** → **Environment Variables**
   - Adicione as seguintes variáveis para **Production**, **Preview** e **Development**:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL
   https://ctsfcpjyqdaoefomtnzw.supabase.co
   
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0c2ZjcGp5cWRhb2Vmb210bnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjY4OTUsImV4cCI6MjA4NjI0Mjg5NX0.9Ya4xTKJkvQeW35B51qvLVeZN6VUkQWdJNWhig53ZGw
   ```

4. Vá em **Deployments** e clique em **Redeploy** (ou faça um push no GitHub)

---

## 🌐 URLs do Projeto

- **GitHub**: https://github.com/centrodeinvestigacao10-ship-it/investigacao-app
- **Supabase Dashboard**: https://supabase.com/dashboard/project/ctsfcpjyqdaoefomtnzw
- **Vercel Dashboard**: https://vercel.com/centrodeinvestigacao10-ship-it/investigacao-app
- **App em Produção** (após deploy): https://investigacao-app.vercel.app

---

## 🔧 Desenvolvimento Local

### Rodar o app localmente:

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:3000

### Variáveis de ambiente locais:

O arquivo `frontend/.env.local` já está configurado com:
```
NEXT_PUBLIC_SUPABASE_URL=https://ctsfcpjyqdaoefomtnzw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0c2ZjcGp5cWRhb2Vmb210bnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjY4OTUsImV4cCI6MjA4NjI0Mjg5NX0.9Ya4xTKJkvQeW35B51qvLVeZN6VUkQWdJNWhig53ZGw
```

---

## 📦 Funcionalidades Implementadas

- ✅ Dashboard com métricas e ações rápidas
- ✅ CRUD completo: Alvos, Conexões, ERBs, Extratos, Qualificados, Operações, Análises, Relatórios
- ✅ Grafo interativo com vis-network (zoom, drag, filtros)
- ✅ Importação CSV com mapeamento de colunas na UI
- ✅ Layout responsivo e profissional
- ✅ Integração com Supabase (fallback para mock data)
- ✅ Schema SQL com RLS preparado

---

## 🔐 Credenciais

As credenciais estão armazenadas localmente no arquivo `.env.tokens` (não commitado no Git).

Para acessar as credenciais do Supabase:
- Acesse o dashboard do Supabase
- Vá em Settings → API
- Copie as chaves necessárias

---

## 🎯 Próximos Refinamentos Sugeridos

1. Grafo com filtros avançados (por operação, tipo, risco)
2. Vínculos no grafo clicáveis (abrir detalhes ao clicar)
3. Importação CSV com preview e validação de campos
4. Cadastro com máscara de CPF/telefone
5. Autenticação + RLS no Supabase
