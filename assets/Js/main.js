/**
 * Main JavaScript - Component Library
 * Añadidas funcionalidades dinámicas: Filtrado de Portafolio y Scroll Animations
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // 1. MENÚ HAMBURGUESA (MÓVIL)
  // ========================================
  
  const headerToggle = document.querySelector('.header__toggle');
  const headerNav = document.querySelector('.header__nav');
  
  if (headerToggle && headerNav) {
    headerToggle.addEventListener('click', function() {
      const isExpanded = headerToggle.getAttribute('aria-expanded') === 'true';
      headerToggle.setAttribute('aria-expanded', !isExpanded);
      headerNav.classList.toggle('header__nav--open');
    });
  }
  
  // ========================================
  // 2. EFECTO DE SCROLL EN HEADER
  // ========================================
  
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    });
  }
  
  // ========================================
  // 3. SMOOTH SCROLL PARA LINKS
  // ========================================
  
  const navLinks = document.querySelectorAll('.header__link');
  
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          if (headerToggle && headerNav) {
            headerToggle.setAttribute('aria-expanded', 'false');
            headerNav.classList.remove('header__nav--open');
          }
        }
      }
    });
  });
  
  // ========================================
  // 4. CERRAR MENÚ AL HACER CLICK FUERA
  // ========================================
  
  document.addEventListener('click', function(e) {
    if (headerToggle && headerNav && header) {
      const isClickInside = header.contains(e.target);
      
      if (!isClickInside && headerNav.classList.contains('header__nav--open')) {
        headerToggle.setAttribute('aria-expanded', 'false');
        headerNav.classList.remove('header__nav--open');
      }
    }
  });

  // ========================================
  // 5. FILTRO DINÁMICO PORTAFOLIO
  // ========================================

  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterButtons.length > 0 && portfolioCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remover activo de todos y ponerlo al actual
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // Animar las tarjetas usando opacidad/escala
        portfolioCards.forEach(card => {
          // Fase 1: Animar desaparición (scale out)
          card.classList.add('animating');
          
          setTimeout(() => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
              card.setAttribute('data-hidden', 'false');
            } else {
              card.setAttribute('data-hidden', 'true');
            }
            
            // Fase 2: Forzar repintado (reflow) y animar aparición (scale in)
            void card.offsetWidth; 
            card.classList.remove('animating');
          }, 300); // 300ms debe hacer match con aprox portafolio.css transitons
        });
      });
    });
  }

  // ========================================
  // 6. SCROLL ANIMATIONS (Intersection Observer)
  // ========================================

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Opcional: Desobservar una vez que entra para que no vuelva a animarse si se sube el scroll
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(element => {
    observer.observe(element);
  });

  // ========================================
  // 7. EFECTO 3D TILT PARA TARJETAS
  // ========================================
  const tiltElements = document.querySelectorAll('[data-tilt]');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const multiplier = el.hasAttribute('data-tilt-reverse') ? -1 : 1;
      const xPos = ((x / rect.width) - 0.5) * 20 * multiplier;
      const yPos = ((y / rect.height) - 0.5) * -20 * multiplier;
      
      el.style.transform = `perspective(1000px) rotateX(${yPos}deg) rotateY(${xPos}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // ========================================
  // 8. BOTONES MAGNÉTICOS
  // ========================================
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = btn.getAttribute('data-strength') || 20;
      
      btn.style.transform = `translate(${x / rect.width * strength}px, ${y / rect.height * strength}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // ========================================
  // 9. CONTADORES ANIMADOS (SOCIAL PROOF)
  // ========================================
  const counters = document.querySelectorAll('.metric-number');
  let hasAnimatedCounters = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimatedCounters && counters.length > 0) {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target') || 0;
          const duration = 2000; 
          const increment = target / (duration / 16); 
          
          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
            }
          };
          updateCounter();
        });
        hasAnimatedCounters = true;
      }
    });
  }, { threshold: 0.5 });

  const metricsSection = document.querySelector('.social-proof-section');
  if (metricsSection) {
    counterObserver.observe(metricsSection);
  }

  // ========================================
  // 10. REEL SOUND TOGGLE
  // ========================================
  const videoReel = document.getElementById('pirate-reel');
  const soundToggle = document.getElementById('reel-sound-toggle');
  
  if (videoReel && soundToggle) {
    const iconMuted = document.getElementById('icon-muted');
    const iconUnmuted = document.getElementById('icon-unmuted');
    
    soundToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (videoReel.muted) {
        videoReel.muted = false;
        iconMuted.style.display = 'none';
        iconUnmuted.style.display = 'block';
        soundToggle.style.background = 'rgba(99, 102, 241, 0.8)';
        soundToggle.style.borderColor = 'rgba(99, 102, 241, 1)';
      } else {
        videoReel.muted = true;
        iconMuted.style.display = 'block';
        iconUnmuted.style.display = 'none';
        soundToggle.style.background = 'rgba(0,0,0,0.6)';
        soundToggle.style.borderColor = 'rgba(255,255,255,0.2)';
      }
    });
  }

  const srvVideo = document.getElementById('comercial-servicios-video');
  const srvSoundToggle = document.getElementById('services-sound-toggle');
  
  if (srvVideo && srvSoundToggle) {
    const iconMutedSrv = document.getElementById('services-icon-muted');
    const iconUnmutedSrv = document.getElementById('services-icon-unmuted');
    
    srvSoundToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (srvVideo.muted) {
        srvVideo.muted = false;
        iconMutedSrv.style.display = 'none';
        iconUnmutedSrv.style.display = 'block';
        srvSoundToggle.style.background = 'rgba(99, 102, 241, 0.8)';
        srvSoundToggle.style.borderColor = 'rgba(99, 102, 241, 1)';
      } else {
        srvVideo.muted = true;
        iconMutedSrv.style.display = 'block';
        iconUnmutedSrv.style.display = 'none';
        srvSoundToggle.style.background = 'rgba(0,0,0,0.6)';
        srvSoundToggle.style.borderColor = 'rgba(255,255,255,0.2)';
      }
    });
  }

  // ========================================
  // 11. FOOTER GOD-TIER (WIDGETS Y LÓGICA)
  // ========================================
  
  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Copy Email Button
  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email');
      const textSpan = document.getElementById('copy-email-text');
      try {
        await navigator.clipboard.writeText(email);
        textSpan.innerText = '¡Copiado!';
        copyEmailBtn.classList.add('copied');
        
        setTimeout(() => {
          textSpan.innerText = email;
          copyEmailBtn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  }

  // Dynamic Live Time Widget (Bogotá GMT-5)
  const timeWidget = document.getElementById('fw-time');
  if (timeWidget) {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'America/Bogota', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      timeWidget.innerText = formatter.format(now);
    };
    updateTime(); // initial runtime
    setInterval(updateTime, 10000); // refresh every 10 seconds
  }

  // ========================================
  // 12. PERFORMANCE: LAZY LOAD VIDEOS
  // ========================================
  // Intersectamos los reproductores grandes de WebM/MP4 a medida que el cliente hace scroll
  // para no saturar el LCP y garantizar 100/100 en Google Lighthouse.
  const lazyVideos = document.querySelectorAll('.lazy-video');
  if (lazyVideos.length > 0) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // Ejecutar video 200px antes de que entre a pantalla
        if (entry.isIntersecting) {
          const video = entry.target;
          video.play().catch(e => console.warn("Autoplay prevent detectado:", e));
          observer.unobserve(video);
        }
      });
    }, { rootMargin: '200px' });
    
    lazyVideos.forEach(v => videoObserver.observe(v));
  }

});