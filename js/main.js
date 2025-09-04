
document.addEventListener('DOMContentLoaded', () => {

  const spyEls = document.querySelectorAll('section.scroll-spy');
  if (window.ScrollMagic) {
    const controller = new ScrollMagic.Controller();
    spyEls.forEach((spyEl) => {
      new ScrollMagic.Scene({
        triggerElement: spyEl,
        triggerHook: 0.5,
      })
        .setClassToggle(spyEl, 'show')
        .addTo(controller);
    });
  } else if (spyEls.length) {
    console.warn('ScrollMagic not found; scroll-spy disabled.');
  }


  const swiperRoot = document.querySelector('.project .swiper');
  if (window.Swiper && swiperRoot) {
    // eslint-disable-next-line no-new
    new Swiper('.project .swiper', {
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.project .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.project .swiper-button-next',
        prevEl: '.project .swiper-button-prev',
      },
      // autoplay: { delay: 5000 },
    });
  } else if (swiperRoot) {
    console.warn('Swiper not found; slider disabled.');
  }


  const bodyEl = document.body;
  const modal = document.getElementById('modal');
  const modalOpenBtn = document.querySelector('.project .btn-modal');
  const modalCloseBtn = modal ? modal.querySelector('.btn-close') : null;

  const imageModal = document.getElementById('imageModal');
  const imageModalBtns = document.querySelectorAll('.project .btn-modal-image');
  const imageCloseBtn = imageModal ? imageModal.querySelector('.btn-close') : null;
  const imageEl = imageModal ? imageModal.querySelector('img') : null;

  const open = (el) => {
    if (!el) return;
    el.style.display = 'flex';
    bodyEl.classList.add('no-scroll');
  };
  const close = (el) => {
    if (!el) return;
    el.style.display = 'none';

    const anyOpen = document.querySelector('#modal[style*="display: flex"], #imageModal[style*="display: flex"]');
    if (!anyOpen) bodyEl.classList.remove('no-scroll');
  };

  if (modalOpenBtn && modal) {
    modalOpenBtn.addEventListener('click', () => open(modal));
  }
  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => close(modal));
  }

  imageModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (imageEl && imageModal) {
        const src = btn.dataset.imageSrc || btn.getAttribute('data-image-src');
        if (src) imageEl.src = src;
        open(imageModal);
      }
    });
  });
  if (imageCloseBtn && imageModal) {
    imageCloseBtn.addEventListener('click', () => close(imageModal));
  }

  [modal, imageModal].forEach((el) => {
    if (!el) return;
    el.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) close(el);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      close(modal);
      close(imageModal);
    }
  });


  const thisYear = document.querySelector('.this-year');
  if (thisYear) thisYear.textContent = String(new Date().getFullYear());


  const toTopEl = document.getElementById('toTop');
  const visualSpanEls = document.querySelectorAll('.visual h1 span');

  const setVisualAnim = (on) => {
    visualSpanEls.forEach((s) => s.classList.toggle('animate-flash', on));
  };

  const updateScrollUI = () => {
    const y = window.scrollY || window.pageYOffset;
    if (toTopEl) {
      toTopEl.style.opacity = y > 500 ? '1' : '0';
      toTopEl.style.transform = y > 500 ? 'translateX(0)' : 'translateX(100px)';
    }
    setVisualAnim(y <= 500);
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI);


  const hamburgerBtn = document.querySelector('.btn-hamburger'); // ← 필수: .btn-hamburger
  const navEl = document.querySelector('header nav');
  const menuItems = navEl ? navEl.querySelectorAll('a') : [];

  const toggleNav = (openState) => {
    if (!hamburgerBtn || !navEl) return;
    const willOpen = typeof openState === 'boolean' ? openState : !navEl.classList.contains('active');
    navEl.classList.toggle('active', willOpen);
    hamburgerBtn.classList.toggle('is-open', willOpen); // 버튼 애니메이션 훅
    hamburgerBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', willOpen);
  };

  if (hamburgerBtn && navEl) {
    hamburgerBtn.addEventListener('click', () => toggleNav());
  } else {
    console.warn('Hamburger button (.btn-hamburger) 또는 <header> <nav>를 찾을 수 없습니다.');
  }

  menuItems.forEach((a) => a.addEventListener('click', () => toggleNav(false)));
});


