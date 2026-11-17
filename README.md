# 0xDD · Distopia Documentada

> **EDIÇÃO ZERO / MOCK:** protótipo público do jornal *Distopia Documentada: Feche o mundo. Abra o próximo.* O acervo de 6 textos e 3 dossiês usa **Lorem ipsum**. Não há matérias ou fatos reais publicados nesta versão.

## Executar

Site **estático**, HTML/CSS/JS sem dependências de build. Funciona em GitHub Pages sob `/0xDD/` e em domínio próprio, usando rotas `#/...`.

```powershell
# Windows 11, PowerShell 7 — na raiz deste repositório
py -m http.server 8000
# Abra http://localhost:8000
```

> A abertura por `file://` não é suportada, pois a interface carrega `data/public-demo.json` via `fetch`.

## Conteúdo e navegação

- Capa da edição zero, arquivo de matérias, leitura, dossiês, apresentação do método FARPA/Rastro e sobre.
- Busca local por títulos e textos de chamada; filtros por seção; menu mobile; tema claro/escuro; cópia de link.
- `data/public-demo.json`: **contrato de exibição**, não uma exportação direta do SQLite operacional.
- `scripts/generate_demo.py`: regenera o JSON com textos Lorem ipsum. **Não lê o banco interno**.

## GitHub Pages

Configure **Settings → Pages → Build and deployment → Deploy from a branch → `main` → `/ (root)`**. A `.nojekyll` mantém os ativos estáticos. Não é necessário GitHub Actions nem Node.

A URL esperada para este repositório é `https://brunno-benatti.github.io/0xDD/`; confirme o status do deployment na interface GitHub.

## Regras para o futuro pipeline editorial

1. Os dados internos de apuração nunca devem ser enviados integralmente ao GitHub.
2. Publicações reais exigem **aprovação humana**, versão editorial congelada, checagem factual, revisão de privacidade e direitos, e registro de entrega conforme o Rastro.
3. Uma exportação pública terá somente matérias aprovadas, metadados autorizados e referências publicáveis. Controles `mode: "demo"` e IDs `MOCK-*` devem ser recusados por um pipeline de publicação real.
4. O SQLite permanece local; GitHub Pages é somente leitura e não acessa o banco, nem seus WALs, backups ou credenciais.
5. Dados fictícios não devem ser misturados com o corpus factual.

## Árvore

```text
.
├── index.html
├── .nojekyll
├── assets/
│   ├── app.js
│   ├── styles.css
│   ├── favicon.svg
│   └── og.svg
├── data/
│   └── public-demo.json
├── scripts/
│   └── generate_demo.py
└── README.md
```

## Teste local

```powershell
python .\scripts\generate_demo.py
python -m json.tool .\data\public-demo.json > $null
```

A navegação foi testada por automação DOM Chromium em ambientes desktop e mobile, com `fetch` interceptado para evitar acesso externo; o deployment no GitHub Pages deve ser conferido separadamente. Nenhum dado do Rastro ou das 48 pautas internas foi publicado.

**Licenciamento:** não presumir licença aberta para textos, identidade visual ou materiais futuros até aprovação explícita. Os arquivos de demonstração não conferem autorização de redistribuição de material externo.
