#!/usr/bin/env python3
"""Gera somente conteúdo tipográfico de demonstração; nunca lê o DD-DB."""
from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]

headlines = [
    ('lorem-ipsum-dolor-sit-amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Pequenos absurdos', 'MOCK-D01', 'form', True),
    ('praesent-vitae-consequat', 'Praesent vitae consequat sem. Integer viverra eros.', 'Tecnologia & poder', 'MOCK-D02', 'elevator', False),
    ('aliquam-erat-volutpat', 'Aliquam erat volutpat. Vestibulum ante ipsum primis.', 'Estado digital', 'MOCK-D02', 'portal', False),
    ('donec-porttitor-ligula', 'Donec porttitor ligula sed lacus volutpat luctus.', 'Cidade prometida', 'MOCK-D03', 'city', False),
    ('curabitur-varius-sapien', 'Curabitur varius sapien at nulla fermentum tempor.', 'Tecnologia & poder', 'MOCK-D02', 'ai', False),
    ('maecenas-fringilla-felis', 'Maecenas fringilla felis a ante laoreet tincidunt.', 'Pequenos absurdos', 'MOCK-D01', 'emergency', False),
]
paragraphs = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat, justo id iaculis ultrices, urna lectus consequat nulla, et feugiat risus neque ac justo. Sed condimentum ipsum sed metus venenatis, at eleifend orci varius. Vivamus interdum ante eget odio finibus, ut facilisis nunc auctor.',
    'Praesent in diam libero. Sed vulputate sapien in purus sollicitudin, vel ullamcorper justo faucibus. Maecenas dignissim magna eget dolor consequat, quis elementum arcu rutrum. Integer vitae consectetur sapien, sit amet imperdiet nunc. Suspendisse id nisi vitae odio consectetur faucibus.',
    'Aliquam erat volutpat. Vestibulum pretium tempor sapien, vitae pellentesque sem suscipit et. Cras vestibulum, urna a ultricies blandit, lorem mi vestibulum urna, sed porta tellus turpis ac justo. Nulla facilisi. Proin non aliquam mi, eget pretium lectus.',
    'Donec varius, nulla a facilisis aliquet, quam metus viverra nibh, eget blandit neque tortor eget leo. Aenean tristique elit quis dui viverra, eget sagittis lacus faucibus. Fusce sit amet nulla eu quam malesuada pellentesque vitae in nunc.',
    'Curabitur tempor sem nec est pretium, ac varius nunc lacinia. Etiam quis arcu mauris. Nam nec vulputate ipsum. Vestibulum laoreet magna enim, eu tempor nunc malesuada vitae. Integer consequat urna eget risus mollis dignissim.',
    'Maecenas convallis ultricies sem, sed tempus magna aliquam vitae. Pellentesque in mauris vel ipsum fermentum auctor. Vivamus luctus neque eu finibus cursus. Etiam vestibulum arcu eu odio fringilla aliquet.',
]
subheads = ['Vestibulum ante ipsum primis', 'Aliquam dignissim lorem at sapien', 'Integer consequat urna eget risus']
quotes = [
    'Lorem ipsum dolor sit amet. Curabitur non ullamcorper eros, sed consequat tellus.',
    'Praesent sollicitudin massa id lectus ultrices, vitae placerat odio luctus.',
]

def paragraph(text):
    return {'type': 'paragraph', 'text': text}

articles = []
for index, (slug, title, category, dossier, motif, featured) in enumerate(headlines, start=1):
    offset = index % len(paragraphs)
    body = [
        paragraph(paragraphs[offset]),
        paragraph(paragraphs[(offset + 1) % len(paragraphs)]),
        {'type': 'heading', 'text': subheads[(index - 1) % len(subheads)]},
        paragraph(paragraphs[(offset + 2) % len(paragraphs)]),
        {'type': 'pullquote', 'text': quotes[index % len(quotes)]},
        paragraph(paragraphs[(offset + 3) % len(paragraphs)]),
        paragraph(paragraphs[(offset + 4) % len(paragraphs)]),
    ]
    articles.append({
        'id': f'MOCK-A{index:02}',
        'slug': slug,
        'title': title,
        'deck': paragraphs[(offset + 2) % len(paragraphs)][:175] + '…',
        'category': category,
        'dossierId': dossier,
        'featured': featured,
        'motif': motif,
        'minutes': 4 + index % 3,
        'author': 'Redação · placeholder',
        'place': 'DIAGRAMAÇÃO / MOCK',
        'dateLabel': 'EDIÇÃO ZERO',
        'provenance': 'LOREM IPSUM / SEM FONTES REAIS',
        'note': 'Texto Lorem ipsum utilizado exclusivamente para testar tipografia, navegação e arquitetura de conteúdo. Não representa acontecimento, entrevista, documento, evidência nem publicação jornalística.',
        'body': body,
        'verificationPlan': [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            'Integer tempor neque sed lectus aliquet, sed congue orci elementum?',
            'Praesent vel lectus at urna aliquet consequat?'
        ],
    })

dossiers = [
    {
        'id': 'MOCK-D01', 'slug': 'lorem-ipsum', 'title': 'Lorem ipsum dolor sit amet',
        'eyebrow': 'COLEÇÃO 01 / DEMONSTRAÇÃO',
        'summary': paragraphs[0][:195] + '…',
        'focus': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'storyIds': ['MOCK-A01','MOCK-A06'],
        'questions': ['Lorem ipsum dolor sit amet?', 'Praesent vitae ornare lorem?', 'Nulla facilisi, curabitur vitae felis?'],
    },
    {
        'id': 'MOCK-D02', 'slug': 'praesent-vitae', 'title': 'Praesent vitae consequat sem',
        'eyebrow': 'COLEÇÃO 02 / DEMONSTRAÇÃO',
        'summary': paragraphs[1][:195] + '…',
        'focus': 'Praesent in diam libero, sed vulputate sapien.',
        'storyIds': ['MOCK-A02','MOCK-A03','MOCK-A05'],
        'questions': ['Vestibulum ante ipsum primis?', 'Donec porttitor ligula?', 'Maecenas dignissim magna eget dolor?'],
    },
    {
        'id': 'MOCK-D03', 'slug': 'aliquam-erat', 'title': 'Aliquam erat volutpat',
        'eyebrow': 'COLEÇÃO 03 / DEMONSTRAÇÃO',
        'summary': paragraphs[2][:195] + '…',
        'focus': 'Aliquam erat volutpat, vestibulum pretium tempor sapien.',
        'storyIds': ['MOCK-A04'],
        'questions': ['Aenean tristique elit quis dui viverra?', 'Fusce sit amet nulla?', 'Nullam feugiat justo id iaculis?'],
    },
]

content = {
    'schemaVersion': 'dd.public.v0.1',
    'mode': 'demo',
    'contentWarning': 'Conteúdo demonstrativo em Lorem ipsum; não representa notícias, dossiês ou fontes reais.',
    'site': {
        'title': 'Distopia Documentada',
        'tagline': 'Feche o mundo. Abra o próximo.',
        'version': '0.3.2-preview',
        'issueLabel': 'EDIÇÃO ZERO',
    },
    'issue': {
        'id': 'MOCK-000',
        'label': 'NÚMERO 000',
        'title': 'Lorem ipsum dolor sit amet.',
        'description': 'Texto de preenchimento e layout demonstrativo. Nenhum conteúdo factual.',
        'storyIds': [item['id'] for item in articles],
    },
    'articles': articles,
    'dossiers': dossiers,
}
(root / 'data' / 'public-demo.json').write_text(json.dumps(content, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Generated {len(articles)} Lorem ipsum articles and {len(dossiers)} placeholder dossiers')
