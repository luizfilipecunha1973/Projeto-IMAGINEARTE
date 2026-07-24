# IMAGINEARTE - Website de Usinagem CNC 

Website da empresa IMAGINEARTE especializada em usinagem CNC, vídeos corporativos e apresentação de portfólio.

## 🚀 Recursos

- **Galeria de Vídeos**: Organizada em categorias (Artesanato, Comercial, Institucional)
- **Sistema de Depoimentos**: Formulário para clientes deixarem avaliações
- **Persistencia de Depoimentos**: arquivo JSON local
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Modal de Vídeo**: Visualização ampliada de vídeos com navegação

## 📋 Pré-requisitos

- Node.js v14+ instalado
- npm (vem com Node.js)

## 🔧 Instalação

1. **Clone ou baixe o projeto**
```bash
cd "g:\Meu Drive\Projetos Filipe Programador\IMAGINEARTE"
```

2. **Instale as dependências**
```bash
npm install
```

Isto ira instalar as dependencias do projeto (principalmente `nodemon` para desenvolvimento).

3. **Estrutura de pastas esperada**
```
IMAGINEARTE/
├── index.html
├── script.js
├── styles.css
├── server.js
├── package.json
├── depoimentos.json (usado para armazenar depoimentos)
├── Imagens/
├── Vídios/
│   ├── artesanato/
│   ├── comercial/
│   └── Institucionais/
└── README.md
```

## 🏃 Como Rodar

### Modo de Desenvolvimento (com auto-reload)

Primeiro instale o nodemon (opcional):
```bash
npm install --save-dev nodemon
```

Depois rode:
```bash
npm run dev
```

### Modo Produção
```bash
npm start
```

Ou execute diretamente:
```bash
node server.js
```

O servidor iniciará em `http://localhost:3000`

## 📂 Estrutura de Vídeos

Os vídeos devem estar organizados assim:

```
Vídios/
├── artesanato/
│   ├── Vidéo 1.mp4
│   └── Vídeo 2.mp4
├── comercial/
│   ├── Orto Lima.mp4
│   ├── Be Happy.mp4
│   └── ...
└── Institucionais/
    ├── Vídeo 1.mp4
    ├── Vídeo 2.mp4
    └── Vídeo 3.mp4
```

**Importante**: O código busca os vídeos em `./videos/` (em minúsculas), então renomeie a pasta de `Vídios` para `videos`.

## 💾 Armazenamento de Depoimentos

Os depoimentos sao armazenados no arquivo [depoimentos.json](depoimentos.json), criado automaticamente se nao existir.

Exemplo de estrutura:
```json
[
  {
    "id": 1,
    "nome": "Nome do Cliente",
    "email": "cliente@email.com",
    "estado": "Minas Gerais",
    "cidade": "Sao Lourenco",
    "depoimento": "Excelente atendimento e acabamento.",
    "data": "2026-07-24T20:30:00.000Z"
  }
]
```

## 📡 API Endpoints

### GET /api/depoimentos
Retorna todos os depoimentos ordenados por data (mais recentes primeiro)

```bash
curl http://localhost:3000/api/depoimentos
```

### POST /api/depoimentos
Cria um novo depoimento

```bash
curl -X POST http://localhost:3000/api/depoimentos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "estado": "São Paulo",
    "cidade": "São Paulo",
    "depoimento": "Excelente serviço!"
  }'
```

### DELETE /api/depoimentos/:id
Deleta um depoimento

```bash
curl -X DELETE http://localhost:3000/api/depoimentos/1
```

## 🎨 Customização

### Cores do Tema

Edite as variáveis no início de `styles.css`:

```css
:root {
    --primary: #8D6FEA;        /* Cor principal */
    --accent: #8D6FEA;         /* Cor dos botões */
    --text-blue: #0000ff;      /* Cor do texto */
    --bg-top: #ede8d0;         /* Fundo do topo */
}
```

### Porta do Servidor

Edite `server.js`:
```javascript
const port = 3000; // Mude para outra porta se necessário
```

## 🐛 Troubleshooting

### "Cannot find module 'nodemon'"
Solução: Execute `npm install`

### "EADDRINUSE: address already in use :::3000"
A porta 3000 já está em uso. Mude a porta em `server.js` ou encerre o processo:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Vídeos não carregam
- Verifique se a pasta de vídeos existe em `./videos/`
- Confirme que os nomes dos arquivos estão corretos
- Verifique o console do navegador para mensagens de erro

### Depoimentos não salvam
- Certifique-se de que o servidor Node.js está rodando
- Verifique se a URL em `script.js` está correta: `http://localhost:3000`
- Abra o DevTools (F12) e verifique a aba Network para erros

## 📝 Notas Importantes

1. A pasta de vídeos se chama `Vídios` mas o código busca em `videos` (minúsculas). Renomeie a pasta para funcionamento correto.

2. O servidor precisa estar rodando para os depoimentos funcionarem.

3. Os depoimentos sao armazenados no arquivo `depoimentos.json` na raiz do projeto.

4. Para producao com muitos acessos simultaneos, considere usar um banco como PostgreSQL.

## 🎯 Como Usar o Sistema de Depoimentos

### 1. **Submeter um Depoimento**
- Clique em **"Institucional"** → **"Depoimentos"**
- Preencha o formulário com:
  - **Nome**: 3-100 caracteres
  - **E-mail**: Válido (ex: email@dominio.com)
  - **Estado**: Nome do estado
  - **Cidade**: Nome da cidade
  - **Depoimento**: 10-2000 caracteres (obrigatório)
- Clique em **"Enviar"**
- O depoimento aparecerá na lista instantaneamente

### 2. **Ver Todos os Depoimentos**
- Os depoimentos aparecem em cards com:
  - Nome do depoente
  - Estado e Cidade
  - Data do depoimento
  - Texto do depoimento em destaque
  - Botão de deletar (×) no canto

### 3. **Deletar um Depoimento**
- Clique no botão **"×"** vermelho no canto do card
- Confirme a exclusão
- O depoimento será removido da lista e do banco de dados
 - O depoimento sera removido da lista e do arquivo JSON

## 🔒 Validações Implementadas

**No Frontend:**
- Verifica campos obrigatórios
- Valida formato de e-mail
- Valida comprimento mínimo de cada campo
- Feedback visual durante envio (botão desabilitado)

**No Backend:**
- Valida comprimento de campos
- Valida e-mail com regex
- Escrita segura em arquivo (temporario + rename)
- Status HTTP correto para cada situação

---

**Desenvolvido por**: Filipe Programador  
**Versão**: 1.0.0  
**Última atualização**: 2024
