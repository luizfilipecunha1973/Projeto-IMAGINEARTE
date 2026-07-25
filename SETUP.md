# IMAGINEARTE CNC - Setup

Este guia cobre configuracao local (Windows/Linux/macOS) e deploy em provedor (Hostinger).

## Visao geral

- Frontend estatico: HTML, CSS, JavaScript
- Backend Node.js: API de depoimentos
- Persistencia atual: arquivo JSON local (depoimentos.json)

## Requisitos

- Node.js 18+
- npm

## Estrutura esperada

```text
projeto imaginearte/
|- index.html
|- script.js
|- styles.css
|- server.js
|- package.json
|- .env.example
|- depoimentos.json
|- README.md
|- SETUP.md
|- iniciar-imaginearte.bat
|- parar-imaginearte.bat
|- imagens/
`- videos/
```

## Configuracao local

1. Instalar dependencias

```bash
npm install
```

2. Copiar ambiente local

- Copie .env.example para .env
- Ajuste apenas o que precisar

Exemplo minimo para local:

```env
HOST=0.0.0.0
PORT=3000
DATA_PATH=./depoimentos.json
```

3. Subir projeto

```bash
npm start
```

4. Abrir no navegador

- http://localhost:3000

## Atalhos no Windows

- Iniciar servidor e abrir navegador: iniciar-imaginearte.bat
- Encerrar processo na porta 3000: parar-imaginearte.bat

## Variaveis de ambiente

- HOST: host de bind do servidor (recomendado 0.0.0.0)
- PORT: porta do servidor (local: 3000; producao: porta do provedor)
- DATA_PATH: caminho do arquivo JSON de depoimentos
- CORS_ORIGINS: origens permitidas (separadas por virgula)
- ADMIN_TOKEN: token para proteger DELETE de depoimentos
- ADMIN_USERNAME: usuario admin para login via API
- ADMIN_PASSWORD: senha admin para login via API

## API principal

- GET /api/health
- GET /api/estados
- GET /api/depoimentos
- POST /api/depoimentos
- DELETE /api/depoimentos/:id
- POST /api/admin/login

## Fluxo de autenticacao admin

- Se ADMIN_TOKEN estiver configurado, DELETE exige autorizacao.
- O frontend pode:
  - Fazer login com usuario/senha em POST /api/admin/login
  - Ou enviar token manual no header X-Admin-Token

## Deploy na Hostinger (imagineartecnc.com.br)

1. Publicar os arquivos do projeto no app Node.js da Hostinger.
2. Definir start command:

```bash
node server.js
```

3. Configurar variaveis no painel da Hostinger:

```env
HOST=0.0.0.0
PORT=<porta-da-hostinger>
DATA_PATH=/home/<usuario>/data/depoimentos.json
CORS_ORIGINS=https://imagineartecnc.com.br,https://www.imagineartecnc.com.br
ADMIN_TOKEN=<token-forte>
ADMIN_USERNAME=<usuario-admin>
ADMIN_PASSWORD=<senha-forte>
```

4. Reiniciar o app no painel.
5. Apontar o dominio para a aplicacao.

## Frontend no mesmo dominio vs subdominio de API

- Mesmo dominio (site e API juntos):
  - Deixe api-base vazio em index.html
- API em subdominio separado (ex: api.imagineartecnc.com.br):
  - Preencha a meta api-base em index.html com a URL da API

## Checklist de validacao apos deploy

1. Health check

- https://imagineartecnc.com.br/api/health
- Esperado: ok = true

2. Formulario de depoimento

- Criar novo depoimento
- Confirmar listagem atualizada

3. Exclusao com admin

- Testar exclusao de depoimento
- Confirmar login admin ou token

4. Persistencia

- Reiniciar app no painel da Hostinger
- Confirmar se os depoimentos continuam no sistema

## Problemas comuns

### Depoimentos nao carregam

- Verifique se o backend esta online
- Verifique CORS_ORIGINS
- Verifique se abriu via http(s) e nao file://

### Porta ocupada localmente

- Altere PORT no .env
- Ou encerre o processo da porta

### Dados somem apos reinicio

- DATA_PATH pode estar em diretorio nao persistente
- Use caminho persistente no provedor

## Observacao de escalabilidade

Persistir em JSON e bom para ambiente simples. Para alto volume, use banco gerenciado (PostgreSQL, Supabase, etc.).
