(() => {
  "use strict";
  const C = window.SITE_CONTENT;
  const $ = (selector) => document.querySelector(selector);
  const storage = {
    get(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };
  const state = {lang: storage.get("sh-lang", "zh"), accent: storage.get("sh-accent", "iris"), paperFilter: "all", paperKind: "all", paperQuery: "", mentorYear: "all", mentorStatus: "all", lifeFilter: "all", page: "about", talkId: null, slide: 0};
  if (!["zh", "en"].includes(state.lang)) state.lang = "zh";
  if (!["iris", "sage"].includes(state.accent)) state.accent = "iris";
  const tr = (zh, en) => state.lang === "zh" ? zh : en;
  const loc = (value) => typeof value === "object" ? value[state.lang] : value;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const external = (url, text, cls="text-link") => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text}${icon("external")}</a>`;
  const go = (route, text, cls="text-link") => `<a class="${cls}" href="#/${route}">${text}${icon("arrow")}</a>`;
  const routes = ["about", "publications", "projects", "notes", "life", "cv"];
  const labels = {about:"About", publications:"Publications", projects:"Projects", notes:"Blog", life:"Life", cv:"CV"};
  let toastTimer;

  function toast(message) {
    clearTimeout(toastTimer);
    $("#toast").textContent = message;
    $("#toast").hidden = false;
    toastTimer = setTimeout(() => { $("#toast").hidden = true; }, 2600);
  }

  function header() {
    const links = routes.map(route => `<a href="#/${route}" class="nav-link${route === state.page ? " active" : ""}" ${route === state.page ? 'aria-current="page"' : ""}>${labels[route]}</a>`).join("");
    $("#desktop-nav").innerHTML = links;
    $("#mobile-nav").innerHTML = links;
    $("#language-toggle").textContent = tr("EN", "中");
    $("#language-toggle").setAttribute("aria-label", tr("Switch to English", "切换为中文"));
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.accent = state.accent;
    document.body.dataset.page = state.page;
    $("#search-title").textContent = tr("站内搜索", "Search this site");
    $("#search-input").placeholder = tr("搜索论文、开源导师、魔术、东京…", "Papers, mentorship, magic, Tokyo…");
    $("#esc-label").textContent = tr("关闭", "to close");
    $("#footer").innerHTML = `<div class="footer-row"><div class="footer-name"><span>© 2026 Shijing Hu · Fudan University</span></div><div class="footer-links"><a href="mailto:${C.person.email}">Email</a>${external(C.person.github,"GitHub", "")}<span class="prototype-tag">${tr("预览 v0.7", "Preview v0.7")}</span></div></div>${state.page==='life' ? `<p class="footer-note">${tr("个人照片由本人提供；公开作品素材与队徽的权利归原权利人，来源见本页。", "Personal photos provided by me. Artwork and club crests belong to their respective rights holders; sources are listed above.")}</p>` : ''}`;
  }

  function pageHeading(eyebrow, title, description, action="") {
    return `<div class="page-top"><div class="eyebrow">${icon("spark")}${eyebrow}</div><div class="cv-title-row"><h1 class="page-title">${title}</h1>${action}</div><p class="page-intro">${description}</p></div>`;
  }

  function paper(p, compact=false) {
    const authors = p.authors.map(a => a === C.person.name ? `<strong>${esc(a)}</strong>` : esc(a)).join(', ');
    const b = p.bibliography || {};
    const details = [b.volume ? `vol. ${b.volume}${b.issue ? `, no. ${b.issue}` : ''}` : '', b.pages ? `pp. ${b.pages}` : '', b.articleNumber ? `article ${b.articleNumber}` : ''].filter(Boolean).join(', ');
    const venue = compact ? `${p.venue} ${p.year}` : `${p.venueFull}${p.venue !== p.venueFull ? ` (${p.venue})` : ''}${String(p.venueFull).includes(String(p.year)) ? '' : `, ${p.year}`}${details ? `, ${details}` : ''}`;
    return `<article class="paper-row citation-entry" id="paper-${p.id}">
      <div class="citation-venue"><span>${esc(p.venue)}</span><time>${p.year}</time></div>
      <div class="paper-body"><h3 class="paper-title"><a href="${esc(p.paper)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a></h3>
        <p class="paper-authors">${authors}</p><p class="citation-detail">${esc(venue)}</p>
        ${compact ? `<p class="paper-summary">${esc(loc(p.summary))}</p>` : ''}
        <div class="paper-actions">${external(p.paper,tr('发表记录','Publication'),'mini-button')}${p.pdf ? external(p.pdf,'PDF','mini-button') : ''}${p.code ? external(p.code,'Code','mini-button') : ''}<button class="mini-button" data-bib="${p.id}">BibTeX</button>${!compact ? `<button class="mini-button" data-abstract="${p.id}" aria-expanded="false" aria-controls="abstract-${p.id}">${tr('研究主题','Research topic')}</button>` : ''}</div>
        ${!compact ? `<div class="abstract-text" id="abstract-${p.id}" hidden>${esc(loc(p.summary))}</div>` : ''}
      </div></article>`;
  }

  function academicService() {
    return `<section class="academic-section service-section"><h2>${tr('学术服务','Academic service')}</h2><div class="service-content"><h3>${tr('会议审稿','Conference reviewing')}</h3><p>${C.service.map(s => `<span class="review-venue"><strong>${s.venue}</strong> ${s.years}</span>`).join('')}</p><h3>${tr('开源与社区指导','Open-source mentorship')}</h3><p>${tr('担任 KubeEdge–Ianvs Reviewer 与核心贡献者，并在 LFX Mentorship 和 OSPP 项目中指导学生参与开源贡献。','Reviewer and core contributor to KubeEdge–Ianvs, and a mentor for students contributing through LFX Mentorship and OSPP.')}</p>${go('projects?section=mentorship',tr('导师项目记录','Mentorship project record'))}</div></section>`;
  }

  function home() {
    const selected = ['gto','griffin','latentrefusal','laecips'].map(id=>C.papers.find(p=>p.id===id));
    return `<div class="page academic-page academic-home">
      <section class="academic-profile"><div class="academic-bio"><p class="academic-overline">Fudan University</p><h1>Shijing Hu <span>胡时京</span></h1><p class="academic-position">${loc(C.person.affiliation)}</p><p class="academic-institution">College of Computer Science and Artificial Intelligence</p>
      <p>${loc(C.person.bio)}</p><p>${tr('我于 2024 年在复旦大学获得网络空间安全硕士学位，2021 年在北京大学元培学院获得数据科学与大数据技术学士学位。','I received my M.S. in Cyberspace Security from Fudan University in 2024 and my B.S. in Data Science and Big Data Technology from Yuanpei College, Peking University, in 2021.')}</p>
      <div class="academic-contact"><a href="mailto:${C.person.email}">${C.person.email}</a><span class="contact-separator">/</span>${external(C.person.scholar,'Google Scholar')}${external(C.person.github,'GitHub')}${go('cv','CV')}</div></div>
      <figure class="academic-portrait"><button class="portrait-button" data-gallery="portrait" aria-label="${tr('查看胡时京头像','View Shijing Hu portrait')}"><img class="portrait-picture" src="${C.person.portrait}" alt="Shijing Hu · 胡时京" fetchpriority="high"></button></figure></section>
      <section class="academic-section research-section"><h2>${tr('研究方向','Research interests')}</h2><div class="research-grid">${C.research.map(r=>`<article><h3>${loc(r.title)}</h3><p>${loc(r.description)}</p></article>`).join('')}</div></section>
      <section class="academic-section selected-section"><div class="section-head"><h2>${tr('代表论文','Selected publications')}</h2>${go('publications',tr(`更多论文（${C.papers.length}）`,`All publications (${C.papers.length})`))}</div><div class="paper-list">${selected.map(p=>paper(p,true)).join('')}</div></section>
      ${academicService()}
      <section class="academic-section academic-experience"><h2>${tr('研究实践','Research experience')}</h2><div><p><strong>${tr('腾讯混元 · AI Infra','Tencent Hunyuan · AI Infra')}</strong><span class="experience-date">2026</span><br>${tr('青云计划实习，参与草稿模型训练、数据准备与 vLLM 投机解码适配。','Project Up internship involving draft-model training, data preparation, and speculative-decoding integration in vLLM.')}</p><p><strong>KubeEdge–Ianvs</strong><br>${tr('云边协同 AI 基准、数据集与开源工程。LFX 档案与具体导师项目见 Projects 页。','Cloud-edge AI benchmarks, datasets, and open-source engineering. See Projects for my LFX contribution profile and individual mentorship projects.')}</p>${go('projects',tr('项目与社区贡献','Projects & community contributions'))}</div></section>
      <p class="academic-life-link">${tr('足球、魔术、动漫与游戏等个人兴趣保留在','For football, magic, anime, and games, visit')} <a href="#/life">Life</a>${tr(' 页。','.')}</p>
    </div>`;
  }

  const topicLabels = () => [['all',tr('所有主题','All topics')],['speculative','Speculative decoding'],['cloud-edge','Cloud-edge AI'],['text2sql','Text-to-SQL'],['systems',tr('系统与隐私','Systems & privacy')]];
  function filteredPapers() {
    const query=state.paperQuery.trim().toLocaleLowerCase();
    return C.papers.filter(p => (state.paperFilter==='all'||p.type===state.paperFilter) && (state.paperKind==='all'||p.kind===state.paperKind) && (!query||[p.short,p.title,p.venue,p.venueFull,p.year,p.authors.join(' '),loc(p.summary)].join(' ').toLocaleLowerCase().includes(query))).sort((a,b)=>b.year-a.year);
  }
  function publicationResults() {
    const filtered=filteredPapers();
    if(!filtered.length) return `<div class="publication-empty"><p>${tr('没有匹配的论文。可清空关键词或调整筛选条件。','No matching publications. Clear the query or adjust the filters.')}</p><button class="button" data-reset-papers>${tr('重置筛选','Reset filters')}</button></div>`;
    return [...new Set(filtered.map(p=>p.year))].map(year=>`<section class="year-group"><h2 class="year-label">${year}</h2><div class="paper-list">${filtered.filter(p=>p.year===year).map(p=>paper(p)).join('')}</div></section>`).join('');
  }
  function publications() {
    const kinds=[['all',tr('全部','All')],['conference',tr('会议论文','Conference papers')],['journal',tr('期刊论文','Journal articles')]];
    return `<div class="page academic-page publications-page">${pageHeading('Research','Publications',tr('已发表研究，按年份排列。预印本与正式发表版本不重复收录。','Published research, listed by year. Preprints are not counted separately from their published versions.'))}
      <div class="publication-toolbar"><div class="filter-group publication-kinds">${kinds.map(([key,label])=>`<button class="filter-button" data-paper-kind="${key}" aria-pressed="${state.paperKind===key}">${label}<span>${key==='all'?C.papers.length:C.papers.filter(p=>p.kind===key).length}</span></button>`).join('')}</div><div class="publication-controls"><label><span>${tr('主题','Topic')}</span><select id="paper-topic">${topicLabels().map(([key,label])=>`<option value="${key}" ${key===state.paperFilter?'selected':''}>${label}</option>`).join('')}</select></label><label class="publication-search-label"><span>${tr('检索','Search')}</span><input id="paper-query" type="search" value="${esc(state.paperQuery)}" placeholder="${tr('题名、作者或期刊 / 会议','Title, author, or venue')}" autocomplete="off"></label></div></div>
      <div class="publication-caption"><span id="publication-count" aria-live="polite">${filteredPapers().length} / ${C.papers.length} ${tr('篇论文','publications')}</span>${external(C.person.scholar,'Google Scholar')}</div>
      <div id="publication-results">${publicationResults()}</div>
      <p class="publication-notice">${tr('当前展示 Academic CV 中确认的 11 篇论文，非完整发表目录。链接指向正式会议记录、ACL Anthology 或出版方 DOI；BibTeX 按正式发表信息整理。','This page lists the 11 publications confirmed in my Academic CV, not an exhaustive bibliography. Links point to conference records, ACL Anthology, or publisher DOIs. BibTeX entries use the published metadata.')}</p></div>`;
  }
  function refreshPublications() {
    $('#publication-results').innerHTML=publicationResults();
    $('#publication-count').textContent=`${filteredPapers().length} / ${C.papers.length} ${tr('篇论文','publications')}`;
    document.querySelectorAll('[data-paper-kind]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.paperKind===state.paperKind)));
  }

  function mentorshipHighlight() {
    return `<p>${loc(C.mentorship.summary)} ${go('projects?section=mentorship',tr('导师项目记录','Mentorship record'))}</p>`;
  }
  function lfxProgram(p) {
    return `<article class="lfx-program" id="lfx-${p.id}"><div class="lfx-term"><strong>${p.year}</strong><span>Term ${p.term}</span></div><div class="lfx-program-body"><div class="lfx-program-meta"><span>CNCF · KubeEdge</span><span class="lfx-role">Mentor</span><span class="lfx-status ${p.status==='completed'?'completed':'in-progress'}">${p.status==='completed'?tr('Completed · 平台状态','Completed'):tr('In progress · 平台状态','In progress')}</span></div><h3><a href="${p.url}" target="_blank" rel="noopener noreferrer" title="${esc(p.fullName)}">${esc(p.title)}</a></h3><p class="lfx-scope"><span>${tr('项目方向','Project scope')}</span>${esc(loc(p.scope))}</p><div class="lfx-links">${external(p.url,tr('LFX 项目记录','LFX project record'))}<span>${esc(p.period)}</span></div></div></article>`;
  }
  function mentorshipResults() {
    const rows=C.lfx.programs.filter(p=>(state.mentorYear==='all'||String(p.year)===state.mentorYear)&&(state.mentorStatus==='all'||p.status===state.mentorStatus));
    return rows.length?rows.map(lfxProgram).join(''):`<p class="publication-empty">${tr('当前条件下没有项目。','No projects match these filters.')}</p>`;
  }
  function mentorshipSection() {
    return `<section class="mentorship-section academic-mentorship" id="mentorship"><div class="section-head"><h2>${tr('LFX Mentorship 导师项目','LFX Mentorship projects')}</h2>${external(C.lfx.mentorProfile,tr('导师档案','Mentor profile'))}</div><p class="lfx-section-intro">${tr('2024—2026 年，公开导师档案列出 8 个 CNCF / KubeEdge 项目，均以 Mentor 身份参与。','My public mentor profile lists eight CNCF / KubeEdge projects across 2024–2026, each with the role of Mentor.')}</p><div class="mentor-filters"><div class="filter-group">${[['all',tr('全部年份','All years')],['2026','2026'],['2025','2025'],['2024','2024']].map(([k,v])=>`<button class="filter-button" data-mentor-year="${k}" aria-pressed="${state.mentorYear===k}">${v}</button>`).join('')}</div><label><span class="sr-only">${tr('项目状态','Project status')}</span><select id="mentor-status"><option value="all" ${state.mentorStatus==='all'?'selected':''}>${tr('全部状态','All statuses')}</option><option value="in-progress" ${state.mentorStatus==='in-progress'?'selected':''}>In progress</option><option value="completed" ${state.mentorStatus==='completed'?'selected':''}>Completed</option></select></label></div><div id="mentorship-results">${mentorshipResults()}</div><p class="lfx-status-note">${tr('状态截至 2026-11-10，来自 LFX 平台。项目方向概括其任务范围；Completed 不表示本页已独立核验全部技术交付或性能成果。','Status snapshot: 2026-11-10, as listed by LFX. Descriptions summarize project scope; Completed does not imply that every technical deliverable or performance outcome has been independently verified here.')}</p></section>`;
  }
  function refreshMentorship() {
    $('#mentorship-results').innerHTML=mentorshipResults();
    document.querySelectorAll('[data-mentor-year]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mentorYear===state.mentorYear)));
  }
  function badgesSection() {
    return `<aside class="lfx-badges" id="badges"><div class="badge-heading"><h3>${tr('社区徽章','Community badges')}</h3>${external(C.lfx.profile,tr('LFX 档案','LFX profile'),'asset-source')}</div><div class="badge-grid">${C.lfx.badges.map(b=>`<article class="badge-card"><a href="${b.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(b.title)} · ${tr('徽章详情','Badge details')}"><img src="${b.image}" alt="${esc(b.title)}" loading="lazy"><h4>${esc(b.title.replace('Speaker - ',''))}</h4></a><p>Speaker</p><span>${esc(b.issuer)}</span></article>`).join('')}</div><p class="badge-note">${tr('以上徽章展示于我的 LFX 公开档案；链接指向 Credly 徽章说明页。','Shown on my public LFX profile; links open the Credly badge description pages.')}</p>${external(C.lfx.badgesUrl,tr('LFX Badges（需登录）','LFX Badges (sign-in required)'),'asset-source')}</aside>`;
  }
  function osppSection() {
    const p=C.ospp;
    return `<section class="academic-section ospp-section" id="ospp"><div class="section-head"><h2>${tr('OSPP 开源之夏','OSPP · Open Source Promotion Plan')}</h2><span class="program-year">${p.year}</span></div><article class="ospp-project"><div class="ospp-meta"><span>${p.organization}</span><span>${loc(p.mode)}</span><span>Mentor</span><span>#${p.id}</span></div><h3>${external(p.url,esc(loc(p.title)))}</h3><p>${loc(p.summary)}</p><details class="ospp-scope"><summary>${tr('项目任务范围','Project scope')}</summary><ul>${p.scope.map(s=>`<li>${loc(s)}</li>`).join('')}</ul></details><div class="ospp-footer">${external(p.url,tr('官方项目详情','Official project details'))}<span>${tr('任务范围来自官方说明，不作结项成果声明。','Scope follows the official description; no completion claim is made.')}</span></div></article></section>`;
  }

  function projects() {
    return `<div class="page academic-page academic-projects">${pageHeading('Open-source engineering & community','Projects & mentorship',tr('开源系统开发、云边协同 AI 基准，以及 LFX Mentorship 与 OSPP 学生指导。','Open-source systems, cloud-edge AI benchmarks, and student mentorship through LFX Mentorship and OSPP.'))}
      <div class="lfx-profile-links">${external(C.lfx.profile,'LFX Profile')}${external(C.lfx.mentorProfile,'LFX Mentor Profile')}${go('projects?section=ospp','OSPP')}${external(C.person.github,'GitHub')}</div>
      <section class="academic-section contribution-section" id="contributions"><h2>${tr('开源贡献','Open-source contributions')}</h2><div class="contribution-grid"><div><h3>KubeEdge–Ianvs</h3><p class="contribution-role">Reviewer & ${tr('核心贡献者','core contributor')}</p><p>${loc(C.projects.find(p=>p.id==='ianvs').description)}</p><p>${tr('参与 Cloud-Robotics 数据集与基准建设，关注云边协同及持续学习的可复现评测。','Contributed to Cloud-Robotics datasets and benchmarks for reproducible evaluation of cloud-edge collaboration and continual learning.')}</p>${external('https://github.com/kubeedge/ianvs','kubeedge/ianvs')}</div>${badgesSection()}</div></section>
      ${mentorshipSection()}
      ${osppSection()}
      <section class="academic-section other-projects"><h2>${tr('其他开源项目','Other open-source work')}</h2>${C.projects.filter(p=>p.id!=='ianvs').map(p=>`<article><h3>${external(p.url,p.name)}</h3><p class="contribution-role">${loc(p.role)}</p><p>${loc(p.description)}</p><div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></article>`).join('')}</section></div>`;
  }

  const pdfUrls = new Map();
  function pdfHref(talk) {
    if (!talk.pdf.startsWith('data:')) return talk.pdf;
    if (!pdfUrls.has(talk.id)) {
      const encoded=talk.pdf.slice(talk.pdf.indexOf(',')+1);
      const decoded=atob(encoded);
      const bytes=new Uint8Array(decoded.length);
      for(let i=0;i<decoded.length;i++)bytes[i]=decoded.charCodeAt(i);
      pdfUrls.set(talk.id, URL.createObjectURL(new Blob([bytes], {type:'application/pdf'})));
    }
    return pdfUrls.get(talk.id);
  }
  function pdfActions(talk) {
    const href=pdfHref(talk);
    return `<a class="mini-button pdf-open" href="${href}" target="_blank" rel="noopener noreferrer">${icon('file')}${tr('打开原 PDF','Open original PDF')}</a><a class="mini-button pdf-download" href="${href}" download="${esc(talk.downloadName)}">${tr('下载 PDF','Download PDF')}</a>`;
  }
  function talkMeta(talk) {
    return `<div class="talk-meta"><span>${esc(loc(talk.event))}</span><span>${esc(loc(talk.language))}</span><span>${talk.pages} ${tr('页','slides')}</span><span>${(talk.bytes/1048576).toFixed(1)} MB · PDF</span></div>`;
  }
  function talkDetail(talk, params) {
    const n=Number(params.get('slide'));
    state.talkId=talk.id;
    state.slide=Number.isInteger(n)&&n>=1&&n<=talk.pages?n-1:0;
    return `<div class="page academic-page talk-detail"><a class="talk-back" href="#/notes">← ${tr('返回演讲列表','All talks')}</a><header class="talk-detail-heading"><span class="academic-overline">Talk / Slides</span><h1>${esc(loc(talk.title))}</h1>${talk.subtitle?`<p class="talk-subtitle">${esc(loc(talk.subtitle))}</p>`:''}${talkMeta(talk)}<p class="talk-description">${esc(loc(talk.description))}</p>${talk.researchNotice?`<p class="talk-research-note">${esc(loc(talk.researchNotice))}</p>`:''}<div class="talk-actions">${pdfActions(talk)}</div></header>
    <section class="slide-viewer" aria-label="${tr('幻灯片逐页预览','Slide preview')}"><div class="slide-toolbar"><div class="slide-controls"><button class="slide-prev" data-slide-delta="-1" aria-label="${tr('上一页','Previous slide')}">←</button><label><span class="sr-only">${tr('选择页码','Slide number')}</span><select id="slide-select">${talk.slides.map((_,i)=>`<option value="${i}" ${i===state.slide?'selected':''}>${i+1}</option>`).join('')}</select></label><span class="slide-total">/ ${talk.pages}</span><button class="slide-next" data-slide-delta="1" aria-label="${tr('下一页','Next slide')}">→</button></div><button class="slide-zoom" id="slide-zoom" aria-pressed="false">${icon('search')}${tr('放大','Zoom')}</button></div><div class="slide-viewport" id="slide-viewport" tabindex="0"><img id="slide-image" src="${talk.slides[state.slide]}" alt="${esc(loc(talk.title))} · ${state.slide+1} / ${talk.pages}"></div><div class="slide-footer"><span id="slide-status" role="status" aria-live="polite">${tr('第','Slide')} ${state.slide+1} / ${talk.pages} ${tr('页','')}</span><span>${tr('← → 翻页 · 放大后可滚动查看','← → navigate · scroll when zoomed')}</span></div></section>
    <p class="talk-original-note">${tr('预览由原 PDF 逐页生成，内容未经改写；下载链接提供完整原文件。','Preview images are rendered from the original PDF without rewriting. The download contains the complete original file.')}</p></div>`;
  }
  function notes() {
    const params=parseRoute().params;
    const talk=C.talks.find(t=>t.id===params.get('talk'));
    if(talk)return talkDetail(talk,params);
    state.talkId=null;
    return `<div class="page academic-page talks-page">${pageHeading('Ideas shared in talks','Talks & presentations',tr('近期演讲与课程分享。提供幻灯片预览，以及完整 PDF 下载。','Recent talks and course presentations, with slide previews and full PDFs.'))}<div class="talk-list-summary"><span>${C.talks.length} ${tr('份演讲材料','presentations')}</span><span>${tr('中文讲稿 · PDF 原版','Chinese slides · original PDFs')}</span></div><div class="talk-list">${C.talks.map(t=>`<article class="talk-card" id="talk-${t.id}"><a class="talk-cover" href="#/notes?talk=${t.id}" aria-label="${tr('预览：','Preview: ')}${esc(loc(t.title))}"><img src="${t.cover}" alt="${esc(t.title.zh)} · ${tr('封面','cover')}" loading="lazy"><span>${tr('查看幻灯片','View slides')} ${icon('arrow')}</span></a><div class="talk-card-body"><div class="talk-type">${tr(t.category==='research'?'研究报告':'课程分享',t.category==='research'?'Research talk':'Course presentation')}</div><h2><a href="#/notes?talk=${t.id}">${esc(loc(t.title))}</a></h2>${t.subtitle?`<p class="talk-subtitle">${esc(loc(t.subtitle))}</p>`:''}${talkMeta(t)}<p class="talk-description">${esc(loc(t.description))}</p>${t.researchNotice?`<p class="talk-research-note">${esc(loc(t.researchNotice))}</p>`:''}<div class="talk-actions">${go(`notes?talk=${t.id}`,tr('逐页预览','Preview slides'),'button')}${pdfActions(t)}</div><p class="talk-date">${esc(loc(t.dateLabel))}</p></div></article>`).join('')}</div></div>`;
  }
  function updateSlide(index) {
    const talk=C.talks.find(t=>t.id===state.talkId);
    if(!talk)return;
    state.slide=Math.max(0,Math.min(talk.pages-1,index));
    const image=$('#slide-image');
    image.src=talk.slides[state.slide];
    image.alt=`${loc(talk.title)} · ${state.slide+1} / ${talk.pages}`;
    $('#slide-select').value=String(state.slide);
    $('.slide-prev').disabled=state.slide===0;
    $('.slide-next').disabled=state.slide===talk.pages-1;
    $('#slide-status').textContent=`${tr('第','Slide')} ${state.slide+1} / ${talk.pages} ${tr('页','')}`;
    const viewport=$('#slide-viewport');viewport.scrollTop=0;viewport.scrollLeft=0;
    history.replaceState(null,'',`#/notes?talk=${talk.id}&slide=${state.slide+1}`);
  }

  function pitch() {
    return `<svg class="pitch-svg" viewBox="0 0 300 174" role="img" aria-label="${tr("后卫位置概念示意，不代表具体阵型", "Defender position concept, not a specific formation")}"><rect x="12" y="8" width="276" height="156" rx="3" fill="#e2eadc" stroke="#afbea4"/><path d="M150 8v156M12 39h38v94H12m276-94h-38v94h38M12 62h15v48H12m276-48h-15v48h15" fill="none" stroke="#b3c1a9"/><circle cx="150" cy="86" r="29" fill="none" stroke="#b3c1a9"/><circle cx="150" cy="86" r="2" fill="#afbea4"/><circle cx="76" cy="66" r="17" fill="#cddcc3"/><circle cx="76" cy="66" r="7" fill="#7d9770" stroke="#f9fbf5" stroke-width="2"/><path d="M90 58l19-14" fill="none" stroke="#94a686"/><text x="112" y="42" font-size="10" font-family="sans-serif" fill="#6c815d">${tr("后卫", "Defender")}</text></svg>`;
  }

  function personalPhoto(photo, galleryId, overline) {
    return `<figure class="team-photo personal-photo"><button class="team-photo-button" data-gallery="${galleryId}" aria-label="${tr('放大查看：','Enlarge: ')}${esc(loc(photo.title))}"><img src="${photo.image}" alt="${esc(loc(photo.caption))}" loading="lazy"><span class="photo-expand">${icon('search')}${tr('查看完整照片','View full photo')}</span></button><figcaption><div><span class="photo-overline">${esc(overline)}</span><h3>${esc(loc(photo.title))}</h3><p>${esc(loc(photo.caption))}</p></div><span class="photo-provenance">${esc(loc(photo.sourceLabel))}</span></figcaption></figure>`;
  }

  function football() {
    return `<section class="life-section" id="football"><div class="section-head"><h2 class="section-title">On the pitch <small>${tr("足球", "Football")}</small></h2><span class="eyebrow" style="margin:0;letter-spacing:1px">${icon("ball")}Football</span></div><div class="football-grid"><div><p class="football-intro">${tr("我喜欢踢足球，司职后卫。大学期间，先后为北京大学元培学院和复旦大学计算机学院足球队效力。", "I play football as a defender. During university, I represented Yuanpei College at Peking University and the School of Computer Science at Fudan University.")}</p><div class="football-timeline">${C.football.map(team => `<article class="football-item"><div class="timeline-date">${team.period}</div><h3 class="football-team">${loc(team.team)}<span class="position-tag">${loc(team.position)}</span></h3><div class="honor-list">${team.honors.map(h => `<div class="football-honor">${icon("trophy")}<span>${h.year} · ${loc(h.title)}</span><strong class="${h.rank===1 ? "winner" : ""}">${loc(h.place)}</strong></div>`).join("")}</div></article>`).join("")}</div></div><aside class="football-aside club-aside"><div class="pitch-label"><span>${tr("支持的球队", "Teams I support")}</span>${icon("ball")}</div><div class="club-gallery">${C.clubs.map(c => `<div class="club-card ${c.id}"><button class="crest-button" data-gallery="${c.id}" aria-label="${esc(loc(c.title))} · ${tr("查看队徽", "View crest")}"><img src="${c.image}" alt="${esc(loc(c.title))} ${tr("队徽", "club crest")}" loading="lazy"></button><h3>${esc(loc(c.title))}</h3>${external(c.source, tr("素材来源", "Image source"), "asset-source")}</div>`).join("")}</div><p class="club-caption">${tr("一支在曼彻斯特，一支在北京。", "One in Manchester. One in Beijing.")}</p></aside></div><div class="football-photo-gallery">${personalPhoto(C.yuanpeiPhoto,'yuanpei','Yuanpei College · Peking University')}${personalPhoto(C.teamPhoto,'team','Computer Science · Fudan University')}</div></section>`;
  }

  function favorites(kind) {
    const games = kind === "games";
    return `<section class="life-section" id="${kind}"><div class="section-head"><h2 class="section-title">${games ? "In other worlds" : "Stories I like"}<small>${games ? tr("正在玩", "Games") : tr("喜欢的动漫", "Anime")}</small></h2><span class="eyebrow" style="margin:0;letter-spacing:1px">${icon(games ? "controller" : "star")}${games ? "Games" : "Anime"}</span></div><div class="favorites-grid public-art-grid ${kind}-grid">${C.favorites.filter(f => f.kind === kind).map(f => `<article class="favorite-card ${f.id}"><button class="favorite-image public-art" data-gallery="${f.id}" aria-label="${esc(loc(f.title))} · ${tr("放大查看公开素材", "Enlarge artwork")}"><img src="${f.image}" alt="${esc(loc(f.title))} · ${esc(loc(f.materialLabel))}" loading="lazy"></button><div class="favorite-info"><div><h3>${esc(loc(f.title))}</h3><p>${esc(loc(f.subtitle))}</p></div>${icon(games ? "controller" : "star")}</div><div class="favorite-source"><span>${esc(loc(f.materialLabel))}</span>${external(f.source, tr("图片来源", "Source"), "asset-source")}</div></article>`).join("")}</div><p class="personal-note">${games ? tr("目前先记下在玩的游戏。喜欢的角色、游玩片段和感想，之后再慢慢补充。", "For now, just the games I am playing. Favorite characters, memorable moments, and thoughts can follow.") : tr("先把喜欢的作品放在这里。为什么喜欢，留给以后的随笔慢慢说。", "A small collection of anime I enjoy. The reasons belong in a future note.")}</p></section>`;
  }

  function magic() {
    return `<section class="life-section" id="magic"><div class="section-head"><h2 class="section-title">A little stage magic <small>${tr("魔术", "Magic")}</small></h2><span class="eyebrow" style="margin:0;letter-spacing:1px">${icon("spark")}On stage</span></div><div class="magic-layout"><div><p class="life-intro">${loc(C.magic.intro)}</p><div class="association-record"><span class="timeline-date">${C.magic.period}</span><h3>${loc(C.magic.association)}</h3><p>${loc(C.magic.roles)}</p></div><h3 class="performances-title">${tr("魔术演出", "Magic performances")}</h3><ol class="performance-list">${C.magic.performances.map(p => `<li><time>${p.year}</time><span>${loc(p.event)}</span></li>`).join("")}</ol></div>${personalPhoto(C.magicPhoto,'magic-stage','On stage · Peking University')}</div></section>`;
  }

  function exchange() {
    return `<section class="life-section" id="exchange"><div class="section-head"><h2 class="section-title">A semester in Tokyo <small>${tr("交换与语言", "Exchange & language")}</small></h2>${icon("book")}</div><div class="exchange-layout"><article class="exchange-story"><span class="timeline-date">${C.exchange.period}</span><h3>${loc(C.exchange.university)}</h3><p>${loc(C.exchange.description)}</p><span class="exchange-type">${loc(C.exchange.role)}</span></article><aside class="language-note"><span class="eyebrow">Japanese</span><strong>JLPT <span>N1</span></strong><p>${loc(C.languages[0].qualification)}</p></aside></div>${personalPhoto(C.tokyoPhoto,'tokyo','The University of Tokyo · Exchange')}</section>`;
  }

  function imageCredits() {
    return `<details class="image-credits"><summary>${tr("图片来源与版权说明", "Image credits & rights")}</summary><p>${tr("照片由本人提供。以下作品图与队徽仅作本地个人兴趣展示，版权及商标权归相应权利人；公开可见不等于获得转载授权，正式上线前仍需核实使用条件。", "Personal photos were provided by me. Artwork and club crests are included for local personal-interest preview. Copyrights and trademarks belong to their respective rights holders. Public availability is not a redistribution license; usage terms must be checked before publishing.")}</p><ul>${[...C.favorites, ...C.clubs].map(f => `<li>${external(f.source, esc(loc(f.title)), "asset-source")}<span>${esc(loc(f.sourceLabel))} · ${esc(f.rights)}</span></li>`).join("")}</ul><p>${tr("《狼与香辛料》使用 2024 版主视觉；《明日方舟》使用官网公开活动图，仅用于作品展示，不代表个人角色偏好或当前活动状态。", "Spice and Wolf uses a 2024 key visual. Arknights uses a public event illustration. These choices identify the works, not my preferred characters or a currently running event.")}</p></details>`;
  }

  function life() {
    const filters = [["all",tr("全部", "All"), "spark"],["football",tr("足球", "Football"), "ball"],["games",tr("游戏", "Games"), "controller"],["anime",tr("动漫", "Anime"), "star"],["magic",tr("魔术", "Magic"), "spark"],["exchange",tr("交换与语言", "Exchange"), "book"]];
    return `<div class="page">${pageHeading("The person beyond the papers", "Life, off the screen.", tr("在球场，也在舞台上；还有东京的一学期和喜欢的故事。这一页放研究之外的我。", "On the pitch, on stage, and in other worlds — with a semester in Tokyo along the way. A little about life beyond research."))}<figure class="life-banner"><img src="assets/afternoon.webp" alt="${tr("原创校园球场场景插画，非个人实拍", "Original campus football-ground illustration, not a personal photograph")}"><div class="life-banner-card"><div class="eyebrow">A small everyday collection</div><h2>${tr("留一点时间，<br>给喜欢的事。", "Time for the things<br>that make a day.")}</h2><p>Football · Magic · Games · Anime</p></div></figure><p class="image-credit">${tr("页首为原创场景插画；下方为本人提供的球队合影、魔术演出、交换照片及附来源的公开素材。", "Original illustration above; my football, magic performance and exchange photos, and credited public artwork below.")}</p><div class="filter-bar"><div class="filter-group">${filters.map(([key,label,i])=>`<button class="filter-button" data-life-filter="${key}" aria-pressed="${state.lifeFilter === key}">${icon(i)}${label}</button>`).join("")}</div><span class="filter-count">${tr("我的小收藏", "A personal collection")}</span></div>${["all","football"].includes(state.lifeFilter) ? football() : ""}${["all","magic"].includes(state.lifeFilter) ? magic() : ""}${["all","exchange"].includes(state.lifeFilter) ? exchange() : ""}${["all","games"].includes(state.lifeFilter) ? favorites("games") : ""}${["all","anime"].includes(state.lifeFilter) ? favorites("anime") : ""}${["all","football","games","anime"].includes(state.lifeFilter) ? imageCredits() : ""}${state.lifeFilter === "all" ? `<section class="life-section" style="border:0"><div class="section-head"><h2 class="section-title">Small notes <small>${tr("日常随笔", "Everyday notes")}</small></h2>${go("notes", tr("随笔页", "The blog"))}</div><div class="empty-note">${icon("leaf")}<h3>${tr("有些日子，也值得记下来。", "Some days are worth keeping.")}</h3><p>${tr("暂时还没有随笔。等想写的时候，再从一小段开始。", "No entries yet. A small paragraph is a good place to start.")}</p></div></section>` : ""}</div>`;
  }

  function cv() {
    return `<div class="page cv-page">${pageHeading("A brief academic record", "Curriculum vitae", `${tr("胡时京 · 复旦大学博士研究生", "Shijing Hu · Ph.D. student, Fudan University")}<br><a href="mailto:${C.person.email}">${C.person.email}</a>`, `<button class="button" id="print-cv">${icon("print")}${tr("打印 / 保存 PDF", "Print / save PDF")}</button>`)}<section class="cv-section"><h2>Education</h2><div class="cv-items">${C.education.map(e => `<article class="cv-item"><div class="cv-item-top"><h3>${loc(e.school)}</h3><span class="cv-period">${e.period}</span></div><p>${loc(e.degree)}</p>${e.note ? `<p class="small">${loc(e.note)}</p>` : ""}</article>`).join("")}</div></section><section class="cv-section" id="exchange"><h2>Exchange</h2><div class="cv-item"><div class="cv-item-top"><h3>${loc(C.exchange.university)}</h3><span class="cv-period">${C.exchange.period}</span></div><p>${loc(C.exchange.role)}</p></div></section><section class="cv-section"><h2>Research</h2><div class="cv-item"><h3>${tr("大模型推理加速与云边协同", "Efficient LLM inference & cloud-edge collaboration")}</h3><p>Speculative decoding · Draft model training · Inference systems · Collaborative AI</p></div></section><section class="cv-section"><h2>Experience</h2><div class="cv-items"><article class="cv-item"><div class="cv-item-top"><h3>${tr("腾讯混元 · AI Infra", "Tencent Hunyuan · AI Infra")}</h3><span class="cv-period">2026</span></div><p>${tr("青云计划实习生。参与投机解码 draft model 训练、数据准备与 vLLM 推理适配。", "Project Up intern. Work on draft-model training, data preparation, and vLLM integration for speculative decoding.")}</p></article><article class="cv-item"><div class="cv-item-top"><h3>KubeEdge–Ianvs</h3><span class="cv-period">Open source</span></div><p>${tr("Reviewer 与核心贡献者，参与云边协同基准体系、数据集和工程模块建设。", "Reviewer and core contributor, working on cloud-edge benchmarks, datasets and engineering modules.")}</p></article></div></section><section class="cv-section" id="mentorship"><h2>Open-source mentorship</h2><div class="cv-item"><h3>LFX Mentorship · OSPP</h3><p>${loc(C.mentorship.summary)}</p><p>${external(C.ospp.url,`OSPP ${C.ospp.year} · ${esc(loc(C.ospp.title))}`)}</p></div></section><section class="cv-section"><h2>Selected papers</h2><div>${C.papers.map(p=>`<div class="cv-pub">${p.authors.map(a=>a===C.person.name?`<strong>${esc(a)}</strong>`:esc(a)).join(', ')}. ${p.paper ? `<a href="${p.paper}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>` : esc(p.title)}. <span class="accent">${esc(p.venueFull)}${/20\d\d/.test(p.venueFull) ? "" : `, ${p.year}`}</span>.</div>`).join("")}</div></section><section class="cv-section"><h2>Honors</h2><div>${C.honors.map(h=>`<div class="cv-honor"><span>${h.year}</span><span>${loc(h.name)}</span></div>`).join("")}</div></section><section class="cv-section" id="languages"><h2>Languages</h2><div class="cv-item">${C.languages.map(l => `<h3>${loc(l.name)}</h3><p>${loc(l.qualification)}</p>`).join("")}</div></section><section class="cv-section"><h2>Student activities</h2><div class="cv-item"><div class="cv-item-top"><h3>${loc(C.magic.association)}</h3><span class="cv-period">${C.magic.period}</span></div><p>${loc(C.magic.roles)}</p><p>${tr("魔术表演：2017、2018、2019 年北京大学元培学院年度晚会；2018 年北京大学法学院年度晚会。", "Magic performances at the Yuanpei College annual galas in 2017, 2018 and 2019, and the Law School annual gala in 2018, at Peking University.")}</p>${go("life?section=magic",tr("舞台与社团经历", "Stage and club experiences"))}</div></section><section class="cv-section"><h2>Beyond research</h2><div class="cv-item"><p>${tr("足球后卫；曼联与北京国安球迷。游戏：《原神》《明日方舟》。动漫：《狼与香辛料》《凉宫春日的忧郁》。", "Football defender; Manchester United and Beijing Guoan supporter. Games: Genshin Impact and Arknights. Anime: Spice and Wolf, and The Melancholy of Haruhi Suzumiya.")}</p>${go("life", tr("足球经历与生活收藏", "Football and other interests"))}</div></section><p class="cv-disclaimer">${tr("此页为现有简历的精简网页版本，不含手机号与具体内部模型信息。", "A concise web version of the existing CV; mobile phone number and internal model details are omitted.")}</p></div>`;
  }

  function parseRoute() {
    const path = location.hash.replace(/^#\/?/, "").split("?");
    const page = routes.includes(path[0]) ? path[0] : "about";
    const params = new URLSearchParams(path[1] || "");
    return {page, params};
  }

  function render({scroll=true}={}) {
    const route = parseRoute();
    state.page = route.page;
    state.lifeFilter = ["football","games","anime","magic","exchange"].includes(route.params.get("section")) ? route.params.get("section") : "all";
    header();
    const renderers = {about:home, publications, projects, notes, life, cv};
    $("#main").innerHTML = renderers[state.page]();
    document.title = state.page==='notes'&&state.talkId ? `${loc(C.talks.find(t=>t.id===state.talkId).title)} · Shijing Hu` : `${labels[state.page]} · Shijing Hu / 胡时京`;
    if (state.page==='notes'&&$('#slide-image')) {
      $('.slide-prev').disabled=state.slide===0;
      $('.slide-next').disabled=state.slide===C.talks.find(t=>t.id===state.talkId).pages-1;
    }
    $("#mobile-nav").hidden = true;
    $("#menu-toggle").setAttribute("aria-expanded", "false");
    if (scroll) window.scrollTo({top:0, behavior:"instant"});
    const anchor = route.params.get("section");
    if (["projects", "cv"].includes(state.page) && ["mentorship", "contributions", "badges", "ospp", "exchange", "languages"].includes(anchor)) {
      requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({block:"start", behavior:"instant"}));
    }
    const paperId=route.params.get('paper'), projectId=route.params.get('project');
    const target=state.page==='publications'&&C.papers.some(p=>p.id===paperId)?`paper-${paperId}`:state.page==='projects'&&C.lfx.programs.some(p=>p.id===projectId)?`lfx-${projectId}`:null;
    if(target) requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView({block:'start',behavior:'instant'}));
  }

  function updatePublicationFilter(filter) {
    state.paperFilter = filter;
    if ($('#paper-topic')) $('#paper-topic').value=filter;
    refreshPublications();
  }

  function searchRecords() {
    return [
      ...C.papers.map(p => ({title:p.title, category:"Publication", extra:`${p.short} ${p.year} ${loc(p.summary)} ${p.venue} ${p.venueFull} ${p.authors.join(' ')} 论文`,route:`publications?paper=${p.id}`})),
      ...C.lfx.programs.map(p => ({title:p.title,category:`LFX · ${p.year} Term ${p.term}`,extra:`${p.fullName} ${p.role} ${loc(p.scope)}`,route:`projects?project=${p.id}`})),
      ...C.projects.map(p => ({title:p.name, category:"Project", extra:loc(p.description), route:"projects"})),
      ...C.lfx.badges.map(b=>({title:b.title,category:'Community badge',extra:`${b.issuer} LFX 徽章 Speaker`,route:'projects?section=badges'})),
      {title:loc(C.ospp.title),category:'OSPP 2026',extra:`${C.ospp.title.zh} ${C.ospp.title.en} ${C.ospp.id} ${loc(C.ospp.summary)} 开源之夏`,route:'projects?section=ospp'},
      ...C.talks.map(t=>({title:loc(t.title),category:'Talk · PDF',extra:`${t.title.zh} ${t.title.en} ${loc(t.event)} ${loc(t.description)} ${t.tags.join(' ')} 演讲 PPT`,route:`notes?talk=${t.id}`})),
      {title:tr("足球 · 球队经历与比赛成绩", "Football · teams and honors"),category:"Life",extra:"足球 后卫 defender 曼联 北京国安 北大 元培 复旦 2021 2022 Manchester United Beijing Guoan",route:"life?section=football"},
      ...C.favorites.map(f=>({title:loc(f.title),category:f.kind === "games" ? "Games" : "Anime",extra:`${f.title.zh} ${f.title.en} ${f.kind === "games" ? "游戏" : "动漫"}`,route:`life?section=${f.kind}`})),
      {title:tr("开源贡献与学生指导 · LFX Mentorship / OSPP", "Open-source mentorship · LFX Mentorship / OSPP"),category:"Open source",extra:"开源导师 开源贡献 导师 学生 指导 开源之夏 LFX Mentorship OSPP mentor student contributions",route:"projects?section=mentorship"},
      {title:tr("魔术 · 社团与晚会演出", "Magic · student club and gala performances"),category:"Life",extra:"魔术 表演 团支书 理事长 元培 法学院 北京大学 2017 2018 2019 2021 magic performance stage gala Council Chair Youth League",route:"life?section=magic"},
      {title:tr("东京大学 · 2019 年交换一学期", "The University of Tokyo · semester exchange in 2019"),category:"Exchange",extra:"东京大学 日本 2019.03 2019.08 交换 Tokyo Japan exchange semester",route:"life?section=exchange"},
      {title:tr("日语 · JLPT N1", "Japanese · JLPT N1"),category:"Languages",extra:"日语 日本语 能力测试 N1 日本語 Japanese JLPT",route:"cv?section=languages"},
      {title:tr("教育背景与学术简历", "Education & academic CV"),category:"CV",extra:"resume 简历 教育 博士 硕士 北大 复旦 education Fudan Peking",route:"cv"},
      {title:tr("演讲与分享", "Talks & presentations"),category:"Blog",extra:"博客 演讲 幻灯片 分享 PDF slides talk blog notes",route:"notes"}
    ];
  }

  function search() {
    const query = $("#search-input").value.trim().toLocaleLowerCase();
    if (!query) {
      $("#search-results").innerHTML = `<p class="search-placeholder">${tr("试试 GTO、足球，或明日方舟。", "Try GTO, football, or Arknights.")}</p>`;
      return;
    }
    const results = searchRecords().filter(r => `${r.title} ${r.extra}`.toLocaleLowerCase().includes(query));
    $("#search-results").innerHTML = results.length ? results.map(r=>`<a class="search-result" data-search-result href="#/${r.route}"><small>${r.category}</small>${esc(r.title)}</a>`).join("") : `<p class="search-placeholder">${tr("没有找到匹配内容，换个关键词试试。", "No results. Try a different keyword.")}</p>`;
  }

  function showBib(id) {
    const p = C.papers.find(p=>p.id===id);
    if (!p?.bibtex) return;
    $("#bib-title").textContent = `${p.short} · BibTeX`;
    $("#bib-text").textContent = p.bibtex;
    $("#bib-note").textContent = tr("按正式发表书目信息整理；未提供的卷期页码等字段不作补写。", "Prepared from the published bibliographic record; unavailable fields are omitted.");
    $("#bib-dialog").showModal();
  }

  function showImage(id) {
    let item;
    if (id === "portrait") item = {image:C.person.portrait, title:{zh:"胡时京",en:"Shijing Hu"},caption:{zh:"个人头像 · 本人提供",en:"Personal portrait · provided by me"}};
    else if (id === "team") item = C.teamPhoto;
    else if (id === 'yuanpei') item = C.yuanpeiPhoto;
    else if (id === 'tokyo') item = C.tokyoPhoto;
    else if (id === 'magic-stage') item = C.magicPhoto;
    else item = [...C.favorites, ...C.clubs].find(x => x.id === id);
    if (!item) return;
    $("#photo-title").textContent = loc(item.title);
    $("#photo-image").src = item.image;
    $("#photo-image").alt = loc(item.caption || item.title);
    $("#photo-caption").textContent = item.caption ? loc(item.caption) : item.materialLabel ? loc(item.materialLabel) : tr("俱乐部队徽", "Club crest");
    $("#photo-rights").textContent = item.rights || tr("照片由本人提供，保留原图构图。", "Photo provided by me; the full composition is retained.");
    $("#photo-source").hidden = !item.source;
    if (item.source) {
      $("#photo-source").href = item.source;
      $("#photo-source").textContent = tr("查看来源页面 ↗", "View source page ↗");
    } else $("#photo-source").removeAttribute("href");
    $("#photo-dialog").showModal();
  }

  $("#photo-dialog").addEventListener("close", () => {
    $("#photo-image").removeAttribute("src");
    $("#photo-image").alt = "";
  });

  $("#main").addEventListener("click", event => {
    const b = event.target.closest("button");
    if (!b) return;
    if (b.dataset.gallery) showImage(b.dataset.gallery);
    if (b.hasAttribute('data-slide-delta')) updateSlide(state.slide+Number(b.dataset.slideDelta));
    if (b.id==='slide-zoom') {
      const zoomed=$('#slide-viewport').classList.toggle('is-zoomed');
      b.setAttribute('aria-pressed',String(zoomed));
      b.innerHTML=icon('search')+(zoomed?tr('适合窗口','Fit to window'):tr('放大','Zoom'));
    }
    if (b.dataset.paperFilter) updatePublicationFilter(b.dataset.paperFilter);
    if (b.dataset.paperKind) {state.paperKind=b.dataset.paperKind;refreshPublications();}
    if (b.hasAttribute('data-reset-papers')) {
      state.paperFilter='all';state.paperKind='all';state.paperQuery='';
      $('#paper-topic').value='all';$('#paper-query').value='';refreshPublications();
    }
    if (b.dataset.mentorYear) {state.mentorYear=b.dataset.mentorYear;refreshMentorship();}
    if (b.dataset.lifeFilter) {
      state.lifeFilter = b.dataset.lifeFilter;
      const position = window.scrollY;
      const newHash = `#/life${state.lifeFilter === "all" ? "" : `?section=${state.lifeFilter}`}`;
      history.replaceState(null,"",newHash);
      $("#main").innerHTML = life();
      window.scrollTo({top:position, behavior:"instant"});
      $(`[data-life-filter="${state.lifeFilter}"]`).focus({preventScroll:true});
    }
    if (b.dataset.abstract) {
      const body = document.getElementById(`abstract-${b.dataset.abstract}`);
      body.hidden = !body.hidden;
      b.setAttribute("aria-expanded", String(!body.hidden));
    }
    if (b.dataset.bib) showBib(b.dataset.bib);
    if (b.id === "print-cv") window.print();
  });

  $('#main').addEventListener('change', event => {
    if(event.target.id==='paper-topic') updatePublicationFilter(event.target.value);
    if(event.target.id==='mentor-status') {state.mentorStatus=event.target.value;refreshMentorship();}
    if(event.target.id==='slide-select') updateSlide(Number(event.target.value));
  });
  $('#main').addEventListener('input', event => {
    if(event.target.id==='paper-query') {state.paperQuery=event.target.value;refreshPublications();}
  });

  $("#menu-toggle").addEventListener("click", () => {
    const expanded = $("#menu-toggle").getAttribute("aria-expanded") === "true";
    $("#mobile-nav").hidden = expanded;
    $("#menu-toggle").setAttribute("aria-expanded", String(!expanded));
  });
  $("#language-toggle").addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    storage.set("sh-lang", state.lang);
    render({scroll:false});
  });
  $("#palette-toggle").addEventListener("click", () => {
    state.accent = state.accent === "iris" ? "sage" : "iris";
    storage.set("sh-accent", state.accent);
    document.documentElement.dataset.accent = state.accent;
    toast(state.accent === 'iris' ? (state.page === 'life' ? tr('浅鸢尾紫','Soft iris') : tr('学术蓝','Academic blue')) : tr('鼠尾草绿','Sage green'));
  });
  $("#search-open").addEventListener("click", () => {
    $("#search-input").value = "";
    search();
    $("#search-dialog").showModal();
    $("#search-input").focus();
  });
  $("#search-input").addEventListener("input", search);
  $("#search-results").addEventListener("click", event => {
    const result = event.target.closest("[data-search-result]");
    if (!result) return;
    event.preventDefault();
    $("#search-dialog").close();
    state.paperFilter = 'all';state.paperKind='all';state.paperQuery='';state.mentorYear='all';state.mentorStatus='all';
    const target = result.getAttribute("href");
    if (location.hash === target) render();
    else location.hash = target;
  });
  $(".skip-link").addEventListener("click", event => {
    event.preventDefault();
    $("#main").focus({preventScroll:true});
    $("#main").scrollIntoView({block:"start"});
  });
  document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.close).close()));
  document.querySelectorAll("dialog").forEach(dialog=>dialog.addEventListener("click", e=>{
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }));
  $("#copy-bib").addEventListener("click", async () => {
    const value = $("#bib-text").textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const input = document.createElement("textarea");
        input.value = value;
        input.style.position = "absolute";
        input.style.opacity = "0";
        $("#bib-dialog").append(input);
        input.select();
        const ok = document.execCommand("copy");
        input.remove();
        if (!ok) throw new Error("Copy unavailable");
      }
      toast(tr("BibTeX 已复制", "BibTeX copied"));
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($("#bib-text"));
      selection.removeAllRanges();
      selection.addRange(range);
      toast(tr("已选中文本，请按 ⌘C / Ctrl+C 复制", "Text selected. Press Cmd+C / Ctrl+C to copy."));
    }
  });
  document.addEventListener("keydown", e => {
    if(state.page==='notes'&&$('#slide-image')&&!document.querySelector('dialog[open]')&&!e.target.closest('input,select,textarea,[contenteditable]')&&!e.metaKey&&!e.ctrlKey&&!e.altKey) {
      const dest=e.key==='ArrowLeft'?state.slide-1:e.key==='ArrowRight'?state.slide+1:e.key==='Home'?0:e.key==='End'?C.talks.find(t=>t.id===state.talkId).pages-1:null;
      if(dest!==null){e.preventDefault();updateSlide(dest);}
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (!$("#search-dialog").open) $("#search-open").click();
    }
    if (e.key === "Escape") {
      $("#mobile-nav").hidden = true;
      $("#menu-toggle").setAttribute("aria-expanded", "false");
    }
  });
  window.addEventListener("hashchange", () => {
    if (location.hash === "#main") return;
    state.paperFilter = 'all';state.paperKind='all';state.paperQuery='';state.mentorYear='all';state.mentorStatus='all';
    render();
  });
  render({scroll:false});
})();
