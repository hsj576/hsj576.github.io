window.SITE_CONTENT = {
  person: {
    name: "Shijing Hu", nameZh: "胡时京", email: "sjhu24@m.fudan.edu.cn",
    portrait: "assets/portrait.webp",
    github: "https://github.com/hsj576",
    scholar: "https://scholar.google.com.hk/citations?user=ZiCfboUAAAAJ&hl=zh-CN",
    affiliation: {zh:"复旦大学 · 博士研究生",en:"Ph.D. student · Fudan University"},
    bio: {
      zh: "我在复旦大学攻读博士，研究大模型推理加速与云边协同推理，尤其关注投机解码。希望把算法上的改进，变成系统里真实、可复现的效率提升。",
      en: "I am a Ph.D. student at Fudan University working on efficient LLM inference and cloud-edge collaboration, with a particular focus on speculative decoding. I care about turning algorithmic ideas into practical, reproducible improvements in real systems."
    },
    beyond: {
      zh: "研究之外，我踢后卫，支持曼联和北京国安，也玩《原神》《明日方舟》。这里既放论文和代码，也留一些位置给喜欢的作品与平常的日子。",
      en: "Beyond research, I play football as a defender and support Manchester United and Beijing Guoan. I also play Genshin Impact and Arknights. This is a home for my papers and code, but also for the stories and everyday things I enjoy."
    }
  },
  papers: [
    {
      id:"gto", short:"GTO", year:2026, venue:"ICLR 2026", type:"speculative",
      title:"Bridging Draft Policy Misalignment: Group Tree Optimization for Speculative Decoding",
      authors:["Shijing Hu","Jingyang Li","Zhihui Lu","Pan Zhou"],
      summary:{zh:"让 draft model 的训练目标与解码时的树策略保持一致。",en:"Aligning draft-model training with the tree policy used at decoding time."},
      abstract:{zh:"GTO 通过 Draft Tree Reward 直接度量 draft tree 的期望接受长度，并通过组间比较优化 draft policy，缩小训练目标与实际树式解码策略的差异。",en:"GTO bridges draft policy misalignment with a Draft Tree Reward that measures expected acceptance length and group-based training that compares the current and a frozen reference draft model. The goal is to align training with the tree policy used during decoding."},
      paper:"https://arxiv.org/abs/2509.22134", pdf:"https://arxiv.org/pdf/2509.22134", code:"https://github.com/hsj576/GTO", image:"assets/gto.svg",
      bibtex:"@misc{hu2025bridging,\n  title={Bridging Draft Policy Misalignment: Group Tree Optimization for Speculative Decoding},\n  author={Shijing Hu and Jingyang Li and Zhihui Lu and Pan Zhou},\n  year={2025},\n  eprint={2509.22134},\n  archivePrefix={arXiv},\n  primaryClass={cs.CL},\n  url={https://arxiv.org/abs/2509.22134}\n}"
    },
    {
      id:"griffin", short:"GRIFFIN", year:2025, venue:"NeurIPS 2025", type:"speculative",
      title:"GRIFFIN: Effective Token Alignment for Faster Speculative Decoding",
      authors:["Shijing Hu","Jingyang Li","Xingyu Xie","Zhihui Lu","Kim-Chuan Toh","Pan Zhou"],
      summary:{zh:"通过 token 对齐改善 draft model 的训练与推理。",en:"Improving draft-model training and inference through effective token alignment."},
      abstract:{zh:"GRIFFIN 关注投机解码中的 token 错位问题，结合可对齐的训练策略与 draft model 设计，在训练与推理阶段缓解 token 与特征的不一致，从而提升推理效率。",en:"GRIFFIN addresses token misalignment between draft training and decoding through a token-alignable training strategy and draft-model design. Loss masking limits the effect of misaligned training tokens, while input tokens help correct feature inconsistencies during inference."},
      paper:"https://arxiv.org/abs/2502.11018", pdf:"https://arxiv.org/pdf/2502.11018", code:"https://github.com/hsj576/GRIFFIN", image:"assets/griffin.svg",
      bibtex:"@misc{hu2025griffin,\n  title={GRIFFIN: Effective Token Alignment for Faster Speculative Decoding},\n  author={Shijing Hu and Jingyang Li and Xingyu Xie and Zhihui Lu and Kim-Chuan Toh and Pan Zhou},\n  year={2025},\n  eprint={2502.11018},\n  archivePrefix={arXiv},\n  primaryClass={cs.CL},\n  url={https://arxiv.org/abs/2502.11018}\n}"
    },
    {
      id:"laecips", short:"LAECIPS", year:2025, venue:"Journal of Industrial Information Integration", type:"cloud-edge",
      title:"LAECIPS: Large Vision Model Assisted Adaptive Edge-Cloud Collaboration for IoT-based Embodied Intelligence System",
      authors:["Shijing Hu","et al."],
      summary:{zh:"大视觉模型辅助的自适应端云协同与具身智能。",en:"Adaptive edge-cloud collaboration assisted by large vision models."},
      abstract:{zh:"这项工作研究面向物联网具身智能系统的大视觉模型辅助自适应端云协同。完整书目信息见 Google Scholar。",en:"This work investigates adaptive edge-cloud collaboration assisted by large vision models for IoT-based embodied intelligence systems. See Google Scholar for the full bibliographic record."}
    },
    {
      id:"collars", short:"CoLLaRS", year:2024, venue:"Future Generation Computer Systems", type:"cloud-edge",
      title:"CoLLaRS: A cloud-edge-terminal collaborative lifelong learning framework for AIoT",
      authors:["Shijing Hu","et al."],
      summary:{zh:"面向 AIoT 的云、边、端协同终身学习。",en:"Cloud-edge-terminal collaborative lifelong learning for AIoT."},
      abstract:{zh:"CoLLaRS 面向 AIoT 场景，研究云、边、端协同的终身学习框架。完整书目信息见 Google Scholar。",en:"CoLLaRS explores a cloud-edge-terminal collaborative lifelong learning framework for AIoT. See Google Scholar for the full bibliographic record."}
    }
  ],
  projects: [
    {id:"ianvs",name:"KubeEdge–Ianvs",label:"Cloud-edge AI",role:{zh:"Reviewer & 核心贡献者",en:"Reviewer & core contributor"},description:{zh:"参与云边协同 AI 的基准体系、数据集和工程模块建设，让研究方法能够被重复运行和比较。",en:"Contributing benchmarks, datasets and engineering modules for reproducible evaluation of collaborative cloud-edge AI."},url:"https://github.com/kubeedge/ianvs",tags:["Benchmarking","Cloud-edge","Open source"]},
    {id:"virtual-infra",name:"Virtual AI Infra Team",label:"Local-first AI",role:{zh:"个人开源项目",en:"Personal open-source project"},description:{zh:"探索让 AI Agent 帮助本地模型部署、测试与推理优化。关注可验证的改进，以及升级后的回退能力。",en:"Exploring agents for local model deployment, testing and inference optimization, with verifiable improvements and rollback in mind."},url:"https://github.com/hsj576/virtual-ai-infra-team",tags:["AI agents","Inference","Local-first"]}
  ],
  football: [
    {period:"2017 — 2021",team:{zh:"北京大学元培学院足球队",en:"Yuanpei College, Peking University"},position:{zh:"后卫",en:"Defender"},honors:[{year:"2021",title:{zh:"北大杯",en:"Peking University Cup"},place:{zh:"亚军",en:"Runners-up"},rank:2}]},
    {period:"2021 — 2022",team:{zh:"复旦大学计算机学院足球队",en:"School of Computer Science, Fudan University"},position:{zh:"后卫",en:"Defender"},honors:[{year:"2021",title:{zh:"复旦研究生院系杯",en:"Fudan Graduate Interdepartmental Cup"},place:{zh:"季军",en:"Third place"},rank:3},{year:"2022",title:{zh:"院系杯",en:"Interdepartmental Cup"},place:{zh:"冠军",en:"Champions"},rank:1}]}
  ],
  teamPhoto: {
    image:"assets/fudan-football.webp",
    title:{zh:"和复旦计算机学院足球队的队友们",en:"With my Fudan Computer Science teammates"},
    caption:{zh:"复旦大学计算机学院足球队合影 · 我在第二排左三。",en:"Fudan University Computer Science football team · I am third from the left in the second row."},
    sourceLabel:{zh:"本人提供",en:"From my personal collection"}
  },
  clubs: [
    {id:"united",title:{zh:"曼联",en:"Manchester United"},image:"assets/manchester-united.webp",source:"https://en.wikipedia.org/wiki/File:Manchester_United_FC_crest.svg",sourceLabel:{zh:"Wikimedia 文件页",en:"Wikimedia file page"},rights:"© Manchester United. Club crest and trademark; no open license verified."},
    {id:"guoan",title:{zh:"北京国安",en:"Beijing Guoan"},image:"assets/beijing-guoan.webp",source:"https://www.cfl-china.cn/zh/fixtures/details.html?away_contestant_id=2ff3aaqtf2g91wbcz4w80kkr8&competition_code=CSL&home_contestant_id=exq7je02eprk5fcre1uo9zwbi&local_date=2026-10-18&match_id=8psxpb5fcdnoer75feckq4pw4",sourceLabel:{zh:"中足联官方页面",en:"CFL official page"},rights:"© Beijing Guoan. Club crest and trademark; no open license verified."}
  ],
  favorites: [
    {id:"genshin",kind:"games",title:{zh:"原神",en:"Genshin Impact"},subtitle:{zh:"正在玩的游戏",en:"Currently playing"},image:"assets/genshin-official.webp",source:"https://ys.mihoyo.com/main/",sourceLabel:{zh:"原神官网",en:"Official Genshin Impact website"},materialLabel:{zh:"官网场景图",en:"Official scenery"},rights:"© miHoYo / HoYoverse. All rights reserved."},
    {id:"arknights",kind:"games",title:{zh:"明日方舟",en:"Arknights"},subtitle:{zh:"正在玩的游戏",en:"Currently playing"},image:"assets/arknights-official.webp",source:"https://ak.hypergryph.com/news/0787",sourceLabel:{zh:"明日方舟官网",en:"Official Arknights website"},materialLabel:{zh:"官网活动宣传图",en:"Official event artwork"},rights:"© HYPERGRYPH. All rights reserved."},
    {id:"spice-wolf",kind:"anime",title:{zh:"狼与香辛料",en:"Spice and Wolf"},subtitle:{zh:"喜欢的动漫",en:"An anime I enjoy"},image:"assets/spice-wolf-official.webp",source:"https://spice-and-wolf.com/special/detail16.html",sourceLabel:{zh:"动画官网",en:"Official anime website"},materialLabel:{zh:"2024 版官方主视觉",en:"Official 2024 key visual"},rights:"© 支倉凍砂・KADOKAWA／ローエン商業組合"},
    {id:"haruhi",kind:"anime",title:{zh:"凉宫春日的忧郁",en:"The Melancholy of Haruhi Suzumiya"},subtitle:{zh:"喜欢的动漫",en:"An anime I enjoy"},image:"assets/haruhi-official.webp",source:"https://haruhitv-anniversary.com/overview.html",sourceLabel:{zh:"动画周年官网",en:"Official anime anniversary website"},materialLabel:{zh:"官方作品介绍图",en:"Official series image"},rights:"© 谷川流・いとうのいぢ／KADOKAWA・SOS団等权利人"}
  ],
  education:[
    {period:"2024 — present",school:{zh:"复旦大学",en:"Fudan University"},degree:{zh:"网络空间安全 · 博士在读",en:"Ph.D. student in Cyberspace Security"},note:{zh:"预计 2028 年 6 月毕业",en:"Expected graduation: June 2028"}},
    {period:"2021 — 2024",school:{zh:"复旦大学",en:"Fudan University"},degree:{zh:"网络空间安全 · 硕士",en:"M.S. in Cyberspace Security"}},
    {period:"2017 — 2021",school:{zh:"北京大学 · 元培学院",en:"Peking University · Yuanpei College"},degree:{zh:"数据科学与大数据技术 · 学士",en:"B.S. in Data Science and Big Data Technology"}}
  ],
  honors:[
    {year:2026,name:{zh:"国家奖学金",en:"National Scholarship"}},
    {year:2025,name:{zh:"中国科协青年科技人才培育工程博士生专项计划",en:"CAST Young Sci-Tech Talent Program (Ph.D. Track)"}},
    {year:2025,name:{zh:"复旦大学开源先锋奖",en:"Fudan University Open-Source Pioneer Award"}},
    {year:2025,name:{zh:"开放原子校源行优秀高校开发者奖",en:"OpenAtom Campus Open Source Outstanding Developer Award"}},
    {year:2024,name:{zh:"上海市优秀毕业生",en:"Shanghai Outstanding Graduate"}}
  ],
  notes: []
};
