// AOS Initialization
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-in-out-cubic'
});

// Language Management
let currentLang = 'en'; // Default language is English

const typingTexts = {
  en: "Full-Stack Developer",
  es: "Desarrollador Full-Stack"
};

// Typing Effect
let i = 0;
let typingInterval;

function type() {
  const text = typingTexts[currentLang];
  const typingElement = document.getElementById("typing");

  if (i < text.length) {
    typingElement.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
    i++;
    setTimeout(type, 80);
  }
}

function restartTyping() {
  const typingElement = document.getElementById("typing");
  typingElement.innerHTML = '<span class="typing-cursor">|</span>';
  i = 0;
  type();
}

// Translation Function
function translatePage(lang) {
  currentLang = lang;

  // Update all elements with data-en and data-es attributes
  document.querySelectorAll('[data-en][data-es]').forEach(element => {
    const translation = element.getAttribute(`data-${lang}`);

    if (element.tagName === 'H1') {
      // Special handling for h1 with span
      element.innerHTML = translation;
    } else if (element.classList.contains('toggle-desc')) {
      const toggleText = element.querySelector('.toggle-text');
      if (toggleText) {
        toggleText.textContent = translation;
      }
    } else {
      element.textContent = translation;
    }
  });

  // Update language toggle button text
  const langText = document.querySelector('.lang-text');
  if (langText) {
    langText.textContent = lang === 'en' ? 'ES' : 'EN';
  }

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Restart typing animation
  restartTyping();

  // Save preference to localStorage
  localStorage.setItem('preferredLanguage', lang);
}

// Menu Toggle
function initMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', function () {
    this.classList.toggle('active');
    mainNav.classList.toggle('open');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Load saved language preference
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  if (savedLang !== 'en') {
    translatePage(savedLang);
  } else {
    type();
  }

  // Initialize menu toggle
  initMenuToggle();

  // Initialize header scroll
  initHeaderScroll();

  // Language toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      const newLang = currentLang === 'en' ? 'es' : 'en';
      translatePage(newLang);
    });
  }

  // Toggle project description
  const toggleButtons = document.querySelectorAll('.toggle-desc');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      const projectCard = this.closest('.project-card');
      const description = projectCard.querySelector('.project-desc');
      const toggleText = this.querySelector('.toggle-text');

      description.classList.toggle('collapsed');
      this.classList.toggle('expanded');

      // Update button text based on state and language
      if (description.classList.contains('collapsed')) {
        toggleText.textContent = currentLang === 'en' ? 'Read more' : 'Leer más';
      } else {
        toggleText.textContent = currentLang === 'en' ? 'Read less' : 'Leer menos';
      }
    });
  });

  if (typeof initThemeToggle === 'function') {
    initThemeToggle();
  }


  // GSAP Hero Animations
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline();

    tl.from(".hero-badge", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    })
      .from(".hero-content h1", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3")
      .from(".hero-content h2", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(".cta a", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.3")
      .from(".hero-socials a", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.2")
      .from(".profile", {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "back.out(1.7)"
      }, "-=0.8")
      .from(".scroll-indicator", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3");

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Particles.js (only on desktop, only if container exists)
  const isMobile = window.innerWidth < 768;
  if (!isMobile && document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
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

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.open(`mailto:javier.xcn18@gmail.com?subject=${subject}&body=${body}`, '_blank');

      this.reset();
    });
  }
});

// SVG Placeholder Generator
function createPlaceholderSVG(icon, title, color = '#38bdf8') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f172a"/>
        <stop offset="50%" style="stop-color:#1e293b"/>
        <stop offset="100%" style="stop-color:#0f172a"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.3"/>
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.1"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="1200" height="800" fill="url(#bg)"/>
    <rect x="50" y="50" width="1100" height="700" rx="16" fill="none" stroke="url(#accent)" stroke-width="2"/>
    <circle cx="600" cy="340" r="80" fill="none" stroke="${color}" stroke-width="2" opacity="0.4" filter="url(#glow)"/>
    ${icon}
    <text x="600" y="480" text-anchor="middle" fill="${color}" font-family="Inter, sans-serif" font-size="28" font-weight="600" opacity="0.8">${title}</text>
    <text x="600" y="520" text-anchor="middle" fill="#64748b" font-family="Inter, sans-serif" font-size="16">Screenshot Preview</text>
    <line x1="400" y1="560" x2="800" y2="560" stroke="${color}" stroke-width="1" opacity="0.2"/>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const dashboardIcon = `<path d="M560 300 L640 300 L640 380 L560 380 Z" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
  <path d="M520 340 L560 300" stroke="#38bdf8" stroke-width="2" opacity="0.4"/>
  <path d="M640 300 L680 340" stroke="#38bdf8" stroke-width="2" opacity="0.4"/>
  <rect x="530" y="310" width="40" height="25" rx="3" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.5"/>
  <rect x="580" y="320" width="50" height="15" rx="3" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.5"/>`;

const courseIcon = `<rect x="555" y="290" width="90" height="70" rx="6" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
  <line x1="555" y1="310" x2="645" y2="310" stroke="#38bdf8" stroke-width="1.5" opacity="0.4"/>
  <rect x="565" y="320" width="30" height="6" rx="2" fill="#38bdf8" opacity="0.3"/>
  <rect x="565" y="332" width="50" height="6" rx="2" fill="#38bdf8" opacity="0.2"/>
  <rect x="565" y="344" width="40" height="6" rx="2" fill="#38bdf8" opacity="0.15"/>`;

const studentIcon = `<circle cx="600" cy="310" r="25" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
  <path d="M560 370 Q600 340 640 370" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.4"/>
  <circle cx="600" cy="310" r="12" fill="#38bdf8" opacity="0.2"/>`;

const chatIcon = `<rect x="545" y="290" width="110" height="75" rx="12" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
  <path d="M570 370 L555 395 L585 370" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.4"/>
  <circle cx="575" cy="325" r="5" fill="#38bdf8" opacity="0.5"/>
  <circle cx="600" cy="325" r="5" fill="#38bdf8" opacity="0.4"/>
  <circle cx="625" cy="325" r="5" fill="#38bdf8" opacity="0.3"/>`;

const videoIcon = `<rect x="550" y="290" width="100" height="70" rx="8" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
  <polygon points="590,310 590,345 620,327" fill="#38bdf8" opacity="0.5"/>
  <circle cx="600" cy="325" r="35" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.3" stroke-dasharray="4 4"/>`;

const streamIcon = `<rect x="540" y="290" width="120" height="75" rx="8" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
  <circle cx="565" cy="350" r="8" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.7"/>
  <circle cx="565" cy="350" r="4" fill="#ef4444" opacity="0.5"/>
  <rect x="585" y="340" width="60" height="4" rx="2" fill="#38bdf8" opacity="0.3"/>
  <rect x="585" y="350" width="40" height="4" rx="2" fill="#38bdf8" opacity="0.2"/>`;

// Image Gallery Functionality
const galleryData = {
  virtualization: [
    {
      src: createPlaceholderSVG(dashboardIcon, 'Main Dashboard'),
      title: {
        en: 'Main Dashboard',
        es: 'Panel Principal'
      },
      description: {
        en: 'Overview of the learning platform with course statistics and recent activity',
        es: 'Vista general de la plataforma de aprendizaje con estadísticas de cursos y actividad reciente'
      }
    },
    {
      src: createPlaceholderSVG(courseIcon, 'Course Management'),
      title: {
        en: 'Course Management',
        es: 'Gestión de Cursos'
      },
      description: {
        en: 'Interface for creating and managing educational courses with materials and assignments',
        es: 'Interfaz para crear y gestionar cursos educativos con materiales y tareas'
      }
    },
    {
      src: createPlaceholderSVG(studentIcon, 'Student Portal'),
      title: {
        en: 'Student Portal',
        es: 'Portal de Estudiantes'
      },
      description: {
        en: 'Student view with enrolled courses, assignments, and progress tracking',
        es: 'Vista del estudiante con cursos inscritos, tareas y seguimiento de progreso'
      }
    }
  ],
  streaming: [
    {
      src: createPlaceholderSVG(chatIcon, 'Chat Interface'),
      title: {
        en: 'Chat Interface',
        es: 'Interfaz de Chat'
      },
      description: {
        en: 'Real-time messaging interface with private and group chat support',
        es: 'Interfaz de mensajería en tiempo real con soporte para chat privado y grupal'
      }
    },
    {
      src: createPlaceholderSVG(videoIcon, 'Video Call'),
      title: {
        en: 'Video Call',
        es: 'Videollamada'
      },
      description: {
        en: 'WebRTC-powered video calling with screen sharing capabilities',
        es: 'Videollamada con WebRTC y capacidades de compartir pantalla'
      }
    },
    {
      src: createPlaceholderSVG(streamIcon, 'Streaming Room'),
      title: {
        en: 'Streaming Room',
        es: 'Sala de Streaming'
      },
      description: {
        en: 'Live streaming interface with real-time viewer interaction',
        es: 'Interfaz de transmisión en vivo con interacción de espectadores en tiempo real'
      }
    }
  ]
};

let currentProject = '';
let currentImageIndex = 0;

function openGallery(projectName) {
  currentProject = projectName;
  currentImageIndex = 0;

  const modal = document.getElementById('galleryModal');
  modal.classList.add('active');
  modal.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  loadGalleryImages();
  showImage(0);
}

function closeGallery() {
  const modal = document.getElementById('galleryModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function loadGalleryImages() {
  const dotsContainer = document.getElementById('galleryDots');
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';

  const images = galleryData[currentProject];
  images.forEach((img, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'gallery-dot';
    dot.setAttribute('aria-label', `${index + 1}: ${img.title[currentLang]}`);
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showImage(index));
    dotsContainer.appendChild(dot);
  });
}

function showImage(index) {
  const images = galleryData[currentProject];
  if (!images || index < 0 || index >= images.length) return;

  currentImageIndex = index;
  const imageData = images[index];

  // Update image
  document.getElementById('galleryImage').src = imageData.src;

  // Update caption
  document.getElementById('projectTitle').textContent = imageData.title[currentLang];
  document.getElementById('galleryDescription').textContent = imageData.description[currentLang];

  // Update counter
  document.getElementById('galleryCounter').textContent = `${index + 1} / ${images.length}`;

  // Update thumbnails
  document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  // Update navigation buttons
  document.querySelector('.gallery-prev').disabled = index === 0;
  document.querySelector('.gallery-next').disabled = index === images.length - 1;
}

function nextImage() {
  const images = galleryData[currentProject];
  if (currentImageIndex < images.length - 1) {
    showImage(currentImageIndex + 1);
  }
}

function prevImage() {
  if (currentImageIndex > 0) {
    showImage(currentImageIndex - 1);
  }
}

// Gallery Event Listeners
document.addEventListener('DOMContentLoaded', function () {
  // Open gallery buttons
  document.querySelectorAll('.open-gallery').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const projectName = this.getAttribute('data-project');
      openGallery(projectName);
    });
  });

  // Close button
  document.querySelector('.gallery-close')?.addEventListener('click', closeGallery);

  // Navigation buttons
  document.querySelector('.gallery-prev')?.addEventListener('click', prevImage);
  document.querySelector('.gallery-next')?.addEventListener('click', nextImage);

  // Close on background click
  document.getElementById('galleryModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
      closeGallery();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    const modal = document.getElementById('galleryModal');
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeGallery();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  });
});
