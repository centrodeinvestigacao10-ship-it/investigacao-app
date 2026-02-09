[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "sk-1234", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "http://localhost:4000", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_MODEL", "openrouter/qwen/qwen3-coder", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_SMALL_FAST_MODEL", "openrouter/qwen/qwen3-coder", "User")
[Environment]::SetEnvironmentVariable("CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC", "1", "User")

Write-Host "Variaveis salvas no usuario. Reabra o terminal para aplicar."
