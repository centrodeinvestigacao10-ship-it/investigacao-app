$env:ANTHROPIC_AUTH_TOKEN = "sk-1234"
$env:ANTHROPIC_BASE_URL = "http://localhost:4000"
$env:ANTHROPIC_MODEL = "openrouter/qwen/qwen3-coder"
$env:ANTHROPIC_SMALL_FAST_MODEL = "openrouter/qwen/qwen3-coder"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"

$exe = [IO.Path]::Combine([Environment]::GetFolderPath("UserProfile"), ".local\bin\claude.exe")
& $exe
