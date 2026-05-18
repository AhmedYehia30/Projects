/* ========================================
   AHMED YEHIA PORTFOLIO - SCRIPT.JS
   All animations and interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader();
    initCustomCursor();
    initScrollProgress();
    initBackToTop();
    initNavbar();
    initMobileMenu();
    initTextScramble();
    initTypewriter();
    initParticles();
    initScrollReveal();
    initActiveSection();
    initSkillBars();
    initTerminalTypewriter();
    initStatsCounter();
});

/* ========================================
   1. LOADING SCREEN
   ======================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.loader-progress');
    const percent = document.querySelector('.loader-percent');
    
    if (!loader || !progress || !percent) return;
    
    let current = 0;
    const target = 100;
    const increment = 2;
    const interval = 25;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 400);
        }
        
        progress.style.width = current + '%';
        percent.textContent = current + '%';
    }, interval);
    
    document.body.style.overflow = 'hidden';
}

/* ========================================
   2. CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    
    if (!cursor || !trail) return;
    
    // Check for touch device
    if (window.matchMedia('(hover: none)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = (mouseX - 10) + 'px';
        cursor.style.top = (mouseY - 10) + 'px';
    });
    
    // Trail follows with delay
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        
        trail.style.left = (trailX - 4) + 'px';
        trail.style.top = (trailY - 4) + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--neon-pink)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--neon-green)';
        });
    });
}

/* ========================================
   3. SCROLL PROGRESS BAR
   ======================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

/* ========================================
   4. BACK TO TOP BUTTON
   ======================================== */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========================================
   5. NAVBAR
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ========================================
   6. MOBILE MENU
   ======================================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!hamburger || !mobileMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ========================================
   7. TEXT SCRAMBLE EFFECT (Hero Title)
   ======================================== */
function initTextScramble() {
    const el = document.getElementById('scramble-title');
    if (!el) return;
    
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}--=+*^?#________';
            this.originalText = '<Ahmed Yehia />';
            this.update = this.update.bind(this);
        }
        
        start() {
            const length = this.originalText.length;
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const to = this.originalText[i];
                const start = Math.floor(Math.random() * 30);
                const end = start + Math.floor(Math.random() * 30);
                this.queue.push({ to, start, end, char: null });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span style="color: rgba(0, 255, 65, 0.4);">${char}</span>`;
                } else {
                    output += '<span style="opacity: 0;">_</span>';
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete !== this.queue.length) {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    const scrambler = new TextScramble(el);
    
    // Wait for loader to finish before starting scramble
    setTimeout(() => {
        scrambler.start();
    }, 3000); // Start after loader animation
}

/* ========================================
   8. TYPEWRITER EFFECT (Hero)
   ======================================== */
function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    
    const roles = [
        'App Developer',
        'Frontend Developer',
        'UI Enthusiast',
        'Problem Solver',
        'Code Craftsman'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            el.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            el.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start after loader
    setTimeout(type, 3500);
}

/* ========================================
   9. PARTICLE NETWORK CANVAS
   ======================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 70;
    let mouseX = -1000;
    let mouseY = -1000;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Track mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.size = Math.random() * 2 + 1;
            const colors = ['#00ff41', '#ff0055', '#00ccff'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Mouse attraction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 200) {
                const force = (200 - dist) / 200 * 0.02;
                this.vx += dx * force;
                this.vy += dy * force;
            }
            
            // Speed limit
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 2) {
                this.vx = (this.vx / speed) * 2;
                this.vy = (this.vy / speed) * 2;
            }
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 65, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            
            // Mouse connections
            const dx = mouseX - particles[i].x;
            const dy = mouseY - particles[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(0, 255, 65, ${0.3 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

/* ========================================
   10. SCROLL REVEAL
   ======================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add stagger delay for siblings
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = parent.querySelectorAll('.reveal');
                    const index = Array.from(siblings).indexOf(entry.target);
                    entry.target.style.transitionDelay = (index * 0.1) + 's';
                }
                
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/* ========================================
   11. ACTIVE SECTION HIGHLIGHTING
   ======================================== */
function initActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* ========================================
   12. SKILL PROGRESS BARS
   ======================================== */
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                // Small delay for visual effect
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
                barObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

/* ========================================
   13. TERMINAL TYPEWRITER (Contact)
   ======================================== */
function initTerminalTypewriter() {
    const terminal = document.getElementById('terminal-output');
    if (!terminal) return;
    
    const lines = [
        { html: '<span class="terminal-num">[1]</span> <span class="terminal-key">"Email"</span>    : <span class="terminal-string">"contact@ahmedyehia.dev"</span>' },
        { html: '<span class="terminal-num">[2]</span> <span class="terminal-key">"Phone"</span>    : <span class="terminal-string">"+20 1XX XXX XXXX"</span>' },
        { html: '<span class="terminal-num">[3]</span> <span class="terminal-key">"Location"</span> : <span class="terminal-string">"Tanta, Egypt"</span>' },
        { html: '<span class="terminal-num">[4]</span> <span class="terminal-key">"GitHub"</span>   : <span class="terminal-string">"github.com/ahmedyehia"</span>' },
        { html: '<span class="terminal-prompt">></span> <span class="terminal-green">Ready to collaborate!</span>' }
    ];
    
    let lineIndex = 0;
    let started = false;
    
    function typeLine() {
        if (lineIndex >= lines.length) return;
        
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        lineDiv.innerHTML = `<span class="terminal-prompt">></span> ${lines[lineIndex].html}`;
        
        // Remove last line (cursor)
        const lines_el = terminal.querySelectorAll('.terminal-line');
        terminal.appendChild(lineDiv);
        
        lineIndex++;
        
        if (lineIndex < lines.length) {
            setTimeout(typeLine, 600);
        }
    }
    
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                setTimeout(typeLine, 1000);
                terminalObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    terminalObserver.observe(terminal);
}

/* ========================================
   14. STATS COUNTER ANIMATION
   ======================================== */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);
                    
                    entry.target.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

/* ========================================
   15. CONTACT FORM HANDLING
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show a styled alert (you can replace with a toast)
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;
            
            btn.textContent = 'Message Sent!';
            btn.style.background = 'var(--neon-green)';
            btn.style.color = 'var(--bg-secondary)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
                contactForm.reset();
            }, 3000);
        });
    }
});

/* ========================================
   16. SMOOTH ANCHOR SCROLLING
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
