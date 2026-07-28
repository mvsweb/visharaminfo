(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  const year = document.querySelector('[data-current-year]');
  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');

  const setMenuState = (open) => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', String(open));
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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) setMenuState(false);
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (year) year.textContent = new Date().getFullYear();

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

  const setStatus = (message, type = '') => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status${type ? ` is-${type}` : ''}`;
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
      setStatus('Sending your enquiry securely...');

      try {
        if (!window.emailjs) {
          throw new Error('Contact service is temporarily unavailable. Please email support@vtechiee.com.');
        }

        window.emailjs.init('MmTxPQjLTvU6GMhc5');
        await window.emailjs.sendForm('service_6iixv9p', 'template_pkr57uq', form);
        form.reset();
        setStatus('Thank you. Your enquiry has been sent successfully.', 'success');
      } catch (error) {
        console.error('Contact form error:', error);
        setStatus(
          error && error.message
            ? error.message
            : 'Unable to send the message. Please email support@vtechiee.com.',
          'error'
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultButtonText;
        }
      }
    });
  }
})();