#!/usr/bin/env python3
"""Chromium DOM preview regression. Not an HTTP/Pages validation."""
from pathlib import Path
import json,re,shutil
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'tests'/'reports';OUT.mkdir(parents=True,exist_ok=True)
html=(ROOT/'PREVIEW_OFFLINE.html').read_text(encoding='utf-8')
# No network dependency during test; actual font host rendering remains outside this test.
html=re.sub(r'<link[^>]+fonts\.googleapis\.com[^>]*>', '', html)
html=re.sub(r'<link[^>]+fonts\.gstatic\.com[^>]*>', '', html)
report={'basis':'Chromium set_content with self-contained offline preview; external font URLs removed', 'routes':[], 'horizontal_overflow':[], 'page_errors':[], 'checks':{}}
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path=shutil.which('chromium'),args=['--no-sandbox'])
    for name,w,h in [('desktop',1440,900),('tablet',768,1024),('mobile',390,844),('small',320,720)]:
        page=browser.new_page(viewport={'width':w,'height':h},reduced_motion='reduce')
        page.on('pageerror', lambda e:report['page_errors'].append(str(e)))
        page.set_content(html,wait_until='domcontentloaded')
        page.locator('.opening h1').wait_for(timeout=10000)
        assert page.locator('.story-row').count()==3, 'home should show 3 rows'
        if name in ('desktop','mobile'):
            page.screenshot(path=str(OUT/f'{name}_home.png'),animations='disabled')
            page.screenshot(path=str(OUT/f'{name}_home_full.png'),full_page=True,animations='disabled')
        routes=[('home','#/inicio','.opening h1'),('catalog','#/materias','#catalog-grid'),('article','#/materia/lorem-ipsum-dolor-sit-amet','.article-body'),('dossiers','#/dossies','.dossier-grid'),('dossier','#/dossie/lorem-ipsum','.question-list'),('method','#/metodo','.prose-shell'),('about','#/sobre','.prose-shell'),('notfound','#/nonexistent','.notfound')]
        for key,url,selector in routes:
            page.evaluate('(v)=>location.hash=v',url)
            page.locator(selector).wait_for(timeout=10000)
            measurements=page.evaluate('''() => ({viewport: window.innerWidth, doc: document.documentElement.scrollWidth, body: document.body.scrollWidth, h1:document.querySelector('h1')?.innerText?.slice(0,60), theme:document.documentElement.dataset.theme})''')
            report['routes'].append({'size':name,'route':key,**measurements})
            if measurements['doc']>w+1 or measurements['body']>w+1:report['horizontal_overflow'].append({'size':name,'route':key,**measurements})
            if name in ('desktop','mobile') and key in ('catalog','article','dossiers','method'):
                page.screenshot(path=str(OUT/f'{name}_{key}.png'),animations='disabled')
        if name=='desktop':
            page.evaluate("location.hash='#/materias'");page.locator('#story-search').wait_for()
            assert page.locator('#catalog-grid .catalog-card:visible').count()==6
            page.locator('#story-search').fill('Aliquam')
            report['checks']['search_matches']=page.locator('#catalog-grid .catalog-card:visible').count()
            page.locator('[data-filter="Tecnologia & poder"]').click()
            report['checks']['combined_filter']=page.locator('#catalog-grid .catalog-card:visible').count()
            page.locator('#story-search').fill('')
            report['checks']['technology_filter']=page.locator('#catalog-grid .catalog-card:visible').count()
            assert report['checks']['technology_filter']==2
            report['checks']['filter_aria']=page.locator('[data-filter="Tecnologia & poder"]').get_attribute('aria-pressed')
            page.locator('[data-action="theme"]').click()
            report['checks']['toggle_theme']=page.locator('html').get_attribute('data-theme')
            assert report['checks']['toggle_theme']=='light'
            page.evaluate("location.hash='#/materia/lorem-ipsum-dolor-sit-amet'");page.locator('.article-body').wait_for()
            report['checks']['reading_progress_exists']=page.locator('#reading-progress-bar').count()==1
            report['checks']['article_body_paragraphs']=page.locator('.article-body>p').count()
            assert report['checks']['article_body_paragraphs']==5
            page.evaluate('window.scrollTo(0,document.body.scrollHeight/2)')
            page.wait_for_timeout(100)
            report['checks']['reading_progress_transform']=page.locator('#reading-progress-bar').evaluate('e=>getComputedStyle(e).transform')
        if name=='mobile':
            page.evaluate("location.hash='#/inicio'");page.locator('.opening').wait_for()
            page.locator('[data-action="menu"]').click()
            report['checks']['mobile_nav_visible']=page.locator('#mobile-nav').is_visible()
            assert report['checks']['mobile_nav_visible']
            page.locator('#mobile-nav a[href="#/dossies"]').click()
            page.locator('.page-heading h1').wait_for()
            report['checks']['mobile_nav_closed']=not page.locator('#mobile-nav').is_visible()
            assert report['checks']['mobile_nav_closed']
        page.close()
    browser.close()
assert not report['horizontal_overflow'],str(report['horizontal_overflow'])
assert not report['page_errors'],str(report['page_errors'])
assert report['checks']['search_matches']>=1
assert report['checks']['filter_aria']=='true'
(OUT/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'route_viewport_cases':len(report['routes']),'overflow_count':len(report['horizontal_overflow']),'js_errors':len(report['page_errors']),'checks':report['checks']},ensure_ascii=False,indent=2))
