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
        { href: "#contact", text: "Contact" }
      ],
      cta: "Get in Touch"
    },
    hero: {
      overline: "AI Research &amp; Product Company",
      headlineP1: "Building Intelligent",
      headlineAccent: "Products",
      headlineP2: "from<br />Proprietary Data",
      description: "AnvIQ Labs transforms complex private datasets into scalable, high-performance AI products &mdash; through rigorous research, custom ML architecture, and applied data science.",
      btnPrimary: "Explore Solutions",
      btnGhost: "Contact Us",
      microStats: [
        { value: "50+", label: "AI Models Built" },
        { value: "3+", label: "Industries Served" },
        { value: "100%", label: "Research-Driven" }
      ]
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
      title: "Science Before<br />Every Solution",
      description: "Our research-first methodology ensures every product is built on a mathematically rigorous foundation. We do not ship without validation."
    },
    whyUs: {
      title: "Engineered for<br />Enterprise Performance",
      description: "What makes our approach fundamentally different from conventional AI development."
    },
    contact: {
      title: "Let's Build Something<br />Intelligent Together",
      description: "Tell us about your data challenge. We will architect the right intelligent solution for you.",
      btnPrimary: "Send Message",
      info: {
        email: "anviq.ai",
        location: "India",
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
    { target: "50", suffix: "+", label: "AI Models Built" },
    { target: "10", suffix: "TB+", label: "Data Processed" },
    { target: "30", suffix: "+", label: "Workflows Optimised" },
    { target: "20", suffix: "+", label: "Enterprise Solutions" }
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
    { icon: "building-2", delay: "", title: "Real Estate", desc: "Intelligent property valuation, demand forecasting, market trend analysis, and AI-powered lead intelligence for real estate platforms." },
    { icon: "landmark", delay: "0.08", title: "Finance", desc: "Algorithmic risk assessment, fraud detection, and predictive financial analytics built for the modern financial sector." },
    { icon: "briefcase", delay: "0.16", title: "Human Resources", desc: "Talent acquisition optimization, employee retention prediction, and workforce analytics powered by machine learning." },
    { icon: "shopping-bag", delay: "0.24", title: "Retail", desc: "Personalized recommendation engines, inventory optimization, customer behavior prediction, and demand planning systems for retail businesses." },
    { icon: "users", delay: "0.32", title: "Consumer Businesses", desc: "AI-driven customer experience platforms, sentiment analysis, churn prediction, and engagement optimization built for consumer-facing operations." },
    { special: true, delay: "0.4", icon: "plus", title: "Your Industry", desc: "We architect intelligent solutions for any data-intensive sector. Bring us your hardest data challenge." }
  ],
  researchPillars: [
    { delay: "", icon: "microscope", title: "Experimental AI Systems", desc: "Structured experiments to test novel architectures and algorithms &mdash; verified, reproducible science over assumptions." },
    { delay: "0.1", icon: "lock", title: "Proprietary Intelligence", desc: "Custom algorithms, proprietary datasets, and optimized model weights that become lasting strategic assets." },
    { delay: "0.2", icon: "infinity", title: "Scalable Architectures", desc: "Engineered for scale from day one &mdash; designed to handle growing data volumes and evolving model requirements." }
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
  ]
};