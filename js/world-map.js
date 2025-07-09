// World Map Visualization for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    const mapSection = document.getElementById('world-map');
    if (!mapSection) return;
    
    // Create interactive world map
    createInteractiveMap();
    
    // Animate map stats
    animateMapStats();
    
    // Function to create interactive world map
    function createInteractiveMap() {
        // Create canvas for the map
        const canvas = document.createElement('canvas');
        canvas.width = mapSection.clientWidth;
        canvas.height = mapSection.clientHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '2';
        
        mapSection.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Sample data for active participants
        const participants = [
            { lat: 40.7128, lng: -74.0060, count: 35 },  // New York
            { lat: 51.5074, lng: -0.1278, count: 28 },   // London
            { lat: 48.8566, lng: 2.3522, count: 22 },    // Paris
            { lat: 35.6762, lng: 139.6503, count: 30 },  // Tokyo
            { lat: 22.3193, lng: 114.1694, count: 25 },  // Hong Kong
            { lat: 19.0760, lng: 72.8777, count: 40 },   // Mumbai
            { lat: -33.8688, lng: 151.2093, count: 18 }, // Sydney
            { lat: -23.5505, lng: -46.6333, count: 32 }, // São Paulo
            { lat: 37.7749, lng: -122.4194, count: 45 }, // San Francisco
            { lat: 55.7558, lng: 37.6173, count: 20 },   // Moscow
            { lat: 25.2048, lng: 55.2708, count: 15 },   // Dubai
            { lat: 1.3521, lng: 103.8198, count: 22 },   // Singapore
            { lat: 30.0444, lng: 31.2357, count: 12 },   // Cairo
            { lat: 59.3293, lng: 18.0686, count: 18 },   // Stockholm
            { lat: -34.6037, lng: -58.3816, count: 25 }, // Buenos Aires
            { lat: 28.6139, lng: 77.2090, count: 38 },   // New Delhi
            { lat: 39.9042, lng: 116.4074, count: 42 },  // Beijing
            { lat: 37.5665, lng: 126.9780, count: 30 },  // Seoul
            { lat: 52.5200, lng: 13.4050, count: 24 },   // Berlin
            { lat: 45.4215, lng: -75.6972, count: 20 },  // Ottawa
            { lat: 13.0827, lng: 80.2707, count: 35 },   // Chennai
            { lat: 6.5244, lng: 3.3792, count: 28 },     // Lagos
            { lat: 4.7100, lng: -74.0721, count: 22 },   // Bogotá
            { lat: 41.0082, lng: 28.9784, count: 18 },   // Istanbul
        ];
        
        // Draw world map
        function drawMap() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background
            ctx.fillStyle = 'rgba(15, 15, 27, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            
            // Vertical grid lines
            for (let i = 0; i <= canvas.width; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            
            // Horizontal grid lines
            for (let i = 0; i <= canvas.height; i += 50) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }
            
            // Draw participant locations
            participants.forEach(participant => {
                // Convert lat/lng to x/y coordinates
                const x = (participant.lng + 180) * (canvas.width / 360);
                const y = (90 - participant.lat) * (canvas.height / 180);
                
                // Draw glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, participant.count / 2);
                gradient.addColorStop(0, 'rgba(0, 255, 209, 0.8)');
                gradient.addColorStop(0.5, 'rgba(0, 255, 209, 0.3)');
                gradient.addColorStop(1, 'rgba(0, 255, 209, 0)');
                
                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(x, y, participant.count / 2, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw point
                ctx.beginPath();
                ctx.fillStyle = '#00FFD1';
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw count
                ctx.font = '10px Rajdhani, sans-serif';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.textAlign = 'center';
                ctx.fillText(participant.count.toString(), x, y - 10);
            });
            
            // Draw connections between active locations
            ctx.strokeStyle = 'rgba(63, 0, 255, 0.2)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < participants.length; i++) {
                // Connect to 2-3 random other participants
                const connections = Math.floor(Math.random() * 2) + 1;
                
                for (let j = 0; j < connections; j++) {
                    const targetIndex = Math.floor(Math.random() * participants.length);
                    
                    if (targetIndex !== i) {
                        const source = participants[i];
                        const target = participants[targetIndex];
                        
                        const sourceX = (source.lng + 180) * (canvas.width / 360);
                        const sourceY = (90 - source.lat) * (canvas.height / 180);
                        const targetX = (target.lng + 180) * (canvas.width / 360);
                        const targetY = (90 - target.lat) * (canvas.height / 180);
                        
                        // Draw line with gradient
                        const gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
                        gradient.addColorStop(0, 'rgba(63, 0, 255, 0.5)');
                        gradient.addColorStop(0.5, 'rgba(255, 0, 200, 0.5)');
                        gradient.addColorStop(1, 'rgba(0, 255, 209, 0.5)');
                        
                        ctx.beginPath();
                        ctx.strokeStyle = gradient;
                        ctx.moveTo(sourceX, sourceY);
                        ctx.lineTo(targetX, targetY);
                        ctx.stroke();
                        
                        // Draw moving particles along the connection
                        animateConnection(sourceX, sourceY, targetX, targetY);
                    }
                }
            }
        }
        
        // Connection particles
        const particles = [];
        
        function animateConnection(x1, y1, x2, y2) {
            // Create particles for this connection
            const particleCount = Math.floor(Math.random() * 2) + 1;
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    progress: Math.random(),
                    speed: 0.002 + Math.random() * 0.003,
                    color: Math.random() > 0.5 ? '#3F00FF' : '#00FFD1'
                });
            }
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Redraw map
            drawMap();
            
            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                
                // Update progress
                particle.progress += particle.speed;
                
                // Remove if complete
                if (particle.progress >= 1) {
                    particles.splice(i, 1);
                    continue;
                }
                
                // Calculate current position
                const x = particle.x1 + (particle.x2 - particle.x1) * particle.progress;
                const y = particle.y1 + (particle.y2 - particle.y1) * particle.progress;
                
                // Draw particle
                ctx.beginPath();
                ctx.fillStyle = particle.color;
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = mapSection.clientWidth;
            canvas.height = mapSection.clientHeight;
            drawMap();
        });
        
        // Start animation
        animate();
    }
    
    // Function to animate map stats
    function animateMapStats() {
        const stats = document.querySelectorAll('.map-stat .stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            const startValue = 0;
            
            function updateStat() {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                
                if (elapsed < duration) {
                    const value = Math.floor(easeOutQuad(elapsed, startValue, target, duration));
                    stat.textContent = value;
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            }
            
            // Easing function
            function easeOutQuad(t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            }
            
            updateStat();
        });
    }
});

// TODO: Redesign world map with proper markings and clear layout.
document.getElementById('world-map').innerHTML = '<div style="text-align:center;padding:2em;">New world map coming soon!</div>';