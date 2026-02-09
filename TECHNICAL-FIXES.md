# 🔧 CORREÇÕES TÉCNICAS NECESSÁRIAS

## 1. REMOVER DADOS MOCKADOS DE PRODUÇÃO

### Problema
Dados de teste estão mesclados com código de produção.

### Solução
Mover todos os mocks para pasta `__mocks__` ou `__tests__` e remover imports em páginas de produção.

**Arquivos a modificar:**
- `frontend/src/lib/mockData.js` → Deletar ou mover para `__tests__`
- `frontend/src/lib/qualificadosMock.js` → Deletar ou mover para `__tests__`

**Código a remover:**
```javascript
// ❌ REMOVER de todas as páginas
import { alvosMock } from "@/lib/mockData";
import { qualificadosMock } from "@/lib/qualificadosMock";
```

---

## 2. MELHORAR FEEDBACK DE ERRO

### Problema
Sistema falha silenciosamente quando Supabase não está configurado.

### Solução
Adicionar alerta visual claro no topo da página.

**Código a adicionar em cada página:**
```javascript
{!isSupabaseConfigured && (
  <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-4">
    <p className="text-sm font-semibold text-red-800">
      ⚠️ ATENÇÃO: Sistema em modo offline
    </p>
    <p className="text-xs text-red-600 mt-1">
      As variáveis de ambiente do Supabase não estão configuradas. 
      Operações de criar/editar/excluir estão desabilitadas.
    </p>
  </div>
)}
```

---

## 3. DASHBOARD COM MÉTRICAS DINÂMICAS

### Problema
Métricas hardcoded (12, 27, 5) nunca mudam.

### Solução
Buscar métricas reais do Supabase.

**Arquivo:** `frontend/src/app/page.jsx`

**Código atual (ERRADO):**
```javascript
<p className="text-lg font-semibold">12</p>  // ❌ HARDCODED
<p className="text-lg font-semibold">27</p>  // ❌ HARDCODED
<p className="text-lg font-semibold">5</p>   // ❌ HARDCODED
```

**Código correto:**
```javascript
"use client";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export default function HomePage() {
  const [metrics, setMetrics] = useState({
    operacoes: 0,
    alvos: 0,
    analises: 0
  });

  useEffect(() => {
    async function loadMetrics() {
      if (!isSupabaseConfigured) return;

      const [opCount, alvosCount, analisesCount] = await Promise.all([
        supabase.from("operacoes").select("*", { count: "exact", head: true }),
        supabase.from("alvos").select("*", { count: "exact", head: true }),
        supabase.from("analises").select("*", { count: "exact", head: true })
      ]);

      setMetrics({
        operacoes: opCount.count ?? 0,
        alvos: alvosCount.count ?? 0,
        analises: analisesCount.count ?? 0
      });
    }

    loadMetrics();
  }, []);

  return (
    // ... resto do código
    <p className="text-lg font-semibold">{metrics.operacoes}</p>
    <p className="text-lg font-semibold">{metrics.alvos}</p>
    <p className="text-lg font-semibold">{metrics.analises}</p>
  );
}
```

---

## 4. TRATAMENTO DE ERROS ROBUSTO

### Problema
Erros de rede/Supabase não são tratados adequadamente.

### Solução
Adicionar try/catch com feedback visual.

**Padrão a seguir:**
```javascript
async function handleSubmit(event) {
  event.preventDefault();
  if (!isSupabaseConfigured) {
    alert("Sistema offline. Configure o Supabase.");
    return;
  }

  setStatus("saving");
  
  try {
    if (editingId) {
      await updateQualificado(editingId, form);
    } else {
      await createQualificado(form);
    }
    
    resetForm();
    await load();
    setStatus("success");
    
    // Feedback visual
    showToast("Salvo com sucesso!", "success");
  } catch (error) {
    console.error("Erro ao salvar:", error);
    setStatus("error");
    showToast(`Erro: ${error.message}`, "error");
  }
}
```

---

## 5. VALIDAÇÃO DE DADOS NO FRONTEND

### Problema
Formulários aceitam qualquer input sem validação.

### Solução
Adicionar validação básica.

**Exemplo:**
```javascript
function validateForm(form) {
  const errors = [];
  
  if (!form.nome || form.nome.trim().length < 3) {
    errors.push("Nome deve ter pelo menos 3 caracteres");
  }
  
  if (form.cpf && !validateCPF(form.cpf)) {
    errors.push("CPF inválido");
  }
  
  if (form.telefone && !validatePhone(form.telefone)) {
    errors.push("Telefone inválido");
  }
  
  return errors;
}

async function handleSubmit(event) {
  event.preventDefault();
  
  const errors = validateForm(form);
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }
  
  // ... resto do código
}
```

---

## 6. LOADING STATES

### Problema
Usuário não sabe se operação está em andamento.

### Solução
Adicionar indicadores de carregamento.

```javascript
<button
  type="submit"
  disabled={!isSupabaseConfigured || status === "saving"}
  className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
>
  {status === "saving" ? "Salvando..." : editingId ? "Salvar" : "Criar"}
</button>
```

---

## 7. REMOVER FALLBACK PARA MOCK EM PRODUÇÃO

### Problema
Sistema cai silenciosamente para mock quando há erro.

### Solução
Em produção, mostrar erro em vez de usar mock.

```javascript
useEffect(() => {
  async function load() {
    setStatus("loading");

    if (!isSupabaseConfigured) {
      setStatus("not_configured");
      setItems([]);  // ❌ NÃO usar mock
      return;
    }

    try {
      const data = await listQualificados();
      setItems(data);
      setStatus("ready");
    } catch (error) {
      console.error("Erro ao carregar:", error);
      setStatus("error");
      setItems([]);  // ❌ NÃO usar mock
      // Mostrar mensagem de erro ao usuário
    }
  }

  load();
}, []);
```

---

## PRIORIDADE DE IMPLEMENTAÇÃO

1. 🔴 **URGENTE**: Configurar variáveis de ambiente no Vercel
2. 🟠 **ALTA**: Remover dados mockados de produção
3. 🟠 **ALTA**: Melhorar feedback de erro
4. 🟡 **MÉDIA**: Dashboard com métricas dinâmicas
5. 🟡 **MÉDIA**: Tratamento de erros robusto
6. 🟢 **BAIXA**: Validação de dados
7. 🟢 **BAIXA**: Loading states
