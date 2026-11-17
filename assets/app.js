(() => {
  'use strict';
  const root = document.getElementById('conteudo');
  const state = { data: null, filter: 'Tudo', search: '', lastPath: null };
  const icons = { form:'?', elevator:'↑', portal:'@', city:'▱', ai:'*', emergency:'!' };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
  const hrefArticle = story => `#/materia/${encodeURIComponent(story.slug)}`;
  const hrefDossier = dossier => `#/dossie/${encodeURIComponent(dossier.slug)}`;
  const articleById = id => state.data.articles.find(a => a.id === id);
  const dossierById = id => state.data.dossiers.find(d => d.id === id);
  const allArticles = () => state.data.articles;
  const demoNote = 'Lorem ipsum para diagramação. Nenhuma ocorrência, contrato ou declaração real é apresentada nesta demonstração.';
  const demoAlert = () => `<div class="demo-alert" role="note"><span><strong>SIMULAÇÃO EDITORIAL.</strong> ${esc(demoNote)}</span></div>`;
  function motif(story, featured = false, number = '') {
    const symbol = icons[story.motif] || '?';
    if (featured) return `<div class="featured-art" aria-hidden="true"><span class="art-cross">+</span><span class="art-circle"></span><span class="art-coord">${esc(story.id)} / MOCK / 001</span></div>`;
    return `<div class="card-art" data-motif="${esc(story.motif)}" aria-hidden="true"><span class="art-index">${esc(number || story.id)}</span><span class="art-glyph">${esc(symbol)}</span></div>`;
  }
  function storyCard(story, number, small = false) {
    return `<article class="story-card catalog-card ${small ? 'small' : ''}" data-category="${esc(story.category)}" data-search="${esc((story.title + ' ' + story.deck + ' ' + story.category).toLocaleLowerCase('pt-BR'))}">
      <a href="${hrefArticle(story)}" aria-label="Ler a matéria fictícia: ${esc(story.title)}">${motif(story, false, number)}</a>
      <div class="story-content"><div class="card-kicker">${esc(story.category)} <span class="separator">/</span> DEMO</div>
      <h3><a href="${hrefArticle(story)}">${esc(story.title)}</a></h3><p>${esc(story.deck)}</p>
      <a class="card-link" href="${hrefArticle(story)}"><span>LER TEXTO DEMO · ${story.minutes} MIN</span><span aria-hidden="true">↗</span></a></div></article>`;
  }
  function dossierCard(d) {
    return `<article class="dossier-card"><span class="dossier-id">${esc(d.id)} / DOSSIÊ MOCK</span>
      <h3><a href="${hrefDossier(d)}">${esc(d.title)}</a></h3><p>${esc(d.summary)}</p>
      <a class="card-link" href="${hrefDossier(d)}"><span>${d.storyIds.length} TEXTOS DE EXEMPLO</span><span aria-hidden="true">↗</span></a></article>`;
  }
  function utilityLine() {
    return `<div class="utility-line"><span>DD / SÃO PAULO / SITE CONCEITO</span><strong>SEM PUBLICAÇÕES REAIS</strong><span>VOL. 000 — NOV 2026</span></div>`;
  }
  function sectionHeading(pre, name, side) {
    return `<div class="section-heading"><div><span class="prehead">${esc(pre)}</span><h2>${esc(name)}</h2></div><div class="section-side">${esc(side)}</div></div>`;
  }
  function home() {
    const story = allArticles().find(a => a.featured) || allArticles()[0];
    const next = allArticles().filter(a => a.id !== story.id).slice(0, 3);
    return `<div class="page-wrap">
      ${utilityLine()}
      <section class="hero" aria-labelledby="hero-title"><div class="hero-copy">
        <div class="hero-stamp"><span class="small-line"></span><span class="eyebrow">SE O REAL JÁ É ABSURDO, DOCUMENTE.</span></div>
        <h1 id="hero-title" class="hero-title">A REALIDADE NÃO PRECISA DE <em>ROTEIRISTA.</em></h1>
        <p class="hero-lede">Precisa de fonte. Um jornal independente para investigar os absurdos de verdade, sem perder a capacidade de rir deles. Esta é apenas a edição zero — uma prévia do que o DD pode ser.</p>
        <div class="hero-actions"><a class="btn btn-primary" href="#/materias">EXPLORAR EDIÇÃO ZERO <span class="arrow">↗</span></a><a class="btn btn-outline" href="#/metodo">COMO INVESTIGAMOS <span class="arrow">→</span></a></div>
        <span class="mini-note">SEIS TEXTOS LOREM IPSUM. NENHUMA NOTÍCIA PUBLICADA.</span>
      </div><article class="featured-panel">${motif(story, true)}<div class="featured-content">
        <div class="card-kicker">CAPA DEMONSTRATIVA <span class="separator">/</span> ${esc(story.category)}</div>
        <h2><a href="${hrefArticle(story)}">${esc(story.title)}</a></h2>
        <p>${esc(story.deck)}</p>
        <a class="card-link" href="${hrefArticle(story)}"><span>LER TEXTO DEMONSTRATIVO</span><span aria-hidden="true">↗</span></a></div></article></section>
      <section class="section" aria-labelledby="latest-title">${sectionHeading('01 / O ARQUIVO AINDA É MOCK', 'Páginas de demonstração.', 'Texto Lorem ipsum para testar ritmo, navegação e tipografia.')}
        <div id="latest-title" class="story-grid">${next.map((a, i) => storyCard(a, `00${i+2}`)).join('')}</div>
        <div style="margin-top:26px;text-align:right"><a href="#/materias" class="link-more">VER AS SEIS HISTÓRIAS <span aria-hidden="true">↗</span></a></div></section>
      <section class="section method-band" aria-label="Nosso método"><div><span class="eyebrow">02 / MÉTODO ANTES DA MANCHETE</span><h2 class="method-big">MENOS PALPITE.<br/><em>MAIS RASTRO.</em></h2><p>A voz pode ser ácida. A apuração, não. FARPA organiza o trabalho editorial; Rastro separa o que uma fonte diz daquilo que podemos afirmar.</p><a href="#/metodo" class="link-more">CONHEÇA NOSSO MÉTODO ↗</a></div>
      <div class="method-steps" aria-label="Acrônimo FARPA"><div class="method-tile"><span class="method-letter">F</span><strong>Fatos</strong><small>O que sabemos</small></div><div class="method-tile"><span class="method-letter">A</span><strong>Absurdo</strong><small>O que não fecha</small></div><div class="method-tile"><span class="method-letter">R</span><strong>Responsabilidade</strong><small>Quem responde</small></div><div class="method-tile"><span class="method-letter">P</span><strong>Perspectiva</strong><small>Quem é afetado</small></div><div class="method-tile"><span class="method-letter">A</span><strong>Argumento</strong><small>O que decorre</small></div></div></section>
      <section class="section">${sectionHeading('03 / COLEÇÕES DE PERGUNTAS', 'Dossiês abertos.', 'Na versão real: temas duradouros, documentos e hipóteses rastreáveis. Aqui: demonstração.')}
        <div class="dossier-grid">${state.data.dossiers.map(dossierCard).join('')}</div></section>
      <section class="section issue-band" aria-label="Edição zero"><div><span class="eyebrow" style="color:#151814">EDIÇÃO 000 / EXPERIMENTO ABERTO</span><h2>O mundo pode esperar.<br/>O lançamento, não.</h2><p>Explore o protótipo, confira a navegação e escolha o que merece entrar na próxima versão. Nenhum conteúdo fictício é notícia publicada.</p></div><a href="#/sobre" class="btn btn-outline">SOBRE O DD ↗</a></section>
    </div>`;
  }
  function catalog() {
    const categories = ['Tudo', ...new Set(allArticles().map(a => a.category))];
    return `<div class="page-wrap">
      <section class="page-intro"><div><span class="eyebrow">ARQUIVO / NÚMERO ZERO</span><h1>MATÉRIAS<span style="color:var(--accent)">.</span></h1><p class="intro-lede">Uma interface pública em desenvolvimento. Os textos abaixo são Lorem ipsum e não correspondem a notícias.</p></div><div class="corner-index" aria-hidden="true">06</div></section>
      ${demoAlert()}
      <div class="catalog-toolbar"><div class="filter-set" role="group" aria-label="Filtrar matérias por tema">${categories.map(c => `<button type="button" class="filter-button" data-filter="${esc(c)}" aria-pressed="${c === 'Tudo' ? 'true' : 'false'}">${esc(c)}</button>`).join('')}</div>
      <label class="search-box"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.6 15.6 5.2 5.2"/></svg><input type="search" id="story-search" autocomplete="off" aria-label="Buscar matérias" placeholder="Buscar nesta edição..." /></label></div>
      <p id="result-count" class="result-line" aria-live="polite">6 MATÉRIAS DEMONSTRATIVAS</p>
      <div class="story-grid" id="catalog-grid">${allArticles().map((a,i) => storyCard(a, `00${i+1}`)).join('')}<div class="empty-state" id="empty-results" hidden><strong>Nenhum resultado.</strong> Tente outra palavra ou selecione todos os temas.</div></div>
      <section class="section issue-band"><div><span class="eyebrow" style="color:#151814">CONTEÚDO E APURAÇÃO</span><h2>Nenhuma notícia real ainda.</h2><p>O projeto publicará apenas textos selecionados e aprovados, com proveniência e revisões.</p></div><a href="#/metodo" class="btn btn-outline">ENTENDER O FLUXO ↗</a></section>
    </div>`;
  }
  function articleView(story) {
    const dossier = dossierById(story.dossierId);
    const blocks = story.body.map(block => {
      if(block.type === 'heading') return `<h2>${esc(block.text)}</h2>`;
      if(block.type === 'pullquote') return `<blockquote>${esc(block.text)}</blockquote>`;
      return `<p>${esc(block.text)}</p>`;
    }).join('');
    return `<div class="page-wrap">
      <header class="article-header"><nav class="breadcrumbs" aria-label="Você está aqui"><a href="#/inicio">Início</a><span class="sep">/</span><a href="#/materias">Matérias</a><span class="sep">/</span>${esc(story.category)}</nav>
      <div class="card-kicker" style="margin-top:27px">${esc(story.category)} <span class="separator">/</span> LOREM IPSUM</div>
      <h1 class="article-title">${esc(story.title)}</h1><p class="article-deck">${esc(story.deck)}</p>
      <div class="article-meta"><span>${esc(story.author)}</span><span class="meta-divider">✳</span><span>${esc(story.place)}</span><span class="meta-divider">✳</span><span>${esc(story.minutes)} MIN DE LEITURA</span><span class="meta-divider">✳</span><span>${esc(story.id)}</span></div></header>
      <div class="article-hero-art" data-motif="${esc(story.motif)}" role="img" aria-label="Arte gráfica abstrata de demonstração, sem fotografia real"><span class="poster-symbol" aria-hidden="true">${esc(icons[story.motif])}</span><span class="poster-caption">ARTE CONCEITUAL / NÃO É REGISTRO FOTOGRÁFICO</span></div>
      <div class="article-layout"><article class="article-body">${demoAlert()}${blocks}
        <div class="demo-alert" role="note"><span><strong>FIM DA SIMULAÇÃO.</strong> Esta edição contém somente Lorem ipsum. Não representa investigação, fonte ou publicação jornalística do DD.</span></div>
        <a href="#/materias" class="btn btn-outline">← VOLTAR À EDIÇÃO</a></article>
      <aside class="article-sidebar"><span class="eyebrow">CADERNO DE APURAÇÃO / MOCK</span><h3>Como testaríamos esta história?</h3><p>As perguntas abaixo são ilustrativas. Nenhum procedimento foi executado.</p><ol>${story.verificationPlan.map(q => `<li>${esc(q)}</li>`).join('')}</ol><hr class="sidebar-rule"/>
        <span class="eyebrow">ESTADO DEMONSTRATIVO</span><p>Simulação / Sem evidências anexadas / Não publicável como notícia</p><hr class="sidebar-rule"/>
        <span class="eyebrow">ASSOCIADO A</span><p><a class="link-more" href="${hrefDossier(dossier)}">${esc(dossier.title)} ↗</a></p>
        <button type="button" class="btn btn-outline" data-action="copy-link" style="margin-top:10px;width:100%">COPIAR LINK ↗</button></aside></div>
      <section class="section">${sectionHeading('CONTINUE LENDO / FICÇÃO','Outras histórias.', 'Destaques deste protótipo.')}
        <div class="story-grid">${allArticles().filter(a => a.id !== story.id).slice(0, 3).map((a,i) => storyCard(a, `00${i+1}`,true)).join('')}</div></section>
    </div>`;
  }
  function dossierList() {
    return `<div class="page-wrap"><section class="page-intro"><div><span class="eyebrow">ARQUIVO DE PERGUNTAS / EDIÇÃO ZERO</span><h1>DOSSIÊS<span style="color:var(--accent)">.</span></h1><p class="intro-lede">Uma pergunta pode sobreviver a uma manchete. Aqui ela tem endereço, memória e espaço para mudar de resposta.</p></div><div class="corner-index" aria-hidden="true">03</div></section>
      ${demoAlert()}<section class="section section-first"><div class="dossier-grid">${state.data.dossiers.map(dossierCard).join('')}</div></section>
      <section class="section method-band"><div><span class="eyebrow">DOSSIÊ ≠ MATÉRIA</span><h2 class="method-big">UM ASSUNTO.<br/><em>MUITAS PERGUNTAS.</em></h2></div><p style="margin:auto;max-width:650px;font-size:1.15rem">Na operação real, documentos, evidências e acontecimentos podem alimentar vários dossiês. Uma matéria só aparece no site depois da aprovação editorial e da confirmação de entrega. Este catálogo é apenas Lorem ipsum, não o acervo interno.</p></section>
    </div>`;
  }
  function dossierView(d) {
    return `<div class="page-wrap"><section class="article-header"><nav class="breadcrumbs"><a href="#/inicio">Início</a><span class="sep">/</span><a href="#/dossies">Dossiês</a><span class="sep">/</span>${esc(d.id)}</nav>
      <div class="eyebrow" style="margin-top:34px">${esc(d.id)} / ${esc(d.eyebrow)}</div><h1 class="dossier-detail-title">${esc(d.title)}</h1>${demoAlert()}</section>
      <section class="dossier-details"><div><p class="lead">${esc(d.summary)}</p><h2 class="method-big" style="font-size:2rem;margin-top:48px">PERGUNTAS EM ABERTO<span style="color:var(--accent)">.</span></h2><ul class="question-list">${d.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul></div>
      <dl class="side-facts"><dt>IDENTIDADE</dt><dd>${esc(d.id)}</dd><dt>ESTADO</dt><dd>Demonstração sem apuração</dd><dt>RECORTE</dt><dd>Sem recorte geográfico (mock)</dd><dt>QUESTÃO CENTRAL</dt><dd>${esc(d.focus)}</dd><dt>CONTEÚDOS</dt><dd>${d.storyIds.length} textos ilustrativos</dd></dl></section>
      <section class="section">${sectionHeading('ASSOCIADAS / SOMENTE SIMULAÇÕES','Histórias deste dossiê.', 'Nenhuma corresponde a uma matéria publicada.')}
      <div class="story-grid">${d.storyIds.map((id,i)=>storyCard(articleById(id),`00${i+1}`,true)).join('')}</div></section></div>`;
  }
  function methodView() {
    return `<div class="page-wrap"><div class="editorial-prose"><span class="eyebrow">TRANSPARÊNCIA / COMO PENSAMOS</span><h1>UMA BOA PERGUNTA NÃO TEM MEDO DE UMA RESPOSTA RUIM.</h1>
      <p class="lead">Nossa ironia pode ser insolente. A evidência não. O Distopia Documentada adota um método editorial para procurar contradições sem fabricá-las — e um método de rastreabilidade para guardar o que sustenta cada afirmação.</p>
      <div class="big-quote">“A apuração define o que pode ser afirmado; a narrativa define quando e como apresentar cada afirmação.”</div>
      <span class="eyebrow">01 / FARPA V0.4</span><h2>A personalidade tem método.</h2><p>FARPA significa <strong>Fatos, Absurdo, Responsabilidade, Perspectiva e Argumento</strong>. O processo começa pelo briefing pré-apuração: pergunta, recorte geográfico e temporal, público, formato provisório, fontes a procurar e riscos. Depois vêm apuração, escolha do ângulo, estrutura narrativa e revisão factual e editorial.</p>
      <div class="principle-grid"><div class="principle"><span class="index">F / 01</span><h3>Fatos antes do efeito</h3><p>Alegação, hipótese, opinião e fato documentado não são sinônimos.</p></div>
      <div class="principle"><span class="index">A / 02</span><h3>O absurdo precisa existir</h3><p>A realidade pode contrariar nosso enquadramento inicial. Isso também é resultado.</p></div>
      <div class="principle"><span class="index">R + P / 03</span><h3>Responsabilidade e pessoas</h3><p>Uma manchete não pode transformar suspeita em culpa nem esquecer quem é afetado.</p></div>
      <div class="principle"><span class="index">A / 04</span><h3>Um argumento que se sustente</h3><p>Sátira e linguagem forte não substituem explicação e evidência.</p></div></div>
      <span class="eyebrow">02 / RASTRO V0.1.0</span><h2>Não basta citar um link.</h2><p>No método Rastro, cada <strong>afirmação</strong> pode receber evidências que apoiam, contradizem ou contextualizam. As <strong>hipóteses</strong> vivem separadas dos fatos. Capturas mantêm data, origem e versão. Fontes que reproduzem a mesma informação não viram confirmações independentes por repetição.</p>
      <p>O método também preserva edições anteriores e correções. Uma atualização não deve reescrever silenciosamente o que foi publicado.</p>
      <span class="eyebrow">03 / NÃO CONFUNDIR INTERFACE E VERDADE</span><h2>Este site ainda não publica investigações.</h2><p>Os seis textos e os três dossiês desta edição utilizam <strong>Lorem ipsum</strong>. A interface não consulta o SQLite interno, não recebe dados de apuração e não executa a publicação automaticamente. Apenas apresenta o formato futuro, com uma camada pública de dados separada.</p>
      <p>Antes de uma publicação real, o DD precisará de revisão humana, controle de direitos, privacidade, documentação das fontes e confirmação da entrega. O conteúdo demonstrativo não deve migrar para a base factual.</p>
      <a href="#/materias" class="btn btn-primary" style="margin-top:20px">VER EXEMPLOS FICTÍCIOS ↗</a>
    </div></div>`;
  }
  function aboutView() {
    return `<div class="page-wrap"><div class="editorial-prose"><span class="eyebrow">UM JORNAL SOBRE O MUNDO QUE NÃO PEDE LICENÇA PARA SER ESTRANHO</span><h1>FECHE O MUNDO.<br/><span style="color:var(--accent)">ABRA O PRÓXIMO.</span></h1>
      <p class="lead">Distopia Documentada é um projeto editorial brasileiro dedicado a entender as contradições que já fazem parte da vida real: poder, tecnologia, cidade, dinheiro, vigilância e os pequenos absurdos de todo dia.</p>
      <p>A ideia não é produzir uma fila de tragédias, nem transformar cada manchete numa profecia do fim. Queremos entender o que aconteceu, por que importa, quem foi afetado e o que os documentos realmente permitem afirmar — com linguagem clara, crítica e humor quando ele couber.</p>
      <div class="big-quote">O absurdo é matéria-prima.<br/>A evidência é o filtro.<br/>O humor é a ferramenta.</div>
      <span class="eyebrow">O QUE VOCÊ VAI ENCONTRAR</span><h2>Matérias, dossiês e perguntas novas.</h2><p>Uma história curta pode valer mais que um relatório extenso. Uma investigação pode levar semanas e produzir vários textos. Um dossiê pode continuar aberto mesmo sem uma pauta pronta. Não temos compromisso com uma cota de indignação — temos compromisso com perguntas relevantes e verificáveis.</p>
      <span class="eyebrow">SOBRE ESTA VERSÃO</span><h2>É uma maquete. De propósito.</h2><p>Esta edição zero demonstra a identidade visual e o comportamento do site público. Os textos são apenas Lorem ipsum. Não há acontecimentos, pessoas ou documentos retratados nas matérias de exemplo.</p>
      <p>O acervo interno do DD é separado do site público. Publicações reais dependerão de uma exportação pública revisada, sem dados privados de apuração ou conteúdo não autorizado.</p>
      <a class="btn btn-primary" href="#/metodo" style="margin-top:20px">COMO FUNCIONA O MÉTODO ↗</a>
    </div></div>`;
  }
  function notFound() { return `<div class="page-wrap notfound"><span class="eyebrow">ERRO 404 / DOCUMENTO NÃO ENCONTRADO</span><h1>PERDEU O FIO?</h1><p>Esta rota não existe na edição zero.</p><a class="btn btn-primary" href="#/inicio">VOLTAR À CAPA →</a></div>`; }
  function parseRoute() {
    const raw = decodeURIComponent((location.hash || '#/inicio').slice(1)).replace(/^\/+/, '');
    const path = raw.split('?')[0].split('/').filter(Boolean);
    return path.length ? path : ['inicio'];
  }
  function render() {
    if (!state.data) return;
    const [page, ...params] = parseRoute();
    let html, title, nav;
    if(page === 'inicio'){html=home();title='Início';nav='inicio';}
    else if(page === 'materias'){html=catalog();title='Matérias';nav='materias';state.filter='Tudo';state.search='';}
    else if(page === 'materia'){const story=allArticles().find(a=>a.slug===params[0]);html=story?articleView(story):notFound();title=story?story.title:'Página não encontrada';nav='materias';}
    else if(page === 'dossies'){html=dossierList();title='Dossiês';nav='dossies';}
    else if(page === 'dossie'){const dossier=state.data.dossiers.find(d=>d.slug===params[0]);html=dossier?dossierView(dossier):notFound();title=dossier?dossier.title:'Página não encontrada';nav='dossies';}
    else if(page === 'metodo'){html=methodView();title='Método';nav='metodo';}
    else if(page === 'sobre'){html=aboutView();title='Sobre';nav='sobre';}
    else{html=notFound();title='Página não encontrada';nav='';}
    root.innerHTML = html;
    document.title = `${title} · Distopia Documentada — DEMO`;
    for (const link of document.querySelectorAll('[data-nav]')) {
      if (link.dataset.nav === nav) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    }
    const mobile = document.getElementById('mobile-nav');
    mobile.hidden = true;
    document.querySelector('[data-action="menu"]').setAttribute('aria-expanded','false');
    if (state.lastPath !== location.hash) {window.scrollTo({top:0,behavior:'instant'});state.lastPath=location.hash;}
  }
  function filterStories() {
    const cards = [...document.querySelectorAll('.catalog-card')];
    if(!cards.length) return;
    const query = state.search.trim().toLocaleLowerCase('pt-BR');
    let visible=0;
    for(const card of cards) {
      const show=(state.filter==='Tudo'||card.dataset.category===state.filter) && card.dataset.search.includes(query);
      card.hidden=!show;if(show)visible++;
    }
    const count=document.getElementById('result-count');
    if(count)count.textContent = `${visible} ${visible===1?'MATÉRIA DEMONSTRATIVA':'MATÉRIAS DEMONSTRATIVAS'}`;
    const empty=document.getElementById('empty-results');if(empty)empty.hidden=visible>0;
    document.querySelectorAll('[data-filter]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.filter===state.filter)));
  }
  function toggleTheme() {
    const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=next;
    try{localStorage.setItem('dd-site-theme',next);}catch(_e){}
  }
  document.addEventListener('click', async event => {
    const btn=event.target.closest('[data-action], [data-filter]');
    if(btn?.dataset.filter){state.filter=btn.dataset.filter;filterStories();return;}
    if(!btn) return;
    const action=btn.dataset.action;
    if(action==='skip'){ event.preventDefault(); root.focus(); return; }
    if(action==='top'){ window.scrollTo({top:0,behavior:'smooth'}); return; }
    if(action==='theme') toggleTheme();
    if(action==='menu'){
      const nav=document.getElementById('mobile-nav');nav.hidden=!nav.hidden;
      btn.setAttribute('aria-expanded',String(!nav.hidden));
    }
    if(action==='search'){
      if(location.hash!=='#/materias')location.hash='#/materias';
      requestAnimationFrame(()=>document.getElementById('story-search')?.focus());
    }
    if(action==='copy-link'){
      const text=location.href;
      try{await navigator.clipboard.writeText(text);btn.textContent='LINK COPIADO ✓';}
      catch(_e){btn.textContent='CÓPIA INDISPONÍVEL';}
    }
  });
  document.addEventListener('input', event => {
    if(event.target.id==='story-search'){state.search=event.target.value;filterStories();}
  });
  document.addEventListener('keydown', event => {
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){
      event.preventDefault();if(location.hash!=='#/materias')location.hash='#/materias';
      requestAnimationFrame(()=>document.getElementById('story-search')?.focus());
    }
    if(event.key==='Escape'){
      const nav=document.getElementById('mobile-nav');nav.hidden=true;
      document.querySelector('[data-action="menu"]').setAttribute('aria-expanded','false');
    }
  });
  window.addEventListener('hashchange',render);
  try{const preferred=localStorage.getItem('dd-site-theme');if(preferred==='light'||preferred==='dark')document.documentElement.dataset.theme=preferred;}catch(_e){}
  document.getElementById('footer-year').textContent=new Date().getFullYear();
  fetch('./data/public-demo.json',{cache:'no-store'})
    .then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json();})
    .then(data=>{
      if(data.schemaVersion!=='dd.public.v0.1'||data.mode!=='demo'||!Array.isArray(data.articles)||!Array.isArray(data.dossiers)) throw new Error('Contrato de dados de demonstração inválido');
      state.data=data;render();
    })
    .catch(error=>{
      root.innerHTML=`<div class="page-wrap notfound"><span class="eyebrow">DADOS NÃO CARREGADOS</span><h1>FALTOU O ARQUIVO.</h1><p>Abra o projeto com um servidor HTTP local. Erro: ${esc(error.message)}</p><p><code>python -m http.server 8000</code></p></div>`;
      console.error('DD site:',error);
    });
})();
