@echo off
setlocal EnableExtensions EnableDelayedExpansion

cd /d "%~dp0"

set "ENCONTROU="
for /f "tokens=5" %%p in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    set "ENCONTROU=1"
    echo Encerrando processo PID %%p na porta 3000...
    taskkill /PID %%p /F >nul 2>nul
)

if not defined ENCONTROU (
    echo Nenhum processo escutando na porta 3000 foi encontrado.
    exit /b 0
)

echo Servidor encerrado.
exit /b 0
