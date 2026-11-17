// ===========================
//  ToyZone – script.js
// ===========================

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

/* ---------- Navbar shadow on scroll ---------- */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 24px rgba(168,85,247,.15)'
    : 'none';
});

/* ---------- Product filter ---------- */
const filterBtns   = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity .3s, transform .3s';
      if (match) {
        card.style.opacity    = '1';
        card.style.transform  = 'scale(1)';
        card.style.display    = '';
      } else {
        card.style.opacity    = '0';
        card.style.transform  = 'scale(.95)';
        setTimeout(() => {
          if (card.dataset.category !== filter && filter !== 'all') {
            card.style.display = 'none';
          }
        }, 300);
      }
    });
  });
});

/* ---------- Scroll-reveal animation ---------- */
const revealEls = document.querySelectorAll(
  '.feature-card, .product-card, .review-card, .channel'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

/* ---------- "Add to cart" button feedback ---------- */
document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', function () {
    const original = this.textContent;
    this.textContent = '✅ Đã thêm!';
    this.style.background = 'linear-gradient(135deg, #22D3EE, #A855F7)';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
    }, 1800);
  });
});

/* ---------- Contact form ---------- */
document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = '✅ Gửi thành công! Chúng tớ sẽ liên hệ bạn sớm 💌';
  btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Gửi ngay 🚀';
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 4000);
});

/* ---------- Smooth active nav highlight ---------- */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!link) return;
    const inView = scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight;
    link.style.color      = inView ? 'var(--purple)' : '';
    link.style.background = inView ? 'var(--purple-light)' : '';
  });
});
