// Background Particles for Hack Beyond Limits

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Background Particles
    initBackgroundParticles();
    
    function initBackgroundParticles() {
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.id = 'background-particles';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        document.body.appendChild(canvas);
        
        // Get canvas context
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Particle properties
        const particles = [];
        const particleCount = 100;
        const colors = [
            'rgba(63, 0, 255, 0.5)',
            'rgba(255, 0, 200, 0.5)',
            'rgba(0, 255, 209, 0.5)'
        ];
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
        
        // Animation loop
        function animate() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // Update position
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
                
                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            
            // Continue animation
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Add mouse interaction
        const mouse = {
            x: null,
            y: null,
            radius: 100
        };
        
        window.addEventListener('mousemove', function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            // Create new particles on mouse move
            if (Math.random() > 0.9) {
                particles.push({
                    x: mouse.x,
                    y: mouse.y,
                    radius: Math.random() * 2 + 0.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speedX: Math.random() * 1 - 0.5,
                    speedY: Math.random() * 1 - 0.5,
                    opacity: Math.random() * 0.5 + 0.5
                });
                
                // Remove oldest particle if too many
                if (particles.length > particleCount + 20) {
                    particles.shift();
                }
            }
        });
    }
});