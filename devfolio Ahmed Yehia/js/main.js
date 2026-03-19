
const typedElement = document.getElementById('typed');
const words = ['React Developer', 'Front-End Developer', 'Web Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typedElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typingSpeed = 2000; 
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 500; 
  }
  
  setTimeout(type, typingSpeed);
}

document.addEventListener('DOMContentLoaded', type);


const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});


document.querySelectorAll('.scrollto').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});


const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const navbarUl = document.getElementById('navbar-ul');

mobileNavToggle.addEventListener('click', () => {
  navbarUl.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navbarUl.classList.remove('active');
  });
});


const progressBars = document.querySelectorAll('.progress-bar');
let progressAnimated = false;

function animateProgressBars() {
  if (progressAnimated) return;
  
  const aboutSection = document.getElementById('about');
  const rect = aboutSection.getBoundingClientRect();
  
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    progressAnimated = true;
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 200);
    });
  }
}

window.addEventListener('scroll', animateProgressBars);
document.addEventListener('DOMContentLoaded', animateProgressBars);


const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  
  const counterSection = document.querySelector('.section-counter');
  const rect = counterSection.getBoundingClientRect();
  
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    countersAnimated = true;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }
}

window.addEventListener('scroll', animateCounters);


const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
});

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  contactForm.reset();
});
