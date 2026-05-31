/* ===========================
   OLUWATOBI ADETOMIWA PORTFOLIO
   main.js
   =========================== */

// ──────────────────────────────
// THEME TOGGLE
// ──────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('oa-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('oa-theme', next);
});

// ──────────────────────────────
// CUSTOM CURSOR
// ──────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .n8n-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => follower.classList.add('hover'));
  el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
});

// ──────────────────────────────
// NAVBAR SCROLL BEHAVIOR
// ──────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ──────────────────────────────
// ACTIVE NAV LINK
// ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ──────────────────────────────
// MOBILE MENU
// ──────────────────────────────
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

navBurger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = navBurger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navBurger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// Close menu clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !navBurger.contains(e.target)) {
    mobileMenu.classList.remove('open');
    navBurger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// ──────────────────────────────
// SCROLL REVEAL
// ──────────────────────────────
const revealElements = document.querySelectorAll('.reveal-up, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Immediately reveal hero elements
setTimeout(() => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
    el.classList.add('revealed');
  });
}, 100);

// ──────────────────────────────
// COUNTER ANIMATION (Stats)
// ──────────────────────────────
const counters = document.querySelectorAll('.stat-num[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current;
      }, 35);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ──────────────────────────────
// VIDEO MODAL
// ──────────────────────────────
const videoModal = document.getElementById('videoModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalVideo = document.getElementById('modalVideo');

document.querySelectorAll('.video-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const videoSrc = btn.getAttribute('data-video');
    if (videoSrc) {
      modalVideo.src = videoSrc;
    }
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  videoModal.classList.remove('open');
  modalVideo.pause();
  modalVideo.src = '';
  document.body.style.overflow = '';
}

modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ──────────────────────────────
// CONTACT FORM
// ──────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-primary');
  const original = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate async — swap for real email handler (Formspree, EmailJS, etc.)
  setTimeout(() => {
    btn.textContent = '✓ Sent!';
    e.target.reset();
    showToast('Message sent! I\'ll get back to you soon.');
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 2000);
  }, 1200);
}

// ──────────────────────────────
// TOAST NOTIFICATION
// ──────────────────────────────
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ──────────────────────────────
// SMOOTH ANCHOR LINKS
// ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ──────────────────────────────
// TILT EFFECT ON CARDS (subtle)
// ──────────────────────────────
document.querySelectorAll('.project-card, .n8n-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease';
  });
});


/* ===========================
   VIDEO MODAL — POLISHED LOGIC
   Drop this into your main.js, replacing any existing modal code.
   =========================== */

   (function () {

    /* ---------- Build the modal DOM ---------- */
    const modalHTML = `
      <div class="video-modal" id="videoModal" role="dialog" aria-modal="true" aria-label="Project demo video">
        <div class="modal-backdrop" id="modalBackdrop"></div>
        <div class="modal-shell" id="modalShell">
  
          <div class="modal-topbar">
            <span class="modal-title" id="modalTitle">Project Demo</span>
            <button class="modal-close" id="modalClose" aria-label="Close video">✕</button>
          </div>
  
          <div class="modal-video-wrap">
            <div class="modal-loader" id="modalLoader">
              <div class="loader-ring"></div>
            </div>
            <video
              class="modal-video"
              id="modalVideo"
              controls
              preload="metadata"
              playsinline
            ></video>
          </div>
  
          <div class="modal-meta">
            <span class="modal-dot"></span>
            <span class="modal-project-name" id="modalProjectName">Loading…</span>
            <span class="modal-hint">ESC to close</span>
          </div>
  
        </div>
      </div>
    `;
  
    /* Replace any existing #videoModal or append fresh */
    const existing = document.getElementById('videoModal');
    if (existing) existing.remove();
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  
    /* ---------- References ---------- */
    const modal       = document.getElementById('videoModal');
    const backdrop    = document.getElementById('modalBackdrop');
    const shell       = document.getElementById('modalShell');
    const video       = document.getElementById('modalVideo');
    const loader      = document.getElementById('modalLoader');
    const closeBtn    = document.getElementById('modalClose');
    const titleEl     = document.getElementById('modalTitle');
    const nameEl      = document.getElementById('modalProjectName');
  
    /* ---------- Helpers ---------- */
  
    /**
     * Derive a project name from the card that contains the trigger button.
     * Falls back to the video filename.
     */
    function getProjectName(triggerBtn, videoSrc) {
      const card = triggerBtn.closest('.project-card, .n8n-card');
      if (card) {
        const titleNode = card.querySelector('.project-title, .n8n-info h3');
        if (titleNode) return titleNode.textContent.trim();
      }
      // Fallback: filename without extension
      const parts = videoSrc.split('/');
      return parts[parts.length - 1].replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    }
  
    function openModal(videoSrc, projectName) {
      // Reset state
      loader.classList.remove('hidden');
      video.src = videoSrc;
      titleEl.textContent = 'Project Demo';
      nameEl.textContent  = projectName;
  
      // Show
      modal.classList.remove('closing');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
  
      // Load + play
      video.load();
      video.addEventListener('canplay', function onCanPlay() {
        loader.classList.add('hidden');
        video.play().catch(() => {}); // autoplay may be blocked; silent fail
        video.removeEventListener('canplay', onCanPlay);
      });
    }
  
    function closeModal() {
      modal.classList.add('closing');
      video.pause();
  
      // Wait for exit animation, then fully hide
      const ANIM_MS = 320;
      setTimeout(() => {
        modal.classList.remove('open', 'closing');
        video.src = '';
        document.body.style.overflow = '';
      }, ANIM_MS);
    }
  
    /* ---------- Event listeners ---------- */
  
    // Close button
    closeBtn.addEventListener('click', closeModal);
  
    // Click outside (backdrop)
    backdrop.addEventListener('click', closeModal);
  
    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  
    // All "▶ Demo" / "▶ Watch Flow" trigger buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.video-trigger');
      if (!btn) return;
  
      const videoSrc = btn.dataset.video;
      if (!videoSrc) return;
  
      e.preventDefault();
      const name = getProjectName(btn, videoSrc);
      openModal(videoSrc, name);
    });
  
  })();


  /* ===========================
   FOUNDER SECTION — LOCAL VIDEO TRIGGERS
   Add this inside your existing DOMContentLoaded listener in main.js
   (or just append at the bottom of main.js — it's self-contained)
   =========================== */

(function () {
  /**
   * Revelflow local video cards use .vvideo-local-frame
   * They tap into the same polished modal from modal-logic.js
   * via the existing openModal() pattern — we just dispatch a
   * synthetic click on the data-video attribute.
   */
  document.addEventListener('click', function (e) {
    const frame = e.target.closest('.vvideo-local-frame');
    if (!frame) return;

    const videoSrc = frame.dataset.video;
    if (!videoSrc) return;

    // Grab the title from the sibling .vvideo-title
    const card      = frame.closest('.vvideo-card');
    const titleText = card ? (card.querySelector('.vvideo-title')?.textContent?.trim() || 'Revelflow') : 'Revelflow';

    // Re-use the same modal already built by modal-logic.js
    const modal    = document.getElementById('videoModal');
    const video    = document.getElementById('modalVideo');
    const loader   = document.getElementById('modalLoader');
    const nameEl   = document.getElementById('modalProjectName');

    if (!modal || !video) return;

    // Reset + populate
    loader?.classList.remove('hidden');
    video.src       = videoSrc;
    if (nameEl) nameEl.textContent = 'Revelflow — ' + titleText;

    modal.classList.remove('closing');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    video.load();
    video.addEventListener('canplay', function onReady() {
      loader?.classList.add('hidden');
      video.play().catch(() => {});
      video.removeEventListener('canplay', onReady);
    });
  });

  /* Keyboard accessibility for local video frames */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const frame = document.activeElement?.closest('.vvideo-local-frame');
    if (frame) {
      e.preventDefault();
      frame.click();
    }
  });
})();
// ──────────────────────────────
// INIT LOG
// ──────────────────────────────
console.log('%c OA Portfolio ', 'background:#7C3AED;color:#fff;font-family:monospace;padding:4px 8px;border-radius:4px;font-size:14px;');
console.log('%c Built by Oluwatobi Adetomiwa', 'color:#7C3AED;font-family:monospace;');
