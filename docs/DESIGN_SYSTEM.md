# Direção de arte 0xDD v0.4.1 — Industrial Hacker

## Referência

Não confundir com estética cyberpunk de ficção. A referência do Industrial Hacker é engenharia analógica, terminal UNIX, documentação técnica impressa e brutalismo editorial funcional.

## Cores e funções

| Token | Valor | Uso |
|---|---|---|
| Carbon | `#151c1b` | Fundo principal, cabeçalhos, estrutura |
| Paper | `#e6e2d5` | Fundo de leitura e arquivo |
| Amber | `#e8a449` | Ênfase editorial e ações prioritárias |
| Signal | `#78ae9b` | Coordenadas e detalhes técnicos discretos |
| Soft Carbon | `#1e2825` | Método, áreas técnicas |

As cores não representam estados de publicação nem evidência. Nunca aplicar sinal verde a algo apenas demonstrativo.

## Tipografia

- **Barlow Condensed**: títulos, números editoriais e palavras-chave
- **IBM Plex Sans**: navegação, chamadas, UI, subtítulos
- **IBM Plex Mono**: IDs, metadados, índices, controles
- **Source Serif 4**: leitura longa, com largura de coluna limitada

## Componentização

- **Hero:** manifesto tipográfico assimétrico + desenho técnico ortogonal em CSS sem fotografias artificiais
- **Arquivo:** uma matéria de destaque e demais registros em linhas, não cards multicoloridos
- **Método:** cinco colunas separadas por divisórias discretas
- **Dossiês:** organização sequencial com hierarquia editorial
- **Matéria:** capa escura e corpo em papel com painel lateral documental
- **Rodapé:** identificação e navegação, sem estatísticas fictícias

## Regras de experiência

- Sem gradientes chamativos, glassmorphism, neon ou bordas espessas.
- Efeitos não devem ser necessários para ler o conteúdo.
- `prefers-reduced-motion` deve suprimir transições.
- `data-theme` preserva alternância de leitura; a paleta é estável por seção e por navegação.
- Cada tela deve ser legível entre 320 px e desktop; nenhum overflow horizontal.

## Atualização 0.4.1

Retirar motivos circulares recorrentes, priorizando esquadros, traços ortogonais e marcas de registro. Não introduzir novas cores, tipografias ou divisórias sem necessidade funcional.
