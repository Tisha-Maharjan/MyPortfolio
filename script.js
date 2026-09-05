// Modern Portfolio JavaScript - Interactive Behaviors

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const themeIconLight = document.getElementById('theme-icon-light');

  // Check persisted theme or system preference (Default to dark for sleek portfolio aesthetic)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

  function toggleThemeHandler() {
    const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleThemeHandler);
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleThemeHandler);
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      if (themeIconDark) themeIconDark.classList.remove('hidden');
      if (themeIconLight) themeIconLight.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      if (themeIconDark) themeIconDark.classList.add('hidden');
      if (themeIconLight) themeIconLight.classList.remove('hidden');
    }
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Scroll Spy for Active Navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
            link.classList.remove('text-slate-600', 'dark:text-slate-300');
          } else {
            link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
            link.classList.add('text-slate-600', 'dark:text-slate-300');
          }
        });
      }
    });

    // 4. Back to Top visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
      }
    }
  });

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. Project Modal Data & Interaction
  const projectData = {
    'sorig-healing': {
      title: 'Sorig The Art of Healing — Holistic Wellness UI/UX',
      category: 'UI/UX Design • Webtech Nepal Internship',
      period: 'Webtech Nepal Pvt. Ltd. (Live Client Project)',
      summary: 'Designed the user interface and digital brand experience for Sorig (sorig.ca), a Tibetan herbal healthcare and traditional wellness brand. Created a tranquil, harmonious aesthetic with intuitive product navigation, herbal remedy catalogs, and seamless health consultation bookings.',
      problem: 'The brand needed a modern, accessible international web presence that could convey authentic Tibetan healing philosophy, instill medical credibility, and enable intuitive product purchasing for Canadian and global users.',
      solution: 'Conducted user flow mapping and created a comprehensive Figma design system using tranquil earth tones, accessible typography, streamlined e-commerce categories, and an empathetic consultation inquiry journey.',
      tools: ['Figma', 'UI/UX Design', 'Wireframing', 'E-Commerce UX', 'Design System', 'User Research', 'Webtech Nepal'],
      metrics: ['Designed complete responsive web layout for live platform sorig.ca', 'Streamlined user path from herbal discovery to consultation checkout', 'Maintained WCAG AA accessibility contrast across mobile and desktop'],
      link: 'https://sorig.ca/',
      linkText: 'Visit Live Website (sorig.ca)'
    },
    'rg-international': {
      title: 'RG International — Global Trade & Export/Import Portal',
      category: 'UI/UX Design • Webtech Nepal Internship',
      period: 'Webtech Nepal Pvt. Ltd. (Live Client Project)',
      summary: 'Modern corporate web redesign for RG International (rginternational.com.np), an established export and import firm operating since 2015. Developed an authoritative, clean corporate interface showcasing multi-category trade offerings and structured B2B trade inquiry pathways.',
      problem: 'The client required an elevated digital presence reflecting their global supply chain reliability, enabling overseas partners and distributors to quickly explore product lines and initiate trade inquiries.',
      solution: 'Structured clear information architecture in Figma, emphasizing corporate trust, service capabilities, interactive product catalogs, and streamlined quotation/contact forms for domestic and international clients.',
      tools: ['Figma', 'Corporate UI Design', 'Information Architecture', 'Interactive Prototyping', 'User Research', 'Webtech Nepal'],
      metrics: ['Modernized corporate brand identity and online portal at rginternational.com.np', 'Simplified B2B inquiry flow for prospective global trading partners', 'Designed mobile-first responsive layout with fast-loading structure'],
      link: 'https://rginternational.com.np/',
      linkText: 'Visit Live Website (rginternational.com.np)'
    },
    'ethereal-website': {
      title: 'Ethereal — Modern Web Interface & Design',
      category: 'UI/UX & Web Development • NCCS BIM Project',
      period: 'NCCS (National College of Computer Studies) BIM Coursework',
      summary: 'A modern, responsive website interface designed and developed as part of the Bachelor in Information Management (BIM) curriculum at NCCS. Demonstrates end-to-end frontend craftsmanship—from initial visual wireframing in Figma to clean, modular HTML/CSS responsive web implementation.',
      problem: 'Designing a captivating, fast-loading digital experience with dynamic layout composition, ensuring pixel-perfect responsiveness across desktop, tablet, and mobile browsers.',
      solution: 'Created wireframes and design tokens in Figma, then implemented clean semantic HTML5 markup, responsive CSS grid/flexbox layouts, aesthetic typography pairings, and subtle interactive transitions.',
      tools: ['Figma', 'HTML5', 'CSS3', 'Responsive Web Design', 'BIM Academic Capstone', 'NCCS (2020-2025)'],
      metrics: ['Engineered complete responsive website from design mockup to code', 'Clean semantic code structure and accessible navigation hierarchy', 'Earned top marks for visual hierarchy and UX design at NCCS'],
      link: 'file:///F:/backup/ethereal/Website/index.html',
      linkText: 'Open Local Build (Ethereal)'
    },
    'cbs-microfinance': {
      title: 'CBS (Core Banking System) for Microfinance',
      category: 'Database Support & SQL Engineering • Uranus Tech',
      period: 'Uranus Tech Pvt. Ltd. (Database Support Trainee)',
      summary: 'Production database support for a Core Banking System (CBS) powering microfinance institutions across Nepal. Primary focus on analyzing production issues, debugging database errors, and implementing custom logic modifications in SQL stored procedures to fulfill banking operational requirements.',
      problem: 'Microfinance CBS environments handle high-volume, concurrent financial transactions (loan disbursements, EMIs, savings accounts, interest accruals). Any error or requirement change requires precise SQL logic modifications without disrupting ongoing banking operations or risking data discrepancies.',
      solution: 'Diagnosed production runtime errors in transaction logs, optimized existing SQL stored procedures, and wrote custom procedural logic according to specific regulatory and client requirements. Ensured strict ACID compliance, data integrity, and validated ledger balance consistency.',
      tools: ['SQL / T-SQL', 'Stored Procedures', 'Database Troubleshooting', 'Transaction Management', 'Data Integrity', 'Core Banking Systems (CBS)', 'Uranus Tech'],
      metrics: ['Resolved critical production database errors across microfinance branches', 'Updated and optimized complex stored procedures according to business requirements', 'Maintained 100% financial ledger consistency and transactional integrity'],
      link: null,
      linkText: null
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalPeriod = document.getElementById('modal-period');
  const modalSummary = document.getElementById('modal-summary');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalTools = document.getElementById('modal-tools');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalLinkBox = document.getElementById('modal-link-box');
  const modalLinkBtn = document.getElementById('modal-link-btn');
  const modalLinkText = document.getElementById('modal-link-text');

  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data && projectModal) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalPeriod.textContent = data.period;
        modalSummary.textContent = data.summary;
        modalProblem.textContent = data.problem;
        modalSolution.textContent = data.solution;

        // Render tools
        modalTools.innerHTML = '';
        data.tools.forEach(tool => {
          const badge = document.createElement('span');
          badge.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30';
          badge.textContent = tool;
          modalTools.appendChild(badge);
        });

        // Render metrics
        modalMetrics.innerHTML = '';
        data.metrics.forEach(metric => {
          const item = document.createElement('li');
          item.className = 'flex items-start text-sm text-slate-700 dark:text-slate-300 gap-2';
          item.innerHTML = `<span class="text-cyan-600 dark:text-cyan-400 font-bold">✓</span> <span>${metric}</span>`;
          modalMetrics.appendChild(item);
        });

        // Render Link if available
        if (modalLinkBox && modalLinkBtn && modalLinkText) {
          if (data.link) {
            modalLinkBox.classList.remove('hidden');
            modalLinkBtn.setAttribute('href', data.link);
            modalLinkText.textContent = data.linkText || 'Visit Project';
          } else {
            modalLinkBox.classList.add('hidden');
          }
        }

        // Show modal
        projectModal.classList.remove('modal-hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.add('modal-hidden');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('modal-hidden')) {
      closeModal();
    }
  });

  // 7. Contact Form Interactive Simulation
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `;

      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        // Show toast
        showToast('Message sent! Thank you for reaching out. I will get back to you shortly.');
      }, 1000);
    });
  }

  function showToast(message) {
    if (!toast) return;
    const toastMsg = document.getElementById('toast-message');
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
});
