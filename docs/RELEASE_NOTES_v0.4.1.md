# 0xDD 0.4.1 — Industrial Hacker / release

- Base aprovada: v0.4.1 preview local; nenhuma mudança funcional no app durante preparação do deploy.
- Visual: Carbon `#151c1b`, Paper `#e6e2d5`, Amber `#e8a449`, Signal `#78ae9b`; diagramas retilíneos, sem anéis concêntricos.
- Dados: `dd.public.v0.1` demo com 6 artigos e 3 dossiês Lorem ipsum; nenhum dado interno/SQLite.
- Infraestrutura: estático, rotas `#/...`, relativo à raiz do repositório, com `.nojekyll`.
- GitHub Pages: branch `main`, raiz do repositório.
- Validação local: 32 combinações de 8 rotas × 4 larguras no Chromium, sem overflow nem erros de JavaScript observados; `file://`, fontes Google e carregamento público ainda requerem validação independente.
- Fonte da verdade do projeto DD continua no Drive `gpt-project/dd`; o ZIP histórico v0.1.0 não deve ser sobrescrito.
- Rollback GitHub: criar novo commit restaurando o tree do commit `bc8c2f2fbd444ac58ab456625277918f649cf355`; não forçar o histórico.
- Observação: aprovação de publicação do *site* não é aprovação de matérias jornalísticas; `noindex,nofollow` preservado.
