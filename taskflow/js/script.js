/**
 * TaskFlow - Modern SaaS Landing Page
 * JavaScript functionality for interactive features
 * 
 * Features:
 * - Mobile menu toggle
 * - Smooth scrolling navigation
 * - Navbar scroll effects
 * - Form validation
 * - Scroll animations
 * - Intersection Observer for reveal effects
 */

// ==================== DOM ELEMENTS ====================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

// ==================== MOBILE MENU ====================
/**
 * Toggle mobile menu open/closed state
 * Handles hamburger animation and menu visibility
 */
function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    
    // Update ARIA attributes for accessibility
    const isExpanded = mobileToggle.classList.contains('active');
    mobileToggle.setAttribute('aria-expanded', isExpanded);
}

/**
 * Close mobile menu
 * Used when clicking a link or outside the menu
 */
function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    mobileToggle.setAttribute('aria-expanded', 'false');
}

// Mobile toggle click event
mobileToggle.addEventListener('click', toggleMobileMenu);

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ==================== NAVBAR SCROLL EFFECTS ====================
/**
 * Add/remove scrolled class to navbar based on scroll position
 * Changes navbar appearance when user scrolls down
 */
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Throttled scroll event listener
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
        handleNavbarScroll();
        scrollTimeout = null;
    }, 16); // ~60fps
});

// ==================== SMOOTH SCROLLING ====================
/**
 * Smooth scroll to section when clicking navigation links
 * Adds offset for fixed navbar
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle internal anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== FORM VALIDATION ====================
/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for a form field
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorElement - Error message element
 * @param {string} message - Error message
 */
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
}

/**
 * Clear error message for a form field
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorElement - Error message element
 */
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
}

/**
 * Validate entire form
 * @returns {boolean} - Whether form is valid
 */
function validateForm() {
    let isValid = true;
    
    // Get form fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Get error elements
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Validate first name
    if (firstName.value.trim() === '') {
        showError(firstName, firstNameError, 'First name is required');
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        showError(firstName, firstNameError, 'First name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(firstName, firstNameError);
    }
    
    // Validate last name
    if (lastName.value.trim() === '') {
        showError(lastName, lastNameError, 'Last name is required');
        isValid = false;
    } else if (lastName.value.trim().length < 2) {
        showError(lastName, lastNameError, 'Last name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(lastName, lastNameError);
    }
    
    // Validate email
    if (email.value.trim() === '') {
        showError(email, emailError, 'Email address is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, emailError, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email, emailError);
    }
    
    // Validate message
    if (message.value.trim() === '') {
        showError(message, messageError, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, messageError, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError(message, messageError);
    }
    
    return isValid;
}

/**
 * Handle form submission
 * Simulates API call with loading state
 */
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        document.getElementById('formSuccess').classList.add('visible');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('formSuccess').classList.remove('visible');
        }, 5000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('Something went wrong. Please try again later.');
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Real-time validation on input
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateForm();
    });
    
    input.addEventListener('input', () => {
        const errorElement = document.getElementById(input.id + 'Error');
        if (errorElement && errorElement.classList.contains('visible')) {
            validateForm();
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================
/**
 * Intersection Observer for reveal animations
 * Elements fade in and slide up when they enter the viewport
 */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for reveal animation
const revealElements = document.querySelectorAll(
    '.feature-card, .pricing-card, .testimonial-card, .about-content, .about-image'
);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Add revealed class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ==================== STATS COUNTER ANIMATION ====================
/**
 * Animate numbers counting up when they come into view
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    };
    
    updateCounter();
}

// Observe stat numbers for counter animation
const statNumbers = document.querySelectorAll('.about-stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent.replace(/[^0-9]/g, ''));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

// ==================== PARALLAX EFFECT ====================
/**
 * Subtle parallax effect for hero section
 * Moves background elements at different speeds
 */
function handleParallax() {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.3;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Only apply parallax on non-touch devices
if (!window.matchMedia('(pointer: coarse)').matches) {
    window.addEventListener('scroll', () => {
        requestAnimationFrame(handleParallax);
    });
}

// ==================== ACTIVE NAV LINK ====================
/**
 * Highlight active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==================== BUTTON RIPPLE EFFECT ====================
/**
 * Add ripple effect to buttons on click
 * Creates a material design-style ripple
 */
function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// ==================== LAZY LOADING IMAGES ====================
/**
 * Lazy load images using Intersection Observer
 * Improves page performance
 */
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ==================== CONSOLE GREETING ====================
console.log('%c🚀 TaskFlow', 'font-size: 24px; font-weight: bold; color: #6366F1;');
console.log('%cBuilt with ❤️ for productive teams', 'font-size: 14px; color: #6B7280;');
console.log('%cReady to streamline your workflow?', 'font-size: 12px; color: #8B5CF6;');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initial navbar state check
    handleNavbarScroll();
    
    // Initial active link check
    updateActiveNavLink();
    
    console.log('TaskFlow initialized successfully! ✅');
});
