$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

function Find-Python {
    $candidates = @(
        (Join-Path $root ".venv\Scripts\python.exe"),
        (Join-Path $root "venv\Scripts\python.exe")
    )
    foreach ($c in $candidates) {
        if (Test-Path $c) { return $c }
    }
    $cmd = Get-Command python -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    $codex = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
    if (Test-Path $codex) { return $codex }
    throw "Python não encontrado. Instale o Python 3.11+ (winget install Python.Python.3.12) e rode de novo."
}

$python = Find-Python
Write-Host ""
Write-Host "  Bencao Diaria - iniciando servidor" -ForegroundColor Green
Write-Host "  Python: $python"
Write-Host "  Painel: http://localhost:8000/admin"
Write-Host "  Landing: http://localhost:8000/"
Write-Host ""

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "  Arquivo .env criado a partir do exemplo. Edite as chaves quando for para produção." -ForegroundColor Yellow
}

& $python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
