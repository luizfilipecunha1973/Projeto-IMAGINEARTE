@echo off
setlocal EnableExtensions

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo [ERRO] Node.js nao foi encontrado no PATH.
    echo Instale o Node.js e tente novamente.
    pause
    exit /b 1
)

for /f "tokens=5" %%p in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do set "PORTA_ATIVA=1"

if defined PORTA_ATIVA (
    echo Servidor ja detectado na porta 3000.
    echo Abrindo navegador em http://localhost:3000 ...
    start "" "http://localhost:3000"
    exit /b 0
)

echo Iniciando servidor Imaginearte...
start "Imaginearte Server" cmd /k "cd /d ""%~dp0"" && node server.js"

REM Aguarda alguns segundos para o servidor subir.
timeout /t 3 /nobreak >nul

echo Abrindo navegador em http://localhost:3000 ...
start "" "http://localhost:3000"

echo Pronto. Se quiser encerrar o sistema, feche a janela "Imaginearte Server".
exit /b 0
