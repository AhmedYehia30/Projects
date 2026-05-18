/**
 * NEXUS CREATIVE - MAIN JAVASCRIPT
 * Fully responsive, interactive website functionality
 */

(function() {
    'use strict';

    // ==================== DOM ELEMENTS ====================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    
    // Portfolio elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioBtns = document.querySelectorAll('.portfolio-btn');
    
    // Modal elements
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClient = document.getElementById('modalClient');
    const modalYear = document.getElementById('modalYear');
    const modalServices = document.getElementById('modalServices');
    
    // Testimonial slider elements
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    // Contact form elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Stats elements
    const statNumbers = document.querySelectorAll('.stat-number');

    // ==================== PROJECT DATA ====================
    const projectData = {
        'modal-1': {
            image: 'assets/images/project-1.jpg',
            category: 'Branding',
            title: 'Aura Design',
            description: 'A complete brand identity overhaul for Aura Design, a luxury design studio. We created a sophisticated visual identity that reflects their commitment to elegance and innovation. The project included logo design, color palette, typography system, and comprehensive brand guidelines.',
            client: 'Aura Design Studio',
            year: '2025',
            services: 'Brand Strategy, Logo Design, Visual Identity'
        },
        'modal-2': {
            image: 'assets/images/project-2.jpg',
            category: 'Web Design',
            title: 'StyleHub',
            description: 'StyleHub is a modern e-commerce platform designed to provide a seamless shopping experience. We focused on creating an intuitive user interface, fast loading times, and a visually appealing design that converts visitors into customers.',
            client: 'StyleHub Inc.',
            year: '2025',
            services: 'UI/UX Design, Web Development, E-commerce'
        },
        'modal-3': {
            image: 'assets/images/project-3.jpg',
            category: 'App',
            title: 'FitLife',
            description: 'FitLife is a comprehensive health and fitness tracking application. We designed an intuitive interface that makes it easy for users to track their workouts, monitor progress, and achieve their fitness goals. The app features personalized dashboards and social sharing capabilities.',
            client: 'FitLife Technologies',
            year: '2024',
            services: 'Mobile App Design, UI/UX, Prototyping'
        },
        'modal-4': {
            image: 'assets/images/project-4.jpg',
            category: 'Branding',
            title: 'Botanica',
            description: 'Botanica is an eco-friendly skincare brand that needed packaging design reflecting their commitment to sustainability. We created a natural, earthy design using recycled materials and organic shapes that communicate their brand values effectively.',
            client: 'Botanica Organics',
            year: '2024',
            services: 'Packaging Design, Brand Identity, Print Design'
        }
    };

    // ==================== UTILITY FUNCTIONS ====================
    
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
     * Check if element is in viewport
     */
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    }

    /**
     * Animate number counting
     */
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        };
        
        updateNumber();
    }

    // ==================== HEADER & NAVIGATION ====================
    
    /**
     * Handle header scroll effect
     */
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    /**
     * Handle smooth scroll for navigation links
     */
    function handleNavClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            closeMobileMenu();
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to section
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Update active navigation link based on scroll position
     */
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }

    // ==================== PORTFOLIO FILTER ====================
    
    /**
     * Filter portfolio items
     */
    function filterPortfolio() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        
        // Filter items with animation
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // ==================== MODAL ====================
    
    /**
     * Open project modal
     */
    function openModal(e) {
        const modalId = this.getAttribute('data-modal');
        const data = projectData[modalId];
        
        if (data) {
            modalImage.src = data.image;
            modalImage.alt = data.title;
            modalCategory.textContent = data.category;
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalClient.textContent = data.client;
            modalYear.textContent = data.year;
            modalServices.textContent = data.services;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close modal
     */
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear image after transition
        setTimeout(() => {
            modalImage.src = '';
        }, 300);
    }

    /**
     * Handle modal click outside
     */
    function handleModalClick(e) {
        if (e.target === modal) {
            closeModal();
        }
    }

    // ==================== TESTIMONIAL SLIDER ====================
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;
    let autoSlideInterval;

    /**
     * Go to specific slide
     */
    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;
        
        testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        sliderDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
            dot.setAttribute('aria-selected', i === currentSlide);
        });
    }

    /**
     * Next slide
     */
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    /**
     * Previous slide
     */
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    /**
     * Start auto-slide
     */
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    /**
     * Stop auto-slide
     */
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // ==================== FORM VALIDATION & SUBMISSION ====================
    
    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show field error
     */
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        const formGroup = field.closest('.form-group');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
    }

    /**
     * Clear field error
     */
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        formGroup.classList.remove('error');
    }

    /**
     * Clear all form errors
     */
    function clearAllErrors() {
        ['firstName', 'lastName', 'email', 'subject', 'message'].forEach(clearFieldError);
    }

    /**
     * Validate contact form
     */
    function validateContactForm() {
        clearAllErrors();
        let isValid = true;
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        if (!firstName) {
            showFieldError('firstName', 'Please enter your first name');
            isValid = false;
        }
        
        if (!lastName) {
            showFieldError('lastName', 'Please enter your last name');
            isValid = false;
        }
        
        if (!email) {
            showFieldError('email', 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!subject) {
            showFieldError('subject', 'Please select a subject');
            isValid = false;
        }
        
        if (!message) {
            showFieldError('message', 'Please enter your message');
            isValid = false;
        } else if (message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }

    /**
     * Handle contact form submission
     */
    function handleContactSubmit(e) {
        e.preventDefault();
        
        if (!validateContactForm()) return;
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            formSuccess.classList.add('show');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        }, 1500);
    }

    /**
     * Handle newsletter form submission
     */
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        
        if (input.value && isValidEmail(input.value)) {
            // Show simple alert (in production, this would be a proper notification)
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        }
    }

    // ==================== SCROLL ANIMATIONS ====================
    
    /**
     * Animate elements on scroll
     */
    function animateOnScroll() {
        // Animate stat numbers
        statNumbers.forEach(stat => {
            if (isInViewport(stat, 100) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                const target = parseInt(stat.getAttribute('data-count'));
                animateNumber(stat, target);
            }
        });
        
        // Animate AOS elements
        document.querySelectorAll('[data-aos]').forEach(el => {
            if (isInViewport(el, 100)) {
                const delay = parseInt(el.getAttribute('data-aos-delay')) || 0;
                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, delay);
            }
        });
    }

    /**
     * Handle back to top button
     */
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    /**
     * Scroll to top
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ==================== KEYBOARD NAVIGATION ====================
    
    /**
     * Handle keyboard navigation
     */
    function handleKeyboard(e) {
        // Close modal on Escape
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
        
        // Close mobile menu on Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Slider navigation with arrow keys
        if (e.key === 'ArrowLeft') {
            prevSlide();
        }
        if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }

    // ==================== EVENT LISTENERS ====================
    
    function initEventListeners() {
        // Header scroll
        window.addEventListener('scroll', debounce(() => {
            handleHeaderScroll();
            updateActiveNavLink();
            animateOnScroll();
            handleBackToTop();
        }, 10));
        
        // Mobile menu
        menuToggle.addEventListener('click', toggleMobileMenu);
        
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });
        
        // Portfolio filter
        filterBtns.forEach(btn => {
            btn.addEventListener('click', filterPortfolio);
        });
        
        // Portfolio modal
        portfolioBtns.forEach(btn => {
            btn.addEventListener('click', openModal);
        });
        
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', handleModalClick);
        
        // Testimonial slider
        sliderPrev.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
        
        sliderNext.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
        
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(index);
                startAutoSlide();
            });
        });
        
        // Forms
        contactForm.addEventListener('submit', handleContactSubmit);
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        
        // Back to top
        backToTop.addEventListener('click', scrollToTop);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        
        // Pause slider on hover
        const slider = document.querySelector('.testimonials-slider');
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Touch swipe for testimonials
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                stopAutoSlide();
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoSlide();
            }
        }
    }

    // ==================== INITIALIZATION ====================
    
    function init() {
        // Set initial header state
        handleHeaderScroll();
        
        // Initialize animations
        animateOnScroll();
        
        // Start auto-slide
        startAutoSlide();
        
        // Initialize event listeners
        initEventListeners();
        
        // Log initialization
        console.log('%c Nexus Creative ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; padding: 8px 16px; border-radius: 8px; font-weight: bold;');
        console.log('%c Website initialized successfully! ', 'color: #6366f1; font-weight: 500;');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
