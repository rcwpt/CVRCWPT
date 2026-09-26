/**
 * MARITIME CV UTILITIES
 * Pure utility functions for date calculations, expiry checks,
 * clipboard interactions, toast notifications, and DOM helpers.
 */

const CVUtils = {
  /**
   * Escape HTML to prevent XSS
   */
  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Format ISO date string (YYYY-MM-DD) into readable maritime format (e.g., "16 Mar 2024")
   */
  formatDate(dateStr) {
    if (!dateStr) return '-';
    if (dateStr === 'UNLIMITED' || dateStr === 'FOLLOW ENDORSEMENT') return dateStr;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(d.getDate()).padStart(2, '0');
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
  },

  /**
   * Calculate certificate validity and status in real-time
   * @param {string} validUntil - Date string or special keywords ('UNLIMITED', 'FOLLOW ENDORSEMENT')
   * @returns {Object} status info: { status, label, badgeClass, daysRemaining, monthsRemaining }
   */
  getCertificateStatus(validUntil) {
    if (!validUntil) {
      return { status: 'unknown', label: 'Not Specified', badgeClass: 'status-info' };
    }

    const upper = String(validUntil).toUpperCase().trim();
    if (upper === 'UNLIMITED') {
      return { status: 'unlimited', label: 'UNLIMITED', badgeClass: 'status-valid' };
    }
    if (upper === 'FOLLOW ENDORSEMENT') {
      return { status: 'follow-endorsement', label: 'Follow Endorsement', badgeClass: 'status-purple' };
    }

    const expiryDate = new Date(validUntil);
    if (isNaN(expiryDate.getTime())) {
      return { status: 'custom', label: validUntil, badgeClass: 'status-info' };
    }

    const today = new Date();
    // Compare at midnight
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const monthsRemaining = Math.floor(diffDays / 30.44);

    if (diffDays < 0) {
      const daysAgo = Math.abs(diffDays);
      return {
        status: 'expired',
        label: `Expired (${daysAgo}d ago)`,
        badgeClass: 'status-danger',
        daysRemaining: diffDays,
        monthsRemaining
      };
    } else if (diffDays <= 180) {
      return {
        status: 'expiring-urgent',
        label: `Expiring Soon (${monthsRemaining} mos)`,
        badgeClass: 'status-danger',
        daysRemaining: diffDays,
        monthsRemaining
      };
    } else if (diffDays <= 548) {
      // Less than 18 months
      return {
        status: 'expiring-soon',
        label: `Valid (${monthsRemaining} mos left)`,
        badgeClass: 'status-warning',
        daysRemaining: diffDays,
        monthsRemaining
      };
    } else {
      return {
        status: 'valid',
        label: 'Valid',
        badgeClass: 'status-valid',
        daysRemaining: diffDays,
        monthsRemaining
      };
    }
  },

  /**
   * Copy text to clipboard and display feedback toast
   */
  async copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      CVUtils.showToast(successMessage, 'success');
      return true;
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      CVUtils.showToast('Failed to copy to clipboard', 'error');
      return false;
    }
  },

  /**
   * Show animated floating toast notification
   */
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-circle-exclamation';

    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${CVUtils.escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 250);
    }, 3200);
  }
};

if (typeof window !== 'undefined') {
  window.CVUtils = CVUtils;
}
