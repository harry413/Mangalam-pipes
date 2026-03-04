/**
 * script.js — Mangalam HDPE Pipes Product Page
 * Features:
 *   1. Sticky header (shows on scroll past hero, hides on scroll up)
 *   2. Image carousel with thumbnail navigation
 *   3. Image zoom on hover (magnifier lens + result panel)
 *   4. FAQ accordion
 *   5. Mobile hamburger nav
 *   6. Scroll reveal animations
 *   7. Marquee logos (CSS-driven, JS fallback)
 */

'use strict';

/* ============================================================
   1. STICKY HEADER
   Appears when user scrolls past the main header,
   disappears when scrolling back up.
   ============================================================ */
(function initStickyHeader() {
  const stickyHeader = document.getElementById('stickyHeader');
  const mainHeader   = document.getElementById('mainHeader');
  if (!stickyHeader || !mainHeader) return;

  let lastScrollY = window.scrollY;

  function onScroll() {
    const currentScrollY = window.scrollY;
    const headerHeight    = mainHeader.offsetHeight;

    // Show sticky header after scrolling past main header height
    if (currentScrollY > headerHeight + 40) {
      stickyHeader.classList.add('visible');
    } else {
      stickyHeader.classList.remove('visible');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ============================================================
   2. HAMBURGER / MOBILE NAV
   ============================================================ */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
})();


/* ============================================================
   3. IMAGE CAROUSEL
   ============================================================ */
(function initCarousel() {
  // Slide data (using Unsplash for demo images)
  const slides = [
    {
      src:  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      alt:  'HDPE Pipe installation — workers laying orange pipes'
    },
    {
      src:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      alt:  'HDPE Coil product'
    },
    {
      src:  'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80',
      alt:  'Pipe fittings and connections'
    },
    {
      src:  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      alt:  'Industrial installation'
    },
    {
      src:  'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80',
      alt:  'HDPE pipe coil'
    },
    {
      src:  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
      alt:  'Manufacturing facility'
    }
  ];

  const mainImg   = document.getElementById('mainCarouselImg');
  const thumbs    = document.querySelectorAll('.thumb');
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');

  if (!mainImg || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  /**
   * Navigate to a slide
   * @param {number} index
   */
  function goTo(index) {
    // Bounds
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;

    // Fade out
    mainImg.style.opacity = '0';

    setTimeout(() => {
      mainImg.src = slides[currentIndex].src;
      mainImg.alt = slides[currentIndex].alt;
      mainImg.style.opacity = '1';

      // Update zoom result background too
      updateZoomBg();
    }, 200);

    // Update active thumb
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Thumbnail clicks
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => goTo(i));
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  // Touch/swipe support
  const container = document.getElementById('carouselImageContainer');
  if (container) {
    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
      }
    }, { passive: true });
  }

  // Auto-advance every 5 seconds
  let autoTimer = setInterval(() => goTo(currentIndex + 1), 5000);

  // Pause on hover
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoTimer));
    container.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goTo(currentIndex + 1), 5000);
    });
  }

  function updateZoomBg() {
    const zoomResult = document.getElementById('zoomResult');
    if (zoomResult) {
      zoomResult.style.backgroundImage = `url(${slides[currentIndex].src})`;
    }
  }

  // Init
  goTo(0);
})();

/* ============================================================
   open popup dialog box
   ============================================================ */
 const overlay = document.getElementById("overlay");
 const overlayy = document.getElementById("overlayy");

  function openModal() {
    overlay.style.display = "flex";
  }

  function downloadData() {
    overlayy.style.display = "flex";
  }

  function closeModal() {
    overlay.style.display = "none";
  }

  function closeModall() {
    overlayy.style.display = "none";
  }
  // Close when clicking outside modal
  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) {
      closeModal();
    }
  });
   overlay.addEventListener("click", function(e) {
    if (e.target === overlayy) {
      closeModall();
    }
  });




/* ============================================================
   4. IMAGE ZOOM (Magnifier Lens)
   Displays a magnified area in a result panel next to the image.
   On mobile (pointer: coarse) the zoom is disabled.
   ============================================================ */
(function initZoom() {
  const container  = document.getElementById('carouselImageContainer');
  const lens       = document.getElementById('zoomLens');
  const result     = document.getElementById('zoomResult');
  const img        = document.getElementById('mainCarouselImg');

  if (!container || !lens || !result || !img) return;

  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const ZOOM_FACTOR = 3;   // magnification level
  const LENS_W      = 100; // px — must match CSS
  const LENS_H      = 100;

  function getCursorPos(e) {
    const rect = container.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function moveLens(e) {
    e.preventDefault();
    const pos  = getCursorPos(e);
    const rect = container.getBoundingClientRect();
    const cW   = rect.width;
    const cH   = rect.height;

    // Clamp so lens stays inside the container
    let lx = pos.x - LENS_W / 2;
    let ly = pos.y - LENS_H / 2;
    lx = Math.max(0, Math.min(lx, cW - LENS_W));
    ly = Math.max(0, Math.min(ly, cH - LENS_H));

    lens.style.left = lx + 'px';
    lens.style.top  = ly + 'px';

    // Calculate background position for zoomed result
    // The result panel shows the image at ZOOM_FACTOR scale,
    // so its background-size is ZOOM_FACTOR × container size.
    const resultW  = result.offsetWidth;
    const resultH  = result.offsetHeight;
    const bgWidth  = cW  * ZOOM_FACTOR;
    const bgHeight = cH  * ZOOM_FACTOR;

    // Centre the zoomed region on the cursor
    const bgX = -(lx * ZOOM_FACTOR) + (resultW / 2 - (LENS_W * ZOOM_FACTOR) / 2);
    const bgY = -(ly * ZOOM_FACTOR) + (resultH / 2 - (LENS_H * ZOOM_FACTOR) / 2);

    result.style.backgroundSize     = `${bgWidth}px ${bgHeight}px`;
    result.style.backgroundPosition = `${bgX}px ${bgY}px`;
  }

  // Set background image whenever the main image changes (called from carousel code)
  window.updateZoomBg = function() {
    result.style.backgroundImage = `url(${img.src})`;
  };

  img.addEventListener('load', () => {
    result.style.backgroundImage = `url(${img.src})`;
  });

  container.addEventListener('mousemove', moveLens);

  // Ensure background image is set on init
  result.style.backgroundImage = `url(${img.src})`;
})();


/* ============================================================
   5. FAQ ACCORDION
   ============================================================ */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn  = item.querySelector('.faq-q');
    const icon = item.querySelector('.faq-icon');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach((fi) => {
        fi.classList.remove('open');
        const ic = fi.querySelector('.faq-icon');
        if (ic) ic.textContent = '▼';
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        if (icon) icon.textContent = '▲';
      }
    });
  });
})();


/* ============================================================
   A. VERSATILE APPLICATIONS CAROUSEL
   ============================================================ */
(function initAppsCarousel() {
  const track    = document.getElementById('appsTrack');
  const prevBtn  = document.getElementById('appsPrev');
  const nextBtn  = document.getElementById('appsNext');
  if (!track || !prevBtn || !nextBtn) return;

  let currentOffset = 0;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 2;
    return 4;
  }

  function getCardWidth() {
    const card = track.querySelector('.app-card');
    if (!card) return 260;
    const style = window.getComputedStyle(card);
    return card.offsetWidth + parseInt(style.marginRight || 20);
  }

  function getMaxOffset() {
    const total   = track.children.length;
    const visible = getVisibleCount();
    return Math.max(0, total - visible);
  }

  function slideTo(offset) {
    currentOffset = Math.max(0, Math.min(offset, getMaxOffset()));
    const cardW   = getCardWidth();
    track.style.transform = `translateX(-${currentOffset * (cardW + 4)}px)`;
  }

  prevBtn.addEventListener('click', () => slideTo(currentOffset - 1));
  nextBtn.addEventListener('click', () => slideTo(currentOffset + 1));

  window.addEventListener('resize', () => slideTo(currentOffset));
})();


/* ============================================================
   B. MANUFACTURING PROCESS STEPPER
   ============================================================ */
(function initProcessStepper() {
  const tabs    = document.querySelectorAll('.process-tab');
  const steps   = document.querySelectorAll('.process-step');
  if (!tabs.length || !steps.length) return;

  function goTo(index) {
    tabs.forEach((t, i)  => t.classList.toggle('active', i === index));
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const step = parseInt(tab.dataset.step);
      goTo(step);
    });
  });

  // Process step prev/next buttons (navigate steps)
  steps.forEach((step, idx) => {
    const prevB = step.querySelector('.carousel-btn.prev');
    const nextB = step.querySelector('.carousel-btn.next');
    if (prevB) prevB.addEventListener('click', () => goTo(Math.max(0, idx - 1)));
    if (nextB) nextB.addEventListener('click', () => goTo(Math.min(steps.length - 1, idx + 1)));
  });
})();


/* ============================================================
   C. CONTACT CTA FORM VALIDATION
   ============================================================ */
(function initCTAForm() {
  const submitBtn = document.querySelector('.btn-cta-submit');
  const inputs    = document.querySelectorAll('.cta-input');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    let valid = true;

    inputs.forEach((inp) => {
      const val = inp.value.trim();
      if (!val) {
        inp.style.borderColor = '#ef4444';
        inp.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.12)';
        valid = false;
      } else {
        inp.style.borderColor = '#22c55e';
        inp.style.boxShadow   = '';
      }
    });

    if (valid) {
      submitBtn.textContent    = '✓ Quote Requested!';
      submitBtn.style.background = '#22c55e';
      submitBtn.disabled       = true;

      setTimeout(() => {
        inputs.forEach((inp) => {
          inp.value             = '';
          inp.style.borderColor = '';
          inp.style.boxShadow   = '';
        });
        submitBtn.textContent    = 'Request Custom Quote';
        submitBtn.style.background = '';
        submitBtn.disabled       = false;
      }, 3000);
    }
  });

  inputs.forEach((inp) => {
    inp.addEventListener('input', () => {
      inp.style.borderColor = '';
      inp.style.boxShadow   = '';
    });
  });
})();


/* ============================================================
   D. RESOURCE DOWNLOAD CLICK FEEDBACK
   ============================================================ */
(function initResourceDownloads() {
  const links = document.querySelectorAll('.resource-download');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const orig = link.innerHTML;
      link.innerHTML = '✓ Downloading…';
      link.style.color = '#22c55e';
      setTimeout(() => {
        link.innerHTML   = orig;
        link.style.color = '';
      }, 2000);
    });
  });
})();


/* ============================================================
   6. SCROLL REVEAL ANIMATIONS
   ============================================================ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.feature-card, .specs-table tbody tr, .faq-item, .product-info, .carousel-wrapper, .portfolio-card, .not-found-cta, .resources-list, .contact-cta-card'
  );

  // Add reveal class
  revealEls.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
})();


/* ============================================================
   7. TRUST LOGO INFINITE MARQUEE — duplicate track for seamless loop
   ============================================================ */
(function initMarquee() {
  const track = document.getElementById('logoTrack');
  if (!track) return;

  // Clone the track content and append for seamless animation
  const clone = track.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.parentElement.appendChild(clone);
})();


/* ============================================================
   8. SMOOTH BACK TO TOP on Logo click
   ============================================================ */
(function initLogoClick() {
  const brand = document.querySelector('.brand');
  if (!brand) return;
  brand.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   9. EMAIL FORM — basic validation feedback
   ============================================================ */
(function initEmailForm() {
  const form     = document.querySelector('.catalogue-cta');
  const input    = document.querySelector('.email-input');
  const btn      = form ? form.querySelector('.btn-primary') : null;
  if (!input || !btn) return;

  btn.addEventListener('click', () => {
    const val = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    if (!valid) {
      input.style.borderColor = '#ef4444';
      input.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.15)';
      input.focus();
      return;
    }

    input.style.borderColor = '#22c55e';
    input.style.boxShadow   = '0 0 0 3px rgba(34,197,94,.15)';
    btn.textContent = '✓ Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;

    // Reset after 3s
    setTimeout(() => {
      input.value             = '';
      input.style.borderColor = '';
      input.style.boxShadow   = '';
      btn.textContent         = 'Request Catalogue';
      btn.style.background    = '';
      btn.disabled            = false;
    }, 3000);
  });

  // Clear error on typing
  input.addEventListener('input', () => {
    input.style.borderColor = '';
    input.style.boxShadow   = '';
  });
})();