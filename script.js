// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .case-card, .testimonial-card, .faq-item, .section-header, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });

    // Staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Staggered animation for case cards
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Subject buttons functionality
    const subjectButtons = document.querySelectorAll('.subject-btn');
    const assuntoInput = document.getElementById('assuntoInput');
    
    subjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            subjectButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Set the hidden input value
            const subject = button.getAttribute('data-subject');
            assuntoInput.value = subject;
        });
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.hero-title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            line.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.3}s`;
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Demo autoplay logic (videos play sequentially on hero CTA click)
    const demoBtn = document.getElementById('btnDemo');
    const caseVideos = document.querySelectorAll('#cases video');
    let demoPlaying = false;
    let demoIndex = -1;

    function resetDemo() {
        caseVideos.forEach(v => {
            try { v.pause(); } catch (_) {}
            v.currentTime = 0;
            v.controls = true;
        });
        demoPlaying = false;
        demoIndex = -1;
        if (demoBtn) {
            const span = demoBtn.querySelector('span');
            const icon = demoBtn.querySelector('i');
            if (span) span.textContent = 'Ver Demonstrações';
            if (icon) icon.className = 'fas fa-play';
        }
    }

    function playNextInDemo() {
        // Stop if nothing to play
        if (!demoPlaying || caseVideos.length === 0) {
            resetDemo();
            return;
        }

        // Advance index
        demoIndex += 1;
        if (demoIndex >= caseVideos.length) {
            resetDemo();
            return;
        }

        // Prepare current video
        const vid = caseVideos[demoIndex];
        const card = vid.closest('.case-card');

        // Scroll into view smoothly
        if (card && typeof card.scrollIntoView === 'function') {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Ensure autoplay compliance (keep controls visible)
        vid.muted = true;
        vid.controls = true;
        vid.currentTime = 0;

        // When the video ends, play the next one
        const onEnded = () => {
            vid.removeEventListener('ended', onEnded);
            playNextInDemo();
        };
        vid.addEventListener('ended', onEnded);

        // Attempt playback after a short delay for scroll
        setTimeout(() => {
            const p = vid.play();
            if (p && typeof p.then === 'function') {
                p.then(() => {}).catch(() => {
                    // If autoplay still fails, show controls and move on after 3s
                    vid.controls = true;
                    setTimeout(() => playNextInDemo(), 3000);
                });
            }
        }, 600);
    }

    if (demoBtn && caseVideos.length > 0) {
        demoBtn.addEventListener('click', () => {
            if (demoPlaying) {
                resetDemo();
                return;
            }

            // Start demo
            const casesSection = document.getElementById('cases');
            if (casesSection) {
                casesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            caseVideos.forEach(v => {
                v.muted = true;
                v.controls = true; // keep controls visible during demo
                try { v.pause(); } catch (_) {}
                v.currentTime = 0;
            });

            demoPlaying = true;
            demoIndex = -1;

            const span = demoBtn.querySelector('span');
            const icon = demoBtn.querySelector('i');
            if (span) span.textContent = 'Parar Demonstração';
            if (icon) icon.className = 'fas fa-stop';

            // Kick off sequence
            setTimeout(() => playNextInDemo(), 900);
        });
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Enviado!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Cursor trail effect (optional enhancement)
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Enhanced scroll reveal with different directions
    const revealElements = document.querySelectorAll('.service-card');
    revealElements.forEach((element, index) => {
        const direction = index % 2 === 0 ? 'left' : 'right';
        element.style.transform = direction === 'left' ? 'translateX(-50px)' : 'translateX(50px)';
        element.style.opacity = '0';
    });

    // Carousel functionality
    initCarousel();
});

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let carouselInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        // Add prev class to previous slide for smooth transition
        const prevIndex = currentSlide;
        if (prevIndex !== index) {
            slides[prevIndex].classList.add('prev');
        }

        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 2500); // Change slide every 2.5 seconds
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopCarousel();
            startCarousel(); // Restart the interval
        });
    });

    // Pause carousel on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }

    // Start the carousel
    startCarousel();

    // Auto-resume when tab/window becomes visible again
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            startCarousel();
        } else {
            stopCarousel();
        }
    });
}

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 50);
}

// Contact form handling with real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showMessage('Por favor, corrija os erros no formulário.', 'error');
                return;
            }
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Mostrar loading
            submitButton.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            try {
                const response = await fetch('contact.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showMessage(result.message, 'success');
                    contactForm.reset();
                } else {
                    showMessage(result.message, 'error');
                }
            } catch (error) {
                showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
            }
            
            // Restaurar botão
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        clearFieldError(field);
        
        // Required field validation
        if (!value) {
            errorMessage = 'Este campo é obrigatório.';
            isValid = false;
        } else {
            // Specific validations
            switch (fieldName) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Digite um email válido.';
                        isValid = false;
                    }
                    break;
                case 'whatsapp':
                    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
                    if (!phoneRegex.test(value) || value.length < 10) {
                        errorMessage = 'Digite um WhatsApp válido.';
                        isValid = false;
                    }
                    break;
                case 'nome':
                    if (value.length < 2) {
                        errorMessage = 'Nome deve ter pelo menos 2 caracteres.';
                        isValid = false;
                    }
                    break;
                case 'mensagem':
                    if (value.length < 10) {
                        errorMessage = 'Mensagem deve ter pelo menos 10 caracteres.';
                        isValid = false;
                    }
                    break;
            }
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#f44336';
        field.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = 'color: #f44336; font-size: 0.875rem; margin-top: 0.25rem;';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function showMessage(message, type) {
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
        formMessage.style.color = 'white';
        formMessage.textContent = message;
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        border-top: 1px solid var(--border-color);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
    
    .service-card:hover .service-icon {
        transform: scale(1.1) rotate(5deg);
        transition: all 0.3s ease;
    }
    
    .case-card:hover .case-placeholder i {
        transform: scale(1.2);
        transition: all 0.3s ease;
    }
    
    .floating-card:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
    }
    
    .hero-scroll:hover {
        color: #667eea;
        transform: translateX(-50%) scale(1.1);
    }
    
    .contact-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.1);
    }
    
    .tech-icons i:hover {
        transform: scale(1.2) rotate(10deg);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);