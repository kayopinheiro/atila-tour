// =========================================================
// ÁTILA TOUR — JS principal (compartilhado entre páginas)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initHeroReveal();
  initWhatsAppFloat();
  initPacotesCarousel();
  initDepoimentosCarousel();
  initStickyHeader();
  initImageFallback();
  initScrollReveal();
  initTestimonialsReveal();
  initStatsCountUp();
});

/**
 * Fallback global de imagem — evita o ícone de imagem quebrada quando um
 * asset ainda não existe (fotos de destino/blog/pacote a serem adicionadas
 * depois, ex: vindas do Sanity sem campo de imagem preenchido) ou quando
 * o asset existe mas falha ao carregar. Troca o src pelo placeholder no
 * tamanho real do elemento, usando as cores do design system e o alt
 * como texto.
 */
function initImageFallback() {
  // Caso 1: <img> já nasce sem src (ex: campo de imagem vazio vindo do CMS).
  // Sem src não há requisição de rede, então o evento 'error' nunca dispara
  // — precisa ser tratado à parte, na varredura inicial.
  document.querySelectorAll('img').forEach((img) => {
    if (!img.getAttribute('src')) applyImagePlaceholder(img);
  });

  // Caso 2: <img> tem src mas o carregamento falha (asset apagado, path
  // errado, etc). Escutado em capture porque 'error' de <img> não faz bubble.
  document.addEventListener(
    'error',
    (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement) || img.dataset.fallbackApplied) return;
      applyImagePlaceholder(img);
    },
    true
  );
}

/**
 * Aponta pro ícone genérico local (assets/placeholder.svg) em vez de pedir
 * pra um serviço externo (placehold.co) — se a imagem original falhou por
 * causa da rede (offline, firewall, ad-blocker), um fallback que também
 * depende de rede externa falha do mesmo jeito. Asset local nunca falha.
 */
function applyImagePlaceholder(img) {
  img.dataset.fallbackApplied = 'true';
  img.src = 'assets/placeholder.svg';
}

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
 * Carrossel de Depoimentos (SwiperJS) — Testimonials Slider. Mobile: 1
 * card. Tablet: 1,5 card (mostra a borda do próximo, convida a
 * arrastar). Desktop: 2 cards. Mesma config usada no style guide
 * (id #swiper-depoimentos-sg), pra manter o componente idêntico nas
 * duas páginas.
 */
function initDepoimentosCarousel() {
  const el = document.getElementById('swiper-depoimentos');
  if (!el || typeof Swiper === 'undefined') return;

  const nav = el.closest('.carousel-nav');

  new Swiper(el, {
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
      delay: 5500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      700: { slidesPerView: 1.5, spaceBetween: 24 },
      1080: { slidesPerView: 2, spaceBetween: 32 },
    },
  });
}

/**
 * Reveal sequenciado da seção Depoimentos (GSAP): cabeçalho, depois os
 * cards do slider em stagger, depois a faixa de estatísticas, e o CTA
 * final por último. Usa marcador próprio (data-testimonials-reveal),
 * separado de [data-reveal]/initScrollReveal, porque aqui a entrada é
 * uma sequência orquestrada por seção, não um fade independente por
 * elemento.
 */
function initTestimonialsReveal() {
  const section = document.querySelector('.testimonials');
  if (!section) return;

  const header = section.querySelector('[data-testimonials-reveal="header"]');
  const slider = section.querySelector('[data-testimonials-reveal="slider"]');
  const cards = section.querySelectorAll('.testimonial-card');
  const stats = section.querySelector('[data-testimonials-reveal="stats"]');
  const cta = section.querySelector('[data-testimonials-reveal="cta"]');
  const targets = [header, slider, stats, cta].filter(Boolean);
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || typeof gsap === 'undefined') {
    [...targets, ...cards].forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.set([header, slider, stats, cta].filter(Boolean), { opacity: 0, y: 28 });
  gsap.set(cards, { opacity: 0, y: 24, scale: 0.96 });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });
        if (header) tl.to(header, { opacity: 1, y: 0 });
        if (slider) tl.to(slider, { opacity: 1, y: 0 }, '-=0.4');
        if (cards.length) tl.to(cards, { opacity: 1, y: 0, scale: 1, stagger: 0.15 }, '-=0.5');
        if (stats) tl.to(stats, { opacity: 1, y: 0 }, '-=0.2');
        if (cta) tl.to(cta, { opacity: 1, y: 0 }, '-=0.1');
        observer.unobserve(section);
      });
    },
    { threshold: 0.12 }
  );

  observer.observe(section);
}

/**
 * Count-up das estatísticas da seção Depoimentos. Dispara quando a
 * faixa entra na viewport (mesmo IntersectionObserver one-shot dos
 * outros reveals). Formata em pt-BR (milhar com ponto, decimal com
 * vírgula) e reaplica o sufixo (data-suffix) a cada frame porque o
 * tween substitui o textContent inteiro.
 */
function initStatsCountUp() {
  const stats = document.querySelector('.testimonials__stats');
  if (!stats) return;

  const values = [...stats.querySelectorAll('[data-count-to]')];
  if (!values.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setFinal = () => {
    values.forEach((el) => {
      const target = parseFloat(el.dataset.countTo);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || '';
      el.textContent = target.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;
    });
  };

  if (prefersReducedMotion || typeof gsap === 'undefined') {
    setFinal();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        values.forEach((el) => {
          const target = parseFloat(el.dataset.countTo);
          const decimals = Number(el.dataset.decimals || 0);
          const suffix = el.dataset.suffix || '';
          const proxy = { value: 0 };
          gsap.to(proxy, {
            value: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = proxy.value.toLocaleString('pt-BR', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              }) + suffix;
            },
          });
        });
        observer.unobserve(stats);
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(stats);
}

/**
 * Scroll reveal (GSAP) para seções fora do Hero — usa IntersectionObserver
 * porque o plugin ScrollTrigger do GSAP não está carregado no projeto.
 * Suporta as variantes documentadas no guia: data-reveal (fade + translateY),
 * "left", "right", "scale". O Hero é revelado à parte (initHeroReveal),
 * de forma imediata, por já estar acima da dobra no load.
 */
function initScrollReveal() {
  const targets = [...document.querySelectorAll('[data-reveal]')].filter((el) => !el.closest('.hero'));
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || typeof gsap === 'undefined') {
    targets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const FROM_BY_DIRECTION = {
    left: { x: -32 },
    right: { x: 32 },
    scale: { scale: 0.92 },
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const from = FROM_BY_DIRECTION[el.dataset.reveal] || { y: 24 };

      gsap.fromTo(
        el,
        { opacity: 0, ...from },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
      observer.unobserve(el);
    });
  }, { threshold: 0.2 });

  targets.forEach((el) => observer.observe(el));
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
