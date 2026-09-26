/**
 * CV RENDERER
 * Dynamically renders all CV sections from window.CV_DATA.
 * Provides interactive filtering, sorting, search, and detail modal views.
 */

const CVRenderer = {
  state: {
    seaFilterType: 'all',
    seaFilterRank: 'all',
    seaSearchQuery: '',
    seaSortBy: 'date-desc',
    certCategory: 'all',
    certSearchQuery: '',
    certStatusFilter: 'all'
  },

  init() {
    if (!window.CV_DATA) {
      console.error('CV_DATA not loaded!');
      return;
    }
    this.data = window.CV_DATA;
    this.renderAll();
    this.bindInteractiveEvents();
  },

  renderAll() {
    this.renderHero();
    this.renderProfile();
    this.renderExperience();
    this.renderSeaService();
    this.renderCertificates();
    this.renderEducation();
    this.renderSkills();
    this.renderDocuments();
    this.renderContact();
  },

  /**
   * HERO & OVERVIEW SECTION
   */
  renderHero() {
    const { profile, contact, quickFacts } = this.data;

    // Avatar
    const avatarImg = document.getElementById('hero-avatar-img');
    if (avatarImg) {
      avatarImg.src = profile.avatar.webp;
      avatarImg.alt = profile.avatar.alt;
      avatarImg.onerror = () => {
        avatarImg.src = profile.avatar.original;
      };
    }

    // Name & Subtitle
    const nameEl = document.getElementById('hero-name');
    if (nameEl) nameEl.textContent = profile.name;

    const rankChip = document.getElementById('hero-rank-chip');
    if (rankChip) rankChip.textContent = profile.license;

    const subtitleEl = document.getElementById('hero-subtitle');
    if (subtitleEl) subtitleEl.textContent = profile.subtitle;

    const summaryEl = document.getElementById('hero-summary');
    if (summaryEl) summaryEl.textContent = profile.summary;

    // Print Contact Strip (Visible on Print)
    const printContact = document.getElementById('print-contact-strip');
    if (printContact) {
      printContact.innerHTML = `
        <span class="print-contact-item"><i class="fas fa-phone"></i> ${contact.phone}</span>
        <span class="print-contact-item"><i class="fas fa-envelope"></i> ${contact.email}</span>
        <span class="print-contact-item"><i class="fas fa-map-marker-alt"></i> ${contact.location}</span>
        <span class="print-contact-item"><i class="fas fa-globe"></i> ${contact.website}</span>
        <span class="print-contact-item"><i class="fas fa-id-card"></i> SID: IDN609976674</span>
      `;
    }

    // Quick Facts Strip
    const quickFactsContainer = document.getElementById('quick-facts-container');
    if (quickFactsContainer) {
      quickFactsContainer.innerHTML = quickFacts.map(fact => `
        <div class="quick-fact-card">
          <div class="quick-fact-icon"><i class="fas ${fact.icon}"></i></div>
          <div class="quick-fact-content">
            <span class="quick-fact-label">${CVUtils.escapeHTML(fact.label)}</span>
            <span class="quick-fact-value">${CVUtils.escapeHTML(fact.value)}</span>
          </div>
        </div>
      `).join('');
    }
  },

  /**
   * PROFESSIONAL PROFILE SECTION
   */
  renderProfile() {
    const { profile, contact } = this.data;
    const container = document.getElementById('profile-grid-container');
    if (!container) return;

    container.innerHTML = `
      <!-- Professional Summary & Background -->
      <div class="card profile-card">
        <div class="profile-card-header">
          <div class="profile-card-icon"><i class="fas fa-user-tie"></i></div>
          <h3 class="profile-card-title">Professional Summary</h3>
        </div>
        <div class="profile-card-body">
          <p>${CVUtils.escapeHTML(profile.summary)}</p>
          <p>Graduated from <strong>Politeknik Ilmu Pelayaran (PIP) Makassar</strong> in Nautical Studies with Sarjana Terapan Pelayaran (S.Tr.Pel). Successfully progressed from Deck Cadet to Third Officer (3/O), and subsequently Second Officer (2/O) on ocean-going container, bulk, and general cargo vessels.</p>
        </div>
      </div>

      <!-- Core Maritime Expertise -->
      <div class="card profile-card">
        <div class="profile-card-header">
          <div class="profile-card-icon"><i class="fas fa-compass"></i></div>
          <h3 class="profile-card-title">Core Competencies & Scope</h3>
        </div>
        <div class="profile-card-body">
          <p><strong>Navigational Passage Planning:</strong> Full berth-to-berth route calculation, UKC, squat assessment, electronic ENC updates via ECDIS, and weekly NtM corrections.</p>
          <p><strong>Bridge Watchkeeping:</strong> Strict COLREG 1972 observance, ARPA radar plotting, celestial navigation, and Bridge Resource Management (BRM).</p>
          <p><strong>Safety & Tanker Compliance:</strong> Holds Advanced Oil (AOT) and Chemical Tanker (ACT) qualifications, GMDSS GOC, Ship Security Officer (SSO), and medical certifications.</p>
        </div>
      </div>

      <!-- Personal & Physical Data -->
      <div class="card profile-card">
        <div class="profile-card-header">
          <div class="profile-card-icon"><i class="fas fa-id-card-clip"></i></div>
          <h3 class="profile-card-title">Personal Particulars</h3>
        </div>
        <div class="profile-card-body">
          <table class="profile-details-table">
            <tbody>
              <tr><td>Full Name</td><td>${CVUtils.escapeHTML(profile.name)}</td></tr>
              <tr><td>Date / Place of Birth</td><td>${CVUtils.formatDate(profile.dateOfBirth)} (${profile.placeOfBirth})</td></tr>
              <tr><td>Nationality</td><td>${profile.nationality} 🇮🇩</td></tr>
              <tr><td>Marital Status</td><td>${profile.maritalStatus}</td></tr>
              <tr><td>Height / Weight</td><td>${profile.physical.height} / ${profile.physical.weight}</td></tr>
              <tr><td>Coverall / Safety Shoe</td><td>Size ${profile.physical.overallSize}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Next of Kin & Contact Residence -->
      <div class="card profile-card">
        <div class="profile-card-header">
          <div class="profile-card-icon"><i class="fas fa-house-chimney-user"></i></div>
          <h3 class="profile-card-title">Next of Kin & Residence</h3>
        </div>
        <div class="profile-card-body">
          <p class="text-xs text-muted mb-2"><strong>Permanent Domicile:</strong><br>${CVUtils.escapeHTML(contact.address)}</p>
          <div class="kin-badge-wrapper">
            ${profile.nextOfKin.map(kin => `
              <div class="kin-card">
                <div class="kin-card-name">
                  <span>${CVUtils.escapeHTML(kin.name)}</span>
                  <span class="kin-card-relation">${CVUtils.escapeHTML(kin.relationship)}</span>
                </div>
                <div class="kin-card-phone"><i class="fas fa-phone-alt"></i> ${CVUtils.escapeHTML(kin.phone)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * EXPERIENCE TIMELINE SECTION
   */
  renderExperience() {
    const { seaService } = this.data;
    const container = document.getElementById('experience-timeline-container');
    if (!container) return;

    container.innerHTML = seaService.map(ship => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-vessel">
                <i class="fas fa-ship text-ocean"></i> ${CVUtils.escapeHTML(ship.vesselName)}
                <span class="badge badge-maritime">${CVUtils.escapeHTML(ship.rank)} (${CVUtils.escapeHTML(ship.rankFull)})</span>
              </h3>
              <div class="timeline-company"><i class="fas fa-building"></i> ${CVUtils.escapeHTML(ship.company)}</div>
            </div>
            <div class="timeline-period-badge">
              <i class="far fa-calendar-alt"></i> ${CVUtils.escapeHTML(ship.periodFormatted)}
              <span class="badge badge-gold ml-1">${CVUtils.escapeHTML(ship.durationFormatted)}</span>
            </div>
          </div>

          <div class="vessel-specs-strip">
            <div class="spec-item">
              <span class="spec-key">Vessel Type</span>
              <span class="spec-val">${CVUtils.escapeHTML(ship.vesselType)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-key">Gross Tonnage</span>
              <span class="spec-val">${ship.grt.toLocaleString()} GRT</span>
            </div>
            <div class="spec-item">
              <span class="spec-key">Engine Power</span>
              <span class="spec-val">${ship.hp.toLocaleString()} HP</span>
            </div>
            <div class="spec-item">
              <span class="spec-key">Sea Duration</span>
              <span class="spec-val">${ship.durationDays} Days</span>
            </div>
          </div>

          <div class="timeline-responsibilities">
            <h4>Key Operational Responsibilities:</h4>
            <ul class="responsibilities-list">
              ${ship.responsibilities.map(r => `<li>${CVUtils.escapeHTML(r)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  },

  /**
   * SEA SERVICE SECTION (SPECIALIZED MARITIME DASHBOARD)
   */
  renderSeaService() {
    const { stats, seaService } = this.data;

    // Render Stats
    const statsContainer = document.getElementById('sea-stats-container');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="sea-stat-card">
          <span class="sea-stat-label">Total Verified Sea Time</span>
          <div class="sea-stat-number">${stats.totalSeaServiceDays.toLocaleString()} Days</div>
          <span class="sea-stat-sub">${stats.totalSeaServiceYearsFormatted}</span>
        </div>
        <div class="sea-stat-card">
          <span class="sea-stat-label">Total Deck Officer Time</span>
          <div class="sea-stat-number">${stats.totalOfficerDays.toLocaleString()} Days</div>
          <span class="sea-stat-sub">${stats.totalOfficerYearsFormatted} (2/O &amp; 3/O)</span>
        </div>
        <div class="sea-stat-card">
          <span class="sea-stat-label">Second Officer Time</span>
          <div class="sea-stat-number">${stats.secondOfficerDays.toLocaleString()} Days</div>
          <span class="sea-stat-sub">${stats.secondOfficerYearsFormatted} in Command Watch</span>
        </div>
        <div class="sea-stat-card">
          <span class="sea-stat-label">Fleet Experience</span>
          <div class="sea-stat-number">${stats.totalVessels} Ships</div>
          <span class="sea-stat-sub">Max: ${stats.largestVesselGRT} | ${stats.maxEnginePower}</span>
        </div>
      `;
    }

    this.renderSeaServiceTable();
  },

  renderSeaServiceTable() {
    const { seaService } = this.data;
    const tbody = document.getElementById('sea-service-tbody');
    if (!tbody) return;

    // Filter by vessel type
    let filtered = seaService.filter(item => {
      if (this.state.seaFilterType !== 'all' && item.vesselType.toLowerCase() !== this.state.seaFilterType.toLowerCase()) {
        return false;
      }
      if (this.state.seaFilterRank !== 'all' && item.rank.toLowerCase() !== this.state.seaFilterRank.toLowerCase()) {
        return false;
      }
      if (this.state.seaSearchQuery) {
        const q = this.state.seaSearchQuery.toLowerCase();
        const match = item.vesselName.toLowerCase().includes(q) ||
                      item.company.toLowerCase().includes(q) ||
                      item.vesselType.toLowerCase().includes(q) ||
                      item.rank.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      if (this.state.seaSortBy === 'date-desc') {
        return new Date(b.signOn) - new Date(a.signOn);
      } else if (this.state.seaSortBy === 'date-asc') {
        return new Date(a.signOn) - new Date(b.signOn);
      } else if (this.state.seaSortBy === 'grt-desc') {
        return b.grt - a.grt;
      } else if (this.state.seaSortBy === 'duration-desc') {
        return b.durationDays - a.durationDays;
      }
      return 0;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 2rem; color: var(--text-light);">
            <i class="fas fa-search" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
            No vessels match the selected filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(ship => `
      <tr>
        <td>
          <span class="vessel-cell-name">${CVUtils.escapeHTML(ship.vesselName)}</span>
          <span class="vessel-cell-company">${CVUtils.escapeHTML(ship.company)}</span>
        </td>
        <td><span class="badge badge-slate">${CVUtils.escapeHTML(ship.vesselType)}</span></td>
        <td><strong>${ship.grt.toLocaleString()}</strong></td>
        <td>${ship.hp.toLocaleString()} HP</td>
        <td><span class="badge badge-maritime">${CVUtils.escapeHTML(ship.rank)}</span></td>
        <td>${CVUtils.formatDate(ship.signOn)}</td>
        <td>${CVUtils.formatDate(ship.signOff)}</td>
        <td><strong>${ship.durationDays}d</strong> <span class="text-xs text-muted">(${ship.durationFormatted.split('(')[0].trim()})</span></td>
      </tr>
    `).join('');
  },

  /**
   * CERTIFICATES & LICENSES SECTION
   */
  renderCertificates() {
    const { licenses, certificates, supportingDocuments } = this.data;
    const grid = document.getElementById('cert-cards-grid');
    if (!grid) return;

    // Combine all certificate items into a normalized array
    const allCerts = [
      ...licenses.map(lic => ({
        ...lic,
        isLicense: true,
        category: lic.category || 'license',
        code: lic.type
      })),
      ...certificates.map(cert => ({
        ...cert,
        isLicense: false
      })),
      ...supportingDocuments.map(sup => ({
        id: `sup-${sup.no}`,
        name: sup.name,
        code: 'SUPPORT',
        category: 'supporting',
        number: sup.number,
        dateIssued: sup.dateIssued,
        validUntil: 'UNLIMITED',
        issuedAt: sup.placeIssued,
        description: sup.description,
        isLicense: false
      }))
    ];

    // Filter
    const filtered = allCerts.filter(item => {
      if (this.state.certCategory !== 'all') {
        if (item.category !== this.state.certCategory) return false;
      }
      if (this.state.certSearchQuery) {
        const q = this.state.certSearchQuery.toLowerCase();
        const match = item.name.toLowerCase().includes(q) ||
                      (item.number && item.number.toLowerCase().includes(q)) ||
                      (item.issuedAt && item.issuedAt.toLowerCase().includes(q)) ||
                      (item.code && item.code.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-light);">
          <i class="fas fa-certificate" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
          No certificates found matching your criteria.
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const statusInfo = CVUtils.getCertificateStatus(item.validUntil);
      return `
        <div class="cert-card" data-cert-id="${item.id || item.number}" onclick="CVRenderer.openCertModal('${item.number || item.id}')">
          <div>
            <div class="cert-card-top">
              <span class="badge cert-badge-category badge-maritime">${CVUtils.escapeHTML(item.category)}</span>
              <span class="status-pill ${statusInfo.badgeClass}">
                <i class="fas fa-circle" style="font-size: 0.5rem;"></i> ${statusInfo.label}
              </span>
            </div>
            <h4 class="cert-title">${CVUtils.escapeHTML(item.name)}</h4>
            <div class="cert-meta-list">
              <div class="cert-meta-item">
                <span class="cert-meta-label">Cert / Reg No:</span>
                <span class="cert-meta-value">${CVUtils.escapeHTML(item.number || '-')}</span>
              </div>
              <div class="cert-meta-item">
                <span class="cert-meta-label">Issued At:</span>
                <span>${CVUtils.escapeHTML(item.issuedAt || '-')}</span>
              </div>
              <div class="cert-meta-item">
                <span class="cert-meta-label">Date Issued:</span>
                <span>${CVUtils.formatDate(item.dateIssued)}</span>
              </div>
              <div class="cert-meta-item">
                <span class="cert-meta-label">Valid Until:</span>
                <strong>${CVUtils.formatDate(item.validUntil)}</strong>
              </div>
            </div>
          </div>
          ${item.description ? `<p class="cert-desc">${CVUtils.escapeHTML(item.description)}</p>` : ''}
        </div>
      `;
    }).join('');
  },

  /**
   * OPEN CERTIFICATE DETAIL MODAL
   */
  openCertModal(certNumberOrId) {
    const { licenses, certificates, supportingDocuments } = this.data;
    const allCerts = [...licenses, ...certificates, ...supportingDocuments];
    const cert = allCerts.find(c => (c.number === certNumberOrId || c.id === certNumberOrId));
    if (!cert) return;

    const modal = document.getElementById('cert-modal');
    const modalBody = document.getElementById('cert-modal-body');
    const modalTitle = document.getElementById('cert-modal-title');

    if (!modal || !modalBody) return;

    const statusInfo = CVUtils.getCertificateStatus(cert.validUntil);

    modalTitle.textContent = cert.name;
    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <span class="badge badge-maritime" style="text-transform: uppercase;">${cert.category || 'Certificate'}</span>
        <span class="status-pill ${statusInfo.badgeClass}">
          <i class="fas fa-circle" style="font-size: 0.5rem;"></i> ${statusInfo.label}
        </span>
      </div>
      <table class="profile-details-table" style="margin-bottom: 1.25rem;">
        <tbody>
          <tr><td>Certificate Number</td><td style="font-family: var(--font-mono); font-weight: bold;">${cert.number || '-'}</td></tr>
          <tr><td>Issued At</td><td>${cert.issuedAt || cert.placeIssued || '-'}</td></tr>
          <tr><td>Date Issued</td><td>${CVUtils.formatDate(cert.dateIssued)}</td></tr>
          <tr><td>Valid Until</td><td><strong>${CVUtils.formatDate(cert.validUntil)}</strong></td></tr>
          ${cert.stcw ? `<tr><td>STCW Regulation</td><td><code>STCW ${cert.stcw}</code></td></tr>` : ''}
          ${cert.type ? `<tr><td>Document Type</td><td>${cert.type}</td></tr>` : ''}
        </tbody>
      </table>
      ${cert.description ? `
        <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <strong style="display:block; margin-bottom: 0.35rem; font-size: 0.8rem; text-transform: uppercase; color: var(--text-light);">Competency Scope:</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${CVUtils.escapeHTML(cert.description)}</p>
        </div>
      ` : ''}
    `;

    modal.classList.add('active');
  },

  closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) modal.classList.remove('active');
  },

  /**
   * EDUCATION SECTION
   */
  renderEducation() {
    const { education } = this.data;
    const container = document.getElementById('education-timeline-container');
    if (!container) return;

    container.innerHTML = education.map(edu => `
      <div class="edu-card">
        <div class="edu-icon-badge"><i class="fas fa-graduation-cap"></i></div>
        <div class="edu-content">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap;">
            <h3 class="edu-institution">${CVUtils.escapeHTML(edu.institution)}</h3>
            <span class="badge badge-gold">${CVUtils.escapeHTML(edu.period)}</span>
          </div>
          <div class="edu-degree">${CVUtils.escapeHTML(edu.degree)} — ${CVUtils.escapeHTML(edu.program)}</div>
          ${edu.highlights ? `
            <ul class="edu-highlights">
              ${edu.highlights.map(h => `<li>${CVUtils.escapeHTML(h)}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      </div>
    `).join('');
  },

  /**
   * SKILLS SECTION
   */
  renderSkills() {
    const { skills, languages } = this.data;
    const container = document.getElementById('skills-grid-container');
    if (!container) return;

    const skillCards = Object.values(skills).map(category => `
      <div class="skill-category-card">
        <div class="skill-cat-header">
          <div class="skill-cat-icon"><i class="fas ${category.icon}"></i></div>
          <h3 class="skill-cat-title">${CVUtils.escapeHTML(category.title)}</h3>
        </div>
        <div class="skill-chips-container">
          ${category.items.map(skill => `<span class="skill-chip">${CVUtils.escapeHTML(skill)}</span>`).join('')}
        </div>
      </div>
    `);

    // Add Language Card
    const languageCard = `
      <div class="skill-category-card">
        <div class="skill-cat-header">
          <div class="skill-cat-icon"><i class="fas fa-language"></i></div>
          <h3 class="skill-cat-title">Languages &amp; Maritime English</h3>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.25rem;">
          ${languages.map(lang => `
            <div style="background: var(--bg-subtle); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 0.92rem;">${lang.flag} ${CVUtils.escapeHTML(lang.language)}</strong>
                <div style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.15rem;">${CVUtils.escapeHTML(lang.proficiency)}</div>
              </div>
              <span class="badge badge-maritime">${CVUtils.escapeHTML(lang.level)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = skillCards.join('') + languageCard;
  },

  /**
   * DOCUMENTS & DOWNLOADS SECTION
   */
  renderDocuments() {
    const { documents } = this.data;
    const container = document.getElementById('documents-grid-container');
    if (!container) return;

    container.innerHTML = documents.map(doc => `
      <div class="doc-card">
        <div class="doc-card-header">
          <div class="doc-icon"><i class="fas ${doc.icon || 'fa-file'}"></i></div>
          <div>
            <h4 class="doc-title">${CVUtils.escapeHTML(doc.title)}</h4>
            <div class="doc-subtitle">${CVUtils.escapeHTML(doc.subtitle)}</div>
            ${doc.size ? `<span class="badge badge-slate" style="margin-top: 0.5rem;">${doc.size}</span>` : ''}
          </div>
        </div>
        <div class="doc-actions">
          ${doc.canDownload && doc.path ? `
            <a href="${doc.path}" download class="btn btn-primary" style="flex:1; font-size: 0.8rem; padding: 0.45rem 0.75rem;">
              <i class="fas fa-download"></i> Download PDF
            </a>
          ` : ''}
          ${doc.canPrint ? `
            <button onclick="window.print()" class="btn btn-secondary" style="flex:1; font-size: 0.8rem; padding: 0.45rem 0.75rem;">
              <i class="fas fa-print"></i> Print CV
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');
  },

  /**
   * CONTACT SECTION
   */
  renderContact() {
    const { contact } = this.data;
    const container = document.getElementById('contact-grid-container');
    if (!container) return;

    container.innerHTML = `
      <div class="contact-card" onclick="CVUtils.copyToClipboard('${contact.email}', 'Email copied to clipboard!')">
        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
        <div class="contact-content">
          <span class="contact-label">Email Address (Click to copy)</span>
          <span class="contact-val">${CVUtils.escapeHTML(contact.email)}</span>
        </div>
      </div>

      <div class="contact-card" onclick="window.open('tel:${contact.phoneClean}')">
        <div class="contact-icon"><i class="fas fa-phone-alt"></i></div>
        <div class="contact-content">
          <span class="contact-label">Telephone / WhatsApp</span>
          <span class="contact-val">${CVUtils.escapeHTML(contact.phone)}</span>
        </div>
      </div>

      <div class="contact-card">
        <div class="contact-icon"><i class="fas fa-location-dot"></i></div>
        <div class="contact-content">
          <span class="contact-label">Port of Residence / Domicile</span>
          <span class="contact-val">${CVUtils.escapeHTML(contact.location)}</span>
        </div>
      </div>

      <div class="contact-card" onclick="window.open('${contact.githubRepo}', '_blank')">
        <div class="contact-icon"><i class="fab fa-github"></i></div>
        <div class="contact-content">
          <span class="contact-label">GitHub Repository</span>
          <span class="contact-val">rcwpt / CVRCWPT</span>
        </div>
      </div>
    `;
  },

  /**
   * INTERACTIVE FILTERS & SORTING EVENTS
   */
  bindInteractiveEvents() {
    // Sea service filters
    const typePills = document.querySelectorAll('[data-sea-filter-type]');
    typePills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        typePills.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        this.state.seaFilterType = e.target.getAttribute('data-sea-filter-type');
        this.renderSeaServiceTable();
      });
    });

    const rankPills = document.querySelectorAll('[data-sea-filter-rank]');
    rankPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        rankPills.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        this.state.seaFilterRank = e.target.getAttribute('data-sea-filter-rank');
        this.renderSeaServiceTable();
      });
    });

    const seaSearch = document.getElementById('sea-search-input');
    if (seaSearch) {
      seaSearch.addEventListener('input', (e) => {
        this.state.seaSearchQuery = e.target.value.trim();
        this.renderSeaServiceTable();
      });
    }

    const seaSort = document.getElementById('sea-sort-select');
    if (seaSort) {
      seaSort.addEventListener('change', (e) => {
        this.state.seaSortBy = e.target.value;
        this.renderSeaServiceTable();
      });
    }

    // Certificate category filters
    const certPills = document.querySelectorAll('[data-cert-filter]');
    certPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        certPills.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        this.state.certCategory = e.target.getAttribute('data-cert-filter');
        this.renderCertificates();
      });
    });

    const certSearch = document.getElementById('cert-search-input');
    if (certSearch) {
      certSearch.addEventListener('input', (e) => {
        this.state.certSearchQuery = e.target.value.trim();
        this.renderCertificates();
      });
    }

    // Modal close event
    const modal = document.getElementById('cert-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.modal-close-btn') || e.target.closest('[data-modal-close]')) {
          this.closeCertModal();
        }
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.CVRenderer = CVRenderer;
}
