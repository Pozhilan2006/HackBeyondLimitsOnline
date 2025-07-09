// Main JavaScript for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    // Note: The preloader timing is now controlled by animations.js
    // This code is kept for fallback purposes only
    const preloader = document.querySelector('.preloader');
    
    // We'll let the animations.js handle the preloader timing
    // This is just a fallback in case the animation script fails
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // Start animations after preloader is gone
                startAnimations();
            }, 500);
        }
    }, 5000); // Extended fallback timeout
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    const nav = document.querySelector('.main-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            nav.style.padding = '10px 0';
            nav.style.background = 'rgba(15, 15, 27, 0.95)';
        } else {
            nav.style.padding = '';
            nav.style.background = 'rgba(15, 15, 27, 0.8)';
        }
        
        // Hide/show nav on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial height to 0
        answer.style.maxHeight = '0px';
        
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle answer visibility
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });
        });
    });
    
    // Registration Form Submission
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission (replace with actual API call)
            console.log('Form submitted:', formObject);
            
            // Show success message
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Registration Successful!';
            submitButton.style.background = 'linear-gradient(135deg, #00FFD1, #3F00FF)';
            submitButton.disabled = true;
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
                
                // Show success easter egg
                showEasterEgg('egg3');
            }, 3000);
        });
    }
    
    // AI Assistant functionality removed as requested
    
    // Stat Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.getAttribute('data-count');
            const isInfinity = target === '∞';
            
            if (isInfinity) {
                setTimeout(() => {
                    counter.textContent = '∞';
                }, 1000);
                return;
            }
            
            const count = +target;
            const speed = 1000 / count; // Adjust speed based on count
            let currentCount = 0;
            
            const updateCount = () => {
                if (currentCount < count) {
                    currentCount++;
                    counter.textContent = currentCount;
                    setTimeout(updateCount, speed);
                } else {
                    counter.textContent = count;
                }
            };
            
            updateCount();
        });
    }
    
    // Scroll Animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-fade-in, .scroll-scale-in, .scroll-slide-left, .scroll-slide-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('active');
            }
        });
    }
    
    // Easter Eggs
    function setupEasterEggs() {
        // Random positions to check for easter eggs
        const positions = [
            { x: 0.2, y: 0.3 },
            { x: 0.8, y: 0.7 },
            { x: 0.5, y: 0.5 }
        ];
        
        let lastScrollY = 0;
        let scrollDistance = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Calculate scroll distance
            if (currentScrollY > lastScrollY) {
                scrollDistance += (currentScrollY - lastScrollY);
            }
            
            lastScrollY = currentScrollY;
            
            // Check for easter eggs based on scroll distance
            if (scrollDistance > 5000 && scrollDistance < 5100) {
                showEasterEgg('egg1');
            } else if (scrollDistance > 10000 && scrollDistance < 10100) {
                showEasterEgg('egg2');
            }
        });
        
        // Konami code easter egg
        let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiCodePosition = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiCodePosition]) {
                konamiCodePosition++;
                
                if (konamiCodePosition === konamiCode.length) {
                    showEasterEgg('egg2');
                    konamiCodePosition = 0;
                }
            } else {
                konamiCodePosition = 0;
            }
        });
    }
    
    function showEasterEgg(eggId) {
        const egg = document.querySelector(`.easter-egg[data-id="${eggId}"]`);
        
        if (egg) {
            egg.classList.add('active');
            
            setTimeout(() => {
                egg.classList.remove('active');
            }, 5000);
        }
    }
    
    // Start animations after preloader
    function startAnimations() {
        // Add scroll animation classes
        document.querySelectorAll('.about-content, .domain-card, .timeline-item, .prize-card, .special-prize, .sponsor-card, .faq-item').forEach((el, index) => {
            el.classList.add('scroll-fade-in');
            el.classList.add(`stagger-${index % 10 + 1}`);
        });
        
        // Initial scroll animation check
        handleScrollAnimations();
        
        // Start counter animations if in view
        if (isInViewport(document.querySelector('.about-stats'))) {
            animateCounters();
        }
        
        // Setup easter eggs
        setupEasterEggs();
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Scroll event listener for animations
    window.addEventListener('scroll', function() {
        handleScrollAnimations();
        
        // Animate counters when about section is in view
        const aboutStats = document.querySelector('.about-stats');
        if (aboutStats && isInViewport(aboutStats) && !aboutStats.classList.contains('counted')) {
            aboutStats.classList.add('counted');
            animateCounters();
        }
    });
    
    // Resize event listener
    window.addEventListener('resize', function() {
        // Update FAQ answer heights if active
        document.querySelectorAll('.faq-item.active').forEach(item => {
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        });
    });
});