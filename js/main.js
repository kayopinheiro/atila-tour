// =========================================================
// ÁTILA TOUR — JS principal (compartilhado entre páginas)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initHeroReveal();
  initWhatsAppFloat();
  initPacotesCarousel();
  initStickyHeader();
});

/**
 * Header — fica fixo e ganha fundo sólido assim que a página rola.
 * Limiar baixo (16px) de propósito: o header é position:absolute preso
 * ao topo do .hero, então rolar a página o arrasta pra fora da tela
 * junto com o resto do conteúdo — a troca pra position:fixed precisa
 * acontecer quase no início do scroll pra não "sumir e reaparecer".
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 16;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/**
 * Botão flutuante do WhatsApp — injetado em toda página que carregar
 * este script, pra não precisar duplicar o HTML em cada arquivo.
 * TODO: trocar o número de telefone pelo real antes de publicar.
 */
function initWhatsAppFloat() {
  const WHATSAPP_NUMBER = '5511999999999'; // TODO: número real da Átila Tour (DDI+DDD+número, só dígitos)
  const WHATSAPP_MESSAGE = 'Olá! Vim pelo site da Átila Tour e gostaria de saber mais sobre os pacotes.';

  const link = document.createElement('a');
  link.className = 'whatsapp-float';
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Falar com a Átila Tour pelo WhatsApp');

  link.innerHTML = `
    <span class="whatsapp-float__tooltip">Falar com um agente</span>
    <svg height="682pt" viewBox="-23 -21 682 682.66669" width="682pt" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#fff" fill-rule="evenodd" d="m544.386719 93.007812c-59.875-59.945312-139.503907-92.9726558-224.335938-93.007812-174.804687 0-317.070312 142.261719-317.140625 317.113281-.023437 55.894531 14.578125 110.457031 42.332032 158.550781l-44.992188 164.335938 168.121094-44.101562c46.324218 25.269531 98.476562 38.585937 151.550781 38.601562h.132813c174.785156 0 317.066406-142.273438 317.132812-317.132812.035156-84.742188-32.921875-164.417969-92.800781-224.359376zm-224.335938 487.933594h-.109375c-47.296875-.019531-93.683594-12.730468-134.160156-36.742187l-9.621094-5.714844-99.765625 26.171875 26.628907-97.269531-6.269532-9.972657c-26.386718-41.96875-40.320312-90.476562-40.296875-140.28125.054688-145.332031 118.304688-263.570312 263.699219-263.570312 70.40625.023438 136.589844 27.476562 186.355469 77.300781s77.15625 116.050781 77.132812 186.484375c-.0625 145.34375-118.304687 263.59375-263.59375 263.59375zm144.585938-197.417968c-7.921875-3.96875-46.882813-23.132813-54.148438-25.78125-7.257812-2.644532-12.546875-3.960938-17.824219 3.96875-5.285156 7.929687-20.46875 25.78125-25.09375 31.066406-4.625 5.289062-9.242187 5.953125-17.167968 1.984375-7.925782-3.964844-33.457032-12.335938-63.726563-39.332031-23.554687-21.011719-39.457031-46.960938-44.082031-54.890626-4.617188-7.9375-.039062-11.8125 3.476562-16.171874 8.578126-10.652344 17.167969-21.820313 19.808594-27.105469 2.644532-5.289063 1.320313-9.917969-.664062-13.882813-1.976563-3.964844-17.824219-42.96875-24.425782-58.839844-6.4375-15.445312-12.964843-13.359374-17.832031-13.601562-4.617187-.230469-9.902343-.277344-15.1875-.277344-5.28125 0-13.867187 1.980469-21.132812 9.917969-7.261719 7.933594-27.730469 27.101563-27.730469 66.105469s28.394531 76.683594 32.355469 81.972656c3.960937 5.289062 55.878906 85.328125 135.367187 119.648438 18.90625 8.171874 33.664063 13.042968 45.175782 16.695312 18.984374 6.03125 36.253906 5.179688 49.910156 3.140625 15.226562-2.277344 46.878906-19.171875 53.488281-37.679687 6.601563-18.511719 6.601563-34.375 4.617187-37.683594-1.976562-3.304688-7.261718-5.285156-15.183593-9.253906zm0 0"/>
    </svg>
  `;

  document.body.appendChild(link);
}

/**
 * Carrossel de Pacotes em Destaque (SwiperJS).
 */
function initPacotesCarousel() {
  const el = document.getElementById('swiper-pacotes-destaque');
  if (!el || typeof Swiper === 'undefined') return;

  // As setas ficam em .carousel-nav (irmãs de .carousel, não descendentes —
  // ver nota em css/carousel.css), por isso são buscadas a partir do wrapper
  // externo, não com um seletor escopado dentro do próprio #swiper-pacotes-destaque.
  const nav = el.closest('.carousel-nav');

  new Swiper(el, {
    // Mobile: 1 card por vez, ocupando toda a largura, sem prévia do
    // próximo/anterior. Tablet e desktop mostram mais cards (breakpoints).
    slidesPerView: 1,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
    navigation: {
      nextEl: nav ? nav.querySelector('.swiper-button-next') : null,
      prevEl: nav ? nav.querySelector('.swiper-button-prev') : null,
    },
    keyboard: { enabled: true },
    a11y: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 24 },
      1000: { slidesPerView: 3, spaceBetween: 24 },
    },
  });
}

/**
 * Nav — abre/fecha o drawer mobile full-screen.
 * Cobrindo 100vw/100dvh por cima da navbar, o drawer já "some" com o
 * botão do WhatsApp da barra por trás — não precisa escondê-lo à parte.
 */
function initNavToggle() {
  document.querySelectorAll('.nav__toggle').forEach((toggle) => {
    const drawer = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!drawer) return;

    const overlay = drawer.parentElement.querySelector('[data-nav-overlay]');
    const closeBtn = drawer.querySelector('[data-nav-close]');

    const open = () => {
      toggle.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      document.body.classList.add('nav-drawer-open');
    };

    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      document.body.classList.remove('nav-drawer-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? close() : open();
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);

    drawer.querySelectorAll('.nav__drawer-link').forEach((link) => {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close();
    });
  });
}

/**
 * Hero — reveal de entrada (headline -> subheadline -> busca).
 * Anima apenas opacity/transform (GSAP), e respeita prefers-reduced-motion.
 */
function initHeroReveal() {
  const targets = document.querySelectorAll('.hero [data-reveal]');
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || typeof gsap === 'undefined') {
    targets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.set(targets, { y: 24 });
  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.15,
    delay: 0.2,
  });
}
