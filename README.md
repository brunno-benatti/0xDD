# 0xDD — Distopia Documentada

## v0.4.1 / Industrial Hacker — edição zero publicada

Redesign integral da interface pública, baseado na identidade Industrial Hacker / Analog Engineering do usuário: **Carbon `#151c1b`, Paper `#e6e2d5`, Amber `#e8a449`, Signal `#78ae9b`**. Tipografia de engenharia editorial, desenhos técnicos retilíneos e contidos, grade rígida, separadores finos e conteúdo em superfície de papel para leitura longa.

**Não é uma publicação jornalística.** O corpus possui 6 artigos e 3 dossiês Lorem ipsum e os respectivos IDs `MOCK-*`. O contrato de dados permanece `dd.public.v0.1` e o arquivo `data/public-demo.json` é byte a byte idêntico ao da v0.3.2. A identidade visual foi atualizada na release 0.4.1. `site.version` no JSON de demonstração permanece congelado por integridade do fixture.

### Acessar o site e rodar localmente

- Pages: https://brunno-benatti.github.io/0xDD/
- Repositório: https://github.com/brunno-benatti/0xDD
- Publicação contém somente seis artigos Lorem ipsum e três dossiês fictícios. O `noindex, nofollow` permanece enquanto o conteúdo for demonstrativo.

### Abrir a prévia

- **`PREVIEW_OFFLINE.html`** (incluído no ZIP do Drive, não no site): arquivo único com CSS, JS e dados incorporados. A execução real por `file://` não pôde ser testada no ambiente de validação.
- **Projeto navegável**: no Windows 11 / PowerShell 7, dentro desta pasta, execute:

```powershell
py -m http.server 8000
```

Acesse `http://localhost:8000`.

### Navegação preservada

`#/inicio`, `#/materias`, `#/materia/<slug>`, `#/dossies`, `#/dossie/<slug>`, `#/metodo`, `#/sobre`. Busca, filtros, menu mobile, atalho Ctrl+K, alternância de tema, cópia de URL, indicador de leitura e proteção contra injeção HTML nos dados permanecem implementados.

### Fontes

Google Fonts para Barlow Condensed, IBM Plex Sans, IBM Plex Mono e Source Serif 4 com fallbacks do sistema. A prévia funciona sem essas fontes, mas a verificação visual automatizada foi executada com fallbacks, sem rede. Não redistribuímos arquivos de fonte.

### Testes

```powershell
node --check .\assets\app.js
py -m json.tool .\data\public-demo.json > $null
py .\scripts\build_preview.py
py .\tests\browser_suite.py
```

Suíte Chromium `set_content` com o HTML offline e fontes externas desativadas: **32 combinações de 8 rotas e 4 larguras**, sem erros JavaScript ou overflow horizontal. Busca, filtros, tema, menu mobile e progresso de leitura testados. Resultados em `tests/reports/results.json`. O acesso direto `file://` foi bloqueado pelo ambiente; não é correto declarar esse teste aprovado. A verificação de deploy e URL real do Pages deve ser registrada separadamente; os testes locais não comprovam disponibilidade externa.

### Limites de publicação

- Nenhum conteúdo real, fonte de apuração, SQLite ou documento interno é exposto.
- Publicação do site depende de commit auditável, deployment bem-sucedido e cópia versionada no Drive. Este arquivo sozinho não comprova a entrega.
- `data/public-demo.json` é apenas maquete. Uma publicação real exige exportação pública revisada e aprovação humana.
- O pacote de prévia original continua arquivado no Drive como registro da aprovação visual; a release é uma versão empacotada separadamente.

### Estrutura

```text
index.html                    Entrada para GitHub Pages
PREVIEW_OFFLINE.html          Prévia autocontida, somente no ZIP do Drive
assets/app.js                 Router e telas
assets/styles.css             Design system Industrial Hacker
assets/favicon.svg, og.svg   Identidade vetorial
scripts/build_preview.py     Build da prévia independente
scripts/generate_demo.py     Dados Lorem ipsum (não conecta ao SQLite)
data/public-demo.json        Mock preservado
tests/browser_suite.py        Regressão Chromium
tests/reports/               Relatórios e capturas, somente no ZIP do Drive

README.md
```

### Histórico

- v0.3.2: anterior, direção CMYK com grandes blocos cromáticos (preservada em pacote separado).
- **v0.4.0**: reconstrução visual Industrial Hacker, eliminados capítulos CMYK, rotação aleatória de cores, molduras multicoloridas e sombreamento artificial; navegação e dados preservados.

### Ajustes da v0.4.1

- Retirados os anéis concêntricos do monograma de navegação e das figuras de capa/matéria.
- Diagramas geométricos agora usam esquadros, eixos retos, régua e marcadores de referência discretos.
- Eliminado o contorno circular no destaque do arquivo; demais layouts, fontes, tokens e conteúdo permanecem iguais.
- Nenhuma publicação realizada: revisão apenas local.
