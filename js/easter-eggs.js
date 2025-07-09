// Easter Eggs for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    // Easter egg container
    const easterEggs = document.querySelector('.easter-eggs');
    if (!easterEggs) return;
    
    // Initialize easter eggs
    initEasterEggs();
    
    function initEasterEggs() {
        // Konami Code Easter Egg
        let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiCodePosition = 0;
        
        document.addEventListener('keydown', (e) => {
            // Check if the key matches the expected key in the sequence
            if (e.key === konamiCode[konamiCodePosition]) {
                konamiCodePosition++;
                
                // If the full sequence is entered
                if (konamiCodePosition === konamiCode.length) {
                    // Trigger easter egg
                    showEasterEgg('egg2');
                    
                    // Reset position
                    konamiCodePosition = 0;
                    
                    // Dispatch custom event for sound effect
                    document.dispatchEvent(new CustomEvent('easterEggFound'));
                }
            } else {
                // Reset position if wrong key
                konamiCodePosition = 0;
            }
        });
        
        // Scroll-based Easter Eggs
        let lastScrollY = 0;
        let scrollDistance = 0;
        let egg1Shown = false;
        let egg3Shown = false;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Calculate scroll distance
            if (currentScrollY > lastScrollY) {
                scrollDistance += (currentScrollY - lastScrollY);
            }
            
            lastScrollY = currentScrollY;
            
            // Check for easter eggs based on scroll distance
            if (scrollDistance > 5000 && !egg1Shown) {
                showEasterEgg('egg1');
                egg1Shown = true;
                
                // Dispatch custom event for sound effect
                document.dispatchEvent(new CustomEvent('easterEggFound'));
            } else if (scrollDistance > 10000 && !egg3Shown) {
                showEasterEgg('egg3');
                egg3Shown = true;
                
                // Dispatch custom event for sound effect
                document.dispatchEvent(new CustomEvent('easterEggFound'));
            }
        });
        
        // Click Pattern Easter Egg
        const clickPattern = [
            { selector: '.hero-section', count: 3 },
            { selector: '.logo', count: 2 },
            { selector: '.hero-section', count: 1 }
        ];
        
        let currentPatternIndex = 0;
        let currentClickCount = 0;
        
        document.addEventListener('click', (e) => {
            const currentTarget = clickPattern[currentPatternIndex];
            const clickedElement = e.target.closest(currentTarget.selector);
            
            if (clickedElement) {
                currentClickCount++;
                
                if (currentClickCount === currentTarget.count) {
                    // Move to next pattern
                    currentPatternIndex++;
                    currentClickCount = 0;
                    
                    // If pattern complete
                    if (currentPatternIndex === clickPattern.length) {
                        // Trigger easter egg
                        showEasterEgg('egg1');
                        
                        // Reset pattern
                        currentPatternIndex = 0;
                        
                        // Dispatch custom event for sound effect
                        document.dispatchEvent(new CustomEvent('easterEggFound'));
                    }
                }
            } else {
                // Reset if clicked elsewhere
                currentPatternIndex = 0;
                currentClickCount = 0;
            }
        });
        
        // Mouse Movement Pattern Easter Egg
        const corners = [
            { x: 0, y: 0 },           // Top-left
            { x: window.innerWidth, y: 0 },  // Top-right
            { x: window.innerWidth, y: window.innerHeight }, // Bottom-right
            { x: 0, y: window.innerHeight }  // Bottom-left
        ];
        
        let cornerIndex = 0;
        const cornerThreshold = 100; // Pixels from corner to trigger
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const currentCorner = corners[cornerIndex];
            
            // Check if mouse is near the current corner
            const distanceX = Math.abs(mouseX - currentCorner.x);
            const distanceY = Math.abs(mouseY - currentCorner.y);
            
            if (distanceX < cornerThreshold && distanceY < cornerThreshold) {
                // Move to next corner
                cornerIndex++;
                
                // If all corners visited
                if (cornerIndex === corners.length) {
                    // Trigger easter egg
                    showEasterEgg('egg3');
                    
                    // Reset pattern
                    cornerIndex = 0;
                    
                    // Dispatch custom event for sound effect
                    document.dispatchEvent(new CustomEvent('easterEggFound'));
                }
            }
        });
        
        // Console Message Easter Egg
        console.log("%cHack Beyond Limits: Online Odyssey", "color: #00FFD1; font-size: 20px; font-weight: bold;");
        console.log("%cLooking for secrets? Try typing 'hackathon.revealSecrets()' below!", "color: #FF00C8;");
        
        // Define global function for console easter egg
        window.hackathon = {
            revealSecrets: function() {
                console.log("%cYou found a secret!", "color: #3F00FF; font-size: 16px; font-weight: bold;");
                console.log("%cUse code 'CONSOLE_HACKER' for a special surprise during the hackathon!", "color: #00FFD1;");
                
                showEasterEgg('egg1');
                
                // Dispatch custom event for sound effect
                document.dispatchEvent(new CustomEvent('easterEggFound'));
                
                return "Secret revealed! Check the website for your reward.";
            }
        };
    }
    
    // Function to show easter egg
    window.showEasterEgg = function(eggId) {
        const egg = document.querySelector(`.easter-egg[data-id="${eggId}"]`);
        
        if (egg) {
            // Add active class to show
            egg.classList.add('active');
            
            // Add glitch effect
            egg.classList.add('glitch-text');
            
            // Hide after delay
            setTimeout(() => {
                egg.classList.remove('active');
                egg.classList.remove('glitch-text');
            }, 5000);
        }
    };
    
    // Add CSS for easter egg animations
    const style = document.createElement('style');
    style.textContent = `
        .easter-egg {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: rgba(15, 15, 27, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 2px solid var(--color-accent-tertiary);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            text-align: center;
            box-shadow: 0 0 30px rgba(0, 255, 209, 0.5);
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: var(--z-modal);
            max-width: 90%;
            width: 400px;
        }
        
        .easter-egg.active {
            transform: translate(-50%, -50%) scale(1);
            animation: easterEggPulse 5s ease-in-out;
        }
        
        @keyframes easterEggPulse {
            0%, 100% {
                box-shadow: 0 0 30px rgba(0, 255, 209, 0.5);
            }
            50% {
                box-shadow: 0 0 50px rgba(0, 255, 209, 0.8);
            }
        }
        
        .egg-content h3 {
            color: var(--color-accent-tertiary);
            margin-bottom: var(--space-sm);
            font-size: 2.4rem;
        }
        
        .egg-content p {
            color: var(--color-text-primary);
            font-size: 1.8rem;
            margin-bottom: 0;
        }
    `;
    
    document.head.appendChild(style);
});