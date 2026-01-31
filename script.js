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
  en: "Computer Science Technician",
  es: "T.S. en Informatica"
};

// Typing Effect
let i = 0;
let typingInterval;

function type() {
  const text = typingTexts[currentLang];
  const typingElement = document.getElementById("typing");

  if (i < text.length) {
    typingElement.textContent += text[i];
    i++;
    setTimeout(type, 80);
  }
}

function restartTyping() {
  const typingElement = document.getElementById("typing");
  typingElement.textContent = "";
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

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Load saved language preference
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  if (savedLang !== 'en') {
    translatePage(savedLang);
  } else {
    type();
  }


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

// Image Gallery Functionality
const galleryData = {
  virtualization: [
    {
      src: 'https://via.placeholder.com/1200x800/0f172a/38bdf8?text=Dashboard+View',
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
      src: 'https://via.placeholder.com/1200x800/0f172a/38bdf8?text=Course+Management',
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
      src: 'https://via.placeholder.com/1200x800/0f172a/38bdf8?text=Student+Portal',
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
      src: 'https://via.placeholder.com/1200x800/0f172a/38bdf8?text=Chat+Interface',
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
      src: 'https://via.placeholder.com/1200x800/0f172a/38bdf8?text=Video+Call',
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
      src: 'https://via.placeholder.com/1200x800/0f172a/38bdf8?text=Streaming+Room',
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
  const thumbnailsContainer = document.getElementById('galleryThumbnails');
  thumbnailsContainer.innerHTML = '';

  const images = galleryData[currentProject];
  images.forEach((img, index) => {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.alt = img.title[currentLang];
    thumb.className = 'gallery-thumbnail';
    if (index === 0) thumb.classList.add('active');
    thumb.addEventListener('click', () => showImage(index));
    thumbnailsContainer.appendChild(thumb);
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
  document.getElementById('galleryTitle').textContent = imageData.title[currentLang];
  document.getElementById('galleryDescription').textContent = imageData.description[currentLang];

  // Update counter
  document.getElementById('galleryCounter').textContent = `${index + 1} / ${images.length}`;

  // Update thumbnails
  document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
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
