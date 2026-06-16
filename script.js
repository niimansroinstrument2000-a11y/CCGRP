/* ============================================================
   script.js — Interactions for Alex Rivera's portfolio site
============================================================ */

// ── 1. Scroll-triggered card reveal ──────────────────────────
(function initCardReveal() {
  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = (parseInt(card.dataset.index, 10) || 0) * 120;
          setTimeout(() => card.classList.add('visible'), delay);
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => observer.observe(card));
})();


// ── 2. Active nav link on scroll ─────────────────────────────
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const markActive = () => {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    links.forEach((a) => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--ink)'
        : '';
    });
  };

  window.addEventListener('scroll', markActive, { passive: true });
  markActive();
})();


// ── 3. Copy email on click ────────────────────────────────────
(function initEmailCopy() {
  const link = document.getElementById('email-link');
  const hint = document.getElementById('copy-hint');
  if (!link || !hint) return;

  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = link.textContent.trim();

    try {
      await navigator.clipboard.writeText(email);
      showHint('Copied to clipboard!');
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:${email}`;
      showHint('Opening mail client…');
    }
  });

  function showHint(msg) {
    hint.textContent = msg;
    hint.style.opacity = '1';
    clearTimeout(hint._timer);
    hint._timer = setTimeout(() => {
      hint.style.opacity = '0';
      setTimeout(() => { hint.textContent = ''; }, 300);
    }, 2500);
  }
})();


// ── 4. Subtle parallax on hero headline ──────────────────────
(function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const headline = document.querySelector('.hero-headline');
  if (!headline) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      headline.style.transform = `translateY(${y * 0.12}px)`;
      headline.style.opacity   = 1 - y / (window.innerHeight * 0.8);
    }
  }, { passive: true });
})();


// ── 5. Skill-pill hover ripple ────────────────────────────────
(function initPillRipple() {
  document.querySelectorAll('.skill-pill').forEach((pill) => {
    pill.addEventListener('mouseenter', function () {
      this.style.transition = 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease';
      this.style.transform = 'scale(1.06)';
    });
    pill.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });
})();


// ── 6. Page-load fade-in ─────────────────────────────────────
(function initPageFade() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
})();
