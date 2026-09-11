# Tarefas pendentes - Hostinger

Este documento deve ser executado por quem possui acesso ao painel da Hostinger.

## Estado atual

- O projeto esta no GitHub, na branch `main`.
- O ultimo commit enviado e `be68a02`.
- A categoria Residencial deve continuar exibindo `Em breve` por enquanto.
- Nao e necessario adicionar videos residenciais nesta etapa.

## 1. Publicar a versao atual

- [ ] Acessar o painel da Hostinger.
- [ ] Abrir ou criar a aplicacao Node.js do dominio `imagineartecnc.com.br`.
- [ ] Publicar a branch `main` do repositorio GitHub ou enviar os arquivos atualizados.
- [ ] Confirmar que estes arquivos foram publicados:
  - `index.html`
  - `script.js`
  - `styles.css`
  - `server.js`
  - `depoimentos.json`
  - pasta `videos/`
  - pasta `imagens/`
  - pasta `audio/`

## 2. Configurar a aplicacao Node.js

- [ ] Usar Node.js 18 ou superior.
- [ ] Definir o comando de inicializacao como:

```bash
node server.js
```

- [ ] Executar a instalacao das dependencias:

```bash
npm install
```

## 3. Configurar variaveis de ambiente

Preencher os valores diretamente no painel da Hostinger. Nao enviar senhas ou tokens por mensagem.

```env
HOST=0.0.0.0
PORT=<porta-informada-pela-hostinger>
DATA_PATH=<caminho-absoluto-para-pasta-persistente>/depoimentos.json
CORS_ORIGINS=https://imagineartecnc.com.br,https://www.imagineartecnc.com.br
ADMIN_TOKEN=<token-forte-gerado-pelo-responsavel>
ADMIN_USERNAME=<usuario-administrativo>
ADMIN_PASSWORD=<senha-forte-definida-pelo-responsavel>
```

Importante:

- `DATA_PATH` deve apontar para um volume persistente, para os depoimentos nao sumirem apos reiniciar.
- `ADMIN_TOKEN`, `ADMIN_USERNAME` e `ADMIN_PASSWORD` devem ser valores fortes e privados.
- A porta deve ser a porta fornecida pela Hostinger, nao necessariamente `3000`.

## 4. Configurar dominio e HTTPS

- [ ] Apontar `imagineartecnc.com.br` para a aplicacao Node.js.
- [ ] Confirmar que `www.imagineartecnc.com.br` tambem esta configurado, se for utilizado.
- [ ] Ativar ou confirmar o certificado HTTPS.
- [ ] Reiniciar a aplicacao depois de salvar as variaveis.

## 5. Validar a API publicada

Abrir no navegador:

```text
https://imagineartecnc.com.br/api/health
```

O retorno esperado deve conter:

```json
{
  "ok": true,
  "protectedDelete": true,
  "adminLoginEnabled": true
}
```

- [ ] Confirmar que `/api/health` retorna `ok: true`.
- [ ] Confirmar que `protectedDelete` esta como `true`.
- [ ] Confirmar que `adminLoginEnabled` esta como `true`.
- [ ] Abrir o site principal e confirmar que os videos carregam.
- [ ] Confirmar que `https://imagineartecnc.com.br/api/videos` retorna o catalogo.

## 6. Testar depoimentos

- [ ] Abrir a area de Depoimentos.
- [ ] Enviar um depoimento de teste.
- [ ] Confirmar que ele aparece na lista.
- [ ] Abrir o painel Administracao.
- [ ] Entrar com o usuario e a senha configurados.
- [ ] Excluir o depoimento de teste.
- [ ] Confirmar que ele desapareceu da lista.

## 7. Testar upload administrativo

- [ ] Entrar no painel Administracao.
- [ ] Escolher a categoria Artesanato, Comercial ou Institucional.
- [ ] Enviar um arquivo MP4 pequeno de teste.
- [ ] Recarregar a pagina.
- [ ] Confirmar que o video aparece no catalogo.
- [ ] Remover o arquivo de teste do servidor, se ele nao for um video definitivo.

## 8. Testar persistencia

- [ ] Anotar o depoimento de teste criado.
- [ ] Reiniciar a aplicacao no painel da Hostinger.
- [ ] Confirmar que o depoimento continua salvo.
- [ ] Confirmar que os videos continuam acessiveis.

## Resultado esperado

- [ ] Site acessivel por HTTPS.
- [ ] API respondendo em `/api/health`.
- [ ] Depoimentos persistentes.
- [ ] Exclusao protegida por autenticacao.
- [ ] Upload administrativo funcionando.
- [ ] Categoria Residencial mantida como `Em breve`.

## Problemas e informacoes para retorno

Se alguma etapa falhar, anotar:

- URL acessada.
- Horario do erro.
- Mensagem exibida no painel ou navegador.
- Status HTTP retornado.
- Ultimas linhas do log da aplicacao.

Nao incluir senhas, tokens ou chaves nos logs enviados.