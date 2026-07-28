(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const PLUS_STYLESHEET = 'css/vtechiee-plus.css';
  if (!document.querySelector(`link[href="${PLUS_STYLESHEET}"]`)) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = PLUS_STYLESHEET;
    document.head.appendChild(stylesheet);
  }

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const year = document.querySelector('[data-current-year]');
  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  const messageField = document.querySelector('#message');

  const setMenuState = (open) => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      setMenuState(open);
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', (event) => {
      if (!menu.classList.contains('is-open')) return;
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) setMenuState(false);
    });
  }

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  document.body.prepend(progress);
  const progressBar = progress.firstElementChild;

  const updatePageChrome = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
      progressBar.style.width = `${percentage}%`;
    }
  };

  updatePageChrome();
  window.addEventListener('scroll', updatePageChrome, { passive: true });
  window.addEventListener('resize', updatePageChrome, { passive: true });

  if (year) year.textContent = new Date().getFullYear();

  const enhancementMarkup = `
    <section class="section capability-section" id="capabilities" aria-labelledby="capabilities-title">
      <div class="container">
        <div class="section-heading" data-reveal>
          <div>
            <span class="eyebrow">Technology capability</span>
            <h2 id="capabilities-title">Experience across the full delivery stack.</h2>
          </div>
          <p>We connect business applications, cloud platforms, infrastructure and operational tooling so every layer works together reliably.</p>
        </div>
        <div class="capability-grid">
          <article class="capability-card" data-reveal>
            <span class="capability-kicker">ERP & Data</span>
            <h3>Business systems</h3>
            <div class="technology-list"><span>SAP Business One</span><span>SAP HANA</span><span>Microsoft SQL Server</span></div>
          </article>
          <article class="capability-card" data-reveal>
            <span class="capability-kicker">Cloud & Identity</span>
            <h3>Secure platforms</h3>
            <div class="technology-list"><span>Microsoft Azure</span><span>AWS</span><span>Microsoft Entra ID</span></div>
          </article>
          <article class="capability-card" data-reveal>
            <span class="capability-kicker">Infrastructure</span>
            <h3>Systems & networking</h3>
            <div class="technology-list"><span>Windows Server</span><span>SUSE Linux</span><span>Ubuntu</span><span>FortiGate</span></div>
          </article>
          <article class="capability-card" data-reveal>
            <span class="capability-kicker">Operations</span>
            <h3>Monitoring & automation</h3>
            <div class="technology-list"><span>Docker</span><span>Grafana</span><span>Loki</span><span>PowerShell</span></div>
          </article>
          <article class="capability-card capability-card-wide" data-reveal>
            <span class="capability-kicker">Application delivery</span>
            <h3>Modern digital experiences</h3>
            <div class="technology-list"><span>React</span><span>Node.js</span><span>PHP</span><span>WordPress</span><span>Responsive UI/UX</span></div>
          </article>
        </div>
        <div class="assurance-strip" data-reveal>
          <div><strong>Controlled change</strong><span>Implementation planning, testing and rollback readiness.</span></div>
          <div><strong>Operational clarity</strong><span>Documentation, handover and maintainable configurations.</span></div>
          <div><strong>Long-term support</strong><span>Post-launch troubleshooting and continuous improvement.</span></div>
        </div>
      </div>
    </section>`;

  const workSection = document.querySelector('#work');
  if (workSection && !document.querySelector('#capabilities')) {
    workSection.insertAdjacentHTML('beforebegin', enhancementMarkup);
  }

  const faqMarkup = `
    <section class="section section-soft faq-section" id="faq" aria-labelledby="faq-title">
      <div class="container faq-layout">
        <div class="faq-intro" data-reveal>
          <span class="eyebrow">Frequently asked questions</span>
          <h2 id="faq-title">Clear answers before we begin.</h2>
          <p>These are the questions clients commonly ask when planning an SAP, infrastructure, support or application project.</p>
          <a class="button button-secondary" href="#contact">Ask a Different Question</a>
        </div>
        <div class="faq-list" data-reveal>
          <details>
            <summary>Which services can Vtechiee handle?</summary>
            <p>We support SAP Business One, cloud and server infrastructure, identity and networking, monitoring, managed IT support, websites, portals, e-commerce and custom application delivery.</p>
          </details>
          <details>
            <summary>Do you work remotely or only in Tamil Nadu?</summary>
            <p>We are based in Melvisharam, Tamil Nadu and can deliver most consulting, implementation and support engagements remotely. On-site requirements can be discussed during planning.</p>
          </details>
          <details>
            <summary>Can you support an existing SAP Business One environment?</summary>
            <p>Yes. We can assess existing SAP Business One systems, troubleshoot issues, plan upgrades or migrations, improve performance and provide ongoing administration across HANA and SQL-based deployments.</p>
          </details>
          <details>
            <summary>Which cloud platforms do you support?</summary>
            <p>Our work commonly includes Microsoft Azure and AWS, including virtual servers, secure networking, identity, VPN connectivity, backups, monitoring and operational hardening.</p>
          </details>
          <details>
            <summary>Do you provide support after implementation?</summary>
            <p>Yes. Support can include monitoring, troubleshooting, patch planning, documentation updates, user guidance and continuous improvement based on the agreed engagement scope.</p>
          </details>
          <details>
            <summary>How do we start a project?</summary>
            <p>Send a brief description of your current environment, the outcome you need and any deadline or dependency. We will review it and propose the most practical next step.</p>
          </details>
        </div>
      </div>
    </section>`;

  const contactSection = document.querySelector('#contact');
  if (contactSection && !document.querySelector('#faq')) {
    contactSection.insertAdjacentHTML('beforebegin', faqMarkup);
  }

  if (menu && !menu.querySelector('a[href="#faq"]')) {
    const ctaItem = menu.querySelector('.nav-cta')?.closest('li');
    const faqItem = document.createElement('li');
    faqItem.innerHTML = '<a href="#faq">FAQ</a>';
    if (ctaItem) menu.insertBefore(faqItem, ctaItem);
    else menu.appendChild(faqItem);
    faqItem.querySelector('a').addEventListener('click', () => setMenuState(false));
  }

  document.querySelectorAll('.service-card').forEach((card) => {
    if (card.querySelector('.service-link')) return;
    const title = card.querySelector('h3')?.textContent?.trim() || 'technology service';
    const link = document.createElement('a');
    link.className = 'service-link';
    link.href = '#contact';
    link.textContent = 'Discuss this service';
    link.setAttribute('aria-label', `Discuss ${title}`);
    link.dataset.service = title;
    card.appendChild(link);
  });

  document.addEventListener('click', (event) => {
    const serviceLink = event.target.closest('[data-service]');
    if (!serviceLink || !messageField) return;
    const service = serviceLink.dataset.service;
    messageField.value = `I would like to discuss ${service}. `;
    window.setTimeout(() => {
      messageField.focus();
      messageField.setSelectionRange(messageField.value.length, messageField.value.length);
    }, 450);
  });

  if (messageField && !document.querySelector('.message-counter')) {
    const counter = document.createElement('small');
    counter.className = 'message-counter';
    counter.setAttribute('aria-live', 'polite');
    messageField.insertAdjacentElement('afterend', counter);
    const updateCounter = () => {
      const length = messageField.value.length;
      counter.textContent = `${length} characters entered`;
      counter.classList.toggle('is-valid', length >= 10);
    };
    updateCounter();
    messageField.addEventListener('input', updateCounter);
  }

  const floatingActions = document.createElement('div');
  floatingActions.className = 'floating-actions';
  floatingActions.innerHTML = `
    <a class="floating-action whatsapp-action" href="https://wa.me/919487461246?text=Hello%20Vtechiee%2C%20I%20would%20like%20to%20discuss%20a%20technology%20requirement." target="_blank" rel="noopener noreferrer" aria-label="Contact Vtechiee on WhatsApp">
      <span aria-hidden="true">WA</span><b>WhatsApp</b>
    </a>
    <button class="floating-action back-to-top" type="button" aria-label="Back to top"><span aria-hidden="true">↑</span></button>`;
  document.body.appendChild(floatingActions);

  const backToTop = floatingActions.querySelector('.back-to-top');
  const updateBackToTop = () => backToTop?.classList.toggle('is-visible', window.scrollY > 600);
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const navigationLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const observedSections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && observedSections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navigationLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-28% 0px -62%', threshold: [0.05, 0.25, 0.5] });
    observedSections.forEach((section) => navObserver.observe(section));
  }

  document.querySelectorAll('.faq-list details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.faq-list details[open]').forEach((openItem) => {
        if (openItem !== item) openItem.open = false;
      });
    });
  });

  const setStatus = (message, type = '') => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status${type ? ` is-${type}` : ''}`;
  };

  let emailJsReady = false;
  const ensureEmailJs = () => {
    if (emailJsReady) return true;
    if (!window.emailjs) return false;
    window.emailjs.init('MmTxPQjLTvU6GMhc5');
    emailJsReady = true;
    return true;
  };

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus('Please complete all required fields correctly.', 'error');
        return;
      }

      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) return;

      const submitButton = form.querySelector('button[type="submit"]');
      const defaultButtonText = submitButton ? submitButton.textContent : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      form.setAttribute('aria-busy', 'true');
      setStatus('Sending your enquiry securely...');

      try {
        if (!ensureEmailJs()) {
          throw new Error('Contact service is temporarily unavailable. Please email support@vtechiee.com or use WhatsApp.');
        }

        await window.emailjs.sendForm('service_6iixv9p', 'template_pkr57uq', form);
        form.reset();
        messageField?.dispatchEvent(new Event('input'));
        setStatus('Thank you. Your enquiry has been sent successfully.', 'success');
      } catch (error) {
        console.error('Contact form error:', error);
        setStatus(
          error && error.message
            ? error.message
            : 'Unable to send the message. Please email support@vtechiee.com or use WhatsApp.',
          'error'
        );
      } finally {
        form.removeAttribute('aria-busy');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultButtonText;
        }
      }
    });
  }
})();
