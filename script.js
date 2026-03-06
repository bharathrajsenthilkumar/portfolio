// ===========================
// Navigation Functionality
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ===========================
    // Intersection Observer for Animations
    // ===========================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Observe about card
    const aboutCard = document.querySelector('.about-card');
    if (aboutCard) {
        aboutCard.style.opacity = '0';
        aboutCard.style.transform = 'translateX(30px)';
        aboutCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        scrollObserver.observe(aboutCard);
    }

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        scrollObserver.observe(item);
    });

    // Observe contact cards
    document.querySelectorAll('.contact-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Add visible state styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-visible {
            opacity: 1 !important;
            transform: translate(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===========================
    // Skill Level Animation
    // ===========================

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const levelBar = entry.target.querySelector('.level-bar');
                if (levelBar) {
                    const level = getComputedStyle(levelBar).getPropertyValue('--level');
                    levelBar.style.width = '0';
                    setTimeout(() => {
                        levelBar.style.width = level;
                    }, 100);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });

    // ===========================
    // Particles Animation
    // ===========================

    const particlesContainer = document.getElementById('particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 20000);
    }

    // Create initial particles
    for (let i = 0; i < 30; i++) {
        setTimeout(createParticle, i * 200);
    }

    // Continue creating particles
    setInterval(createParticle, 2000);

    // Add float animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatStyle);

    // ===========================
    // Smooth Scroll
    // ===========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ===========================
    // Typing Effect for Hero Title
    // ===========================

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;

        function typeText() {
            if (charIndex < text.length) {
                heroTitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 50);
            }
        }

        // Start typing after animation delay
        setTimeout(typeText, 600);
    }

    // ===========================
    // Mouse Follow Effect on Hero
    // ===========================

    const hero = document.querySelector('.hero');
    
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = hero;
        
        const xPos = (clientX / offsetWidth - 0.5) * 20;
        const yPos = (clientY / offsetHeight - 0.5) * 20;
        
        const avatar = document.querySelector('.hero-avatar');
        if (avatar) {
            avatar.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
    });

    hero.addEventListener('mouseleave', () => {
        const avatar = document.querySelector('.hero-avatar');
        if (avatar) {
            avatar.style.transform = 'translate(0, 0)';
            avatar.style.transition = 'transform 0.5s ease';
        }
    });

    console.log('🚀 Portfolio loaded successfully!');
});
