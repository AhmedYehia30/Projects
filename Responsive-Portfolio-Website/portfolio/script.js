/**
 * ============================================
 * PORTFOLIO WEBSITE - JAVASCRIPT
 * Interactivity, Animations, and Functionality
 * ============================================
 */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initContactForm();
    initScrollToTop();
    initActiveNavLink();
    initCurrentYear();
});

// ============================================
// NAVBAR SCROLL EFFECT
// Adds background and shadow when scrolling
// ============================================
function initNavbar() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction (optional)
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// MOBILE MENU TOGGLE
// Handles mobile navigation menu open/close
// ============================================
function initMobileMenu() {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// Smooth scroll to sections when clicking nav links
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// Animate elements when they come into view
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.dataset.aosDelay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// SKILL BARS ANIMATION
// Animate skill progress bars when in view
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// COUNTER ANIMATION
// Animate number counters when in view
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ============================================
// CONTACT FORM VALIDATION
// Validate and handle form submission
// ============================================
function initContactForm() {
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            showFormStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
            contactForm.reset();
        } else {
            showFormStatus('error', 'Please fix the errors above and try again.');
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(field);
    
    // Validation rules
    switch (fieldName) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'subject':
            if (!value) {
                isValid = false;
                errorMessage = 'Subject is required';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function validateForm() {
    const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showFormStatus(type, message) {
    const statusElement = document.getElementById('formStatus');
    statusElement.className = 'form-status ' + type;
    statusElement.textContent = message;
    
    // Hide status after 5 seconds
    setTimeout(() => {
        statusElement.className = 'form-status';
        statusElement.textContent = '';
    }, 5000);
}

// ============================================
// SCROLL TO TOP BUTTON
// Show/hide button and handle click
// ============================================
function initScrollToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// Highlight current section in navigation
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// CURRENT YEAR
// Update copyright year automatically
// ============================================
function initCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit how often a function can fire
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit execution rate
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Use passive event listeners for scroll events
window.addEventListener('scroll', () => {}, { passive: true });

// Preload critical resources
const preloadLinks = document.querySelectorAll('link[rel="preload"]');
preloadLinks.forEach(link => {
    const preloadLink = document.createElement('link');
    preloadLink.href = link.href;
    preloadLink.rel = 'preload';
    preloadLink.as = link.as;
    document.head.appendChild(preloadLink);
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c👋 Welcome to Alex Morgan\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cFeel free to explore the code and get in touch!', 'font-size: 14px; color: #a1a1aa;');
