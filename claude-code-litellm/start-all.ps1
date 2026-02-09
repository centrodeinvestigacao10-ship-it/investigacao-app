$ErrorActionPreference = "Stop"

Write-Host "Subindo LiteLLM + Postgres..."
docker compose up -d --build

Write-Host "Aguardando LiteLLM ficar pronto..."
$maxAttempts = 30
$delaySeconds = 2
$ok = $false

for ($i = 0; $i -lt $maxAttempts; $i++) {
  try {
    $status = (Invoke-WebRequest -UseBasicParsing http://localhost:4000/health/liveliness).StatusCode
    if ($status -eq 200) {
      $ok = $true
      break
    }
  } catch {
    Start-Sleep -Seconds $delaySeconds
  }
}

if (-not $ok) {
  Write-Host "LiteLLM nao respondeu ainda. Verifique o Docker Desktop e tente novamente."
  exit 1
}

Write-Host "LiteLLM OK. Abrindo Claude Code..."
& ".\run-claude.ps1"
