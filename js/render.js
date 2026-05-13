// Render data dynamically into HTML placeholders

document.addEventListener("DOMContentLoaded", () => {

  // Data Binding for textual content
  document.querySelectorAll('[data-bind]').forEach(el => {
    const path = el.getAttribute('data-bind').split('.');
    let value = siteData;
    for (const key of path) {
      if (value === undefined) break;
      value = value[key];
    }
    if (value !== undefined) {
      if (el.tagName === 'A' && el.hasAttribute('href') && el.getAttribute('data-bind-type') === 'href') {
        el.href = value;
      } else {
        el.innerHTML = value;
      }
    }
  });

  // 1. Render Principles (About Us)
  const principlesContainer = document.getElementById("principles-container");
  if (principlesContainer && siteData.aboutPrinciples) {
    principlesContainer.innerHTML = siteData.aboutPrinciples.map(p => `
      <li class="principle-item">
        <div class="principle-num">${p.num}</div>
        <div>
          <div class="text-sm font-semibold text-slate-900 mb-0.5">${p.title}</div>
          <div class="text-sm text-slate-500">${p.desc}</div>
        </div>
      </li>
    `).join("");
  }

  // 2. Render Stats
  const statsContainer = document.getElementById("stats-container");
  if (statsContainer && siteData.stats) {
    statsContainer.innerHTML = siteData.stats.map((stat, i) => `
      <div class="stat-block">
        <div class="stat-value" data-target="${stat.target}" data-suffix="${stat.suffix}">0</div>
        <div class="stat-label">${stat.label}</div>
      </div>
      ${i < siteData.stats.length - 1 ? '<div class="stat-divider"></div>' : ''}
    `).join("");
  }

  // 3. Render Capabilities
  const capabilitiesContainer = document.getElementById("capabilities-container");
  if (capabilitiesContainer && siteData.capabilities) {
    capabilitiesContainer.innerHTML = siteData.capabilities.map(cap => `
      <div class="capability-card reveal-element" ${cap.delay ? `data-delay="${cap.delay}"` : ""}>
        <div class="cap-icon"><i data-lucide="${cap.icon}" class="w-5 h-5"></i></div>
        <h3 class="capability-title">${cap.title}</h3>
        <p class="capability-desc">${cap.desc}</p>
        <div class="capability-tags">
          ${cap.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  // 4. Render Industries
  const industriesContainer = document.getElementById("industries-container");
  if (industriesContainer && siteData.industries) {
    industriesContainer.innerHTML = siteData.industries.map(ind => {
      if (ind.special) {
        return `
          <div class="industry-card industry-cta-card reveal-element" ${ind.delay ? `data-delay="${ind.delay}"` : ""}>
            <div class="industry-icon-wrap text-brand-600 !bg-brand-50 !border-brand-100">
              <i data-lucide="${ind.icon}" class="w-6 h-6"></i>
            </div>
            <h3 class="industry-title">${ind.title}</h3>
            <p class="industry-desc">${ind.desc}</p>
            <a href="#contact" class="btn-primary text-sm px-5 py-2.5 inline-block text-center mt-auto">Start a Conversation</a>
          </div>
        `;
      }
      return `
        <div class="industry-card reveal-element" ${ind.delay ? `data-delay="${ind.delay}"` : ""} onclick="location.href='#contact'">
          <div class="industry-icon-wrap">
            <i data-lucide="${ind.icon}" class="w-6 h-6 text-brand-600"></i>
          </div>
          <h3 class="industry-title">${ind.title}</h3>
          <p class="industry-desc">${ind.desc}</p>
          <div class="industry-cta">Explore use case <i data-lucide="arrow-right" class="w-4 h-4"></i></div>
        </div>
      `;
    }).join("");
  }

  // 5. Render Research Pillars
  const researchPillarsContainer = document.getElementById("research-pillars-container");
  if (researchPillarsContainer && siteData.researchPillars) {
    researchPillarsContainer.innerHTML = siteData.researchPillars.map(pill => `
      <div class="research-pillar reveal-element" ${pill.delay ? `data-delay="${pill.delay}"` : ""}>
        <div class="pillar-icon"><i data-lucide="${pill.icon}" class="w-4 h-4"></i></div>
        <div>
          <h4 class="text-sm font-semibold text-slate-900 mb-1">${pill.title}</h4>
          <p class="text-sm text-slate-500 leading-relaxed">${pill.desc}</p>
        </div>
      </div>
    `).join("");
  }

  // 6. Render Process Steps
  const processStepsContainer = document.getElementById("process-steps-container");
  if (processStepsContainer && siteData.processSteps) {
    processStepsContainer.innerHTML = siteData.processSteps.map(step => `
      <div class="process-step-card">
        <div class="step-number">${step.num}</div>
        <div class="step-content">
          <div class="step-header">
            <i data-lucide="${step.icon}" class="w-4 h-4 text-brand-500"></i>
            <h3 class="step-title">${step.title}</h3>
          </div>
          <p class="step-desc">${step.desc}</p>
        </div>
      </div>
    `).join("");
  }

  // 7. Render Why Choose Us
  const whyUsContainer = document.getElementById("why-us-container");
  if (whyUsContainer && siteData.whyChooseUs) {
    whyUsContainer.innerHTML = siteData.whyChooseUs.map(why => `
      <div class="why-card reveal-element" ${why.delay ? `data-delay="${why.delay}"` : ""}>
        <div class="why-icon"><i data-lucide="${why.icon}" class="w-4 h-4"></i></div>
        <h3 class="why-title">${why.title}</h3>
        <p class="why-desc">${why.desc}</p>
      </div>
    `).join("");
  }

  // 8. Render Footer Links
  const footerSocialContainer = document.getElementById("footer-social-container");
  if (footerSocialContainer && siteData.textContent.footer.connectLinks) {
    footerSocialContainer.innerHTML = siteData.textContent.footer.connectLinks.map(link => `
      <a href="${link.href}" class="social-icon-dark" aria-label="${link.label}"><i data-lucide="${link.icon}" class="w-4 h-4"></i></a>
    `).join("");
  }

  const footerCompanyContainer = document.getElementById("footer-company-container");
  if (footerCompanyContainer && siteData.textContent.footer.companyLinks) {
    footerCompanyContainer.innerHTML = siteData.textContent.footer.companyLinks.map(link => `
      <li><a href="${link.href}" class="footer-link">${link.text}</a></li>
    `).join("");
  }

  const footerSolutionsContainer = document.getElementById("footer-solutions-container");
  if (footerSolutionsContainer && siteData.textContent.footer.solutionsLinks) {
    footerSolutionsContainer.innerHTML = siteData.textContent.footer.solutionsLinks.map(link => `
      <li><a href="${link.href}" class="footer-link">${link.text}</a></li>
    `).join("");
  }

  const footerLegalContainer = document.getElementById("footer-legal-container");
  if (footerLegalContainer && siteData.textContent.footer.legalLinks) {
    footerLegalContainer.innerHTML = siteData.textContent.footer.legalLinks.map(link => `
      <a href="${link.href}" class="text-slate-500 hover:text-slate-300 text-sm transition-colors">${link.text}</a>
    `).join("");
  }

  // Initialize Lucide icons on newly rendered elements
  if (window.lucide) {
    lucide.createIcons();
  }
});