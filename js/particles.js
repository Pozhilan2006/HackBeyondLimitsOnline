// Particles.js Configuration for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    // Background particles for various sections
    const particleSections = [
        'about-section',
        'domains-section',
        'prizes-section',
        'faq-section'
    ];
    
    particleSections.forEach((sectionClass, index) => {
        const section = document.querySelector(`.${sectionClass}`);
        if (!section) return;
        
        // Create canvas for particles
        const canvasId = `particles-${index}`;
        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.className = 'particles-js-canvas-el';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        
        section.style.position = 'relative';
        section.prepend(canvas);
        
        // Configure particles based on section
        let particleColor, particleShape, particleNumber;
        
        switch(sectionClass) {
            case 'about-section':
                particleColor = '#3F00FF';
                particleShape = 'circle';
                particleNumber = 50;
                break;
            case 'domains-section':
                particleColor = '#FF00C8';
                particleShape = 'triangle';
                particleNumber = 40;
                break;
            case 'prizes-section':
                particleColor = '#00FFD1';
                particleShape = 'star';
                particleNumber = 30;
                break;
            case 'faq-section':
                particleColor = '#3F00FF';
                particleShape = 'polygon';
                particleNumber = 20;
                break;
            default:
                particleColor = '#3F00FF';
                particleShape = 'circle';
                particleNumber = 50;
        }
        
        // Initialize particles.js
        particlesJS(canvasId, {
            "particles": {
                "number": {
                    "value": particleNumber,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": particleColor
                },
                "shape": {
                    "type": particleShape,
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": particleColor,
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 4,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    });
    
    // World map particles
    const worldMap = document.getElementById('world-map');
    if (worldMap) {
        // Initialize particles for world map
        particlesJS('world-map', {
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#3F00FF", "#FF00C8", "#00FFD1"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.7,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 100,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 100,
                        "size": 5,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
        // Add world map visualization
        createWorldMap();
    }
    
    // Simple world map visualization with active points
    function createWorldMap() {
        const mapContainer = document.getElementById('world-map');
        if (!mapContainer) return;
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.zIndex = '2';
        
        mapContainer.appendChild(svg);
        
        // Sample data for active locations (longitude, latitude)
        const locations = [
            { lat: 40.7128, lng: -74.0060, size: 5 }, // New York
            { lat: 51.5074, lng: -0.1278, size: 4 },  // London
            { lat: 48.8566, lng: 2.3522, size: 3 },   // Paris
            { lat: 35.6762, lng: 139.6503, size: 4 }, // Tokyo
            { lat: 22.3193, lng: 114.1694, size: 3 }, // Hong Kong
            { lat: 19.0760, lng: 72.8777, size: 5 },  // Mumbai
            { lat: -33.8688, lng: 151.2093, size: 3 },// Sydney
            { lat: -23.5505, lng: -46.6333, size: 4 },// São Paulo
            { lat: 37.7749, lng: -122.4194, size: 5 },// San Francisco
            { lat: 55.7558, lng: 37.6173, size: 3 },  // Moscow
            { lat: 25.2048, lng: 55.2708, size: 4 },  // Dubai
            { lat: 1.3521, lng: 103.8198, size: 3 },  // Singapore
            { lat: 30.0444, lng: 31.2357, size: 2 },  // Cairo
            { lat: 59.3293, lng: 18.0686, size: 3 },  // Stockholm
            { lat: -34.6037, lng: -58.3816, size: 4 },// Buenos Aires
            { lat: 28.6139, lng: 77.2090, size: 5 },  // New Delhi
            { lat: 39.9042, lng: 116.4074, size: 5 }, // Beijing
            { lat: 37.5665, lng: 126.9780, size: 4 }, // Seoul
            { lat: 52.5200, lng: 13.4050, size: 3 },  // Berlin
            { lat: 45.4215, lng: -75.6972, size: 3 }, // Ottawa
            { lat: 13.0827, lng: 80.2707, size: 4 },  // Chennai
            { lat: 6.5244, lng: 3.3792, size: 4 },    // Lagos
            { lat: 4.7100, lng: -74.0721, size: 3 },  // Bogotá
            { lat: 41.0082, lng: 28.9784, size: 3 },  // Istanbul
        ];
        
        // Map dimensions
        const mapWidth = mapContainer.clientWidth;
        const mapHeight = mapContainer.clientHeight;
        
        // Draw world map outline (simplified)
        const worldPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        worldPath.setAttribute('fill', 'none');
        worldPath.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
        worldPath.setAttribute('stroke-width', '1');
        worldPath.setAttribute('d', 'M0,0'); // Placeholder - would be a complex path in a real implementation
        
        svg.appendChild(worldPath);
        
        // Add location points
        locations.forEach(location => {
            // Convert lat/lng to x/y coordinates (simplified)
            const x = (location.lng + 180) * (mapWidth / 360);
            const y = (90 - location.lat) * (mapHeight / 180);
            
            // Create pulse effect
            const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulse.setAttribute('cx', x);
            pulse.setAttribute('cy', y);
            pulse.setAttribute('r', location.size * 2);
            pulse.setAttribute('fill', 'rgba(0, 255, 209, 0.1)');
            pulse.setAttribute('stroke', 'rgba(0, 255, 209, 0.3)');
            pulse.setAttribute('stroke-width', '1');
            pulse.classList.add('pulse');
            
            // Create point
            const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('cx', x);
            point.setAttribute('cy', y);
            point.setAttribute('r', location.size);
            point.setAttribute('fill', '#00FFD1');
            
            svg.appendChild(pulse);
            svg.appendChild(point);
            
            // Add random animation delay
            const delay = Math.random() * 4;
            pulse.style.animation = `pulse 3s infinite ${delay}s`;
        });
        
        // Add connections between some points
        for (let i = 0; i < 15; i++) {
            const start = locations[Math.floor(Math.random() * locations.length)];
            const end = locations[Math.floor(Math.random() * locations.length)];
            
            if (start !== end) {
                const startX = (start.lng + 180) * (mapWidth / 360);
                const startY = (90 - start.lat) * (mapHeight / 180);
                const endX = (end.lng + 180) * (mapWidth / 360);
                const endY = (90 - end.lat) * (mapHeight / 180);
                
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', startX);
                line.setAttribute('y1', startY);
                line.setAttribute('x2', endX);
                line.setAttribute('y2', endY);
                line.setAttribute('stroke', 'rgba(63, 0, 255, 0.3)');
                line.setAttribute('stroke-width', '1');
                line.setAttribute('stroke-dasharray', '5,5');
                
                svg.appendChild(line);
                
                // Animate the line
                const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                line.style.strokeDasharray = length;
                line.style.strokeDashoffset = length;
                line.style.animation = `dash 5s linear infinite`;
            }
        }
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% {
                    transform: scale(1);
                    opacity: 0.7;
                }
                70% {
                    transform: scale(3);
                    opacity: 0;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
            
            @keyframes dash {
                0% {
                    stroke-dashoffset: 0;
                }
                100% {
                    stroke-dashoffset: -1000;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
});