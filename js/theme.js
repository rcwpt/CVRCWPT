/**
 * THEME & DISPLAY CONTROL MANAGER
 * Manages Dark Mode, Light Mode, System Theme, Layout Density,
 * Font Size, and Expiry Visual Indicators with localStorage persistence.
 */

const ThemeManager = {
  THEME_KEY: 'cv_maritime_theme',
  DENSITY_KEY: 'cv_maritime_density',
  FONT_SIZE_KEY: 'cv_maritime_fontsize',
  EXPIRY_ALERT_KEY: 'cv_maritime_expiry_alert',

  init() {
    this.applyTheme(this.getSavedTheme());
    this.applyDensity(this.getSavedDensity());
    this.applyFontSize(this.getSavedFontSize());

    // Listen to system theme changes if user chose 'system'
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (this.getSavedTheme() === 'system') {
          this.applyTheme('system');
        }
      });
    }

    this.bindEvents();
  },

  getSavedTheme() {
    return localStorage.getItem(this.THEME_KEY) || 'system';
  },

  getSavedDensity() {
    return localStorage.getItem(this.DENSITY_KEY) || 'comfortable';
  },

  getSavedFontSize() {
    return localStorage.getItem(this.FONT_SIZE_KEY) || 'normal';
  },

  setTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
    this.updateControls();
    CVUtils.showToast(`Theme switched to ${theme.toUpperCase()}`);
  },

  applyTheme(theme) {
    let effectiveTheme = theme;
    if (theme === 'system') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = prefersDark ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', effectiveTheme);

    // Update active state in theme buttons
    document.querySelectorAll('[data-theme-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === theme);
    });
  },

  setDensity(density) {
    localStorage.setItem(this.DENSITY_KEY, density);
    this.applyDensity(density);
    this.updateControls();
    CVUtils.showToast(`Density set to ${density === 'compact' ? 'Compact' : 'Comfortable'}`);
  },

  applyDensity(density) {
    document.documentElement.setAttribute('data-density', density);
    document.querySelectorAll('[data-density-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-density-btn') === density);
    });
  },

  setFontSize(size) {
    localStorage.setItem(this.FONT_SIZE_KEY, size);
    this.applyFontSize(size);
    this.updateControls();
  },

  applyFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
    document.querySelectorAll('[data-font-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-font-btn') === size);
    });
  },

  updateControls() {
    const currentTheme = this.getSavedTheme();
    const currentDensity = this.getSavedDensity();
    const currentFontSize = this.getSavedFontSize();

    document.querySelectorAll('[data-theme-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === currentTheme);
    });
    document.querySelectorAll('[data-density-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-density-btn') === currentDensity);
    });
    document.querySelectorAll('[data-font-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-font-btn') === currentFontSize);
    });
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('[data-theme-btn]');
      if (themeBtn) {
        const targetTheme = themeBtn.getAttribute('data-theme-btn');
        this.setTheme(targetTheme);
        return;
      }

      const densityBtn = e.target.closest('[data-density-btn]');
      if (densityBtn) {
        const targetDensity = densityBtn.getAttribute('data-density-btn');
        this.setDensity(targetDensity);
        return;
      }

      const fontBtn = e.target.closest('[data-font-btn]');
      if (fontBtn) {
        const targetSize = fontBtn.getAttribute('data-font-btn');
        this.setFontSize(targetSize);
        return;
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.ThemeManager = ThemeManager;
}
