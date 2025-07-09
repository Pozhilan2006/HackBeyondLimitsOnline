// Animations for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    initPreloader();
    
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Scroll animations for sections
        initScrollAnimations();
        
        // Typing animation
        initTypingAnimation();
        
        // Parallax effects
        initParallaxEffects();
        
        // Counter animations
        initCounterAnimations();
        
        // Timeline animations
        initTimelineAnimations();
        
        // Enhanced button animations
        initButtonAnimations();
        
        // Domain card animations
        initDomainCardAnimations();
    }
    
    // Initialize preloader with typewriter effect
    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        const typingText = document.querySelector('.typing-text');
        
        if (preloader && typingText) {
            const text = "Initializing Hack Beyond Limits Online Odyssey";
            typingText.textContent = "";
            
            let charIndex = 0;
            const typingSpeed = 70; // milliseconds per character
            
            // Cursor element removed to prevent blinking cursor
            
            // Typewriter effect
            function typeWriter() {
                if (charIndex < text.length) {
                    typingText.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // Add flicker effect after typing completes
                    typingText.classList.add('flicker');
                    
                    // Blinking cursor effect removed
                    
                    // Hide preloader after extended delay to ensure users can read the text
                    setTimeout(() => {
                        gsap.to(preloader, {
                            opacity: 0,
                            duration: 1.5,
                            onComplete: () => {
                                preloader.style.display = 'none';
                                
                                // Trigger entrance animations for hero section
                                const heroContent = document.querySelector('.hero-content');
                                if (heroContent) {
                                    gsap.from(heroContent.children, {
                                        opacity: 0,
                                        y: 30,
                                        stagger: 0.1,
                                        duration: 0.8,
                                        ease: "power2.out"
                                    });
                                }
                            }
                        });
                    }, 2500); // Extended delay to 2.5 seconds after typing completes
                }
            }
            
            // Start typing
            setTimeout(typeWriter, 500);
            
            // Add terminal glitch effects
            const terminal = document.querySelector('.terminal');
            if (terminal) {
                setInterval(() => {
                    terminal.classList.add('glitch');
                    setTimeout(() => {
                        terminal.classList.remove('glitch');
                    }, 200);
                }, 3000);
            }
        }
    }
    
    // Initialize scroll animations
    function initScrollAnimations() {
        // Fade in animations for sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            gsap.from(section.querySelector('.section-header'), {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1
            });
            
            // Animate section content
            const contentElements = section.querySelectorAll('.scroll-fade-in');
            
            contentElements.forEach((element, index) => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: index * 0.1
                });
            });
        });
        
        // Slide in animations
        const slideLeftElements = document.querySelectorAll('.scroll-slide-left');
        const slideRightElements = document.querySelectorAll('.scroll-slide-right');
        
        slideLeftElements.forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                x: -50,
                duration: 0.8
            });
        });
        
        slideRightElements.forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                x: 50,
                duration: 0.8
            });
        });
        
        // Scale animations
        const scaleElements = document.querySelectorAll('.scroll-scale-in');
        
        scaleElements.forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                scale: 0.8,
                duration: 0.8
            });
        });
    }
    
    // Initialize typing animation
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        
        if (typingElement) {
            const text = typingElement.textContent;
            typingElement.innerHTML = '';
            typingElement.style.width = '0';
            
            gsap.to(typingElement, {
                scrollTrigger: {
                    trigger: typingElement,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                width: '100%',
                duration: 3,
                ease: "power1.inOut",
                onStart: () => {
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        if (i < text.length) {
                            typingElement.textContent += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeInterval);
                        }
                    }, 50);
                }
            });
        }
    }
    
    // Initialize parallax effects
    function initParallaxEffects() {
        // Hero section parallax
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const heroContent = heroSection.querySelector('.hero-content');
            
            gsap.to(heroContent, {
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: 100,
                ease: "none"
            });
        }
        
        // Domain cards parallax
        // Domain card scroll animations disabled as requested
        const domainCards = document.querySelectorAll('.domain-card');
        
        // No animations applied to keep cards static
    }
    
    // Initialize counter animations
    function initCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = stat.getAttribute('data-count');
            
            gsap.to(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        });
    }
    
    // Initialize timeline animations
    function initTimelineAnimations() {
        const timelineSection = document.querySelector('.schedule-section');
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (!timelineSection || !timelineItems.length) return;
        
        // Create a pin for the timeline section
        ScrollTrigger.create({
            trigger: timelineSection,
            start: "top 20%",
            end: "bottom 80%",
            pin: false, // Set to true to pin the entire section
            pinSpacing: true
        });
        
        // Create individual animations for each timeline item
        timelineItems.forEach((item, index) => {
            // Create scroll trigger for each item
            ScrollTrigger.create({
                trigger: item,
                start: "top 75%",
                end: "bottom 25%",
                toggleClass: {targets: item, className: "active"},
                once: false,
                onEnter: () => {
                    // Add active class to timeline dot
                    item.classList.add('active');
                    
                    // Animate the timeline content
                    const content = item.querySelector('.timeline-content');
                    if (content) {
                        gsap.to(content, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                    
                    // Animate the timeline date
                    const date = item.querySelector('.timeline-date');
                    if (date) {
                        gsap.to(date, {
                            opacity: 1,
                            x: 0,
                            duration: 0.5,
                            delay: 0.2,
                            ease: "power2.out"
                        });
                    }
                    
                    // Add glowing effect to the timeline dot
                    const dot = item.querySelector('.timeline-dot');
                    if (dot) {
                        gsap.to(dot, {
                            boxShadow: "0 0 20px rgba(0, 255, 209, 1)",
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                },
                onLeaveBack: () => {
                    // Remove active class when scrolling back up
                    item.classList.remove('active');
                }
            });
            
            // Set initial state
            gsap.set(item.querySelector('.timeline-content'), {
                opacity: 0,
                y: 50
            });
            
            gsap.set(item.querySelector('.timeline-date'), {
                opacity: 0,
                x: index % 2 === 0 ? 50 : -50
            });
        });
    }
    
    // Initialize enhanced button animations
    function initButtonAnimations() {
        // Enhanced CTA buttons with ripple effect, glow, and magnetic hover
        const ctaButtons = document.querySelectorAll('.cta-button, .orbit-button, .submit-button');
        
        ctaButtons.forEach(button => {
            // Add ripple effect container
            const rippleContainer = document.createElement('span');
            rippleContainer.className = 'ripple-container';
            button.appendChild(rippleContainer);
            
            // Add glow effect
            const glowEffect = document.createElement('span');
            glowEffect.className = 'button-glow';
            button.appendChild(glowEffect);
            
            // Add hover trail
            const hoverTrail = document.createElement('span');
            hoverTrail.className = 'hover-trail';
            button.appendChild(hoverTrail);
            
            // Click ripple effect
            button.addEventListener('click', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                rippleContainer.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 1000);
            });
            
            // Magnetic hover effect
            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 10;
                const moveY = (y - centerY) / 10;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                glowEffect.style.opacity = '1';
                glowEffect.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
                
                // Update hover trail
                hoverTrail.style.opacity = '1';
                hoverTrail.style.left = x + 'px';
                hoverTrail.style.top = y + 'px';
            });
            
            button.addEventListener('mouseleave', function() {
                button.style.transform = 'translate(0, 0) scale(1)';
                glowEffect.style.opacity = '0';
                hoverTrail.style.opacity = '0';
            });
        });
        
        // Add hover animations for other elements
        const hoverElements = document.querySelectorAll('.hover-scale, .hover-glow, .hover-rotate');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('active');
            });
        });
    }
    
    // Add scroll class to navigation on scroll
    const mainNav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Initialize domain card animations
    function initDomainCardAnimations() {
        const domainCards = document.querySelectorAll('.domain-card');
        
        domainCards.forEach(card => {
            // All hover effects and animations removed as requested
            // Cards are now static with no rotation, no hover sparkle, and no glow
            
            // Remove any existing event listeners
            card.removeEventListener('mousemove', () => {});
            card.removeEventListener('mouseleave', () => {});
            
            // Ensure cards are displayed in their default state
            card.style.transform = 'none';
        });
            
            // Particle effects on hover removed as requested
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-toggle').classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
            toggle.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
});