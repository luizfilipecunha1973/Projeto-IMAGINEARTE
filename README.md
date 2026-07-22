# IMAGINEARTE CNC

Site institucional da IMAGINEARTE CNC para apresentacao da marca, servicos de usinagem, portfolio em video e canal de contato com clientes.

![Logo da IMAGINEARTE CNC](imagens/logosite.png)

![Preview do portfolio](imagens/folder.png)

## Sobre o projeto

Este projeto foi construido como uma landing page institucional com foco em identidade visual e navegacao interativa. O site utiliza video de fundo, menu com submenus, secoes modais e uma area de depoimentos conectada a banco SQLite.

O objetivo principal e apresentar os servicos da empresa, exibir trabalhos em video e facilitar o contato de novos clientes.

## O que existe no site

### Home

- Hero com logo oficial em [imagens/logosite.png](imagens/logosite.png)
- Titulo e slogan da empresa
- Video de fundo carregado de [videos/institucionais/Publicidade.mp4](videos/institucionais/Publicidade.mp4)

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
- Dados persistidos em SQLite

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- Node.js
- SQLite
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
├── depoimentos.json
├── README.md
├── SETUP.md
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

- Sagrada Familia.mp4
- Coracoes Sagrada Familia.mp4
- Santo Antonio.mp4
- Nossa Senhora.mp4
- Mesa Cigana.mp4
- India.mp4
- Sao Jorge.mp4

### Comercial

- Orto Lima.mp4
- Be Happy.mp4
- Logo.mp4
- Encrustacao.mp4
- Barbearia Rexexo.mp4

### Institucionais

- Lancamento.mp4
- Publicidade.mp4

Observacao: a categoria Residencial existe no menu, mas no momento exibe apenas o aviso Em breve.

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

### 3. Modo desenvolvimento

```bash
npm run dev
```

## Servidores disponiveis

### server.js

- Servidor HTTP principal do projeto
- Usa modulo nativo node:sqlite
- Cria e atualiza schema do banco automaticamente
- Endpoints:
	- GET /api/estados
	- GET /api/depoimentos
	- POST /api/depoimentos
	- DELETE /api/depoimentos/:id

### server-simple.js

- Versao alternativa baseada em sqlite3
- Mantem os mesmos endpoints de estados e depoimentos
- Pode ser usada como fallback local

## API de depoimentos

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

## Validacoes implementadas

### Front-end

- Campos obrigatorios no formulario
- Validacao de formato de e-mail
- Tamanho minimo do depoimento
- Escapamento de HTML ao renderizar os textos

### Back-end

- Validacao de estado (sigla ou nome)
- Validacao de campos obrigatorios
- Insercao com statements parametrizados
- Respostas padronizadas em JSON

## Responsividade e UX

- Grid de videos com 3, 2 ou 1 coluna conforme largura da tela
- Modais com fechamento por clique fora da caixa e tecla Esc
- Navegacao do modal de video com teclado
- Ajuste dinamico de tamanho no player ampliado

## Problemas comuns

### Depoimentos nao carregam

- Verifique se o servidor esta ativo em http://localhost:3000
- Execute npm start na raiz do projeto

### Porta 3000 ocupada

- Altere a constante PORT em [server.js](server.js)
- Ou finalize o processo que estiver usando a porta

### Videos nao aparecem

- Confirme se os arquivos estao dentro de [videos](videos)
- Verifique se os nomes dos arquivos conferem exatamente com os definidos em [script.js](script.js)

## Melhorias futuras

- Area residencial com conteudo real
- Painel administrativo para moderacao de depoimentos
- Upload de novos videos via interface
- Deploy com HTTPS e dominio proprio

## Creditos

Projeto institucional da IMAGINEARTE CNC.

Desenvolvimento: Luiz Filipe Gonzalez Cunha
