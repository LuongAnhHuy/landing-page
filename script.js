// ===========================
//  Beebe.squishy – script.js
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

/* ---------- Product filter + Load more ---------- */
const PAGE_SIZE     = 9;
const filterBtns     = document.querySelectorAll('.filter-btn');
const productCards   = Array.from(document.querySelectorAll('.product-card'));
const loadMoreWrap   = document.getElementById('load-more-wrap');
const loadMoreBtn    = document.getElementById('load-more-btn');
const productsEmpty  = document.getElementById('products-empty');

let currentFilter = 'all';
let visibleCount   = PAGE_SIZE;

function matchingCards(filter) {
  return productCards.filter(card => filter === 'all' || card.dataset.category === filter);
}

function renderProducts() {
  const matched   = matchingCards(currentFilter);
  const shown     = matched.slice(0, visibleCount);
  const shownSet  = new Set(shown);
  const remaining = matched.length - shown.length;

  productCards.forEach(card => {
    const isShown = shownSet.has(card);
    card.style.display = isShown ? '' : 'none';
    if (isShown) {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    }
  });

  // Thông báo khi mục chưa có sản phẩm (vd. Taba)
  if (productsEmpty) productsEmpty.hidden = matched.length > 0;

  // Hiển thị / ẩn nút "Xem thêm"
  if (loadMoreWrap) {
    if (remaining > 0) {
      loadMoreWrap.hidden = false;
      if (loadMoreBtn) loadMoreBtn.textContent = 'Xem thêm sản phẩm';
    } else {
      loadMoreWrap.hidden = true;
    }
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    visibleCount  = PAGE_SIZE;
    renderProducts();
  });
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    renderProducts();
  });
}

renderProducts();

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



/* ---------- Star rating ---------- */
const stars       = document.querySelectorAll('.star-rating .star');
const ratingInput = document.getElementById('ratingValue');

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const val = +star.dataset.value;
    stars.forEach(s => s.classList.toggle('active', +s.dataset.value <= val));
    stars.forEach(s => s.textContent = +s.dataset.value <= val ? '★' : '☆');
  });
  star.addEventListener('mouseleave', () => {
    const selected = +(ratingInput?.value || 0);
    stars.forEach(s => {
      const active = +s.dataset.value <= selected;
      s.classList.toggle('active', active);
      s.textContent = active ? '★' : '☆';
    });
  });
  star.addEventListener('click', () => {
    const val = +star.dataset.value;
    if (ratingInput) ratingInput.value = val;
    stars.forEach(s => {
      const active = +s.dataset.value <= val;
      s.classList.toggle('active', active);
      s.textContent = active ? '★' : '☆';
    });
  });
});

/* ---------- Feedback form ---------- */
document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = '✅ Cảm ơn feedback của bạn! 💌';
  btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Gửi ngay 🚀';
    btn.style.background = '';
    btn.disabled = false;
    if (ratingInput) ratingInput.value = 0;
    stars.forEach(s => { s.classList.remove('active'); s.textContent = '☆'; });
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
