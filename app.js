(() => {
  "use strict";
  const C = window.SITE_CONTENT;
  const $ = (selector) => document.querySelector(selector);
  const storage = {
    get(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };
  const state = {lang: storage.get("sh-lang", "zh"), accent: storage.get("sh-accent", "iris"), paperFilter: "all", lifeFilter: "all", page: "about"};
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
    $("#search-title").textContent = tr("寻找一点什么", "Find something here");
    $("#search-input").placeholder = tr("搜索论文、项目、足球、作品…", "Papers, projects, football, favorites…");
    $("#esc-label").textContent = tr("关闭", "to close");
    $("#footer").innerHTML = `<div class="footer-row"><div class="footer-name">${icon("spark")}<span>© 2026 Shijing Hu · ${tr("研究，也记录生活。", "Research, and a little life.")}</span></div><div class="footer-links"><a href="mailto:${C.person.email}">Email</a>${external(C.person.github,"GitHub", "")}${external("https://github.com/alshedivat/al-folio", "al-folio inspired", "")}<span class="prototype-tag">${tr("本地原型 · v0.2", "Local prototype · v0.2")}</span></div></div><p class="footer-note">${tr("个人照片由本人提供；公开作品素材与队徽的权利归原权利人，来源见 Life 页。当前版本仅本地预览。", "Personal photos provided by me. Artwork and club crests belong to their respective rights holders; sources are listed on Life. Local preview only.")}</p>`;
  }

  function pageHeading(eyebrow, title, description, action="") {
    return `<div class="page-top"><div class="eyebrow">${icon("spark")}${eyebrow}</div><div class="cv-title-row"><h1 class="page-title">${title}</h1>${action}</div><p class="page-intro">${description}</p></div>`;
  }

  function paper(p, compact=false) {
    const authors = p.authors.map(a => a === "Shijing Hu" ? `<strong>${a}</strong>` : esc(a)).join(", ");
    const image = p.image ? `<img src="${p.image}" alt="${esc(p.short)} ${tr("概念示意图，非原论文图", "concept illustration, not a paper figure")}" loading="lazy">` : `<div class="paper-mark">${p.short}</div>`;
    const title = p.paper ? `<a href="${p.paper}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>` : esc(p.title);
    return `<article class="paper-row" id="paper-${p.id}"><div class="paper-image">${image}<span class="image-label">${tr("概念示意", "Concept motif")}</span></div><div class="paper-body"><div class="paper-venue">${esc(p.venue)}</div><h3 class="paper-title">${title}</h3><p class="paper-authors">${authors}</p><p class="paper-summary">${esc(loc(p.summary))}</p><div class="paper-actions">${p.paper ? external(p.paper,"Paper", "mini-button") : external(C.person.scholar,"Scholar", "mini-button")}${p.code ? external(p.code,"Code", "mini-button") : ""}${p.pdf ? external(p.pdf,"PDF", "mini-button") : ""}${!compact ? `<button class="mini-button" data-abstract="${p.id}" aria-expanded="false" aria-controls="abstract-${p.id}">${tr("摘要", "Abstract")}</button>` : ""}${p.bibtex ? `<button class="mini-button" data-bib="${p.id}">BibTeX</button>` : ""}</div>${!compact ? `<div class="abstract-text" id="abstract-${p.id}" hidden>${esc(loc(p.abstract))}</div>` : ""}</div></article>`;
  }

  function home() {
    return `<div class="page"><section class="hero"><div class="hero-copy"><div class="eyebrow">${icon("spark")}A little corner of the internet</div><div class="hero-name-row"><h1>Shijing <strong>Hu</strong></h1></div><span class="name-cn">胡时京</span><div class="affiliation"><span class="affiliation-dot"></span>${loc(C.person.affiliation)}</div><p class="hero-bio">${loc(C.person.bio)}</p><div class="social-links"><a class="social-link" href="mailto:${C.person.email}">${icon("mail")}Email</a><a class="social-link" href="${C.person.scholar}" target="_blank" rel="noopener noreferrer">${icon("book")}Scholar</a><a class="social-link" href="${C.person.github}" target="_blank" rel="noopener noreferrer">${icon("code")}GitHub</a><a class="social-link" href="#/cv">${icon("file")}CV</a></div></div><figure class="hero-visual portrait-visual"><button class="portrait-button" data-gallery="portrait" aria-label="${tr("放大查看胡时京头像", "View Shijing Hu's portrait")}"><img class="hero-picture portrait-picture" src="${C.person.portrait}" alt="${tr("胡时京的个人头像", "Portrait of Shijing Hu")}" fetchpriority="high"></button><figcaption class="portrait-caption"><span>Shijing Hu <span class="portrait-dot">·</span> 胡时京</span><span>${tr("研究，也认真生活。", "Research, and a little life.")}</span></figcaption></figure></section><div class="interest-strip"><span>${tr("研究兴趣", "Interests")}</span><div class="interest-topics"><span>Efficient LLM inference</span><span>Speculative decoding</span><span>Cloud-edge AI</span></div></div><section class="section"><div class="section-head"><h2 class="section-title">Selected publications <small>${tr("代表工作", "Research")}</small></h2>${go("publications", tr("全部论文", "All publications"))}</div><div class="paper-list">${C.papers.slice(0,2).map(p => paper(p,true)).join("")}</div></section><div class="home-bottom"><section><h2 class="section-title">Building in the open</h2>${C.projects.map(p => `<div class="project-snippet"><span class="project-icon">${icon(p.id === "ianvs" ? "code" : "spark")}</span><div><h3>${external(p.url,p.name)}</h3><p>${loc(p.description)}</p></div></div>`).join("")}</section><section><h2 class="section-title">Beyond research</h2><div class="life-teaser"><div><div class="teaser-top"><p>${tr("论文之外，也有球场和喜欢的故事。", "Away from papers: football, games, and stories.")}</p>${icon("ball")}</div><div class="tiny-tags"><span class="tiny-tag">${tr("后卫", "Defender")}</span><span class="tiny-tag">${tr("曼联 / 北京国安", "United / Guoan")}</span><span class="tiny-tag">${tr("动漫与游戏", "Anime & games")}</span></div><p class="small">${tr("曾为北大元培与复旦计算机学院足球队效力。现在也在提瓦特与泰拉，留一点属于生活的时间。", "I played for Yuanpei College and Fudan Computer Science. These days, there is also time for Teyvat, Terra, and everyday life.")}</p></div><div class="teaser-bottom">${go("life",tr("看看我的日常", "A little more about me"))}<div class="tiny-covers" aria-hidden="true">${C.favorites.map(f => `<img src="${f.image}" alt="">`).join("")}</div></div></div></section></div><div class="home-note"><div>${icon("book")}<span>${tr("这里也会慢慢积累研究笔记与日常随笔。", "A space for research notes and small everyday observations.")}</span></div>${go("notes", tr("去随笔页", "Visit the blog"))}</div></div>`;
  }

  function publications() {
    const filtered = C.papers.filter(p => state.paperFilter === "all" || p.type === state.paperFilter);
    const years = [...new Set(filtered.map(p=>p.year))];
    const filters = [["all",tr("全部", "All")],["speculative","Speculative decoding"],["cloud-edge","Cloud-edge AI"]];
    return `<div class="page">${pageHeading("Research & publications", "Publications", tr("关注高效推理，以及云、边、端之间的协同。这里收录部分已公开研究工作。", "Selected public work on efficient inference and collaboration across cloud, edge, and terminal devices."))}<div class="filter-bar"><div class="filter-group">${filters.map(([key,label]) => `<button class="filter-button" data-paper-filter="${key}" aria-pressed="${state.paperFilter === key}">${label}</button>`).join("")}</div><span class="filter-count">${filtered.length} ${tr("篇精选", "selected works")}</span></div>${years.map(year => `<section class="year-group"><h2 class="year-label">${year}</h2><div class="paper-list">${filtered.filter(p => p.year === year).map(p => paper(p)).join("")}</div></section>`).join("")}<p class="publication-notice">${tr("会议归属与精选列表根据本人简历整理；GTO / GRIFFIN 的题名、作者及链接已对照 arXiv。此处的 BibTeX 为 arXiv 版本。更多论文与完整期刊书目信息：", "Venue labels and the selected list are based on my CV. GTO / GRIFFIN titles, authors, and links were checked against arXiv; BibTeX entries cite the arXiv versions. Further publications and full journal records: ")}${external(C.person.scholar,"Google Scholar")}</p></div>`;
  }

  function projectDiagram(id) {
    if (id === "ianvs") return `<svg viewBox="0 0 440 130" role="img" aria-label="Cloud, edge and device concept"><g fill="none" stroke="#b7c2b0" stroke-width="1.5"><path d="M220 38v30M100 91V69h240v22M160 91V69m120 22V69" stroke-dasharray="4 4"/></g><rect x="169" y="7" width="103" height="37" rx="12" fill="#dce5d5"/><text x="220" y="31" text-anchor="middle" fill="#607457" font-family="sans-serif" font-size="12">Cloud</text><g fill="#fdfefa" stroke="#c2ceb9"><rect x="71" y="84" width="59" height="32" rx="7"/><rect x="145" y="84" width="59" height="32" rx="7"/><rect x="237" y="84" width="59" height="32" rx="7"/><rect x="311" y="84" width="59" height="32" rx="7"/></g><g fill="#819076" font-family="sans-serif" font-size="10" text-anchor="middle"><text x="101" y="104">Edge</text><text x="175" y="104">Device</text><text x="267" y="104">Edge</text><text x="341" y="104">Device</text></g></svg>`;
    return `<svg viewBox="0 0 440 130" role="img" aria-label="Test, improve and verify concept"><path d="M117 65h48m110 0h48" fill="none" stroke="#c6bcdd" stroke-width="1.5" stroke-dasharray="4 4"/><path d="m159 61 6 4-6 4m158-8 6 4-6 4" fill="none" stroke="#9d8fba"/><g fill="#fefcfe" stroke="#d8d0e6"><rect x="24" y="35" width="94" height="59" rx="10"/><rect x="172" y="35" width="96" height="59" rx="10"/><rect x="323" y="35" width="94" height="59" rx="10"/></g><g fill="#857298" font-family="sans-serif" text-anchor="middle" font-size="11"><text x="71" y="70">Test</text><text x="220" y="70">Optimize</text><text x="370" y="70">Verify</text></g><path d="M370 95v24H71V96" fill="none" stroke="#d7cfe2" stroke-width="1"/><circle cx="220" cy="119" r="3" fill="#b5a5cc"/></svg>`;
  }

  function projects() {
    return `<div class="page">${pageHeading("Code, systems & collaboration", "Projects", tr("把方法放进实际系统，也把能够复现的部分留在开源社区。", "Putting ideas into working systems, and sharing reproducible pieces with the open-source community."))}<div class="projects-grid">${C.projects.map(p => `<article class="project-card"><div class="project-visual ${p.id === "ianvs" ? "green" : ""}">${projectDiagram(p.id)}<span class="project-visual-label">${p.label}</span></div><div class="project-card-content"><h2>${p.name}</h2><p class="project-role">${loc(p.role)}</p><p class="project-description">${loc(p.description)}</p><div class="tiny-tags">${p.tags.map(tag => `<span class="tiny-tag">${tag}</span>`).join("")}</div><div class="project-card-bottom">${external(p.url, "View on GitHub")}<span class="muted small">${icon("code")}</span></div></div></article>`).join("")}</div><section class="project-context"><h2>From papers to systems</h2><p>${tr("我的工作横跨算法与系统：从 draft model 的训练与推理适配，到端云协同的评测与开源工程。论文里的方法和项目里的实现，共同构成这里的研究记录。", "My work spans algorithms and systems, from training and integrating draft models to benchmarking cloud-edge collaboration. Papers and open-source implementations are complementary parts of that record.")}</p></section></div>`;
  }

  function notes() {
    return `<div class="page">${pageHeading("Notes along the way", "Blog & notes", tr("研究中的想法，球场边的片段，还有平常日子里值得记下来的事。", "Research ideas, moments from the football ground, and small things worth remembering."))}<div class="note-topics"><span>${icon("book")}</span><span>${tr("研究笔记", "Research notes")}</span><span>·</span><span>${tr("足球", "Football")}</span><span>·</span><span>${tr("日常随笔", "Everyday life")}</span></div><div class="empty-note notes-empty"><div class="note-decoration" aria-hidden="true"><span></span><span></span><span></span></div><h2>${tr("第一篇，慢慢写。", "The first page is still open.")}</h2><p>${tr("这里暂时还没有文章。不放示例日记，等真正想分享的时候再写。", "No posts here yet. No fictional entries either — just a space for things I genuinely want to share.")}</p>${go("life",tr("先看看我的兴趣与经历", "Explore life beyond research"))}</div></div>`;
  }

  function pitch() {
    return `<svg class="pitch-svg" viewBox="0 0 300 174" role="img" aria-label="${tr("后卫位置概念示意，不代表具体阵型", "Defender position concept, not a specific formation")}"><rect x="12" y="8" width="276" height="156" rx="3" fill="#e2eadc" stroke="#afbea4"/><path d="M150 8v156M12 39h38v94H12m276-94h-38v94h38M12 62h15v48H12m276-48h-15v48h15" fill="none" stroke="#b3c1a9"/><circle cx="150" cy="86" r="29" fill="none" stroke="#b3c1a9"/><circle cx="150" cy="86" r="2" fill="#afbea4"/><circle cx="76" cy="66" r="17" fill="#cddcc3"/><circle cx="76" cy="66" r="7" fill="#7d9770" stroke="#f9fbf5" stroke-width="2"/><path d="M90 58l19-14" fill="none" stroke="#94a686"/><text x="112" y="42" font-size="10" font-family="sans-serif" fill="#6c815d">${tr("后卫", "Defender")}</text></svg>`;
  }

  function football() {
    return `<section class="life-section" id="football"><div class="section-head"><h2 class="section-title">On the pitch <small>${tr("足球", "Football")}</small></h2><span class="eyebrow" style="margin:0;letter-spacing:1px">${icon("ball")}Football</span></div><div class="football-grid"><div><p class="football-intro">${tr("我喜欢踢足球，司职后卫。大学期间，先后为北京大学元培学院和复旦大学计算机学院足球队效力。", "I play football as a defender. During university, I represented Yuanpei College at Peking University and the School of Computer Science at Fudan University.")}</p><div class="football-timeline">${C.football.map(team => `<article class="football-item"><div class="timeline-date">${team.period}</div><h3 class="football-team">${loc(team.team)}<span class="position-tag">${loc(team.position)}</span></h3><div class="honor-list">${team.honors.map(h => `<div class="football-honor">${icon("trophy")}<span>${h.year} · ${loc(h.title)}</span><strong class="${h.rank===1 ? "winner" : ""}">${loc(h.place)}</strong></div>`).join("")}</div></article>`).join("")}</div></div><aside class="football-aside club-aside"><div class="pitch-label"><span>${tr("支持的球队", "Teams I support")}</span>${icon("ball")}</div><div class="club-gallery">${C.clubs.map(c => `<div class="club-card ${c.id}"><button class="crest-button" data-gallery="${c.id}" aria-label="${esc(loc(c.title))} · ${tr("查看队徽", "View crest")}"><img src="${c.image}" alt="${esc(loc(c.title))} ${tr("队徽", "club crest")}" loading="lazy"></button><h3>${esc(loc(c.title))}</h3>${external(c.source, tr("素材来源", "Image source"), "asset-source")}</div>`).join("")}</div><p class="club-caption">${tr("一支在曼彻斯特，一支在北京。", "One in Manchester. One in Beijing.")}</p></aside></div><figure class="team-photo"><button class="team-photo-button" data-gallery="team" aria-label="${tr("放大查看复旦足球队完整合影", "View the full Fudan football team photo")}"><img src="${C.teamPhoto.image}" alt="${esc(loc(C.teamPhoto.caption))}" loading="lazy"><span class="photo-expand">${icon("search")}${tr("查看完整合影", "View full photo")}</span></button><figcaption><div><span class="photo-overline">A memory from the pitch</span><h3>${loc(C.teamPhoto.title)}</h3><p>${loc(C.teamPhoto.caption)}</p></div><span class="photo-provenance">${loc(C.teamPhoto.sourceLabel)}</span></figcaption></figure></section>`;
  }

  function favorites(kind) {
    const games = kind === "games";
    return `<section class="life-section" id="${kind}"><div class="section-head"><h2 class="section-title">${games ? "In other worlds" : "Stories I like"}<small>${games ? tr("正在玩", "Games") : tr("喜欢的动漫", "Anime")}</small></h2><span class="eyebrow" style="margin:0;letter-spacing:1px">${icon(games ? "controller" : "star")}${games ? "Games" : "Anime"}</span></div><div class="favorites-grid public-art-grid ${kind}-grid">${C.favorites.filter(f => f.kind === kind).map(f => `<article class="favorite-card ${f.id}"><button class="favorite-image public-art" data-gallery="${f.id}" aria-label="${esc(loc(f.title))} · ${tr("放大查看公开素材", "Enlarge artwork")}"><img src="${f.image}" alt="${esc(loc(f.title))} · ${esc(loc(f.materialLabel))}" loading="lazy"></button><div class="favorite-info"><div><h3>${esc(loc(f.title))}</h3><p>${esc(loc(f.subtitle))}</p></div>${icon(games ? "controller" : "star")}</div><div class="favorite-source"><span>${esc(loc(f.materialLabel))}</span>${external(f.source, tr("图片来源", "Source"), "asset-source")}</div></article>`).join("")}</div><p class="personal-note">${games ? tr("目前先记下在玩的游戏。喜欢的角色、游玩片段和感想，之后再慢慢补充。", "For now, just the games I am playing. Favorite characters, memorable moments, and thoughts can follow.") : tr("先把喜欢的作品放在这里。为什么喜欢，留给以后的随笔慢慢说。", "A small collection of anime I enjoy. The reasons belong in a future note.")}</p></section>`;
  }

  function imageCredits() {
    return `<details class="image-credits"><summary>${tr("图片来源与版权说明", "Image credits & rights")}</summary><p>${tr("照片由本人提供。以下作品图与队徽仅作本地个人兴趣展示，版权及商标权归相应权利人；公开可见不等于获得转载授权，正式上线前仍需核实使用条件。", "Personal photos were provided by me. Artwork and club crests are included for local personal-interest preview. Copyrights and trademarks belong to their respective rights holders. Public availability is not a redistribution license; usage terms must be checked before publishing.")}</p><ul>${[...C.favorites, ...C.clubs].map(f => `<li>${external(f.source, esc(loc(f.title)), "asset-source")}<span>${esc(loc(f.sourceLabel))} · ${esc(f.rights)}</span></li>`).join("")}</ul><p>${tr("《狼与香辛料》使用 2024 版主视觉；《明日方舟》使用官网公开活动图，仅用于作品展示，不代表个人角色偏好或当前活动状态。", "Spice and Wolf uses a 2024 key visual. Arknights uses a public event illustration. These choices identify the works, not my preferred characters or a currently running event.")}</p></details>`;
  }

  function life() {
    const filters = [["all",tr("全部", "All"), "spark"],["football",tr("足球", "Football"), "ball"],["games",tr("游戏", "Games"), "controller"],["anime",tr("动漫", "Anime"), "star"]];
    return `<div class="page">${pageHeading("The person beyond the papers", "Life, off the screen.", tr("也在球场，也在故事里。这一页放研究之外的我。", "On the pitch and in other worlds. A little about the person beyond the research."))}<figure class="life-banner"><img src="assets/afternoon.webp" alt="${tr("原创校园球场场景插画，非个人实拍", "Original campus football-ground illustration, not a personal photograph")}"><div class="life-banner-card"><div class="eyebrow">A small everyday collection</div><h2>${tr("留一点时间，<br>给喜欢的事。", "Time for the things<br>that make a day.")}</h2><p>Football · Games · Anime</p></div></figure><p class="image-credit">${tr("页首为原创场景插画；下方为本人提供的合影及附来源的公开素材。", "Original illustration above; my team photo and credited public artwork below.")}</p><div class="filter-bar"><div class="filter-group">${filters.map(([key,label,i])=>`<button class="filter-button" data-life-filter="${key}" aria-pressed="${state.lifeFilter === key}">${icon(i)}${label}</button>`).join("")}</div><span class="filter-count">${tr("我的小收藏", "A personal collection")}</span></div>${["all","football"].includes(state.lifeFilter) ? football() : ""}${["all","games"].includes(state.lifeFilter) ? favorites("games") : ""}${["all","anime"].includes(state.lifeFilter) ? favorites("anime") : ""}${imageCredits()}${state.lifeFilter === "all" ? `<section class="life-section" style="border:0"><div class="section-head"><h2 class="section-title">Small notes <small>${tr("日常随笔", "Everyday notes")}</small></h2>${go("notes", tr("随笔页", "The blog"))}</div><div class="empty-note">${icon("leaf")}<h3>${tr("有些日子，也值得记下来。", "Some days are worth keeping.")}</h3><p>${tr("暂时还没有随笔。等想写的时候，再从一小段开始。", "No entries yet. A small paragraph is a good place to start.")}</p></div></section>` : ""}</div>`;
  }

  function cv() {
    return `<div class="page cv-page">${pageHeading("A brief academic record", "Curriculum vitae", `${tr("胡时京 · 复旦大学博士研究生", "Shijing Hu · Ph.D. student, Fudan University")}<br><a href="mailto:${C.person.email}">${C.person.email}</a>`, `<button class="button" id="print-cv">${icon("print")}${tr("打印 / 保存 PDF", "Print / save PDF")}</button>`)}<section class="cv-section"><h2>Education</h2><div class="cv-items">${C.education.map(e => `<article class="cv-item"><div class="cv-item-top"><h3>${loc(e.school)}</h3><span class="cv-period">${e.period}</span></div><p>${loc(e.degree)}</p>${e.note ? `<p class="small">${loc(e.note)}</p>` : ""}</article>`).join("")}</div></section><section class="cv-section"><h2>Research</h2><div class="cv-item"><h3>${tr("大模型推理加速与云边协同", "Efficient LLM inference & cloud-edge collaboration")}</h3><p>Speculative decoding · Draft model training · Inference systems · Collaborative AI</p></div></section><section class="cv-section"><h2>Experience</h2><div class="cv-items"><article class="cv-item"><div class="cv-item-top"><h3>${tr("腾讯混元 · AI Infra", "Tencent Hunyuan · AI Infra")}</h3><span class="cv-period">2026</span></div><p>${tr("青云计划实习生。参与投机解码 draft model 训练、数据准备与 vLLM 推理适配。", "Project Up intern. Work on draft-model training, data preparation, and vLLM integration for speculative decoding.")}</p></article><article class="cv-item"><div class="cv-item-top"><h3>KubeEdge–Ianvs</h3><span class="cv-period">Open source</span></div><p>${tr("Reviewer 与核心贡献者，参与云边协同基准体系、数据集和工程模块建设。", "Reviewer and core contributor, working on cloud-edge benchmarks, datasets and engineering modules.")}</p></article></div></section><section class="cv-section"><h2>Selected papers</h2><div>${C.papers.map(p=>`<div class="cv-pub"><strong>Shijing Hu</strong>, et al. ${p.paper ? `<a href="${p.paper}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>` : esc(p.title)}. <span class="accent">${esc(p.venue)}${/20\d\d/.test(p.venue) ? "" : `, ${p.year}`}</span>.</div>`).join("")}</div></section><section class="cv-section"><h2>Honors</h2><div>${C.honors.map(h=>`<div class="cv-honor"><span>${h.year}</span><span>${loc(h.name)}</span></div>`).join("")}</div></section><section class="cv-section"><h2>Beyond research</h2><div class="cv-item"><p>${tr("足球后卫；曼联与北京国安球迷。游戏：《原神》《明日方舟》。动漫：《狼与香辛料》《凉宫春日的忧郁》。", "Football defender; Manchester United and Beijing Guoan supporter. Games: Genshin Impact and Arknights. Anime: Spice and Wolf, and The Melancholy of Haruhi Suzumiya.")}</p>${go("life", tr("足球经历与生活收藏", "Football and other interests"))}</div></section><p class="cv-disclaimer">${tr("此页为现有简历的精简网页版本，不含手机号与具体内部模型信息。", "A concise web version of the existing CV; mobile phone number and internal model details are omitted.")}</p></div>`;
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
    state.lifeFilter = ["football","games","anime"].includes(route.params.get("section")) ? route.params.get("section") : "all";
    header();
    const renderers = {about:home, publications, projects, notes, life, cv};
    $("#main").innerHTML = renderers[state.page]();
    document.title = `${labels[state.page]} · Shijing Hu / 胡时京`;
    $("#mobile-nav").hidden = true;
    $("#menu-toggle").setAttribute("aria-expanded", "false");
    if (scroll) window.scrollTo({top:0, behavior:"instant"});
  }

  function updatePublicationFilter(filter) {
    state.paperFilter = filter;
    const position = window.scrollY;
    $("#main").innerHTML = publications();
    window.scrollTo({top:position, behavior:"instant"});
    $(`[data-paper-filter="${filter}"]`).focus({preventScroll:true});
  }

  function searchRecords() {
    return [
      ...C.papers.map(p => ({title:p.title, category:"Publication", extra:`${p.short} ${p.year} ${loc(p.summary)} ${p.venue} 论文 投机解码`,route:"publications"})),
      ...C.projects.map(p => ({title:p.name, category:"Project", extra:loc(p.description), route:"projects"})),
      {title:tr("足球 · 球队经历与比赛成绩", "Football · teams and honors"),category:"Life",extra:"足球 后卫 defender 曼联 北京国安 北大 元培 复旦 2021 2022 Manchester United Beijing Guoan",route:"life?section=football"},
      ...C.favorites.map(f=>({title:loc(f.title),category:f.kind === "games" ? "Games" : "Anime",extra:`${f.title.zh} ${f.title.en} ${f.kind === "games" ? "游戏" : "动漫"}`,route:`life?section=${f.kind}`})),
      {title:tr("教育背景与学术简历", "Education & academic CV"),category:"CV",extra:"resume 简历 教育 博士 硕士 北大 复旦 education Fudan Peking",route:"cv"},
      {title:tr("研究笔记与日常随笔", "Research notes & everyday life"),category:"Blog",extra:"博客 日记 随笔 blog notes",route:"notes"}
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
    $("#bib-note").textContent = tr("此条目引用 arXiv 预印本版本；会议版本可在正式发布前替换。", "This entry cites the arXiv preprint; a proceedings entry can be substituted before publication.");
    $("#bib-dialog").showModal();
  }

  function showImage(id) {
    let item;
    if (id === "portrait") item = {image:C.person.portrait, title:{zh:"胡时京",en:"Shijing Hu"},caption:{zh:"个人头像 · 本人提供",en:"Personal portrait · provided by me"}};
    else if (id === "team") item = C.teamPhoto;
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
    if (b.dataset.paperFilter) updatePublicationFilter(b.dataset.paperFilter);
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
    toast(state.accent === "iris" ? tr("浅鸢尾紫", "Soft iris") : tr("鼠尾草绿", "Sage green"));
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
    state.paperFilter = "all";
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
    state.paperFilter = "all";
    render();
  });
  render({scroll:false});
})();
