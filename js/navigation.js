/**
 * NAVIGATION & SIDEBAR CONTROLLER
 * Handles Desktop Sidebar Collapse, Mobile Off-canvas Drawer,
 * ScrollSpy Active State Tracking, and Keyboard Navigation.
 */

const NavigationManager = {
  SIDEBAR_COLLAPSED_KEY: 'cv_sidebar_collapsed',

  init() {
    this.appLayout = document.querySelector('.app-layout');
    this.sidebar = document.querySelector('.sidebar');
    this.drawerBackdrop = document.querySelector('.drawer-backdrop');
    this.collapseBtn = document.querySelector('.sidebar-collapse-btn');
    this.hamburgerBtn = document.querySelector('.mobile-hamburger');
    this.closeDrawerBtn = document.querySelector('.sidebar-mobile-close');

    // Restore desktop sidebar collapsed state
    if (localStorage.getItem(this.SIDEBAR_COLLAPSED_KEY) === 'true' && window.innerWidth >= 1024) {
      this.collapseSidebar(true);
    }

    this.bindEvents();
    this.initScrollSpy();
  },

  toggleSidebarCollapse() {
    const isCollapsed = this.appLayout.classList.toggle('sidebar-collapsed');
    localStorage.setItem(this.SIDEBAR_COLLAPSED_KEY, isCollapsed);
  },

  collapseSidebar(shouldCollapse) {
    if (shouldCollapse) {
      this.appLayout.classList.add('sidebar-collapsed');
    } else {
      this.appLayout.classList.remove('sidebar-collapsed');
    }
  },

  openMobileDrawer() {
    this.sidebar.classList.add('mobile-open');
    this.drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeMobileDrawer() {
    this.sidebar.classList.remove('mobile-open');
    this.drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  },

  bindEvents() {
    // Desktop Collapse Toggle
    if (this.collapseBtn) {
      this.collapseBtn.addEventListener('click', () => this.toggleSidebarCollapse());
    }

    // Mobile Hamburger
    if (this.hamburgerBtn) {
      this.hamburgerBtn.addEventListener('click', () => this.openMobileDrawer());
    }

    // Mobile Backdrop
    if (this.drawerBackdrop) {
      this.drawerBackdrop.addEventListener('click', () => this.closeMobileDrawer());
    }

    // Mobile Close Button
    if (this.closeDrawerBtn) {
      this.closeDrawerBtn.addEventListener('click', () => this.closeMobileDrawer());
    }

    // Keyboard accessibility: Close mobile drawer on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.sidebar.classList.contains('mobile-open')) {
        this.closeMobileDrawer();
      }
    });

    // Close mobile drawer upon clicking any nav link
    document.querySelectorAll('.sidebar-nav .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          this.closeMobileDrawer();
        }
      });
    });

    // Window resize handler: reset mobile state if resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && this.sidebar.classList.contains('mobile-open')) {
        this.closeMobileDrawer();
      }
    });
  },

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }
};

if (typeof window !== 'undefined') {
  window.NavigationManager = NavigationManager;
}
