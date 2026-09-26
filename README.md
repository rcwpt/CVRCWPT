# CVRCWPT

> **Professional Digital CV & Maritime Portfolio of Rezhky C. W. P. Todingbua, S.Tr.Pel**  
> Certified Deck Officer Class II (ANT-II / STCW II/2) • Second Officer (2/O) • Maritime Navigator

[![Live Website](https://img.shields.io/badge/Live-Website-0284c7?style=for-the-badge&logo=google-chrome&logoColor=white)](https://rcwpt.github.io/CVRCWPT/)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://rcwpt.github.io/CVRCWPT/)
[![STCW II/2](https://img.shields.io/badge/License-ANT--II%20(STCW%20II%2F2)-f59e0b?style=for-the-badge&logo=anchor&logoColor=white)](https://rcwpt.github.io/CVRCWPT/)
[![License: MIT](https://img.shields.io/badge/License-MIT-slate?style=for-the-badge)](LICENSE)

---

## About

**CVRCWPT** is the personal, digital curriculum vitae and seafarer profile repository of **Rezhky C. W. P. Todingbua, S.Tr.Pel**. Designed specifically for maritime crewing managers, superintendents, and shipping companies, this application transforms traditional tabular seafarer documents into a modern, interactive, high-performance, and responsive digital portfolio.

All records, certificates, and dates are strictly grounded in verified primary documents, including the official Indonesian Maritime Directorate Continuous Discharge Book (Buku Pelaut), Certificates of Competency (CoC ANT-II), Certificates of Endorsement (CoE), and Certificates of Proficiency (COP STCW 2010 Manila Amendments).

---

## Live Website

Access the official digital CV online at:  
👉 **[https://rcwpt.github.io/CVRCWPT/](https://rcwpt.github.io/CVRCWPT/)**

---

## Key Features

- ⚓ **Full Control Fixed Sidebar Navigation**: Desktop sticky sidebar with collapse/expand toggle, hover tooltips, and real-time scrollspy section highlighting.
- 📱 **Mobile-First Responsive Drawer**: Transforms cleanly into an accessible slide-out drawer on tablets and mobile phones with backdrop and keyboard controls (`Esc` to dismiss).
- 🌓 **Comprehensive Display Controls**:
  - **Themes**: Instant toggle between Light Mode, Dark Mode (Maritime Midnight Deck), and System Default with `localStorage` persistence.
  - **Density**: Switch between *Comfortable* and *Compact* data view modes.
  - **Font Sizing**: Standard (A) and Large (A+) typography switches.
- ⏱️ **Real-Time Certificate Validity Engine**: Dynamically calculates days and months remaining until expiration against system date. Automatically flags items requiring renewal (< 18 months or < 6 months), unlimited certificates, and endorsements.
- 🚢 **Interactive Sea Service Records**:
  - Filter sea service voyages by vessel type (*General Cargo, Bulk Carrier, Container*).
  - Filter by officer rank (*2/O, 3/O, Cadet*).
  - Sort by date, gross tonnage (GRT), or duration.
  - Instant text search across ship names and management companies.
- 🖨️ **Professional A4 Print / PDF Engine**: Dedicated `@media print` stylesheet that removes interactive controls and cleanly formats into a 2-page maritime crewing CV ready for instant printing or PDF generation.
- 📥 **Integrated PDF Download**: Instant one-click download for verified official CV PDF.
- 🛡️ **Zero Bloat & Peak Performance**: Pure vanilla HTML5, CSS3 Custom Properties, and ES6 JavaScript. No heavy frontend framework runtimes.

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Markup** | Semantic HTML5 with Schema.org JSON-LD Structured Data |
| **Styles** | Modern CSS3 (Custom Properties, Flexbox, CSS Grid, Transitions) |
| **Scripts** | Vanilla ES6 JavaScript (Modular architecture, zero npm dependencies) |
| **Typography** | Inter, Plus Jakarta Sans, JetBrains Mono |
| **Iconography** | Font Awesome 6 Free CDN |
| **Hosting** | GitHub Pages |

---

## Project Structure

```text
CVRCWPT/
├── index.html                      # Semantic main HTML5 entrypoint
├── README.md                       # Comprehensive repository documentation
├── LICENSE                         # MIT License
│
├── assets/
│   ├── images/
│   │   ├── profile.webp            # Optimized high-resolution WebP portrait
│   │   ├── profile.jpg             # High-quality JPEG fallback
│   │   ├── profile-thumb.webp      # 200px thumbnail for sidebar avatar
│   │   └── favicon.svg             # Maritime compass & anchor SVG favicon
│   └── documents/
│       └── CV_REZHKY_ANT2.pdf      # Official verified maritime CV PDF
│
├── css/
│   ├── style.css                   # Core design system & theme tokens
│   ├── responsive.css              # Breakpoint adjustments (320px to 1920px)
│   └── print.css                   # Dedicated A4 print layout
│
├── js/
│   ├── app.js                      # Application initialization & action handlers
│   ├── cv-renderer.js              # Dynamic DOM rendering & interactive filtering
│   ├── navigation.js               # Sidebar collapse, drawer & scrollspy
│   ├── theme.js                    # Light/Dark/System theme & density manager
│   └── utils.js                    # Date calculations, validity logic & toasts
│
└── data/
    ├── cv-data.js                  # Primary structured JavaScript CV data model
    └── cv.json                     # Canonical JSON export of verified records
```

---

## CV Sections Overview

1. **Overview / Hero**: Officer credentials, license badge, verified statistics, and instant action buttons.
2. **Professional Profile**: Executive summary, core competencies, personal particulars, and verified domicile data.
3. **Professional Experience**: Interactive vertical timeline of all commercial vessels served, shipping operators, specifications, and shipboard duties.
4. **Sea Service Records**: Tabular registry of 1,747 days of sea time with live filters (Vessel Type, Rank) and sorting controls.
5. **Certificates & CoC Dashboard**: Searchable and categorized grid of all 28 licenses, STCW certificates, and tanker endorsements with dynamic validity pills.
6. **Education**: Maritime academic background from Politeknik Ilmu Pelayaran (PIP) Makassar through preparatory schooling.
7. **Skills & Qualifications**: Grouped chip badges covering Bridge Navigation, Maritime Safety, Security, Tanker Ops, Regulations, and Communications.
8. **Documents & Downloads**: Direct download and print access for official credentials.
9. **Contact & Recruitment**: Interactive channels including one-click email copying, telephone/WhatsApp links, and repository access.

---

## Responsive Design Breakpoints

The layout has been meticulously verified across all industry-standard viewport sizes:

- **Desktop (1920 × 1080 & 1440 × 900)**: Two-column layout with fixed navigation sidebar and floating tooltips.
- **Laptop (1366 × 768 & 1280 × 800)**: Proportional density with fluid grid columns.
- **Tablet (768 × 1024)**: Responsive off-canvas navigation drawer with hamburger toggle.
- **Mobile (390 × 844 & 414 × 896)**: Single column with scrollable data tables and full-width touch targets.
- **Small Mobile (320px)**: Compact padding, zero horizontal overflow, and resilient typography.

---

## Updating CV Data

The entire website is data-driven. **You do not need to manually edit HTML lines** when updating CV information.

To update dates, add a new vessel, or renew a certificate:

1. Open `data/cv-data.js` in any text editor.
2. Edit the corresponding category object:
   - To add a new vessel, add an entry to the `seaService` array.
   - To update certificate expiry, modify the `validUntil` field in the `certificates` or `licenses` array.
   - To add a new skill, add an item to the `skills` array.
3. Save the file. The UI will automatically recalculate stats, expiry statuses, and tables!
4. *(Optional)* Run `node -e "const data = require('./data/cv-data.js'); require('fs').writeFileSync('./data/cv.json', JSON.stringify(data, null, 2));"` to sync `data/cv.json`.

---

## Deployment (GitHub Pages)

This repository is pre-configured for GitHub Pages:

1. Push all changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Update digital CV portfolio"
   git push origin main
   ```
2. Navigate to your repository on GitHub: **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website will be live at `https://rcwpt.github.io/CVRCWPT/`.

---

## Author

**Rezhky C. W. P. Todingbua, S.Tr.Pel**  
*Deck Officer Class II (ANT-II) • Second Officer (2/O)*  
- 📧 Email: [rezhkytodingbua@gmail.com](mailto:rezhkytodingbua@gmail.com)  
- 📞 Phone: +62 813 4332 9545  
- 📍 Domicile: Mimika, Papua Tengah, Indonesia  
- 🐙 GitHub: [@rcwpt](https://github.com/rcwpt)

---

## License

This project is licensed under the [MIT License](LICENSE) — free to use as a personal CV portfolio template.
