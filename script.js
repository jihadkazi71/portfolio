// ══════════════════════════════════════════
// JIHAD KAZI PORTFOLIO — script.js
// ══════════════════════════════════════════

// ─── NAV SCROLL ─────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── HAMBURGER ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── STAT COUNTER ───────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const display = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
    el.textContent = display + suffix;
  }, step);
}

// ─── INTERSECTION OBSERVER ───────────────────────────
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

// Fade in elements
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.result-card, .auto-card, .case-card, .service-row').forEach((el, i) => {
  el.classList.add('fade-in');
  el.dataset.delay = i * 80;
  fadeObserver.observe(el);
});

// Counter observer — trigger when stats enter view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ─── SMOOTH ANCHOR ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── ACTIVE NAV LINK ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'white'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// ─── CONTACT FORM ────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#10B981';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ─── FUNNEL BAR ANIMATION ────────────────────────────
const funnelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.funnel-bar').forEach((bar, i) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = targetWidth; }, i * 150 + 300);
      });
      funnelObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.funnel-diagram').forEach(el => funnelObserver.observe(el));

// ─── CURSOR GLOW (desktop only) ──────────────────────
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(26,86,219,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0; border-radius: 50%;
    transform: translate(-50%, -50%); transition: 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
