window.SITE_CONTENT = {
  person: {
    name: "Shijing Hu", nameZh: "胡时京", email: "sjhu24@m.fudan.edu.cn",
    portrait: "assets/portrait.webp",
    github: "https://github.com/hsj576",
    scholar: "https://scholar.google.com.hk/citations?user=ZiCfboUAAAAJ&hl=zh-CN",
    affiliation: {zh:"复旦大学 · 博士研究生",en:"Ph.D. student · Fudan University"},
    bio: {
      zh: "我是复旦大学博士研究生，导师为吕智慧教授。研究方向为大模型高效推理与云边协同智能，重点关注投机解码、草稿模型训练及其系统实现。",
      en: "I am a Ph.D. student in the College of Computer Science and Artificial Intelligence at Fudan University, advised by Prof. Zhihui Lu. My research focuses on efficient LLM inference and cloud-edge intelligence, particularly speculative decoding, draft-model training, and inference systems."
    },
    beyond: {
      zh: "研究之外，我踢足球，也表演魔术。曾在北大魔术爱好者协会任职，在东京大学交换一学期；平时也玩《原神》《明日方舟》。这里既放论文和代码，也记录学术之外的我。",
      en: "Beyond research, I play football and perform magic. I held leadership roles in Peking University's magic club and spent a semester on exchange at the University of Tokyo. I also play Genshin Impact and Arknights. This is a home for my work and my life beyond it."
    }
  },
  papers: [
  {
    "id": "gto",
    "short": "GTO",
    "title": "Bridging Draft Policy Misalignment: Group Tree Optimization for Speculative Decoding",
    "authors": [
      "Shijing Hu",
      "Jingyang Li",
      "Zhihui Lu",
      "Pan Zhou"
    ],
    "year": 2026,
    "venue": "ICLR",
    "venueFull": "International Conference on Learning Representations",
    "kind": "conference",
    "type": "speculative",
    "paper": "https://openreview.net/forum?id=dwPdYFqVWO",
    "arxiv": "https://arxiv.org/abs/2509.22134",
    "code": "https://github.com/hsj576/GTO",
    "tags": [
      "Speculative decoding",
      "Draft policy misalignment",
      "Group tree optimization"
    ],
    "bibliography": {},
    "summary": {
      "zh": "通过 Draft Tree Reward 和组间策略优化，对齐草稿训练与树式解码。",
      "en": "Aligning draft-model training with tree-based decoding through Draft Tree Reward and group-based policy optimization."
    },
    "bibtex": "@inproceedings{hu2026gto,\n  title = {{Bridging Draft Policy Misalignment: Group Tree Optimization for Speculative Decoding}},\n  author = {Shijing Hu and Jingyang Li and Zhihui Lu and Pan Zhou},\n  booktitle = {International Conference on Learning Representations},\n  year = {2026},\n  url = {https://openreview.net/forum?id=dwPdYFqVWO}\n}",
    "selected": true,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    },
    "pdf": "https://arxiv.org/pdf/2509.22134"
  },
  {
    "id": "latentrefusal",
    "short": "LatentRefusal",
    "title": "LatentRefusal: Latent-Signal Refusal for Unanswerable Text-to-SQL Queries",
    "authors": [
      "Xuancheng Ren",
      "Shijing Hu",
      "Zhihui Lu",
      "Jiangqi Huang",
      "Qiang Duan"
    ],
    "year": 2026,
    "venue": "ACL Findings",
    "venueFull": "Findings of the Association for Computational Linguistics: ACL 2026",
    "kind": "conference",
    "type": "text2sql",
    "paper": "https://aclanthology.org/2026.findings-acl.1007/",
    "doi": "10.18653/v1/2026.findings-acl.1007",
    "tags": [
      "Text-to-SQL",
      "Unanswerable queries",
      "Latent-signal refusal"
    ],
    "bibliography": {
      "pages": "20162–20179"
    },
    "summary": {
      "zh": "针对无法回答的 Text-to-SQL 查询的潜在信号拒答。",
      "en": "Latent-signal refusal for unanswerable Text-to-SQL queries."
    },
    "bibtex": "@inproceedings{ren2026latentrefusal,\n  title = {{LatentRefusal: Latent-Signal Refusal for Unanswerable Text-to-SQL Queries}},\n  author = {Xuancheng Ren and Shijing Hu and Zhihui Lu and Jiangqi Huang and Qiang Duan},\n  booktitle = {Findings of the Association for Computational Linguistics: ACL 2026},\n  year = {2026},\n  pages = {20162--20179},\n  doi = {10.18653/v1/2026.findings-acl.1007},\n  url = {https://aclanthology.org/2026.findings-acl.1007/}\n}",
    "selected": true,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    },
    "pdf": "https://aclanthology.org/2026.findings-acl.1007.pdf"
  },
  {
    "id": "griffin",
    "short": "GRIFFIN",
    "title": "GRIFFIN: Effective Token Alignment for Faster Speculative Decoding",
    "authors": [
      "Shijing Hu",
      "Jingyang Li",
      "Xingyu Xie",
      "Zhihui Lu",
      "Kim-Chuan Toh",
      "Pan Zhou"
    ],
    "year": 2025,
    "venue": "NeurIPS",
    "venueFull": "Advances in Neural Information Processing Systems",
    "kind": "conference",
    "type": "speculative",
    "paper": "https://neurips.cc/virtual/2025/poster/118685",
    "arxiv": "https://arxiv.org/abs/2502.11018",
    "code": "https://github.com/hsj576/GRIFFIN",
    "tags": [
      "Speculative decoding",
      "Token alignment"
    ],
    "bibliography": {
      "volume": "38"
    },
    "summary": {
      "zh": "通过可对齐的训练策略与草稿模型设计，缓解训练和解码之间的 token 错位。",
      "en": "Reducing token misalignment between training and decoding with token-alignable training and draft-model design."
    },
    "bibtex": "@inproceedings{hu2025griffin,\n  title = {{GRIFFIN: Effective Token Alignment for Faster Speculative Decoding}},\n  author = {Shijing Hu and Jingyang Li and Xingyu Xie and Zhihui Lu and Kim-Chuan Toh and Pan Zhou},\n  booktitle = {Advances in Neural Information Processing Systems},\n  year = {2025},\n  volume = {38},\n  url = {https://neurips.cc/virtual/2025/poster/118685}\n}",
    "selected": true,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    },
    "pdf": "https://arxiv.org/pdf/2502.11018"
  },
  {
    "id": "snn-placement",
    "short": "SNN Placement",
    "title": "Efficient Joint Communication and Computation Placement for Large-scale SNN Simulation on Supercomputers",
    "authors": [
      "Yubing Bao",
      "Zhihui Lu",
      "Xin Du",
      "Qiang Duan",
      "Jirui Yang",
      "Jin Zhao",
      "Geyong Min",
      "Yang Chen",
      "Shijing Hu",
      "Xin Wang"
    ],
    "year": 2025,
    "venue": "ICDCS",
    "venueFull": "IEEE International Conference on Distributed Computing Systems",
    "kind": "conference",
    "type": "systems",
    "paper": "https://doi.org/10.1109/ICDCS63083.2025.00035",
    "doi": "10.1109/ICDCS63083.2025.00035",
    "tags": [
      "SNN simulation",
      "Supercomputers",
      "Communication and computation placement"
    ],
    "bibliography": {
      "pages": "275–285"
    },
    "summary": {
      "zh": "超级计算机上大规模 SNN 仿真的通信与计算联合放置。",
      "en": "Joint communication and computation placement for large-scale SNN simulation on supercomputers."
    },
    "bibtex": "@inproceedings{bao2025snnplacement,\n  title = {{Efficient Joint Communication and Computation Placement for Large-scale SNN Simulation on Supercomputers}},\n  author = {Yubing Bao and Zhihui Lu and Xin Du and Qiang Duan and Jirui Yang and Jin Zhao and Geyong Min and Yang Chen and Shijing Hu and Xin Wang},\n  booktitle = {IEEE International Conference on Distributed Computing Systems},\n  year = {2025},\n  pages = {275--285},\n  doi = {10.1109/ICDCS63083.2025.00035},\n  url = {https://doi.org/10.1109/ICDCS63083.2025.00035}\n}",
    "selected": false,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    }
  },
  {
    "id": "vehicular-inference",
    "short": "Vehicular Inference",
    "title": "Dynamic Model and Node Selection for Collaborative Inference of Large/Small Models in Vehicular Networks",
    "authors": [
      "Mengke Zheng",
      "Zhihui Lu",
      "Qiang Duan",
      "Baoqi Huang",
      "Shijing Hu"
    ],
    "year": 2025,
    "venue": "ICWS",
    "venueFull": "IEEE International Conference on Web Services",
    "kind": "conference",
    "type": "cloud-edge",
    "paper": "https://doi.org/10.1109/ICWS67624.2025.00037",
    "doi": "10.1109/ICWS67624.2025.00037",
    "tags": [
      "Vehicular networks",
      "Collaborative inference",
      "Model and node selection"
    ],
    "bibliography": {
      "pages": "232–243"
    },
    "summary": {
      "zh": "车联网中大、小模型协同推理的动态模型与节点选择。",
      "en": "Dynamic model and node selection for collaborative inference of large and small models in vehicular networks."
    },
    "bibtex": "@inproceedings{zheng2025vehicularinference,\n  title = {{Dynamic Model and Node Selection for Collaborative Inference of Large/Small Models in Vehicular Networks}},\n  author = {Mengke Zheng and Zhihui Lu and Qiang Duan and Baoqi Huang and Shijing Hu},\n  booktitle = {IEEE International Conference on Web Services},\n  year = {2025},\n  pages = {232--243},\n  doi = {10.1109/ICWS67624.2025.00037},\n  url = {https://doi.org/10.1109/ICWS67624.2025.00037}\n}",
    "selected": false,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    }
  },
  {
    "id": "laecips",
    "short": "LAECIPS",
    "title": "LAECIPS: Large vision model assisted adaptive edge-cloud collaboration for IoT-based embodied intelligence system",
    "authors": [
      "Shijing Hu",
      "Zhihui Lu",
      "Xin Xu",
      "Ruijun Deng",
      "Xin Du",
      "Qiang Duan"
    ],
    "year": 2025,
    "venue": "JIII",
    "venueFull": "Journal of Industrial Information Integration",
    "kind": "journal",
    "type": "cloud-edge",
    "paper": "https://doi.org/10.1016/j.jii.2025.100955",
    "doi": "10.1016/j.jii.2025.100955",
    "tags": [
      "Edge-cloud collaboration",
      "Large vision models",
      "IoT-based embodied intelligence"
    ],
    "bibliography": {
      "volume": "48",
      "articleNumber": "100955"
    },
    "summary": {
      "zh": "大视觉模型辅助的自适应端云协同推理，面向物联网具身智能系统。",
      "en": "Large-vision-model-assisted adaptive edge-cloud collaboration for IoT-based embodied intelligence systems."
    },
    "bibtex": "@article{hu2025laecips,\n  title = {{LAECIPS: Large vision model assisted adaptive edge-cloud collaboration for IoT-based embodied intelligence system}},\n  author = {Shijing Hu and Zhihui Lu and Xin Xu and Ruijun Deng and Xin Du and Qiang Duan},\n  journal = {Journal of Industrial Information Integration},\n  year = {2025},\n  volume = {48},\n  eid = {100955},\n  doi = {10.1016/j.jii.2025.100955},\n  url = {https://doi.org/10.1016/j.jii.2025.100955}\n}",
    "selected": true,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    }
  },
  {
    "id": "demas",
    "short": "DeMas",
    "title": "DeMas: An efficient method for malicious samples detection and mitigation in cloud-based systems",
    "authors": [
      "Hengqi Guo",
      "Shijing Hu",
      "Xin Xu",
      "Yusiyuan Chen",
      "Weishen Lu",
      "Baoqi Huang",
      "Qiang Duan"
    ],
    "year": 2025,
    "venue": "JSA",
    "venueFull": "Journal of Systems Architecture",
    "kind": "journal",
    "type": "systems",
    "paper": "https://doi.org/10.1016/j.sysarc.2025.103519",
    "doi": "10.1016/j.sysarc.2025.103519",
    "tags": [
      "Cloud-based systems",
      "Malicious sample detection",
      "Malicious sample mitigation"
    ],
    "bibliography": {
      "volume": "167",
      "articleNumber": "103519"
    },
    "summary": {
      "zh": "云系统中的恶意样本检测与缓解。",
      "en": "Detection and mitigation of malicious samples in cloud-based systems."
    },
    "bibtex": "@article{guo2025demas,\n  title = {{DeMas: An efficient method for malicious samples detection and mitigation in cloud-based systems}},\n  author = {Hengqi Guo and Shijing Hu and Xin Xu and Yusiyuan Chen and Weishen Lu and Baoqi Huang and Qiang Duan},\n  journal = {Journal of Systems Architecture},\n  year = {2025},\n  volume = {167},\n  eid = {103519},\n  doi = {10.1016/j.sysarc.2025.103519},\n  url = {https://doi.org/10.1016/j.sysarc.2025.103519}\n}",
    "selected": false,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    }
  },
  {
    "id": "acsarf",
    "short": "ACSarF",
    "title": "ACSarF: a DRL-based adaptive consortium blockchain sharding framework for supply chain finance",
    "authors": [
      "Shijing Hu",
      "Junxiong Lin",
      "Xin Du",
      "Wenbin Huang",
      "Zhihui Lu",
      "Qiang Duan",
      "Jie Wu"
    ],
    "year": 2025,
    "venue": "DCN",
    "venueFull": "Digital Communications and Networks",
    "kind": "journal",
    "type": "systems",
    "paper": "https://doi.org/10.1016/j.dcan.2023.11.008",
    "doi": "10.1016/j.dcan.2023.11.008",
    "tags": [
      "Consortium blockchain",
      "Adaptive sharding",
      "DRL",
      "Supply chain finance"
    ],
    "bibliography": {
      "volume": "11",
      "issue": "1",
      "pages": "26–34"
    },
    "summary": {
      "zh": "面向供应链金融、基于 DRL 的自适应联盟区块链分片框架。",
      "en": "A DRL-based adaptive consortium blockchain sharding framework for supply chain finance."
    },
    "bibtex": "@article{hu2025acsarf,\n  title = {{ACSarF: a DRL-based adaptive consortium blockchain sharding framework for supply chain finance}},\n  author = {Shijing Hu and Junxiong Lin and Xin Du and Wenbin Huang and Zhihui Lu and Qiang Duan and Jie Wu},\n  journal = {Digital Communications and Networks},\n  year = {2025},\n  volume = {11},\n  number = {1},\n  pages = {26--34},\n  doi = {10.1016/j.dcan.2023.11.008},\n  url = {https://doi.org/10.1016/j.dcan.2023.11.008}\n}",
    "selected": false,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    }
  },
  {
    "id": "collars",
    "short": "CoLLaRS",
    "title": "CoLLaRS: A cloud-edge-terminal collaborative lifelong learning framework for AIoT",
    "authors": [
      "Shijing Hu",
      "Junxiong Lin",
      "Zhihui Lu",
      "Xin Du",
      "Qiang Duan",
      "Shih-Chia Huang"
    ],
    "year": 2024,
    "venue": "FGCS",
    "venueFull": "Future Generation Computer Systems",
    "kind": "journal",
    "type": "cloud-edge",
    "paper": "https://doi.org/10.1016/j.future.2024.04.046",
    "doi": "10.1016/j.future.2024.04.046",
    "tags": [
      "Cloud-edge-terminal collaboration",
      "Lifelong learning",
      "AIoT"
    ],
    "bibliography": {
      "volume": "158",
      "pages": "447–456"
    },
    "summary": {
      "zh": "面向 AIoT 的云、边、端协同终身学习框架。",
      "en": "A cloud-edge-terminal collaborative lifelong learning framework for AIoT."
    },
    "bibtex": "@article{hu2024collars,\n  title = {{CoLLaRS: A cloud-edge-terminal collaborative lifelong learning framework for AIoT}},\n  author = {Shijing Hu and Junxiong Lin and Zhihui Lu and Xin Du and Qiang Duan and Shih-Chia Huang},\n  journal = {Future Generation Computer Systems},\n  year = {2024},\n  volume = {158},\n  pages = {447--456},\n  doi = {10.1016/j.future.2024.04.046},\n  url = {https://doi.org/10.1016/j.future.2024.04.046}\n}",
    "selected": false,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    }
  },
  {
    "id": "invmetrics",
    "short": "InvMetrics",
    "title": "InvMetrics: Measuring Privacy Risks for Split Model-Based Customer Behavior Analysis",
    "authors": [
      "Ruijun Deng",
      "Shijing Hu",
      "Junxiong Lin",
      "Jirui Yang",
      "Zhihui Lu",
      "Jie Wu",
      "Shih-Chia Huang",
      "Qiang Duan"
    ],
    "year": 2024,
    "venue": "IEEE TCE",
    "venueFull": "IEEE Transactions on Consumer Electronics",
    "kind": "journal",
    "type": "systems",
    "paper": "https://doi.org/10.1109/TCE.2024.3370764",
    "doi": "10.1109/TCE.2024.3370764",
    "tags": [
      "Privacy risk measurement",
      "Split models",
      "Customer behavior analysis"
    ],
    "bibliography": {
      "volume": "70",
      "issue": "1",
      "pages": "4168–4177"
    },
    "summary": {
      "zh": "基于拆分模型的客户行为分析中的隐私风险度量。",
      "en": "Privacy risk measurement for split-model-based customer behavior analysis."
    },
    "bibtex": "@article{deng2024invmetrics,\n  title = {{InvMetrics: Measuring Privacy Risks for Split Model-Based Customer Behavior Analysis}},\n  author = {Ruijun Deng and Shijing Hu and Junxiong Lin and Jirui Yang and Zhihui Lu and Jie Wu and Shih-Chia Huang and Qiang Duan},\n  journal = {IEEE Transactions on Consumer Electronics},\n  year = {2024},\n  volume = {70},\n  number = {1},\n  pages = {4168--4177},\n  doi = {10.1109/TCE.2024.3370764},\n  url = {https://doi.org/10.1109/TCE.2024.3370764}\n}",
    "selected": false,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    }
  },
  {
    "id": "federated-edge-6g",
    "short": "Federated Learning & Edge Computing",
    "title": "Combining Federated Learning and Edge Computing Toward Ubiquitous Intelligence in 6G Network: Challenges, Recent Advances, and Future Directions",
    "authors": [
      "Qiang Duan",
      "Jun Huang",
      "Shijing Hu",
      "Ruijun Deng",
      "Zhihui Lu",
      "Shui Yu"
    ],
    "year": 2023,
    "venue": "IEEE COMST",
    "venueFull": "IEEE Communications Surveys & Tutorials",
    "kind": "journal",
    "type": "cloud-edge",
    "paper": "https://doi.org/10.1109/COMST.2023.3316615",
    "doi": "10.1109/COMST.2023.3316615",
    "tags": [
      "Federated learning",
      "Edge computing",
      "6G",
      "Ubiquitous intelligence"
    ],
    "bibliography": {
      "volume": "25",
      "issue": "4",
      "pages": "2892–2950"
    },
    "summary": {
      "zh": "面向 6G 泛在智能的联邦学习与边缘计算结合，涵盖挑战、进展及未来方向。",
      "en": "Combining federated learning and edge computing for ubiquitous intelligence in 6G networks, including challenges, advances, and future directions."
    },
    "bibtex": "@article{duan2023federatededge6g,\n  title = {{Combining Federated Learning and Edge Computing Toward Ubiquitous Intelligence in 6G Network: Challenges, Recent Advances, and Future Directions}},\n  author = {Qiang Duan and Jun Huang and Shijing Hu and Ruijun Deng and Zhihui Lu and Shui Yu},\n  journal = {IEEE Communications Surveys \\& Tutorials},\n  year = {2023},\n  volume = {25},\n  number = {4},\n  pages = {2892--2950},\n  doi = {10.1109/COMST.2023.3316615},\n  url = {https://doi.org/10.1109/COMST.2023.3316615}\n}",
    "selected": false,
    "citationLabel": {
      "zh": "正式发表版本",
      "en": "Published version"
    }
  }
],
  projects: [
    {id:"ianvs",name:"KubeEdge–Ianvs",label:"Cloud-edge AI",role:{zh:"Reviewer & 核心贡献者",en:"Reviewer & core contributor"},description:{zh:"参与云边协同 AI 的基准体系、数据集和工程模块建设，让研究方法能够被重复运行和比较。",en:"Contributing benchmarks, datasets and engineering modules for reproducible evaluation of collaborative cloud-edge AI."},url:"https://github.com/kubeedge/ianvs",tags:["Benchmarking","Cloud-edge","Open source"]},
    {id:"virtual-infra",name:"Virtual AI Infra Team",label:"Local-first AI",role:{zh:"个人开源项目",en:"Personal open-source project"},description:{zh:"探索让 AI Agent 帮助本地模型部署、测试与推理优化。关注可验证的改进，以及升级后的回退能力。",en:"Exploring agents for local model deployment, testing and inference optimization, with verifiable improvements and rollback in mind."},url:"https://github.com/hsj576/virtual-ai-infra-team",tags:["AI agents","Inference","Local-first"]}
  ],
  lfx: {
  "checkedOn": "2026-11-10",
  "profile": "https://app.lfx.dev/u/hsj576",
  "mentorProfile": "https://mentorship.linuxfoundation.org/mentors/cb4f9ca0-27ba-4487-8f44-08dd155d1b9e",
  "mentorSince": "2024",
  "badgesUrl": "https://app.lfx.dev/badges",
  "badges": [
    {"id":"kcd-shanghai-2024","title":"Speaker - KCD Shanghai 2024","issuer":"The Linux Foundation","image":"assets/badge-kcd-shanghai-2024.webp","url":"https://www.credly.com/org/the-linux-foundation/badge/speaker-kcd-shanghai-2024","source":"https://app.lfx.dev/u/hsj576"},
    {"id":"kcd-beijing-2025","title":"Speaker - KCD Beijing 2025","issuer":"The Linux Foundation","image":"assets/badge-kcd-beijing-2025.webp","url":"https://www.credly.com/org/the-linux-foundation/badge/speaker-kcd-beijing-2025","source":"https://app.lfx.dev/u/hsj576"}
  ],
  "programs": [
    {
      "id": "0aca7087-4985-4d22-a7c2-b8d5845e962b",
      "title": "KubeEdge-Ianvs Simulation Sandbox: Environment-Isolated Execution",
      "fullName": "CNCF - KubeEdge: KubeEdge-Ianvs Simulation Sandbox: Environment-Isolated Execution (2026 Term 3)",
      "year": 2026,
      "term": 3,
      "period": "Sep 2026 - Nov 2026",
      "status": "in-progress",
      "role": "Mentor",
      "url": "https://mentorship.linuxfoundation.org/programs/0aca7087-4985-4d22-a7c2-b8d5845e962b",
      "scope": {
        "zh": "环境隔离的仿真执行：独立运行环境、CPU/内存资源约束与系统指标评测。",
        "en": "Environment-isolated simulation with independent runtimes, CPU/memory limits, and system-level evaluation."
      }
    },
    {
      "id": "123576ab-9c3a-4c63-a1b0-4f35c41845f2",
      "title": "Comprehensive Example Restoration for Ianvs: Phase III",
      "fullName": "CNCF - KubeEdge: Comprehensive Example Restoration for Ianvs: Phase III (2026 Term 2)",
      "year": 2026,
      "term": 2,
      "period": "Jun 2026 - Aug 2026",
      "status": "completed",
      "role": "Mentor",
      "url": "https://mentorship.linuxfoundation.org/programs/123576ab-9c3a-4c63-a1b0-4f35c41845f2",
      "scope": {
        "zh": "第三阶段示例恢复：依赖与运行问题、文档更新及多版本回归测试。",
        "en": "Phase III of example restoration: dependency and runtime issues, documentation, and multi-version regression testing."
      }
    },
    {
      "id": "fe439c9b-819f-43c3-b42d-b9b0c0b7afb0",
      "title": "Ianvs: Cloud-edge benchmark for LLM speculative decoding",
      "fullName": "CNCF - KubeEdge: Ianvs: Cloud-edge benchmark for LLM speculative decoding (2026 Term 1)",
      "year": 2026,
      "term": 1,
      "period": "Mar 2026 - May 2026",
      "status": "completed",
      "role": "Mentor",
      "url": "https://mentorship.linuxfoundation.org/programs/fe439c9b-819f-43c3-b42d-b9b0c0b7afb0",
      "scope": {
        "zh": "单机云边仿真中的大模型投机解码基准，覆盖网络约束与推理指标。",
        "en": "A single-host cloud-edge simulation benchmark for speculative decoding, including network constraints and inference metrics."
      }
    },
    {
      "id": "9826762a-9960-4310-9d94-8d626b387a1c",
      "title": "Ianvs: Comprehensive example restoration",
      "fullName": "CNCF - KubeEdge: Ianvs: Comprehensive example restoration (2026 Term 1)",
      "year": 2026,
      "term": 1,
      "period": "Mar 2026 - May 2026",
      "status": "completed",
      "role": "Mentor",
      "url": "https://mentorship.linuxfoundation.org/programs/9826762a-9960-4310-9d94-8d626b387a1c",
      "scope": {
        "zh": "持续修复 Ianvs 示例，更新教程与调试指南，并探索 CI 回归保护。",
        "en": "Continued restoration of Ianvs examples, updated tutorials and debugging guides, and CI regression protection."
      }
    },
    {
      "id": "82d71e63-2e1e-48d6-8c93-91c9e8bf8d5d",
      "title": "Comprehensive Example Restoration for Ianvs",
      "fullName": "CNCF - KubeEdge: Comprehensive Example Restoration for Ianvs (2025 Term 3)",
      "year": 2025,
      "term": 3,
      "period": "Sep 2025 - Nov 2025",
      "status": "completed",
      "role": "Mentor",
      "url": "https://mentorship.linuxfoundation.org/programs/82d71e63-2e1e-48d6-8c93-91c9e8bf8d5d",
      "scope": {
        "zh": "示例修复、可复现教程与多 Python 版本 CI 测试。",
        "en": "Example restoration, reproducible tutorials, and CI testing across Python versions."
      }
    },
    {
      "id": "e3fc44d9-9ddd-42e6-a9be-8f6c2a114672",
      "title": "Domain-specific large model benchmarks: the edge perspective",
      "fullName": "CNCF - KubeEdge: Domain-specific large model benchmarks: the edge perspective (2025 Term 1)",
      "year": 2025,
      "term": 1,
      "period": "Mar 2025 - May 2025",
      "status": "completed",
      "role": "Mentor",
      "url": "https://mentorship.linuxfoundation.org/programs/e3fc44d9-9ddd-42e6-a9be-8f6c2a114672",
      "scope": {
        "zh": "面向边缘场景的领域大模型基准、数据集、测试工具与评价方法。",
        "en": "Benchmarks, datasets, testing tools, and evaluation methods for edge-oriented domain-specific large models."
      }
    },
    {
      "id": "8961c0b4-0e34-43be-9022-384a4847f5d3",
      "title": "Enhance Dependency Management and Documentation for KubeEdge-Ianvs",
      "fullName": "CNCF - KubeEdge: Enhance Dependency Management and Documentation for KubeEdge-Ianvs (2025 Term 1)",
      "year": 2025,
      "term": 1,
      "period": "Mar 2025 - May 2025",
      "status": "completed",
      "role": "Mentor",
      "url": "https://mentorship.linuxfoundation.org/programs/8961c0b4-0e34-43be-9022-384a4847f5d3",
      "scope": {
        "zh": "依赖兼容性、贡献指南、Quick Start 示例与使用文档。",
        "en": "Dependency compatibility, contribution guidelines, Quick Start examples, and usage documentation."
      }
    },
    {
      "id": "bfa8251f-a975-4e07-8e7a-915df3518551",
      "title": "Cloud-Edge Speculative Decoding for LLM via KubeEdge-Ianvs",
      "fullName": "CNCF - KubeEdge: Cloud-Edge Speculative Decoding for LLM via KubeEdge-Ianvs (2024 Term 3)",
      "year": 2024,
      "term": 3,
      "period": "Sep 2024 - Nov 2024",
      "status": "completed",
      "role": "Mentor",
      "url": "https://mentorship.linuxfoundation.org/programs/bfa8251f-a975-4e07-8e7a-915df3518551",
      "scope": {
        "zh": "基于 Ianvs 的云边协同大模型投机解码示例与算法探索。",
        "en": "Cloud-edge speculative-decoding examples and algorithm exploration on Ianvs."
      }
    }
  ]
},
  research: [
  {
    "title": {
      "zh": "大模型高效推理",
      "en": "Efficient LLM inference"
    },
    "description": {
      "zh": "投机解码、草稿模型训练，以及语言与视觉语言模型推理系统。",
      "en": "Speculative decoding, draft-model training, and inference systems for language and vision-language models."
    }
  },
  {
    "title": {
      "zh": "云边协同智能",
      "en": "Cloud-edge intelligence"
    },
    "description": {
      "zh": "异构设备上的协同推理、联邦与持续学习，以及可复现基准。",
      "en": "Collaborative inference, federated and continual learning, and reproducible benchmarks across heterogeneous devices."
    }
  }
],
  service: [
  {
    "venue": "ICLR",
    "years": "2026, 2027"
  },
  {
    "venue": "ICML",
    "years": "2026"
  },
  {
    "venue": "NeurIPS",
    "years": "2026"
  },
  {
    "venue": "ACM MM",
    "years": "2026"
  },
  {
    "venue": "AAAI",
    "years": "2027"
  },
  {
    "venue": "EuroSys",
    "years": "2027"
  }
],
  ospp: {
    id:"2698a0025", year:2026, organization:"KubeEdge", role:"Mentor",
    mode:{zh:"经典模式",en:"Classic mode"},
    title:{zh:"KubeEdge-Ianvs 云边 AI Infra 故障修复智能体基准",en:"KubeEdge-Ianvs Benchmark for Cloud-Edge AI Infrastructure Repair Agents"},
    url:"https://summer.ospp.ac.cn/org/prodetail/2698a0025?list=org&navpage=org&lang=zh",
    summary:{zh:"在 Ianvs 中构建面向云边 AI 基础设施的故障修复智能体基准，覆盖故障注入、诊断修复、安全审批、结果验证与失败回滚。",en:"A benchmark in Ianvs for agents repairing cloud-edge AI infrastructure, covering fault injection, diagnosis and repair, safety approvals, outcome verification, and rollback."},
    scope:[
      {zh:"Python 评测框架与 CLI，支持场景执行、智能体接入和评测。",en:"A Python evaluation framework and CLI for running scenarios, integrating agents, and evaluating outcomes."},
      {zh:"服务配置、模型制品、异构环境和云边状态一致性等故障场景。",en:"Failure scenarios covering service configuration, model artifacts, heterogeneous environments, and cloud-edge state consistency."},
      {zh:"从修复效果、根因定位、耗时、工具效率、安全与推理 SLO 等维度评估。",en:"Evaluation of repair success, root-cause diagnosis, time, tool efficiency, safety, and inference SLOs."}
    ],
    status:null, checkedOn:"2026-11-10"
  },
  mentorship: {
    title:{zh:"开源贡献与学生指导",en:"Open source & mentorship"},
    summary:{zh:"除了参与开源项目开发，我也在多个 LFX Mentorship 和 OSPP（开源之夏）项目中担任导师，指导学生开展开源贡献。",en:"Alongside my own open-source work, I have served as a mentor on multiple projects in LFX Mentorship and OSPP, guiding students in contributing to open source."},
    programs:[
      {name:"LFX Mentorship",role:{zh:"项目导师",en:"Project mentor"},description:{zh:"指导学生参与开源项目并开展社区贡献。",en:"Guiding students in contributing to open-source projects and communities."}},
      {name:"OSPP",fullName:{zh:"开源之夏",en:"Open Source Promotion Plan"},role:{zh:"项目导师",en:"Project mentor"},description:{zh:"指导学生通过开源之夏项目参与开源贡献。",en:"Mentoring students in open-source contributions through OSPP projects."}}
    ]
  },
  exchange: {
    period:"2019.03 — 2019.08",
    university:{zh:"东京大学",en:"The University of Tokyo"},
    role:{zh:"交换学生 · 一学期",en:"Exchange student · one semester"},
    description:{zh:"2019 年 3 月至 8 月，我在东京大学交换学习了一学期。",en:"I spent one semester as an exchange student at the University of Tokyo, from March to August 2019."}
  },
  languages:[{name:{zh:"日语",en:"Japanese"},qualification:{zh:"日本语能力测试（JLPT）N1 通过",en:"Japanese-Language Proficiency Test (JLPT) N1 — passed"}}],
  magic: {
    period:"2019 — 2021",
    association:{zh:"北京大学魔术爱好者协会",en:"Peking University Magic Enthusiasts Association"},
    roles:{zh:"团支书、理事长",en:"Youth League Branch Secretary & Council Chair"},
    intro:{zh:"除了踢球，我也表演魔术。大学期间，我在学生社团任职，也曾在学院年度晚会上登台。",en:"I also perform magic. During university, I held leadership roles in the student magic club and performed at college annual galas."},
    performances:[
      {year:2017,event:{zh:"北京大学元培学院年度晚会",en:"Yuanpei College annual gala, Peking University"}},
      {year:2018,event:{zh:"北京大学元培学院年度晚会",en:"Yuanpei College annual gala, Peking University"}},
      {year:2018,event:{zh:"北京大学法学院年度晚会",en:"Law School annual gala, Peking University"}},
      {year:2019,event:{zh:"北京大学元培学院年度晚会",en:"Yuanpei College annual gala, Peking University"}}
    ]
  },
  football: [
    {period:"2017 — 2021",team:{zh:"北京大学元培学院足球队",en:"Yuanpei College, Peking University"},position:{zh:"后卫",en:"Defender"},honors:[{year:"2021",title:{zh:"北大杯",en:"Peking University Cup"},place:{zh:"亚军",en:"Runners-up"},rank:2}]},
    {period:"2021 — 2022",team:{zh:"复旦大学计算机学院足球队",en:"School of Computer Science, Fudan University"},position:{zh:"后卫",en:"Defender"},honors:[{year:"2021",title:{zh:"复旦研究生院系杯",en:"Fudan Graduate Interdepartmental Cup"},place:{zh:"季军",en:"Third place"},rank:3},{year:"2022",title:{zh:"院系杯",en:"Interdepartmental Cup"},place:{zh:"冠军",en:"Champions"},rank:1}]}
  ],
  magicPhoto: {
    image:"assets/magic-law-gala-2019.webp",
    title:{zh:"2019年法学院新年晚会",en:"Law School 2019 New Year Gala"},
    caption:{zh:"魔术表演 · 北京大学百年讲堂",en:"Magic performance · Peking University Centennial Hall"},
    sourceLabel:{zh:"本人提供",en:"From my personal collection"}
  },
  yuanpeiPhoto: {
    image:"assets/yuanpei-football.webp",
    title:{zh:"和北大元培学院足球队的队友们",en:"With my Yuanpei College football teammates"},
    caption:{zh:"北京大学元培学院足球队合影 · 我在第二排中间，穿 12 号球衣。",en:"Yuanpei College football team, Peking University · I am in the middle of the second row, wearing the number 12 jersey."},
    sourceLabel:{zh:"本人提供",en:"From my personal collection"}
  },
  tokyoPhoto: {
    image:"assets/tokyo-exchange.webp",
    title:{zh:"东京大学交换时的校园一景",en:"A campus scene from my exchange at the University of Tokyo"},
    caption:{zh:"东京大学交换期间的照片 · 2019 年 3 月—8 月。",en:"A photo from my semester at the University of Tokyo · March–August 2019."},
    sourceLabel:{zh:"本人提供",en:"From my personal collection"}
  },
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
  talks: [
  {
    "id": "open-source-agents",
    "title": {
      "zh": "Agent 时代，学生如何做出有价值的开源贡献？",
      "en": "How Can Students Make Valuable Open-Source Contributions in the Agent Era?"
    },
    "event": {
      "zh": "复旦开源软件课程",
      "en": "Fudan Open-Source Software Course"
    },
    "category": "open-source",
    "dateLabel": {
      "zh": "2026.11.04 · 文件名标注",
      "en": "2026.11.04 · as labeled in the filename"
    },
    "description": {
      "zh": "从学生贡献者、项目导师与 Reviewer 的经历出发，讨论 Agent 时代的开源项目选择、申请准备、工程验证与持续协作。",
      "en": "Drawing on experience as a student contributor, project mentor, and reviewer: choosing projects, preparing applications, verifying changes, and sustaining open-source collaboration."
    },
    "tags": [
      "Open source",
      "AI agents",
      "Mentorship"
    ],
    "pdf": "files/talks/open-source-agents.pdf",
    "downloadName": "开源软件课程-胡时京-20261104.pdf",
    "pages": 28,
    "bytes": 2091345,
    "cover": "assets/talks/open-source-agents-01.webp",
    "slides": [
      "assets/talks/open-source-agents-01.webp",
      "assets/talks/open-source-agents-02.webp",
      "assets/talks/open-source-agents-03.webp",
      "assets/talks/open-source-agents-04.webp",
      "assets/talks/open-source-agents-05.webp",
      "assets/talks/open-source-agents-06.webp",
      "assets/talks/open-source-agents-07.webp",
      "assets/talks/open-source-agents-08.webp",
      "assets/talks/open-source-agents-09.webp",
      "assets/talks/open-source-agents-10.webp",
      "assets/talks/open-source-agents-11.webp",
      "assets/talks/open-source-agents-12.webp",
      "assets/talks/open-source-agents-13.webp",
      "assets/talks/open-source-agents-14.webp",
      "assets/talks/open-source-agents-15.webp",
      "assets/talks/open-source-agents-16.webp",
      "assets/talks/open-source-agents-17.webp",
      "assets/talks/open-source-agents-18.webp",
      "assets/talks/open-source-agents-19.webp",
      "assets/talks/open-source-agents-20.webp",
      "assets/talks/open-source-agents-21.webp",
      "assets/talks/open-source-agents-22.webp",
      "assets/talks/open-source-agents-23.webp",
      "assets/talks/open-source-agents-24.webp",
      "assets/talks/open-source-agents-25.webp",
      "assets/talks/open-source-agents-26.webp",
      "assets/talks/open-source-agents-27.webp",
      "assets/talks/open-source-agents-28.webp"
    ],
    "language": {
      "zh": "中文",
      "en": "Chinese"
    },
    "format": "PDF"
  },
  {
    "id": "faster-llm-generation",
    "title": {
      "zh": "如何让大模型生成得更快",
      "en": "How to Make Large Language Models Generate Faster"
    },
    "subtitle": {
      "zh": "投机解码的原理、挑战与前沿",
      "en": "Principles, Challenges, and Frontiers of Speculative Decoding"
    },
    "event": {
      "zh": "复旦·第一届学生前沿科创大会",
      "en": "Fudan First Student Frontier Science & Innovation Conference"
    },
    "category": "research",
    "dateLabel": {
      "zh": "10.31 · 文件名标注",
      "en": "10.31 · as labeled in the filename"
    },
    "description": {
      "zh": "介绍投机解码的基本机制、树式候选与并行草稿，并分享 GRIFFIN、GTO 及 TEV / ExitTrain 的研究。",
      "en": "An introduction to speculative decoding, draft trees, and parallel drafting, followed by research on GRIFFIN, GTO, and TEV / ExitTrain."
    },
    "tags": [
      "Speculative decoding",
      "GRIFFIN",
      "GTO",
      "TEV / ExitTrain"
    ],
    "researchNotice": {
      "zh": "包含演讲时标注为在研／在审的 TEV / ExitTrain 内容；保留完整原稿。",
      "en": "Includes TEV / ExitTrain material labeled as work in progress / under review in the slides; the full original is retained."
    },
    "pdf": "files/talks/faster-llm-generation.pdf",
    "downloadName": "复旦学生前沿科创大会_胡时京_1031.pdf",
    "pages": 25,
    "bytes": 1609685,
    "cover": "assets/talks/faster-llm-generation-01.webp",
    "slides": [
      "assets/talks/faster-llm-generation-01.webp",
      "assets/talks/faster-llm-generation-02.webp",
      "assets/talks/faster-llm-generation-03.webp",
      "assets/talks/faster-llm-generation-04.webp",
      "assets/talks/faster-llm-generation-05.webp",
      "assets/talks/faster-llm-generation-06.webp",
      "assets/talks/faster-llm-generation-07.webp",
      "assets/talks/faster-llm-generation-08.webp",
      "assets/talks/faster-llm-generation-09.webp",
      "assets/talks/faster-llm-generation-10.webp",
      "assets/talks/faster-llm-generation-11.webp",
      "assets/talks/faster-llm-generation-12.webp",
      "assets/talks/faster-llm-generation-13.webp",
      "assets/talks/faster-llm-generation-14.webp",
      "assets/talks/faster-llm-generation-15.webp",
      "assets/talks/faster-llm-generation-16.webp",
      "assets/talks/faster-llm-generation-17.webp",
      "assets/talks/faster-llm-generation-18.webp",
      "assets/talks/faster-llm-generation-19.webp",
      "assets/talks/faster-llm-generation-20.webp",
      "assets/talks/faster-llm-generation-21.webp",
      "assets/talks/faster-llm-generation-22.webp",
      "assets/talks/faster-llm-generation-23.webp",
      "assets/talks/faster-llm-generation-24.webp",
      "assets/talks/faster-llm-generation-25.webp"
    ],
    "language": {
      "zh": "中文",
      "en": "Chinese"
    },
    "format": "PDF"
  }
],
  notes: []
};
