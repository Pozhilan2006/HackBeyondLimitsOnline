// Custom Cursor for Hack Beyond Limits

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Custom Cursor
    initCustomCursor();
    
    function initCustomCursor() {
        const cursor = document.getElementById('custom-cursor');
        const cursorTrail = document.getElementById('cursor-trail');
        
        if (!cursor || !cursorTrail) return;
        
        // Add custom cursor class to body
        document.body.classList.add('custom-cursor-active');
        
        // Cursor position variables
        let cursorX = 0;
        let cursorY = 0;
        let trailX = 0;
        let trailY = 0;
        
        // Update cursor position on mouse move
        document.addEventListener('mousemove', function(e) {
            cursorX = e.clientX;
            cursorY = e.clientY;
            
            // Update cursor position immediately
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        });
        
        // Update trail position with smooth animation
        function animateTrail() {
            // Calculate distance between cursor and trail
            const dx = cursorX - trailX;
            const dy = cursorY - trailY;
            
            // Update trail position with easing
            trailX += dx * 0.2;
            trailY += dy * 0.2;
            
            // Apply position
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            
            // Continue animation
            requestAnimationFrame(animateTrail);
        }
        
        // Start trail animation
        animateTrail();
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .cta-button, .orbit-button, .submit-button, .ai-assistant, .audio-toggle, .nav-link, .domain-card, .timeline-item, input, textarea, select, [role="button"]');
        
        interactiveElements.forEach(element => {
            // Add hover class to cursor on mouseenter
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
            });
            
            // Remove hover class from cursor on mouseleave
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
            });
            
            // Add active class to cursor on mousedown
            element.addEventListener('mousedown', function() {
                cursor.classList.add('active');
            });
            
            // Remove active class from cursor on mouseup
            element.addEventListener('mouseup', function() {
                cursor.classList.remove('active');
            });
        });
        
        // Add active class to cursor on document mousedown
        document.addEventListener('mousedown', function() {
            cursor.classList.add('active');
        });
        
        // Remove active class from cursor on document mouseup
        document.addEventListener('mouseup', function() {
            cursor.classList.remove('active');
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
            cursorTrail.style.opacity = '0';
        });
        
        // Show cursor when mouse enters window
        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
            cursorTrail.style.opacity = '1';
        });
        
        // Create particle effect on click
        document.addEventListener('click', createClickParticles);
        
        // Create particles on click
        function createClickParticles(e) {
            const numParticles = 8;
            const colors = ['#3F00FF', '#FF00C8', '#00FFD1'];
            
            for (let i = 0; i < numParticles; i++) {
                const particle = document.createElement('div');
                particle.className = 'cursor-particle';
                
                // Random size
                const size = Math.random() * 8 + 4;
                
                // Random color
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Set particle styles
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = color;
                particle.style.boxShadow = `0 0 ${size}px ${color}`;
                particle.style.left = `${e.clientX}px`;
                particle.style.top = `${e.clientY}px`;
                particle.style.position = 'fixed';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                
                // Add to body
                document.body.appendChild(particle);
                
                // Animate particle
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 100 + 50;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                
                // Use GSAP for smooth animation if available
                if (typeof gsap !== 'undefined') {
                    gsap.to(particle, {
                        x: vx,
                        y: vy,
                        opacity: 0,
                        duration: Math.random() * 1 + 0.5,
                        onComplete: () => {
                            document.body.removeChild(particle);
                        }
                    });
                } else {
                    // Fallback to CSS animation
                    particle.style.transition = 'all 1s ease';
                    setTimeout(() => {
                        particle.style.transform = `translate(${vx}px, ${vy}px)`;
                        particle.style.opacity = '0';
                    }, 10);
                    
                    // Remove particle after animation
                    setTimeout(() => {
                        document.body.removeChild(particle);
                    }, 1000);
                }
            }
        }
    }
});