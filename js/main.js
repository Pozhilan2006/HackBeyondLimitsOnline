// Main JavaScript for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Simulate loading time (remove in production and use actual asset loading)
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            
            // Start animations after preloader is gone
            startAnimations();
        }, 500);
    }, 2500);
    
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
    
    // AI Assistant Toggle
    const aiAssistantToggle = document.querySelector('.ai-assistant-toggle');
    const aiAssistant = document.querySelector('.ai-assistant');
    const aiAssistantClose = document.querySelector('.ai-assistant-close');
    const aiAssistantInput = document.querySelector('.ai-assistant-input input');
    const aiSendBtn = document.querySelector('.ai-send-btn');
    const aiMessages = document.querySelector('.ai-assistant-messages');
    
    aiAssistantToggle.addEventListener('click', () => {
        aiAssistant.classList.toggle('active');
    });
    
    aiAssistantClose.addEventListener('click', () => {
        aiAssistant.classList.remove('active');
    });
    
    // AI Assistant Message Handling
    function sendMessage() {
        const message = aiAssistantInput.value.trim();
        
        if (message) {
            // Add user message
            const userMessageHTML = `
                <div class="ai-message user-message">
                    <div class="message-content">
                        ${message}
                    </div>
                </div>
            `;
            
            aiMessages.insertAdjacentHTML('beforeend', userMessageHTML);
            aiAssistantInput.value = '';
            
            // Scroll to bottom
            aiMessages.scrollTop = aiMessages.scrollHeight;
            
            // Simulate AI response (replace with actual AI integration)
            setTimeout(() => {
                const aiResponse = getAIResponse(message);
                
                const aiMessageHTML = `
                    <div class="ai-message">
                        <div class="ai-avatar">
                            <img src="assets/images/ai-avatar.svg" alt="AI Avatar">
                        </div>
                        <div class="message-content">
                            ${aiResponse}
                        </div>
                    </div>
                `;
                
                aiMessages.insertAdjacentHTML('beforeend', aiMessageHTML);
                
                // Scroll to bottom
                aiMessages.scrollTop = aiMessages.scrollHeight;
            }, 1000);
        }
    }
    
    aiSendBtn.addEventListener('click', sendMessage);
    
    aiAssistantInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Simple AI responses based on keywords
    function getAIResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('register') || message.includes('sign up')) {
            return "You can register for the hackathon by filling out the form in the 'Register Now' section. Early registrants will receive exclusive digital badges!";
        } else if (message.includes('prize') || message.includes('reward')) {
            return "The hackathon offers exciting prizes! First prize is $5,000 plus mentorship and incubation support. There are also second and third prizes, as well as special category awards.";
        } else if (message.includes('schedule') || message.includes('timeline')) {
            return "The hackathon runs for 48 hours. Day 1 includes kickoff, team formation, and the start of hacking. Day 2 is for development and mentorship. Day 3 includes project submission, judging, and the awards ceremony.";
        } else if (message.includes('team') || message.includes('teammate')) {
            return "Teams can consist of 2-4 members. If you don't have a team, don't worry! We'll have a team formation session at the beginning of the event, and you can also use our Discord channel to connect with potential teammates.";
        } else if (message.includes('domain') || message.includes('track')) {
            return "The hackathon features two exciting domains: Artificial Intelligence and Web3. You can choose to work in either domain or combine both for your project!";
        } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm your Hackathon Assistant. How can I help you with Hack Beyond Limits: Online Odyssey?";
        } else if (message.includes('thank')) {
            return "You're welcome! If you have any other questions about the hackathon, feel free to ask.";
        } else {
            return "I'm here to help with any questions about the Hack Beyond Limits hackathon. You can ask about registration, schedule, prizes, domains, or team formation. Is there something specific you'd like to know?";
        }
    }
    
    // Audio Toggle
    const audioToggle = document.querySelector('.audio-toggle');
    let audioPlaying = false;
    let backgroundAudio;
    
    audioToggle.addEventListener('click', () => {
        audioToggle.classList.toggle('muted');
        
        if (audioPlaying) {
            // Pause audio
            if (backgroundAudio) {
                backgroundAudio.pause();
            }
            audioPlaying = false;
        } else {
            // Play audio
            if (!backgroundAudio) {
                backgroundAudio = new Audio('assets/audio/background.mp3');
                backgroundAudio.loop = true;
                backgroundAudio.volume = 0.2;
            }
            
            backgroundAudio.play().catch(error => {
                console.log('Audio play failed:', error);
            });
            
            audioPlaying = true;
        }
    });
    
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