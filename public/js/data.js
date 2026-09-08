const siteData = {
  textContent: {
    nav: {
      logoMark: "A",
      logoP1: "AnvIQ",
      logoP2: "Labs",
      links: [
        { href: "#about", text: "About" },
        { href: "#capabilities", text: "Capabilities" },
        { href: "#industries", text: "Industries" },
        { href: "#research", text: "Research" },
        { href: "#security", text: "Security" },
        { href: "#why-us", text: "Why Choose Us" },
        { href: "#leadership", text: "Leadership" },
        { href: "#contact", text: "Contact" }
      ],
      cta: "Get in Touch"
    },
    hero: {
      overline: "Enterprise-Grade AI Systems",
      headlineP1: "Proprietary AI Systems<br />That Deliver",
      headlineAccent: "Measurable ROI",
      headlineP2: "Not Experiments",
      description: "We engineer production-grade AI infrastructure for enterprises handling sensitive data at scale. Research-validated. Security-hardened. Commercially deployed.",
      btnPrimary: "Request Technical Briefing",
      btnGhost: "View Benchmarks",
      microStats: [
        { value: "55+", label: "AI Models Deployed" },
        { value: "10 TB+", label: "Data Processed" },
        { value: "97.4%", label: "Accuracy" }
      ],
      accuracyNote: "Outperforming industry baselines by 12% in domain-specific classification",
      platformTitle: "AnvIQ Intelligence Platform"
    },
    about: {
      title: "Intelligence Engineered<br />for Business",
      p1: "AnvIQ Labs is a <span class=\"text-brand-600 font-semibold\">research-driven AI technology company</span> focused on building intelligent software products that help businesses make smarter decisions and deliver better customer experiences.",
      p2: "We bridge the gap between pure data science research and enterprise-grade software engineering, transforming theoretical models into robust, scalable platforms.",
      statsHeading: "By The Numbers"
    },
    capabilities: {
      title: "Precision-Built<br />AI Solutions",
      description: "We engineering specialized AI products built around your operational reality &mdash; completely avoiding generic templates."
    },
    industries: {
      title: "Built for Real-World Impact",
      description: "Our intelligent products are architected for sectors where data-driven decisions carry the highest strategic value."
    },
    research: {
      title: "The AnvIQ Research Lab<br />Where Production Reliability Meets Academic Rigor",
      description: "We do not ship models without validation. Every AI system we deploy undergoes structured experimentation, statistical hypothesis testing, and performance benchmarking against established baselines. Our research methodology prioritizes reproducibility, robustness, and real-world generalization over synthetic benchmarks.",
      whitepaper: {
        title: "The AnvIQ Framework: Achieving 99.9% Production Reliability in RAG Systems",
        summary: "Retrieval-Augmented Generation (RAG) systems fail in production due to semantic drift, retrieval precision degradation, and hallucination. Our framework addresses these through custom embedding layers, active learning pipelines, and constrained decoding with citation verification. Deployed across 10+ enterprise clients maintaining 99.9% uptime with <2% hallucination rates."
      },
      proprietaryIntel: {
        title: "What is Proprietary Intelligence?",
        description: "Proprietary Intelligence refers to AI systems whose competitive advantage stems from custom algorithmic architecture, domain-tuned model weights, and private training data—not generic API wrappers.",
        points: [
          "Custom Neural Architectures: Bespoke model topologies designed for specific data constraints.",
          "Optimized Loss Functions: Task-specific objectives engineered to prioritize business metrics.",
          "Proprietary Training Data: Cleaned, labeled datasets representing your operational reality.",
          "Inference Optimization: Model compression achieving <50ms latency without accuracy loss."
        ]
      }
    },
    whyUs: {
      title: "Engineered for<br />Enterprise Performance",
      description: "What makes our approach fundamentally different from conventional AI development."
    },
    leadership: {
      headlineP1: "Built by Researchers.",
      headlineP2: "Deployed by Engineers.",
      p1: "AnvIQ Labs is led by a team of machine learning researchers and software architects with pedigree from top-tier institutions.",
      // p2: "Our technical leadership has published in peer-reviewed ML conferences, scaled AI systems to millions of users, and holds expertise in deep learning theory, production ML engineering, and statistical rigor for business-critical decisions.",
      // teamDNAHeading: "Our Team DNA — Domain Expertise",
      quote: "We do not build AI for the sake of novelty. We build defensible, commercially viable systems that create lasting competitive moats."
    },
    contact: {
      title: "Let's Build Something<br />Intelligent Together",
      description: "Tell us about your data challenge. We will architect the right intelligent solution for you.",
      btnPrimary: "Send Message",
      info: {
        email: "anviq.ai",
        location: "No. 8, G & M Floor, Embassy Star, Palace Cross Road, Vasanth Nagar, Bengaluru - 560 052",
        responseTime: "Within 24 hours",
        socialLinks: [
          { href: "#", icon: "linkedin", label: "LinkedIn" },
          { href: "#", icon: "twitter", label: "Twitter" },
          { href: "#", icon: "github", label: "GitHub" }
        ]
      }
    },
    footer: {
      description: "A research-driven AI technology company building intelligent software products that transform complex data into actionable business intelligence.",
      companyTitle: "Company",
      companyLinks: [
        { href: "#about", text: "About Us" },
        { href: "#capabilities", text: "Capabilities" },
        { href: "#industries", text: "Industries" },
        { href: "#research", text: "Research" },
        { href: "#contact", text: "Contact" }
      ],
      solutionsTitle: "Solutions",
      solutionsLinks: [
        { href: "#capabilities", text: "Custom LLM Development" },
        { href: "#capabilities", text: "ML Model Design" },
        { href: "#capabilities", text: "Data Science" },
        { href: "#capabilities", text: "Predictive Intelligence" },
        { href: "#capabilities", text: "AI Platforms" }
      ],
      connectLinks: [
        { href: "#", icon: "linkedin", label: "LinkedIn" },
        { href: "#", icon: "twitter", label: "Twitter" },
        { href: "#", icon: "github", label: "GitHub" }
      ],
      copyright: "&copy; 2026 AnvIQ Labs. All rights reserved.",
      legalLinks: [
        { href: "#", text: "Privacy Policy" },
        { href: "#", text: "Terms of Service" }
      ]
    }
  },
  aboutPrinciples: [
    { num: "01", title: "Research-First Methodology", desc: "Experimental AI and statistical validation before every product decision." },
    { num: "02", title: "Proprietary Intelligence Systems", desc: "Custom IP and algorithms &mdash; never generic, off-the-shelf implementations." },
    { num: "03", title: "End-to-End Product Engineering", desc: "We own the full lifecycle &mdash; from research and model architecture to deployment." },
    { num: "04", title: "Data Sovereignty &amp; Security", desc: "Secure AI pipelines with enterprise-grade data integrity throughout." }
  ],
  stats: [
    { target: 55,   suffix: "+",   label: "AI Models Deployed" },
    { target: 10,   suffix: "TB+", label: "Data Processed" },
    { target: 97.4, suffix: "%",   label: "Model Accuracy" },
    { target: 50,   prefix: "<",   suffix: "ms", label: "Avg Latency" }
  ],
  capabilities: [
    { icon: "brain-circuit", delay: "", title: "Custom LLM Solutions", desc: "Fine-tuning and optimizing Large Language Models on your private datasets, delivering domain-specific AI assistants with high-context, hallucination-free outputs tailored to your industry.", tags: ["RAG Systems", "Fine-tuning", "Knowledge Intelligence"] },
    { icon: "cpu", delay: "0.08", title: "Machine Learning Systems", desc: "Bespoke ML architectures designed, trained, and deployed specifically for your unique data constraints and business objectives &mdash; avoiding generic implementations entirely.", tags: ["Custom Architecture", "Predictive Models", "Classification"] },
    { icon: "bar-chart-3", delay: "0.16", title: "Data Science &amp; Analytics", desc: "Deep statistical analysis and exploratory data research to uncover the \"why\" behind numbers. We provide the mathematical foundation for every intelligent product we engineer.", tags: ["Statistical Research", "EDA", "Validation"] },
    { icon: "trending-up", delay: "0.24", title: "Predictive Intelligence", desc: "Advanced forecasting systems, recommendation engines, and decision intelligence platforms that help businesses anticipate outcomes and act with confidence in dynamic environments.", tags: ["Forecasting", "Recommendations", "Decision AI"] },
    { icon: "layers", delay: "0.32", title: "Scalable Digital Platforms", desc: "End-to-end technology platforms and proprietary SaaS products that integrate into existing workflows, turning complex models into intuitive, enterprise-grade intelligent tools.", tags: ["SaaS Products", "API Integration", "Enterprise Tools"] },
    { icon: "flask-conical", delay: "0.4", title: "AI Research &amp; Innovation", desc: "Cutting-edge experimental AI systems, methodology innovation, and proprietary intelligence research that continuously advances our technical foundations and product capabilities.", tags: ["Experimental AI", "R&amp;D", "Novel Architectures"] }
  ],
  industries: [
    {
      icon: "building-2",
      delay: "",
      title: "Real Estate",
      desc: "Automated Valuation Models that reduced appraisal variance by 18% for a national property tech firm &mdash; custom ensemble architecture trained on 8.2 TB of real estate transaction data, serving a &#8377;90,000 Cr+ portfolio.",
      tags: ["AVM", "Hedonic Pricing", "Valuation AI"],
      problem: "A leading Indian property aggregator was experiencing 22% variance in automated valuation models, leading to regulatory risk.",
      solution: "Custom ensemble architecture combining hedonic pricing models with deep learning layers trained on 8.2 TB of Indian real estate transaction data.",
      result: "18% reduction in appraisal variance. Model now serves ₹90,000 Cr+ property portfolio."
    },
    {
      icon: "landmark",
      delay: "0.08",
      title: "Finance",
      desc: "Real-time fraud detection reducing false-positive rates from 34% to 8.7% for a global FinTech leader processing 2M+ daily transactions &mdash; with 99.2% recall maintained at production scale.",
      tags: ["Fraud Detection", "Anomaly Detection", "Risk AI"],
      problem: "A global FinTech leader processing 2M+ daily transactions faced 34% false-positive rates in fraud detection, creating customer friction.",
      solution: "Real-time anomaly detection using proprietary feature engineering, graph-based transaction networks, and adaptive thresholding.",
      result: "False-positive rate reduced to 8.7%. Fraud detection precision improved by 41% while maintaining 99.2% recall."
    },
    {
      icon: "briefcase",
      delay: "0.16",
      title: "Human Resources",
      desc: "Predictive retention platform analyzing 120+ employee signals to reduce attrition by 19% across targeted cohorts, recovering $47M annually in a 50,000+ employee multinational organization.",
      tags: ["Attrition Prediction", "Survival Analysis", "People AI"],
      problem: "A multinational corporation with 50,000+ employees struggled with 28% annual attrition in critical technical roles, costing $47M annually.",
      solution: "Predictive retention platform analyzing 120+ employee signals using survival analysis and gradient-boosted trees.",
      result: "Early-risk identification improved by 67%. HR intervention campaigns reduced attrition by 19% in targeted cohorts."
    },
    {
      icon: "shopping-bag",
      delay: "0.24",
      title: "Retail",
      desc: "Multi-horizon demand forecasting integrating POS data, weather, and competitor signals &mdash; cutting stockout rates from 31% to 11% across 400+ locations, saving $8.4M in annual inventory costs.",
      tags: ["Demand Forecasting", "Time-Series", "Inventory AI"],
      problem: "A national retail chain with 400+ locations experienced 31% stockout rates during demand surges and 18% inventory waste.",
      solution: "Multi-horizon demand forecasting integrating POS data, weather patterns, promotional calendars, and competitor pricing via hierarchical time-series models.",
      result: "Stockout rates decreased to 11%. Inventory carrying costs reduced by $8.4M annually."
    },
    {
      icon: "users",
      delay: "0.32",
      title: "Consumer Business",
      desc: "Transformer-based recommendation engine leveraging real-time behavioral intent extraction &mdash; boosting conversions by 28% and repeat purchase rates by 35% for a high-growth D2C brand.",
      tags: ["Recommendation Engine", "CLV Optimization", "Personalization"],
      problem: "A high-growth direct-to-consumer brand was seeing a 45% drop in customer lifetime value (CLV) due to inefficient personalization and generic engagement.",
      solution: "Hyper-personalized recommendation engine utilizing transformer-based sequence modeling and real-time behavioral intent extraction.",
      result: "Conversion rates increased by 28%. Repeat purchase rate grew by 35% within the first two quarters of deployment."
    },
    {
      special: true,
      delay: "0.4",
      icon: "plus",
      title: "Your Industry",
      desc: "We architect intelligent solutions for any data-intensive sector. Bring us your hardest data challenge.",
      tags: ["Any Vertical", "Custom Scope", "End-to-End"]
    }
  ],
  researchPillars: [
    { delay: "", icon: "microscope", title: "Experimental AI Systems", desc: "Structured experiments to test novel architectures and algorithms — verified, reproducible science over assumptions. Every model undergoes rigorous A/B testing against established baselines." },
    { delay: "0.1", icon: "lock", title: "Proprietary Intelligence", desc: "Custom algorithms, proprietary datasets, and optimized model weights that become lasting strategic assets. We build defensible AI moats, not commoditized implementations." },
    { delay: "0.2", icon: "infinity", title: "Scalable Architectures", desc: "Engineered for scale from day one — designed to handle growing data volumes and evolving model requirements. Our systems maintain <50ms latency at enterprise scale." }
  ],
  processSteps: [
    { num: "01", icon: "search", title: "Discovery &amp; Research", desc: "Deep exploratory data analysis, statistical research, and problem formulation to establish a rigorous scientific baseline before any engineering begins." },
    { num: "02", icon: "git-branch", title: "Experimental Modeling", desc: "Iterative hypothesis testing, model experimentation, and validation cycles against your proprietary datasets with full reproducibility." },
    { num: "03", icon: "settings-2", title: "Architecture &amp; Engineering", desc: "Custom ML architecture design, LLM optimization, and scalable system engineering aligned to production-grade requirements." },
    { num: "04", icon: "rocket", title: "Product Commercialization", desc: "Deploying scalable, enterprise-grade products and intelligence platforms ready for real-world business impact and long-term ROI." }
  ],
  whyChooseUs: [
    { delay: "", icon: "flask-conical", title: "Research-Driven Development", desc: "Every product starts with deep scientific research. We validate hypotheses with statistical rigor before writing a single line of production code." },
    { delay: "0.08", icon: "scale", title: "Scalable System Architecture", desc: "Built to scale alongside your data &mdash; our platforms handle increasing complexity without performance degradation or architectural re-engineering." },
    { delay: "0.16", icon: "shield", title: "Secure Data Sovereignty", desc: "We prioritize the security and integrity of your proprietary data throughout the development lifecycle with enterprise-grade protocols." },
    { delay: "0.24", icon: "zap", title: "High-Performance Engineering", desc: "Precision-engineered systems combining pure data science with modern AI, delivering results that are both innovative and mathematically sound." },
    { delay: "0.32", icon: "package-2", title: "Product-Focused Innovation", desc: "We are builders, not consultants. Every engagement produces a scalable, commercializable product &mdash; not just a report or a proof of concept." },
    { delay: "0.4", icon: "lightbulb", title: "Domain-Optimized Intelligence", desc: "Context-aware AI grounded in your specific industry knowledge &mdash; not generic outputs from public models, but intelligence tuned to your domain." }
  ],
  leadershipCredentials: [
    // { icon: "graduation-cap", title: "Top-Tier Institutions", desc: "Stanford, MIT, CMU, IITs" },
    // { icon: "building", title: "Fortune 500 Experience", desc: "Google AI, Microsoft Research, AWS" },
    // { icon: "file-text", title: "Published Research", desc: "NeurIPS, ICML, CVPR, ACL" }
  ],
  leadershipTeamDNA: [
    { icon: "brain", title: "Deep Learning Theory", desc: "Optimization landscapes, representation learning, neural architecture search" },
    { icon: "server", title: "Production ML Engineering", desc: "Model serving at scale, A/B testing, MLOps infrastructure" },
    { icon: "eye", title: "Computer Vision", desc: "Object detection, image segmentation, visual recognition systems" },
    { icon: "message-square", title: "Natural Language Processing", desc: "LLMs, text classification, semantic search, entity extraction" },
    { icon: "trending-up", title: "Time-Series Forecasting", desc: "Demand prediction, anomaly detection, temporal modeling" },
    { icon: "bar-chart-2", title: "Statistical Rigor", desc: "Causal inference, experimental design, hypothesis testing" }
  ],
  platformMetrics: [
    { name: "Custom LLM &mdash; Domain Classifier", trend: "&#9650; 2.1%", value: "97.4%", progress: 97.4, sub: "Accuracy &middot; Fine-tuned on proprietary corpus" },
    { name: "ML Pipeline &mdash; Predictive Engine", trend: "&#9650; 0.03", value: "F1 0.94", progress: 94, sub: "F1 Score &middot; Bespoke classification model" },
    { name: "Data Science &mdash; Analytics Layer", trend: "&#9650; 1.2 TB", value: "10 TB+", progress: 88, sub: "Processed &middot; Enterprise-scale datasets" }
  ],
  platformFooterStats: [
    { value: "55+", label: "Models" },
    { value: "99.9%", label: "Uptime" },
    { value: "&lt;50ms", label: "Latency" },
    { value: "4", label: "Errors", dotColor: "bg-red-500" }
  ]
};