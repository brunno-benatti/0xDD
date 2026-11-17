#!/usr/bin/env python3
"""Builds a portable, single-file preview without touching the canonical demo JSON."""
from pathlib import Path
import json
import re

ROOT=Path(__file__).resolve().parents[1]
index=(ROOT/'index.html').read_text(encoding='utf-8')
css=(ROOT/'assets/styles.css').read_text(encoding='utf-8')
app=(ROOT/'assets/app.js').read_text(encoding='utf-8')
data=json.loads((ROOT/'data/public-demo.json').read_text(encoding='utf-8'))
assert data['schemaVersion']=='dd.public.v0.1' and data['mode']=='demo'
assert "fetch('./data/public-demo.json',{cache:'no-store'})" in app
app=app.replace("fetch('./data/public-demo.json',{cache:'no-store'})", "Promise.resolve({ok:true,json:async()=>window.__DD_DEMO_DATA__})")
# Prevent script-tag termination in inline data/scripts.
serialized=json.dumps(data, ensure_ascii=False).replace('</','<\\/')
app=app.replace('</','<\\/')
index=index.replace('<link rel="stylesheet" href="./assets/styles.css">',f'<style>\n{css}\n</style>')
index=index.replace('<script defer src="./assets/app.js"></script>','')
index=index.replace('</body>',f'<script>window.__DD_DEMO_DATA__={serialized};</script>\n<script>\n{app}\n</script>\n</body>')
index=re.sub(r'<link[^>]+rel="preconnect"[^>]*>\n?', '',index)
# Make footer data link work in standalone preview by opening a blob generated on click.
index=index.replace('href="./data/public-demo.json" target="_blank"', 'href="data:application/json;charset=utf-8,' + json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('#','%23').replace(' ','%20').replace('"','%22').replace('<','%3C').replace('>','%3E')[:2000] + '" target="_blank"') if False else index
# Standalone preview has its data embedded, unlike deploy source: don't link to a nonexistent relative file.
index=index.replace('<a href="./data/public-demo.json" target="_blank" rel="noopener noreferrer">Dados demonstrativos ↗</a>', '<span class="meta">DADOS DEMO INCORPORADOS NESTA PRÉVIA</span>')
index=index.replace('O conteúdo de demonstração está disponível em <a href="./data/public-demo.json">JSON</a>.', 'Os dados demonstrativos estão incorporados neste arquivo.')
(ROOT/'PREVIEW_OFFLINE.html').write_text(index,encoding='utf-8')
print('Preview built',ROOT/'PREVIEW_OFFLINE.html')
