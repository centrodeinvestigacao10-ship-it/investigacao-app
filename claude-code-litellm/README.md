# Claude Code via LiteLLM + Qwen3-Coder

Este pacote configura o LiteLLM para expor um endpoint local que substitui os
modelos `anthropic/*` por `openrouter/qwen/qwen3-coder`.

## Requisitos
- Docker Desktop instalado e rodando
- Conta no OpenRouter e API Key
- Claude Code instalado (CLI `claude`)

## Passo a passo (Windows/PowerShell)
1. Entre na pasta:
   `cd "C:\Users\PC\OneDrive\Área de Trabalho\Pc\claude-code-litellm"`

2. Crie o arquivo `.env` a partir do exemplo:
   `copy .env.example .env`
   Edite o `.env` e cole sua `OPENROUTER_API_KEY`.

3. Suba o LiteLLM + Postgres:
   `docker compose up -d --build`

4. Exporte as variaveis no terminal antes de abrir o Claude Code:
   `powershell -ExecutionPolicy Bypass -File .\set-env.ps1`

5. Abra o Claude Code no mesmo terminal:
   `claude`

## Como confirmar
Dentro do Claude Code, use `/model` para confirmar o modelo ativo.

## Parar tudo
`docker compose down`
