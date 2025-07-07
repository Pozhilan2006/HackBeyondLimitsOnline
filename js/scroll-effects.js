// Scroll Effects for Hack Beyond Limits

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Scroll Progress Indicator
    initScrollProgress();
    
    // Initialize Parallax Effects
    initParallaxEffects();
    
    // Initialize Floating Elements
    initFloatingElements();
    
    // Initialize Holographic Cards
    initHolographicCards();
    
    // Initialize Glitch Text
    initGlitchText();
    
    // Initialize Typing Animation
    initTypingAnimation();
    
    // Scroll Progress Indicator
    function initScrollProgress() {
        const scrollProgressBar = document.getElementById('scrollProgressBar');
        
        if (!scrollProgressBar) return;
        
        // Update progress bar on scroll
        window.addEventListener('scroll', function() {
            // Calculate scroll progress
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            
            // Update progress bar width
            scrollProgressBar.style.width = scrollProgress + '%';
            
            // Add glow effect when scrolling
            scrollProgressBar.style.boxShadow = '0 0 10px rgba(0, 255, 209, 0.7)';
            
            // Remove glow effect after scrolling stops
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(function() {
                scrollProgressBar.style.boxShadow = '0 0 5px rgba(0, 255, 209, 0.3)';
            }, 200);
        });
    }
    
    // Parallax Effects
    function initParallaxEffects() {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        
        if (!parallaxLayers.length) return;
        
        // Add parallax effect on mouse move
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            parallaxLayers.forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth') || 0.1);
                const translateX = mouseX * depth * 100;
                const translateY = mouseY * depth * 100;
                
                layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
            });
        });
    }
    
    // Floating Elements
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        if (!floatingElements.length) return;
        
        // Add random delay to each floating element
        floatingElements.forEach(element => {
            const delay = Math.random() * 2;
            element.style.animationDelay = delay + 's';
        });
    }
    
    // Holographic Cards
    function initHolographicCards() {
        const holographicCards = document.querySelectorAll('.holographic-card');
        
        if (!holographicCards.length) return;
        
        holographicCards.forEach(card => {
            // Add 3D tilt effect on mouse move
            card.addEventListener('mousemove', function(e) {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation based on mouse position
                const rotateY = (mouseX / (cardRect.width / 2)) * 10;
                const rotateX = -(mouseY / (cardRect.height / 2)) * 10;
                
                // Apply rotation
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                
                // Add highlight effect
                const highlight = card.querySelector('.card-highlight') || document.createElement('div');
                if (!card.querySelector('.card-highlight')) {
                    highlight.className = 'card-highlight';
                    highlight.style.position = 'absolute';
                    highlight.style.top = '0';
                    highlight.style.left = '0';
                    highlight.style.width = '100%';
                    highlight.style.height = '100%';
                    highlight.style.pointerEvents = 'none';
                    highlight.style.borderRadius = 'inherit';
                    highlight.style.zIndex = '1';
                    card.appendChild(highlight);
                }
                
                // Calculate highlight position
                const highlightX = (mouseX / cardRect.width) * 100 + 50;
                const highlightY = (mouseY / cardRect.height) * 100 + 50;
                
                // Apply highlight effect
                highlight.style.background = `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%)`;
            });
            
            // Reset card on mouse leave
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                
                const highlight = card.querySelector('.card-highlight');
                if (highlight) {
                    highlight.style.background = 'none';
                }
            });
        });
    }
    
    // Glitch Text
    function initGlitchText() {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        
        if (!glitchTexts.length) return;
        
        glitchTexts.forEach(text => {
            // Store original text
            const originalText = text.textContent;
            
            // Set data-text attribute for pseudo-elements
            text.setAttribute('data-text', originalText);
            
            // Add random glitch effect on hover
            text.addEventListener('mouseenter', function() {
                text.classList.add('active');
            });
            
            text.addEventListener('mouseleave', function() {
                text.classList.remove('active');
            });
        });
    }
    
    // Typing Animation
    function initTypingAnimation() {
        const typingElements = document.querySelectorAll('.typing-animation');
        
        if (!typingElements.length) return;
        
        typingElements.forEach(element => {
            // Store original text
            const originalText = element.textContent;
            
            // Clear text initially
            element.textContent = '';
            
            // Create observer to start animation when element is in view
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Start typing animation
                        let i = 0;
                        const typingInterval = setInterval(() => {
                            if (i < originalText.length) {
                                element.textContent += originalText.charAt(i);
                                i++;
                            } else {
                                clearInterval(typingInterval);
                            }
                        }, 100);
                        
                        // Unobserve after animation starts
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });
            
            // Start observing
            observer.observe(element);
        });
    }
});