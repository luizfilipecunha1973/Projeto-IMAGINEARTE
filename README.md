# IMAGINEARTE CNC

Site institucional da IMAGINEARTE CNC para apresentacao da marca, servicos de usinagem, portfolio em video e canal de contato com clientes.

![Logo da IMAGINEARTE CNC](imagens/logosite.png)

![Preview do portfolio](imagens/folder.png)

## Sobre o projeto

Este projeto foi construido como uma landing page institucional com foco em identidade visual e navegacao interativa. O site utiliza video de fundo, menu com submenus, secoes modais e uma area de depoimentos conectada a API com persistencia em arquivo JSON.

O objetivo principal e apresentar os servicos da empresa, exibir trabalhos em video e facilitar o contato de novos clientes.

## Atualizações recentes

- Servidor mais robusto com variaveis de ambiente, CORS configuravel, health check em /api/health e protecao para exclusao de depoimentos.
- Area de depoimentos com persistencia em arquivo JSON, validacoes no backend e suporte a login admin via API.
- Melhorias de UX e responsividade com controle de audio de fundo no hero, adaptacao para faixas de mobile, fechamento de janelas por clique fora e navegacao por teclado.

## O que existe no site

### Home

- Hero com logo oficial em [imagens/logosite.png](imagens/logosite.png)
- Titulo e slogan da empresa
- Video de fundo carregado de [videos/institucionais/002-Publicidade.mp4](videos/institucionais/002-Publicidade.mp4)
- Controle de audio de fundo com botao de mudo/volume no hero

### Menu principal

- Home
- Quem Somos
- Servicos
- Portfolio
- Institucional

### Quem Somos

- Janela central com texto institucional da empresa
- Fechamento automatico ao sair da area

### Servicos

Submenu com 3 categorias:

- Usinagem Artesanato
- Usinagem Comercial
- Usinagem Residencial

Comportamentos:

- Abre por clique e por hover
- Fecha automaticamente ao sair da area
- Renderiza os videos da categoria selecionada em grade responsiva
- Clique no card abre video ampliado em modal
- Navegacao entre videos por botoes e teclas esquerda/direita

### Portfolio

- Exibicao da imagem institucional [imagens/folder.png](imagens/folder.png)
- Janela centralizada com identidade visual do site

### Institucional

Submenu com:

- Contato
- Videos
- Depoimentos

#### Contato

Modal com:

- E-mails da empresa
- Telefone
- Link para WhatsApp com mensagem pre-preenchida
- Link para Instagram
- Icones em [imagens/celular.png](imagens/celular.png), [imagens/zap.png](imagens/zap.png) e [imagens/Instagram.png](imagens/Instagram.png)

#### Videos institucionais

- Grade dedicada para videos da pasta [videos/institucionais](videos/institucionais)
- Reaproveita o mesmo modal de visualizacao ampliada

#### Depoimentos

- Formulario com validacoes no front-end
- Lista de depoimentos carregada via API
- Exclusao de depoimento por botao
- Dados persistidos em arquivo JSON
- Painel administrativo com login protegido
- Upload autenticado de videos MP4 para as categorias do catalogo

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- Node.js
- Google Fonts (Cinzel)

## Estrutura atual do projeto

```text
IMAGINEARTE/
├── index.html
├── styles.css
├── script.js
├── server.js
├── server-simple.js
├── package.json
├── .env.example
├── depoimentos.json
├── README.md
├── SETUP.md
├── iniciar-imaginearte.bat
├── parar-imaginearte.bat
├── imagens/
│   ├── logosite.png
│   ├── folder.png
│   ├── Logo fundo HEX #ede8d0.png
│   ├── Instagram.png
│   ├── celular.png
│   └── zap.png
└── videos/
    ├── artesanato/
    ├── comercial/
    ├── institucionais/
    └── residencial/
```

## Catalogo de videos utilizado no front-end

### Artesanato

- 001-Coracoes Sagrada Familia.mp4
- 002-India.mp4
- 003-Mesa Cigana.mp4
- 004-Nossa Senhora.mp4
- 005-Sagrada Familia.mp4
- 006-Santo Antonio.mp4
- 007-Sao Jorge.mp4

### Comercial

- 001-Barbearia Rexexo.mp4
- 002-Be Happy.mp4
- 003-Encrustacao.mp4
- 004-Logo.mp4
- 005-Orto Lima.mp4

### Institucionais

- 001-Lancamento.mp4
- 002-Publicidade.mp4

Observacao: a categoria Residencial permanece intencionalmente com o aviso Em breve. O catalogo dinamico ja esta preparado para receber videos futuramente.

## Como executar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Subir servidor principal

```bash
npm start
```

Aplicacao disponivel em: http://localhost:3000

### 2.1 Atalho no Windows (1 clique)

- Para iniciar servidor + abrir navegador automaticamente: [iniciar-imaginearte.bat](iniciar-imaginearte.bat)
- Para encerrar processos na porta 3000: [parar-imaginearte.bat](parar-imaginearte.bat)

## Preparacao para provedor

- O servidor agora usa variaveis de ambiente para rede e seguranca.
- Recomenda-se configurar no provedor:
	- `HOST=0.0.0.0`
	- `PORT` (fornecida pelo provedor em muitos casos)
	- `DATA_PATH` (arquivo/volume persistente)
	- `CORS_ORIGINS` com os dominios permitidos
	- `ADMIN_TOKEN` para proteger exclusao de depoimentos
	- `ADMIN_USERNAME` e `ADMIN_PASSWORD` para habilitar login admin via API

### Configuracao para Hostinger (imagineartecnc.com.br)

- Dominio principal: `https://imagineartecnc.com.br`
- Dominios permitidos para CORS:
	- `https://imagineartecnc.com.br`
	- `https://www.imagineartecnc.com.br`
- Sugestao de variaveis no painel da Hostinger:
	- `HOST=0.0.0.0`
	- `PORT` = porta informada pela plataforma
	- `DATA_PATH=/home/<usuario>/data/depoimentos.json` (ou outro caminho persistente)
	- `CORS_ORIGINS=https://imagineartecnc.com.br,https://www.imagineartecnc.com.br`
	- `ADMIN_TOKEN=<token-forte>`
	- `ADMIN_USERNAME=<usuario-admin>`
	- `ADMIN_PASSWORD=<senha-forte>`

Se o frontend e a API estiverem no mesmo dominio, mantenha a meta `api-base` vazia em [index.html](index.html).
Se a API ficar em subdominio (ex.: `https://api.imagineartecnc.com.br`), preencha `api-base` com essa URL.

### Passo a passo de deploy na Hostinger

1. Publique os arquivos do projeto no ambiente Node.js da Hostinger.
2. Configure o comando de start como `node server.js`.
3. No painel da aplicacao, configure as variaveis de ambiente:
	- `HOST=0.0.0.0`
	- `PORT` = porta atribuida pela Hostinger
	- `DATA_PATH=/home/<usuario>/data/depoimentos.json` (ou outro caminho persistente)
	- `CORS_ORIGINS=https://imagineartecnc.com.br,https://www.imagineartecnc.com.br`
	- `ADMIN_TOKEN=<token-forte>`
	- `ADMIN_USERNAME=<usuario-admin>`
	- `ADMIN_PASSWORD=<senha-forte>`
4. Reinicie a aplicacao no painel da Hostinger apos salvar as variaveis.
5. Vincule o dominio `imagineartecnc.com.br` para apontar para a aplicacao Node publicada.
6. Se o frontend e backend estiverem no mesmo dominio, nao altere `api-base` em [index.html](index.html).
7. Se backend estiver em subdominio separado, configure `api-base` em [index.html](index.html) com a URL da API.

### Validacao apos deploy (Hostinger)

1. Acesse `https://imagineartecnc.com.br/api/health` e confirme `ok: true`.
2. Abra `https://imagineartecnc.com.br` e teste envio de depoimento.
3. Teste exclusao de depoimento com autenticacao admin.
4. Verifique se o arquivo de dados persiste apos restart da aplicacao.

### Health check

- Endpoint para monitoramento: `GET /api/health`
- Exemplo: `https://seu-dominio.com/api/health`
- O retorno inclui:
	- `ok`
	- `service`
	- `timestamp`
	- `storage`
	- `protectedDelete`
	- `adminLoginEnabled`

### Deploy com frontend separado da API

- No HTML, ajuste a meta `api-base` em [index.html](index.html) para a URL da API.
- Exemplo: `https://api.seudominio.com`

## Configuracao por ambiente

Use [.env.example](.env.example) como referencia para o arquivo `.env` local.

Variaveis principais:

- `HOST` (ex.: `0.0.0.0`)
- `PORT` (ex.: `3000` local ou porta do provedor)
- `DATA_PATH` (caminho do arquivo JSON)
- `CORS_ORIGINS` (origens permitidas, separadas por virgula)
- `ADMIN_TOKEN` (protege DELETE)
- `ADMIN_USERNAME` e `ADMIN_PASSWORD` (habilitam login admin via API)

### 3. Modo desenvolvimento

```bash
npm run dev
```

## Servidores disponiveis

### server.js

- Servidor HTTP principal do projeto
- Usa apenas modulos nativos do Node.js
- Persiste depoimentos no arquivo [depoimentos.json](depoimentos.json)
- Endpoints:
	- GET /api/estados
	- GET /api/videos
	- GET /api/health
	- POST /api/admin/login
	- POST /api/admin/videos
	- GET /api/depoimentos
	- POST /api/depoimentos
	- DELETE /api/depoimentos/:id

### server-simple.js

- Versao alternativa baseada em sqlite3 (legado)
- Mantem os mesmos endpoints de estados e depoimentos
- Pode ser usada como fallback local

## API de depoimentos

### GET /api/videos

Retorna o catalogo atual de arquivos MP4 agrupado por categoria. O frontend usa essa rota para incluir videos enviados pelo painel administrativo sem alterar o codigo.

### GET /api/estados

Retorna a lista oficial de estados para preencher o select do formulario.

### GET /api/depoimentos

Retorna os depoimentos ordenados do mais recente para o mais antigo.

### POST /api/depoimentos

Exemplo de payload:

```json
{
	"nome": "Nome do Cliente",
	"email": "cliente@email.com",
	"estado": "MG",
	"cidade": "Sao Lourenco",
	"depoimento": "Excelente atendimento e acabamento."
}
```

### DELETE /api/depoimentos/:id

Remove o depoimento informado pelo id.

Observacao: quando `ADMIN_TOKEN` estiver configurado no servidor, envie o token em `X-Admin-Token` (ou `Authorization: Bearer`).

### POST /api/admin/login

Retorna um token admin quando `ADMIN_TOKEN`, `ADMIN_USERNAME` e `ADMIN_PASSWORD` estiverem configurados no servidor.

Exemplo de payload:

```json
{
	"username": "admin",
	"password": "sua-senha"
}
```

### POST /api/admin/videos

Recebe o arquivo MP4 no corpo da requisicao e exige o token em `X-Admin-Token` ou `Authorization: Bearer`.

Cabecalhos obrigatorios:

- `X-Video-Category`: `artesanato`, `comercial`, `residencial` ou `institucionais`
- `X-Video-Name`: nome original do arquivo, codificado com `encodeURIComponent`
- `Content-Type: application/octet-stream`

O servidor limita o upload a 500 MB, remove caracteres inseguros, adiciona prefixo numerico e grava o arquivo na pasta correspondente.

## Autenticacao admin no frontend

- Ao tentar excluir um depoimento com API protegida, o frontend oferece dois caminhos:
	- Login com usuario/senha (chama `POST /api/admin/login`)
	- Informar token manual
- O token admin e salvo no navegador para reutilizacao nas exclusoes seguintes.

## Validacoes implementadas

### Front-end

- Campos obrigatorios no formulario
- Validacao de formato de e-mail
- Tamanho minimo do depoimento
- Escapamento de HTML ao renderizar os textos

### Back-end

- Validacao de estado (sigla ou nome)
- Validacao de campos obrigatorios
- Escrita segura em arquivo (temporario + rename)
- Respostas padronizadas em JSON

## Responsividade e UX

- Grid de videos com 3, 2 ou 1 coluna conforme largura da tela
- Modais com fechamento por clique fora da caixa e tecla Esc
- Navegacao do modal de video com teclado
- Ajuste dinamico de tamanho no player ampliado
- Controle de audio de fundo e alternancia entre video e audio conforme a faixa responsiva

## Problemas comuns

### Depoimentos nao carregam

- Verifique se o servidor esta ativo em http://localhost:3000
- Execute npm start na raiz do projeto
- Se abriu o arquivo HTML diretamente (`file://`), prefira abrir por `http://localhost:3000`

### Porta 3000 ocupada

- Altere a variavel `PORT` no ambiente (.env local ou painel do provedor)
- Ou finalize o processo que estiver usando a porta
- No Windows, voce pode usar [parar-imaginearte.bat](parar-imaginearte.bat)

### Videos nao aparecem

- Confirme se os arquivos estao dentro de [videos](videos)
- Verifique se os nomes dos arquivos conferem exatamente com os definidos em [script.js](script.js)

## Melhorias futuras

- Moderacao administrativa mais avancada, como filtros e historico de alteracoes
- Validacao operacional do deploy na Hostinger, incluindo health check, depoimentos, exclusao autenticada e persistencia apos reinicio

## Creditos

Projeto institucional da IMAGINEARTE CNC.

Desenvolvimento: Luiz Filipe Gonzalez Cunha
