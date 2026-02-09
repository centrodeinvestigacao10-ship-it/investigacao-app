$ErrorActionPreference = "Stop"

$profilePath = $PROFILE.CurrentUserAllHosts
$profileDir = Split-Path $profilePath

if (-not (Test-Path $profileDir)) {
  New-Item -ItemType Directory -Path $profileDir | Out-Null
}

if (-not (Test-Path $profilePath)) {
  New-Item -ItemType File -Path $profilePath | Out-Null
}

$marker = "Start-ClaudeLiteLLM"
$content = Get-Content -Path $profilePath -ErrorAction SilentlyContinue

if ($content -notcontains "function $marker {") {
  Add-Content -Path $profilePath -Value ""
  Add-Content -Path $profilePath -Value "function $marker {"
  Add-Content -Path $profilePath -Value "  & 'C:\Users\PC\OneDrive\Área de Trabalho\Pc\claude-code-litellm\start-all.ps1'"
  Add-Content -Path $profilePath -Value "}"
  Add-Content -Path $profilePath -Value "Set-Alias claudeq $marker"
}

Write-Host "Alias criado: claudeq"
Write-Host "Reabra o PowerShell para carregar o perfil."
