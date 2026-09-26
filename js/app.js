/**
 * MAIN APP ENTRYPOINT
 * Coordinates Theme, Navigation, Renderer, and Global Actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme & Settings
  if (window.ThemeManager) {
    window.ThemeManager.init();
  }

  // 2. Initialize Navigation & Sidebar
  if (window.NavigationManager) {
    window.NavigationManager.init();
  }

  // 3. Render CV Data
  if (window.CVRenderer) {
    window.CVRenderer.init();
  }

  // 4. Global Action Buttons
  setupGlobalActions();

  // 5. Expiry Status Verification Notice
  checkExpiringCertificatesNotice();
});

function setupGlobalActions() {
  // Print Buttons
  document.querySelectorAll('[data-action="print"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // Download PDF CV Buttons
  document.querySelectorAll('[data-action="download-cv"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const pdfPath = 'assets/documents/CV_REZHKY_ANT2.pdf';
      const a = document.createElement('a');
      a.href = pdfPath;
      a.download = 'CV_REZHKY_ANT2.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      CVUtils.showToast('Starting official CV PDF download...');
    });
  });

  // Copy Profile Link
  document.querySelectorAll('[data-action="copy-link"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentUrl = window.location.origin + window.location.pathname;
      CVUtils.copyToClipboard(currentUrl, 'Portfolio link copied to clipboard!');
    });
  });

  // Share Profile (Web Share API fallback to Copy)
  document.querySelectorAll('[data-action="share-profile"]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const shareData = {
        title: 'Rezhky C. W. P. Todingbua - Deck Officer Class II (ANT-II) CV',
        text: 'Curriculum Vitae and Digital Maritime Profile of Second Officer Rezhky C. W. P. Todingbua, S.Tr.Pel',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            CVUtils.copyToClipboard(window.location.href, 'Profile URL copied!');
          }
        }
      } else {
        CVUtils.copyToClipboard(window.location.href, 'Profile URL copied to clipboard!');
      }
    });
  });
}

/**
 * Check for certificates expiring within 18 months and display non-intrusive alert
 */
function checkExpiringCertificatesNotice() {
  if (!window.CV_DATA) return;
  const { certificates, licenses } = window.CV_DATA;
  const all = [...certificates, ...licenses];

  const expiringList = [];
  all.forEach((item) => {
    const status = CVUtils.getCertificateStatus(item.validUntil);
    if (status.status === 'expiring-soon' || status.status === 'expiring-urgent' || status.status === 'expired') {
      expiringList.push({
        name: item.name,
        validUntil: item.validUntil,
        status: status.label
      });
    }
  });

  // If there are expiring certificates, log or indicate on badge
  const certNavBadge = document.getElementById('cert-nav-badge');
  if (certNavBadge) {
    certNavBadge.textContent = `${all.length}`;
    if (expiringList.length > 0) {
      certNavBadge.title = `${expiringList.length} certificate(s) require renewal attention`;
    }
  }
}
