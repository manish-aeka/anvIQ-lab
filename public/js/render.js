// Render data dynamically into HTML placeholders

const socialBrandIcons = {
  linkedin: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
  github: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>'
};

function getSocialIcon(name) {
  return socialBrandIcons[name.toLowerCase()] || `<i data-lucide="${name}" class="w-4 h-4"></i>`;
}

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
        <div class="stat-value" data-target="${stat.target}" data-suffix="${stat.suffix}"${stat.prefix ? ` data-prefix="${stat.prefix}"` : ""}>0</div>
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
          <div class="capability-card industry-cta-card reveal-element" ${ind.delay ? `data-delay="${ind.delay}"` : ""}>
            <div class="cap-icon" style="background:#eff6ff;border-color:#dbeafe;color:#2563eb;">
              <i data-lucide="${ind.icon}" class="w-5 h-5"></i>
            </div>
            <h3 class="capability-title">${ind.title}</h3>
            <p class="capability-desc">${ind.desc}</p>
            <div class="capability-tags">
              ${ind.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <a href="#contact" class="btn-primary text-sm px-5 py-2.5 inline-flex items-center justify-center mt-4">Start a Conversation</a>
          </div>
        `;
      }
      return `
        <div class="capability-card reveal-element" ${ind.delay ? `data-delay="${ind.delay}"` : ""}>
          <div class="cap-icon"><i data-lucide="${ind.icon}" class="w-5 h-5"></i></div>
          <h3 class="capability-title">${ind.title}</h3>
          <p class="capability-desc">${ind.desc}</p>
          <div class="capability-tags">
            ${ind.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
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

  // 7.5. Render Proprietary Intelligence Points
  const proprietaryIntelPoints = document.getElementById("proprietary-intel-points");
  if (proprietaryIntelPoints && siteData.textContent.research.proprietaryIntel.points) {
    proprietaryIntelPoints.innerHTML = siteData.textContent.research.proprietaryIntel.points.map(point => {
      const [title, desc] = point.split(': ');
      return `
        <li class="flex items-start gap-2 text-sm">
          <i data-lucide="check-circle" class="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0"></i>
          <span class="text-slate-600"><strong class="text-slate-900">${title}:</strong> ${desc}</span>
        </li>
      `;
    }).join("");
  }

  // 8. Render Contact Section Details
  const contactEmailLink = document.getElementById("contact-email-link");
  if (contactEmailLink && siteData.textContent.contact.info.email) {
    contactEmailLink.href = "mailto:" + siteData.textContent.contact.info.email;
  }

  const contactSocialContainer = document.getElementById("contact-social-container");
  if (contactSocialContainer && siteData.textContent.contact.info.socialLinks) {
    contactSocialContainer.innerHTML = siteData.textContent.contact.info.socialLinks.map(link => `
      <a href="${link.href}" class="social-icon" aria-label="${link.label}">
        ${getSocialIcon(link.icon)}
      </a>
    `).join("");
  }

  // 9. Render Footer Links
  const footerSocialContainer = document.getElementById("footer-social-container");
  if (footerSocialContainer && siteData.textContent.footer.connectLinks) {
    footerSocialContainer.innerHTML = siteData.textContent.footer.connectLinks.map(link => `
      <a href="${link.href}" class="social-icon-dark" aria-label="${link.label}">
        ${getSocialIcon(link.icon)}
      </a>
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

  // 10. Render Leadership Credentials
  const leadershipCredentialsContainer = document.getElementById("leadership-credentials-container");
  if (leadershipCredentialsContainer && siteData.leadershipCredentials) {
    leadershipCredentialsContainer.innerHTML = siteData.leadershipCredentials.map(cred => `
      <div class="about-card text-center py-8">
        <div class="text-brand-600 mb-4 flex justify-center">
          <i data-lucide="${cred.icon}" class="w-8 h-8"></i>
        </div>
        <div class="text-2xl font-display font-bold text-slate-900 mb-2">${cred.title}</div>
        <div class="text-sm text-slate-600">${cred.desc}</div>
      </div>
    `).join("");
  }

  // 11. Render Leadership Team DNA
  const leadershipTeamDNAContainer = document.getElementById("leadership-team-dna-container");
  if (leadershipTeamDNAContainer && siteData.leadershipTeamDNA) {
    leadershipTeamDNAContainer.innerHTML = siteData.leadershipTeamDNA.map(item => `
      <div class="flex items-start gap-3">
        <div class="mt-0.5">
          <i data-lucide="${item.icon}" class="w-5 h-5 text-brand-500"></i>
        </div>
        <div>
          <div class="text-sm font-semibold text-slate-900 mb-1">${item.title}</div>
          <div class="text-sm text-slate-500">${item.desc}</div>
        </div>
      </div>
    `).join("");
  }

  // 12. Render Platform Metrics
  const platformMetricsContainer = document.getElementById("platform-metrics-container");
  if (platformMetricsContainer && siteData.platformMetrics) {
    platformMetricsContainer.innerHTML = siteData.platformMetrics.map(metric => `
      <div class="metric-row">
        <div class="metric-header">
          <span class="metric-name">${metric.name}</span>
          <div class="flex items-center gap-2">
            <span class="metric-trend">${metric.trend}</span>
            <span class="metric-value">${metric.value}</span>
          </div>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width: ${metric.progress}%"></div></div>
        <div class="metric-sub">${metric.sub}</div>
      </div>
    `).join("");
  }

  // 13. Render Platform Footer Stats
  const platformFooterStatsContainer = document.getElementById("platform-footer-stats-container");
  if (platformFooterStatsContainer && siteData.platformFooterStats) {
    platformFooterStatsContainer.innerHTML = siteData.platformFooterStats.map((stat, i) => {
      const valueHtml = stat.dotColor
        ? `<div class="platform-stat-value flex items-center justify-center gap-1"><span class="w-2 h-2 rounded-full ${stat.dotColor} inline-block"></span>${stat.value}</div>`
        : `<div class="platform-stat-value">${stat.value}</div>`;
      const divider = i < siteData.platformFooterStats.length - 1 ? '<div class="platform-divider"></div>' : '';
      return `
        <div class="platform-stat">
          ${valueHtml}
          <div class="platform-stat-label">${stat.label}</div>
        </div>
        ${divider}
      `;
    }).join("");
  }

  // Initialize Lucide icons on newly rendered elements
  if (window.lucide) {
    lucide.createIcons();
  }
});