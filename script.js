// AOS Initialization
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-in-out-cubic'
});

// Typing Effect
const text = "T.S. en Informatica";
let i = 0;
function type() {
  if (i < text.length) {
    document.getElementById("typing").textContent += text[i];
    i++;
    setTimeout(type, 80);
  }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  type();
  initThemeToggle();
  
  // GSAP Hero Animations
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline();
    
    tl.from(".hero-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    })
    .from(".profile", {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: "back.out(1.7)"
    }, "-=0.5");
    
    // Header animation on scroll
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      }
      
      lastScroll = currentScroll;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Particles.js (only if container exists)
  if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
      particles: {
        number: { 
          value: 60,
          density: {
            enable: true,
            value_area: 800
          }
        },
        size: { 
          value: 3,
          random: true
        },
        color: { 
          value: "#38bdf8" 
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: true
        },
        line_linked: { 
          enable: true, 
          distance: 150,
          color: "#38bdf8",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        }
      },
      retina_detect: true
    });
  }
});
  