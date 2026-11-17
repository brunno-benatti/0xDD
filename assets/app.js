(() => {
  'use strict';
  const root = document.getElementById('conteudo');
  const state = { data: null, filter: 'Tudo', search: '', lastRoute: null };
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const articleUrl = a => `#/materia/${encodeURIComponent(a.slug)}`;
  const dossierUrl = d => `#/dossie/${encodeURIComponent(d.slug)}`;
  const dossierFor = id => state.data.dossiers.find(d => d.id === id);
  const byArticleId = id => state.data.articles.find(a => a.id === id);
  const meta = text => `<span class="meta">${esc(text)}</span>`;
  const arrow = '<span aria-hidden="true">↗</span>';
  const demoWarning = () => '<div class="demo-notice" role="note"><strong>EDIÇÃO DE TESTE</strong><span>Texto Lorem ipsum para diagramação. Nenhum conteúdo corresponde a notícia ou investigação real.</span></div>';
  const sectionTitle = (number, label, title, aside = '') => `<div class="section-title"><div><span class="meta section-index">${esc(number)} / ${esc(label)}</span><h2>${esc(title)}</h2></div>${aside ? `<p>${esc(aside)}</p>` : ''}</div>`;

  function schematic(id, variant = 'standard') {
    return `<div class="schematic schematic-${variant}" role="img" aria-label="Arte vetorial abstrata do arquivo de demonstração, não é fotografia">
      <span class="schematic-top">FIG / ${esc(id)} <span>0xDD — 000</span></span>
      <div class="schematic-core" aria-hidden="true"><span class="blueprint-frame"></span><span class="blueprint-inner"></span><span class="blueprint-axis"></span><span class="blueprint-index">PL. 01 / 0xDD</span><span class="schematic-dd">DD</span><span class="blueprint-code"><i></i><i></i><i></i><i></i><i></i></span></div>
      <span class="schematic-bottom">DOCUMENTO / SIMULAÇÃO <span>REFERÊNCIA VISUAL</span></span>
    </div>`;
  }
  function storyRow(a, n) {
    return `<article class="story-row reveal catalog-card" data-category="${esc(a.category)}" data-search="${esc((a.title+' '+a.deck+' '+a.category).toLocaleLowerCase('pt-BR'))}">
      <span class="story-row-number">${String(n).padStart(2,'0')} <small>/ ${esc(a.id)}</small></span>
      <div class="story-row-copy"><span class="meta story-category">${esc(a.category)} <span>· ${esc(a.minutes)} MIN</span></span><h3><a href="${articleUrl(a)}">${esc(a.title)}</a></h3><p>${esc(a.deck)}</p></div>
      <a href="${articleUrl(a)}" class="row-open" aria-label="Abrir ${esc(a.title)}">↗</a>
    </article>`;
  }
  function storyCard(a, n) {
    return `<article class="compact-story reveal catalog-card" data-category="${esc(a.category)}" data-search="${esc((a.title+' '+a.deck+' '+a.category).toLocaleLowerCase('pt-BR'))}">
      <div class="compact-meta"><span>DOC.${String(n).padStart(2,'0')}</span><span>${esc(a.category)}</span></div><h3><a href="${articleUrl(a)}">${esc(a.title)}</a></h3><p>${esc(a.deck)}</p><a class="text-link" href="${articleUrl(a)}">ABRIR ARQUIVO ${arrow}</a>
    </article>`;
  }
  function dossierCard(d, n) {
    return `<article class="dossier-card reveal"><div class="dossier-number">D/${String(n).padStart(2,'0')}<span>${esc(d.id)}</span></div><div class="dossier-copy"><span class="meta">COLEÇÃO DEMONSTRATIVA</span><h3><a href="${dossierUrl(d)}">${esc(d.title)}</a></h3><p>${esc(d.summary)}</p></div><div class="dossier-foot"><span>${esc(d.storyIds.length)} TEXTOS MOCK</span><a href="${dossierUrl(d)}" aria-label="Abrir dossiê ${esc(d.title)}">ABRIR ↗</a></div></article>`;
  }
  function home() {
    const featured = state.data.articles.find(a => a.featured) || state.data.articles[0];
    const remaining = state.data.articles.filter(a => a.id !== featured.id);
    return `<div class="home">
      <section class="opening" aria-labelledby="opening-title"><div class="shell">
        <div class="opening-top meta"><span>DD / DOSSIÊ PÚBLICO</span><span>ANO 01 — EDIÇÃO 000</span><span>SÃO PAULO / BRASIL</span></div>
        <div class="opening-grid"><div class="opening-copy reveal">
          <span class="kicker"><b>0x</b> UMA PUBLICAÇÃO SOBRE O ABSURDO DOCUMENTADO</span>
          <h1 id="opening-title">A REALIDADE<br>NÃO PRECISA<br>DE <em>ROTEIRISTA.</em></h1>
          <div class="opening-intro"><div class="opening-rule"><span>01</span><span>EDITORIAL / 000</span></div><div><p>Precisa de fonte. Um jornal para investigar as contradições do mundo real, sem perder a capacidade de rir delas.</p><div class="opening-actions"><a class="btn btn-amber" href="#/materias">EXPLORAR O ARQUIVO <span>↗</span></a><a class="quiet-link" href="#/metodo">CONHEÇA O MÉTODO ↗</a></div></div></div>
        </div><aside class="opening-aside reveal">${schematic(featured.id, 'hero')}<a class="opening-feature" href="${articleUrl(featured)}"><span><small>AMOSTRA / 001</small><strong>${esc(featured.title)}</strong></span>${arrow}</a></aside></div>
        <div class="opening-bottom meta"><span>DEMONSTRAÇÃO DE INTERFACE / SEM NOTÍCIAS REAIS</span><span>SCROLL PARA CONTINUAR ↓</span></div>
      </div></section>
      <section class="archive-section paper-section"><div class="shell">
        ${sectionTitle('01','ARQUIVO', 'O que merece outra olhada.', 'Amostras de diagramação. Nenhuma delas retrata um acontecimento real.')}
        <div class="archive-layout"><div class="archive-feature reveal"><div class="archive-feature-top"><span>CAPA / DOC.001</span><span>EDIÇÃO ZERO</span></div><h3><a href="${articleUrl(featured)}">${esc(featured.title)}</a></h3><p>${esc(featured.deck)}</p><a class="text-link" href="${articleUrl(featured)}">ACESSAR TEXTO DEMONSTRATIVO ${arrow}</a><div class="archive-feature-index" aria-hidden="true">01</div></div>
        <div class="archive-list">${remaining.slice(0,3).map((a,i)=>storyRow(a,i+2)).join('')}</div></div>
        <div class="section-tail"><span>04 DE 06 REGISTROS DEMONSTRATIVOS</span><a href="#/materias">VER O ARQUIVO COMPLETO ↗</a></div>
      </div></section>
      <section class="statement-section"><div class="shell statement-inner reveal"><span class="meta amber">INTERLÚDIO / O QUE NOS MOVE</span><p>O absurdo já está nos fatos.<br><em>Não precisamos inventar mais.</em></p><div class="statement-foot"><span>PERGUNTA → FONTE → EVIDÊNCIA → TEXTO</span><a href="#/sobre">SOBRE O PROJETO ↗</a></div></div></section>
      <section class="method-section"><div class="shell"><div class="method-top reveal"><span class="meta amber">02 / PROCESSO EDITORIAL</span><h2>UM MÉTODO PARA<br><em>DESCONFIAR MELHOR.</em></h2><p>A personalidade pode ser ácida. A apuração precisa ser rigorosa. FARPA organiza a narrativa; Rastro sustenta o que pode ser afirmado.</p></div>
        <div class="method-system"><div class="method-system-title"><span>FARPA / v0.4</span><span>CINCO PRINCÍPIOS / UMA PERGUNTA DE CADA VEZ</span></div><div class="method-grid">
        ${[['F','FATOS','O que sabemos'],['A','ABSURDO','O que não fecha'],['R','RESPONSABILIDADE','Quem responde'],['P','PERSPECTIVA','Quem é afetado'],['A','ARGUMENTO','O que decorre']].map((x,i)=>`<div class="method-cell"><span class="method-index">0${i+1}</span><strong>${x[0]}</strong><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join('')}</div></div>
        <a href="#/metodo" class="text-link method-more">ENTENDA A METODOLOGIA COMPLETA ↗</a></div></section>
      <section class="dossiers-section paper-section"><div class="shell">
        ${sectionTitle('03','INVESTIGAÇÃO CONTÍNUA','Um tema não cabe numa manchete.','Dossiês são coleções de perguntas que sobrevivem a cada publicação.')}
        <div class="dossier-grid">${state.data.dossiers.map((d,i)=>dossierCard(d,i+1)).join('')}</div>
        <div class="section-tail"><span>03 COLEÇÕES / 100% PLACEHOLDER</span><a href="#/dossies">EXPLORAR DOSSIÊS ↗</a></div>
      </div></section>
      <section class="closing-section"><div class="shell closing-inner"><span class="meta amber">0xDD / DEPOIS DO FIM</span><h2>FECHE O MUNDO.<br><em>ABRA O PRÓXIMO.</em></h2><div class="closing-row"><p>Entender os absurdos, rir quando couber e continuar. Sem fabricar certezas, sem romantizar o caos.</p><a href="#/sobre" class="btn btn-amber">CONHEÇA O PROJETO ↗</a></div></div></section>
    </div>`;
  }
  function pageHeader(section, id, title, lede) {
    return `<section class="page-heading"><div class="shell"><div class="page-heading-top meta"><span>${esc(section)} / 0xDD</span><span>${esc(id)}</span></div><div class="page-heading-main"><h1>${esc(title)}</h1><p>${esc(lede)}</p></div></div></section>`;
  }
  function catalog() {
    const categories = ['Tudo', ...new Set(state.data.articles.map(a=>a.category))];
    return `${pageHeader('ARQUIVO PÚBLICO','ÍNDICE / 001', 'MATÉRIAS.', 'Seis textos Lorem ipsum para testar leitura e navegação. Nenhuma reportagem real nesta edição.')}
      <div class="paper-surface"><div class="shell catalog-body">${demoWarning()}<div class="catalog-tools"><div class="filter-set" role="group" aria-label="Filtrar por tema">${categories.map(c=>`<button type="button" data-filter="${esc(c)}" aria-pressed="${String(state.filter === c)}">${esc(c)}</button>`).join('')}</div><label class="search-field"><span aria-hidden="true">⌕</span><input id="story-search" type="search" aria-label="Buscar matérias" autocomplete="off" placeholder="BUSCAR NO ARQUIVO"></label></div>
      <div class="list-heading"><span id="result-count" aria-live="polite">06 REGISTROS</span><span>ORDEM / EDIÇÃO ZERO</span></div>
      <div id="catalog-grid" class="catalog-list">${state.data.articles.map((a,i)=>storyRow(a,i+1)).join('')}<div id="empty-results" class="empty-state" hidden>Nenhum registro corresponde à pesquisa.</div></div>
      <div class="endnote">ARQUIVO EM DESENVOLVIMENTO / AS PUBLICAÇÕES REAIS EXIGIRÃO REVISÃO E APROVAÇÃO EDITORIAL</div></div></div>`;
  }
  function articleView(story) {
    const dossier = dossierFor(story.dossierId);
    const blocks = story.body.map(b=>b.type==='heading'?`<h2>${esc(b.text)}</h2>`:b.type==='pullquote'?`<blockquote>${esc(b.text)}</blockquote>`:`<p>${esc(b.text)}</p>`).join('');
    return `<section class="article-cover"><div class="shell"><nav class="crumbs" aria-label="Você está aqui"><a href="#/inicio">CAPA</a><span>/</span><a href="#/materias">MATÉRIAS</a><span>/</span><span>${esc(story.id)}</span></nav>
      <div class="article-cover-layout"><div><span class="kicker"><b>DOC</b> ${esc(story.category)} / LOREM IPSUM</span><h1>${esc(story.title)}</h1><p class="article-deck">${esc(story.deck)}</p><div class="article-cover-meta"><span>${esc(story.author)}</span><span>${esc(story.minutes)} MIN DE LEITURA</span><span>${esc(story.id)} / DEMO</span></div></div><div class="article-cover-figure">${schematic(story.id)}</div></div>
    </div></section><div class="paper-surface"><div class="shell article-layout"><article class="article-body">${demoWarning()}${blocks}<div class="article-terminal"><strong>FIM DO REGISTRO / DEMONSTRAÇÃO</strong><p>Este documento contém somente texto Lorem ipsum e não apresenta resultados de apuração.</p><a href="#/materias">← VOLTAR AO ARQUIVO</a></div></article>
      <aside class="article-side"><div class="aside-header"><span>NOTAS DE MÉTODO</span><span>${esc(story.id)}</span></div><h2>Como investigaríamos este assunto?</h2><p>Perguntas ilustrativas; nenhuma verificação realizada.</p><ol>${story.verificationPlan.map(q=>`<li>${esc(q)}</li>`).join('')}</ol><div class="aside-foot"><span class="meta">VÍNCULO / DOSSIÊ MOCK</span><a href="${dossierUrl(dossier)}">${esc(dossier.title)} ↗</a></div><button type="button" class="aside-copy" data-action="copy-link">COPIAR LINK ↗</button></aside></div>
      <div class="shell related">${sectionTitle('04','CONTINUE EXPLORANDO','Outros registros.')}<div class="compact-grid">${state.data.articles.filter(a=>a.id!==story.id).slice(0,3).map((a,i)=>storyCard(a,i+1)).join('')}</div></div></div>`;
  }
  function dossiers() {
    return `${pageHeader('COLEÇÕES','ÍNDICE / 002','DOSSIÊS.','Um arquivo de perguntas, documentos e hipóteses — aqui representado apenas por textos de demonstração.')}
      <div class="paper-surface"><div class="shell dossiers-page">${demoWarning()}<div class="dossier-grid">${state.data.dossiers.map((d,i)=>dossierCard(d,i+1)).join('')}</div><div class="concept-note"><span class="meta amber">DOSSIÊ ≠ MATÉRIA</span><h2>O assunto continua<br>quando a manchete acaba.</h2><p>Na operação real, uma investigação pode produzir várias matérias. O protótipo mantém essas relações sem divulgar dados internos.</p></div></div></div>`;
  }
  function dossierView(d) {
    return `<section class="article-cover dossier-cover"><div class="shell"><nav class="crumbs"><a href="#/inicio">CAPA</a><span>/</span><a href="#/dossies">DOSSIÊS</a><span>/</span><span>${esc(d.id)}</span></nav><div class="dossier-cover-content"><span class="kicker"><b>D /</b> ${esc(d.eyebrow)}</span><h1>${esc(d.title)}</h1><p>${esc(d.summary)}</p></div></div></section>
      <div class="paper-surface"><div class="shell dossier-detail">${demoWarning()}<div class="dossier-detail-grid"><section><span class="meta amber">QUESTÕES / SIMULAÇÃO</span><h2>O que precisamos perguntar.</h2><ol class="question-list">${d.questions.map((q,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span>${esc(q)}</li>`).join('')}</ol></section><aside class="dossier-facts"><span class="meta">FICHA DE ARQUIVO</span><dl><dt>IDENTIFICADOR</dt><dd>${esc(d.id)}</dd><dt>ESTADO</dt><dd>DEMONSTRAÇÃO SEM APURAÇÃO</dd><dt>QUESTÃO CENTRAL</dt><dd>${esc(d.focus)}</dd><dt>CONTEÚDO</dt><dd>${d.storyIds.length} TEXTOS MOCK</dd></dl></aside></div>
      <div class="related">${sectionTitle('05','ASSOCIADAS','Matérias desta coleção.')}<div class="compact-grid">${d.storyIds.map((id,i)=>storyCard(byArticleId(id),i+1)).join('')}</div></div></div></div>`;
  }
  function method() {
    return `${pageHeader('TRANSPARÊNCIA','PROCESSO / 003','MÉTODO.','A voz pode ser contundente. A evidência precisa sustentar cada afirmação.')}
      <div class="paper-surface"><div class="shell prose-shell">${sectionTitle('00','ANTES DE COMEÇAR','Primeiro, a pergunta.')}<p class="prose-lead">A investigação começa pelo briefing: recorte, relevância, fontes, riscos e hipóteses. Uma intuição interessante não é um fato.</p>
      <div class="prose-rule"><span>FARPA / v0.4</span><span>MÉTODO EDITORIAL</span></div><h2>Uma narrativa com lastro.</h2><p>FARPA significa <strong>Fatos, Absurdo, Responsabilidade, Perspectiva e Argumento</strong>. O processo começa com o briefing pré-apuração e avança para coleta, análise, organização narrativa e revisão editorial.</p>
      <div class="method-grid method-grid-light">${[['F','FATOS','O que sabemos'],['A','ABSURDO','O que não fecha'],['R','RESPONSABILIDADE','Quem responde'],['P','PERSPECTIVA','Quem é afetado'],['A','ARGUMENTO','O que decorre']].map((x,i)=>`<div class="method-cell"><span class="method-index">0${i+1}</span><strong>${x[0]}</strong><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join('')}</div>
      <div class="prose-rule"><span>RASTRO / v0.1.0</span><span>PROVENIÊNCIA</span></div><h2>Uma fonte não é uma conclusão.</h2><p>No método Rastro, afirmações podem receber evidências de apoio, contradição e contexto. Hipóteses não se confundem com fatos documentados, e fontes dependentes não viram confirmações independentes só por repetição.</p><p>Correções e revisões precisam de registro. Uma edição não deve apagar silenciosamente o que foi publicado anteriormente.</p>
      <div class="prose-rule"><span>AMBIENTE DE DEMONSTRAÇÃO</span><span>PUBLICAÇÃO / NÃO INICIADA</span></div><h2>Este site não é a base de apuração.</h2><p>Os seis artigos e três dossiês são apenas Lorem ipsum. Nenhuma informação interna, banco SQLite, fonte sensível ou apuração está conectada ao site público. Qualquer publicação real depende de revisão humana, privacidade, direitos e autorização explícita.</p><a href="#/materias" class="btn btn-dark">EXPLORAR O PROTÓTIPO ↗</a></div></div>`;
  }
  function about() {
    return `${pageHeader('IDENTIDADE','MANIFESTO / 004','O PROJETO.','Feche o mundo. Abra o próximo.')}
      <div class="paper-surface"><div class="shell prose-shell"><p class="prose-lead">Distopia Documentada é um projeto editorial brasileiro para investigar contradições reais, interpretar os documentos disponíveis e ainda encontrar espaço para o humor.</p>
      <div class="prose-rule"><span>01 / POSICIONAMENTO</span><span>DOCUMENTAR ANTES DE JULGAR</span></div><h2>Nem distopia de mentira.<br>Nem otimismo automático.</h2><p>O objetivo não é produzir uma fila de tragédias, mas entender o que aconteceu, por que importa e quem foi afetado. Quando os fatos forem absurdos, a ironia deve acompanhar as evidências — nunca substituí-las.</p>
      <blockquote class="manifesto-quote">O absurdo é matéria-prima.<br>A evidência é o filtro.<br>O humor é a ferramenta.</blockquote>
      <div class="prose-rule"><span>02 / O QUE CONSTRUÍMOS</span><span>ARQUIVO EM EXPANSÃO</span></div><h2>Matérias. Dossiês. Perguntas.</h2><p>Uma notícia pontual pode merecer uma nota; uma investigação pode permanecer aberta por meses. O DD distingue o relato dos fatos, o trabalho investigativo e a opinião editorial.</p>
      <div class="prose-rule"><span>03 / SOBRE ESTA DEMONSTRAÇÃO</span><span>ED. 000 / LOREM IPSUM</span></div><h2>Por enquanto, uma maquete.</h2><p>Todos os textos de matérias e dossiês são conteúdo fictício tipográfico. Não há pessoas, acontecimentos, entrevistas nem documentos reais apresentados como apuração.</p><a href="#/metodo" class="btn btn-dark">CONHECER O MÉTODO ↗</a></div></div>`;
  }
  function notFound() {return `<div class="paper-surface"><div class="shell notfound"><span class="meta amber">ERRO 404 / FORA DO ARQUIVO</span><h1>PERDEU O RASTRO.</h1><p>A página solicitada não existe na edição zero.</p><a class="btn btn-dark" href="#/inicio">VOLTAR À CAPA ↗</a></div></div>`;}
  function routeParts(){
    try {return decodeURIComponent((location.hash||'#/inicio').slice(1)).split('?')[0].split('/').filter(Boolean)}
    catch (_) {return ['404'];}
  }
  function render(){
    if(!state.data) return;
    const [page='inicio', slug] = routeParts();
    let html, label, nav=page;
    if(page==='inicio'){html=home();label='Capa';}
    else if(page==='materias'){state.filter='Tudo';state.search='';html=catalog();label='Matérias';}
    else if(page==='materia'){const a=state.data.articles.find(x=>x.slug===slug);html=a?articleView(a):notFound();label=a?a.title:'Não encontrada';nav='materias';}
    else if(page==='dossies'){html=dossiers();label='Dossiês';}
    else if(page==='dossie'){const d=state.data.dossiers.find(x=>x.slug===slug);html=d?dossierView(d):notFound();label=d?d.title:'Não encontrado';nav='dossies';}
    else if(page==='metodo'){html=method();label='Método';}
    else if(page==='sobre'){html=about();label='O projeto';}
    else{html=notFound();label='Não encontrado';nav='';}
    root.innerHTML=html;
    document.title=`${label} / Distopia Documentada`;
    document.body.classList.toggle('is-article',page==='materia');
    document.querySelectorAll('[data-nav]').forEach(el=>el.dataset.nav===nav?el.setAttribute('aria-current','page'):el.removeAttribute('aria-current'));
    const menu=document.getElementById('mobile-nav');menu.hidden=true;
    document.querySelector('[data-action="menu"]').setAttribute('aria-expanded','false');
    if(state.lastRoute!==location.hash){window.scrollTo({top:0,behavior:'auto'});state.lastRoute=location.hash;}
    setupReveal();updateReadingProgress();
  }
  let observer;
  function setupReveal(){
    if(observer) observer.disconnect();
    const elements=[...root.querySelectorAll('.reveal')];
    if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){elements.forEach(x=>x.classList.add('visible'));return;}
    observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.05,rootMargin:'0px 0px 55px 0px'});
    elements.forEach(e=>observer.observe(e));
  }
  function filterStories(){
    const q=state.search.trim().toLocaleLowerCase('pt-BR');let total=0;
    root.querySelectorAll('#catalog-grid .catalog-card').forEach(el=>{const ok=(state.filter==='Tudo'||el.dataset.category===state.filter)&&el.dataset.search.includes(q);el.hidden=!ok;if(ok)total++;});
    root.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.filter===state.filter)));
    const count=document.getElementById('result-count');if(count)count.textContent=`${String(total).padStart(2,'0')} ${total===1?'REGISTRO':'REGISTROS'}`;
    const empty=document.getElementById('empty-results');if(empty)empty.hidden=total>0;
  }
  function updateReadingProgress(){
    const bar=document.getElementById('reading-progress-bar');if(!bar)return;
    const article=root.querySelector('.article-body');
    if(!article){bar.style.transform='scaleX(0)';return;}
    const y=window.scrollY;const top=article.getBoundingClientRect().top+y;
    const end=top+article.offsetHeight-window.innerHeight*.35;
    const value=Math.max(0,Math.min(1,(y-top)/Math.max(1,end-top)));
    bar.style.transform=`scaleX(${value})`;
  }
  function toggleTheme(){
    const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=next;
    try{localStorage.setItem('dd-site-theme',next);}catch(_){}
  }
  document.addEventListener('click',async ev=>{
    const btn=ev.target.closest('[data-action], [data-filter]');
    if(!btn)return;
    if(btn.hasAttribute('data-filter')){state.filter=btn.dataset.filter;filterStories();return;}
    const a=btn.dataset.action;
    if(a==='skip'){ev.preventDefault();root.focus();}
    if(a==='theme')toggleTheme();
    if(a==='top')window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    if(a==='menu'){const menu=document.getElementById('mobile-nav');menu.hidden=!menu.hidden;btn.setAttribute('aria-expanded',String(!menu.hidden));}
    if(a==='search')openSearch();
    if(a==='copy-link'){
      try{await navigator.clipboard.writeText(location.href);btn.textContent='LINK COPIADO ✓';}
      catch(_){btn.textContent='CÓPIA INDISPONÍVEL';}
    }
  });
  function openSearch(){
    if(location.hash!=='#/materias') location.hash='#/materias';
    requestAnimationFrame(()=>document.getElementById('story-search')?.focus());
  }
  document.addEventListener('input',ev=>{if(ev.target.id==='story-search'){state.search=ev.target.value;filterStories();}});
  document.addEventListener('keydown',ev=>{
    if((ev.ctrlKey||ev.metaKey)&&ev.key.toLowerCase()==='k'){ev.preventDefault();openSearch();}
    if(ev.key==='Escape'){const nav=document.getElementById('mobile-nav');if(nav&&!nav.hidden){nav.hidden=true;document.querySelector('[data-action="menu"]').setAttribute('aria-expanded','false');}}
  });
  let scheduled=false;
  window.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{updateReadingProgress();scheduled=false;});},{passive:true});
  window.addEventListener('resize',updateReadingProgress,{passive:true});
  window.addEventListener('hashchange',render);
  document.getElementById('footer-year').textContent=String(new Date().getFullYear());
  try{const theme=localStorage.getItem('dd-site-theme');if(theme==='dark'||theme==='light')document.documentElement.dataset.theme=theme;}catch(_){}
  fetch('./data/public-demo.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json();}).then(data=>{
    if(data.schemaVersion!=='dd.public.v0.1'||data.mode!=='demo'||!Array.isArray(data.articles)||!Array.isArray(data.dossiers)) throw new Error('Formato demo inválido');
    state.data=data;render();
  }).catch(err=>{root.innerHTML=`<div class="shell load-error"><span class="meta amber">ERRO DE CARREGAMENTO</span><h1>ARQUIVO INDISPONÍVEL.</h1><p>Não foi possível carregar os dados de demonstração. Use um servidor HTTP local para abrir o projeto.</p><code>${esc(err.message)}</code></div>`;});
})();
