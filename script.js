// ===== MOBILE NAV =====
document.getElementById('nav-toggle').addEventListener('click', () => {
  document.getElementById('nav-menu').classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  document.getElementById('nav-menu').classList.remove('open');
}));

// ===== BACK TO TOP =====
const bt = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  bt.classList.toggle('visible', window.scrollY > 400);
});

// ===== FADE-UP ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== SKILL BARS ANIMATE ON SCROLL =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.transition = 'width 1s ease';
          bar.style.width = w;
        }, 100);
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(c => skillObserver.observe(c));

// ===== NAVBAR SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow = window.scrollY > 50
    ? '0 2px 20px rgba(0,0,0,0.08)' : '';
});

// ===== IMAGE SLIDERS =====
document.querySelectorAll('.project-images').forEach(container => {
  const track = container.querySelector('.slider-track');
  const slides = container.querySelectorAll('.slide');
  const prev = container.querySelector('.slider-btn.prev');
  const next = container.querySelector('.slider-btn.next');
  const dotsContainer = container.querySelector('.slider-dots');

  // If only one slide, hide controls
  if (slides.length <= 1) {
    if (prev) prev.remove();
    if (next) next.remove();
    if (dotsContainer) dotsContainer.remove();
    return;
  }

  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    container.querySelectorAll('.slider-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  // Initialise
  goTo(0);
});

// ===== CV DOWNLOAD =====
const cvBtn = document.getElementById("download-cv");

if (cvBtn) {
  cvBtn.addEventListener("click", () => {
    const icon = cvBtn.querySelector("i");
    const text = cvBtn.querySelector("span");

    icon.className = "fas fa-spinner fa-spin";
    text.textContent = "Preparing download...";

    setTimeout(() => {
      icon.className = "fas fa-check";
      text.textContent = "Download Started";

      setTimeout(() => {
        icon.className = "fas fa-file-pdf";
        text.textContent = "Download CV";
      }, 1800);
    }, 500);
  });
}