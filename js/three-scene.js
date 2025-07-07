// Three.js Scene for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    // Check if hero canvas exists
    const heroCanvas = document.getElementById('hero-canvas');
    if (!heroCanvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup with enhanced quality
    const renderer = new THREE.WebGLRenderer({ 
        canvas: heroCanvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x3F00FF, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xFF00C8, 2, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x00FFD1, 2, 100);
    pointLight3.position.set(0, 0, 30);
    scene.add(pointLight3);
    
    // Create objects based on screen size
    let objects = [];
    let isMobile = window.innerWidth < 768;
    
    function createObjects() {
        // Clear existing objects
        objects.forEach(obj => scene.remove(obj));
        objects = [];
        
        // Determine number of objects based on screen size
        const objectCount = isMobile ? 80 : 150;
        
        // Create objects with more variety and detail
        for (let i = 0; i < objectCount; i++) {
            let geometry;
            const type = Math.floor(Math.random() * 5); // More shape variety
            
            switch(type) {
                case 0:
                    // Sphere with more detail
                    geometry = new THREE.SphereGeometry(0.2, 24, 24);
                    break;
                case 1:
                    // Box with beveled edges
                    geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
                    break;
                case 2:
                    // Tetrahedron
                    geometry = new THREE.TetrahedronGeometry(0.3);
                    break;
                case 3:
                    // Octahedron
                    geometry = new THREE.OctahedronGeometry(0.25);
                    break;
                case 4:
                    // Torus
                    geometry = new THREE.TorusGeometry(0.2, 0.08, 16, 32);
                    break;
            }
            
            // Enhanced materials with more visual effects
            const colors = [0x3F00FF, 0xFF00C8, 0x00FFD1, 0x9D00FF, 0x00FFFF];
            
            // Randomly choose between different material types
            let material;
            const materialType = Math.floor(Math.random() * 3);
            
            switch(materialType) {
                case 0:
                    // Standard shiny material
                    material = new THREE.MeshPhongMaterial({
                        color: colors[Math.floor(Math.random() * colors.length)],
                        transparent: true,
                        opacity: Math.random() * 0.5 + 0.3,
                        shininess: 100,
                        specular: 0x555555
                    });
                    break;
                case 1:
                    // Glowing material
                    material = new THREE.MeshBasicMaterial({
                        color: colors[Math.floor(Math.random() * colors.length)],
                        transparent: true,
                        opacity: Math.random() * 0.4 + 0.3
                    });
                    break;
                case 2:
                    // Metallic material
                    material = new THREE.MeshStandardMaterial({
                        color: colors[Math.floor(Math.random() * colors.length)],
                        transparent: true,
                        opacity: Math.random() * 0.6 + 0.4,
                        metalness: 0.8,
                        roughness: 0.2
                    });
                    break;
            }
            
            const object = new THREE.Mesh(geometry, material);
            
            // Enhanced positioning for better distribution
            const spread = isMobile ? 25 : 50;
            const depth = isMobile ? 20 : 40;
            
            // Use spherical distribution for more natural look
            const radius = Math.random() * spread;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            object.position.x = radius * Math.sin(phi) * Math.cos(theta);
            object.position.y = radius * Math.sin(phi) * Math.sin(theta);
            object.position.z = Math.random() * depth - depth/2;
            
            // Random rotation
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            
            // Random scale with more variation
            const scale = Math.random() * 2 + 0.5;
            object.scale.set(scale, scale, scale);
            
            // Store initial values for enhanced animation
            object.userData = {
                rotationSpeed: {
                    x: Math.random() * 0.01 - 0.005,
                    y: Math.random() * 0.01 - 0.005,
                    z: Math.random() * 0.01 - 0.005
                },
                floatSpeed: Math.random() * 0.01 + 0.001,
                floatDistance: Math.random() * 3 + 1,
                initialY: object.position.y,
                pulseSpeed: Math.random() * 0.01 + 0.005,
                originalScale: scale,
                mouseInfluence: Math.random() * 0.01 + 0.001
            };
            
            scene.add(object);
            objects.push(object);
        }
        
        // Create enhanced central object (futuristic sphere)
        const centralGeometry = new THREE.SphereGeometry(6, 64, 64);
        
        // Create dual-layer wireframe material for depth
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x3F00FF,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        
        const centralObject = new THREE.Mesh(centralGeometry, wireframeMaterial);
        scene.add(centralObject);
        objects.push(centralObject);
        
        // Add inner solid sphere for depth
        const innerGeometry = new THREE.SphereGeometry(5.7, 64, 64);
        const innerMaterial = new THREE.MeshPhongMaterial({
            color: 0x000020,
            transparent: true,
            opacity: 0.5,
            shininess: 100,
            specular: 0x3F00FF
        });
        
        const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
        scene.add(innerSphere);
        objects.push(innerSphere);
        innerSphere.userData.isInnerSphere = true;
        
        // Add outer wireframe for layered effect
        const outerGeometry = new THREE.SphereGeometry(6.3, 32, 32);
        const outerMaterial = new THREE.MeshBasicMaterial({
            color: 0xFF00C8,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        
        const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
        scene.add(outerSphere);
        objects.push(outerSphere);
        outerSphere.userData.isOuterSphere = true;
        
        // Add enhanced glow effect to central object
        const glowGeometry = new THREE.SphereGeometry(6.5, 64, 64);
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(0x00FFD1) },
                viewVector: { value: camera.position },
                time: { value: 0 }
            },
            vertexShader: `
                uniform vec3 viewVector;
                uniform float time;
                varying float intensity;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vec3 vNormal = normalize(normalMatrix * normal);
                    vec3 vNormel = normalize(normalMatrix * viewVector);
                    intensity = pow(0.6 - dot(vNormal, vNormel), 2.0);
                    
                    // Add subtle vertex displacement for organic feel
                    float displacement = sin(position.x * 10.0 + time) * sin(position.y * 10.0 + time) * sin(position.z * 10.0 + time) * 0.05;
                    vec3 newPosition = position + normal * displacement;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                uniform float time;
                varying float intensity;
                varying vec2 vUv;
                void main() {
                    // Pulse effect
                    float pulse = sin(time * 0.5) * 0.1 + 0.9;
                    
                    // Add noise pattern
                    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233) * time * 0.1)) * 43758.5453);
                    
                    vec3 glow = glowColor * intensity * pulse + noise * 0.05;
                    gl_FragColor = vec4(glow, intensity * pulse);
                }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
        
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glowMesh);
        objects.push(glowMesh);
        
        // Add orbiting rings
        const ringGeometry = new THREE.TorusGeometry(8, 0.1, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xFF00C8,
            transparent: true,
            opacity: 0.5
        });
        
        const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
        ring1.rotation.x = Math.PI / 2;
        scene.add(ring1);
        objects.push(ring1);
        
        const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
        ring2.rotation.x = Math.PI / 4;
        ring2.rotation.y = Math.PI / 4;
        scene.add(ring2);
        objects.push(ring2);
        
        // Add particles for the central object
        const particleCount = isMobile ? 500 : 1000;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const radius = 6;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            particlePositions[i3 + 2] = radius * Math.cos(phi);
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00FFD1,
            size: 0.1,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        objects.push(particles);
        
        // Store central objects separately for special animations
        centralObject.userData.isCentral = true;
        glowMesh.userData.isGlow = true;
        ring1.userData.isRing = true;
        ring2.userData.isRing = true;
        particles.userData.isParticles = true;
    }
    
    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Check if mobile state changed
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;
        
        if (wasMobile !== isMobile) {
            createObjects();
        }
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    let isMouseDown = false;
    
    function onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        if (!isMouseDown) {
            // Subtle movement based on mouse position
            targetRotation.x = mouse.y * 0.5;
            targetRotation.y = mouse.x * 0.5;
        }
    }
    
    function onMouseDown() {
        isMouseDown = true;
    }
    
    function onMouseUp() {
        isMouseDown = false;
    }
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    // Touch interaction
    function onTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            
            mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
            
            targetRotation.x = mouse.y * 0.5;
            targetRotation.y = mouse.x * 0.5;
        }
    }
    
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    
    // Enhanced animation loop with post-processing
    const clock = new THREE.Clock();
    
    // Add post-processing for enhanced visuals
    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // Add bloom effect for glow
    const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,    // strength
        0.3,    // radius
        0.7     // threshold
    );
    composer.addPass(bloomPass);
    
    // Add subtle film grain for cinematic effect
    const filmPass = new THREE.FilmPass(
        0.2,    // noise intensity
        0.025,  // scanline intensity
        648,    // scanline count
        false   // grayscale
    );
    filmPass.renderToScreen = true;
    composer.addPass(filmPass);
    
    function animate() {
        requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();
        
        // Update shader uniforms
        objects.forEach(obj => {
            if (obj.material && obj.material.type === 'ShaderMaterial' && obj.material.uniforms.time) {
                obj.material.uniforms.time.value = elapsedTime;
            }
        });
        
        // Animate objects with enhanced effects
        objects.forEach(obj => {
            if (obj.userData.isCentral) {
                // Rotate central object with variable speed
                obj.rotation.y += 0.003;
                obj.rotation.x += Math.sin(elapsedTime * 0.2) * 0.0005;
                
                // Smooth rotation based on mouse position
                obj.rotation.x += (targetRotation.x - obj.rotation.x) * 0.03;
                obj.rotation.z += (targetRotation.y - obj.rotation.z) * 0.03;
                
                // Subtle pulsing
                const pulseScale = 1 + Math.sin(elapsedTime * 0.5) * 0.02;
                obj.scale.set(pulseScale, pulseScale, pulseScale);
            } else if (obj.userData.isInnerSphere) {
                // Inner sphere follows central with slight delay
                const central = objects.find(o => o.userData.isCentral);
                obj.position.copy(central.position);
                obj.rotation.copy(central.rotation);
                
                // Inverse pulse for interesting effect
                const pulseScale = 1 - Math.sin(elapsedTime * 0.5) * 0.01;
                obj.scale.set(pulseScale, pulseScale, pulseScale);
            } else if (obj.userData.isOuterSphere) {
                // Outer sphere follows with different rotation
                const central = objects.find(o => o.userData.isCentral);
                obj.position.copy(central.position);
                obj.rotation.x = central.rotation.x * 0.7;
                obj.rotation.y = central.rotation.y * 1.2;
                obj.rotation.z = central.rotation.z * 0.9;
                
                // Pulse effect
                const pulseScale = 1 + Math.sin(elapsedTime * 0.3) * 0.03;
                obj.scale.set(pulseScale, pulseScale, pulseScale);
            } else if (obj.userData.isGlow) {
                // Glow follows central object
                const central = objects.find(o => o.userData.isCentral);
                obj.position.copy(central.position);
                
                // Pulse glow with more organic movement
                const pulseScale = 1 + Math.sin(elapsedTime * 0.7) * 0.05 + Math.sin(elapsedTime * 1.3) * 0.03;
                obj.scale.set(pulseScale, pulseScale, pulseScale);
            } else if (obj.userData.isRing) {
                // Rotate rings with variable speed
                obj.rotation.z += 0.002 + Math.sin(elapsedTime * 0.2) * 0.001;
                obj.rotation.x += 0.001 + Math.cos(elapsedTime * 0.3) * 0.0005;
                
                // Follow central object with slight delay
                const central = objects.find(o => o.userData.isCentral);
                obj.position.lerp(central.position, 0.05);
                
                // Pulse opacity for ethereal effect
                if (obj.material) {
                    obj.material.opacity = 0.3 + Math.sin(elapsedTime * 0.5) * 0.1;
                }
            } else if (obj.userData.isParticles) {
                // Rotate particles with variable speed
                obj.rotation.y += 0.001 + Math.sin(elapsedTime * 0.1) * 0.0005;
                obj.rotation.x += Math.cos(elapsedTime * 0.2) * 0.0003;
                
                // Follow central object with smooth lerp
                const central = objects.find(o => o.userData.isCentral);
                obj.position.lerp(central.position, 0.1);
            } else {
                // Regular objects with enhanced animation
                obj.rotation.x += obj.userData.rotationSpeed.x;
                obj.rotation.y += obj.userData.rotationSpeed.y;
                obj.rotation.z += obj.userData.rotationSpeed.z;
                
                // Floating animation with multiple sine waves for more organic movement
                obj.position.y = obj.userData.initialY + 
                    Math.sin(elapsedTime * obj.userData.floatSpeed) * obj.userData.floatDistance +
                    Math.sin(elapsedTime * obj.userData.floatSpeed * 2.5) * obj.userData.floatDistance * 0.3;
                
                // Subtle scale pulsing
                const pulseScale = obj.userData.originalScale * (1 + Math.sin(elapsedTime * obj.userData.pulseSpeed) * 0.05);
                obj.scale.set(pulseScale, pulseScale, pulseScale);
                
                // Enhanced mouse interaction with magnetic effect
                if (Math.abs(mouse.x) > 0.05 || Math.abs(mouse.y) > 0.05) {
                    // Calculate distance to mouse ray
                    const mouseInfluence = obj.userData.mouseInfluence * 2;
                    const distX = obj.position.x - mouse.x * 20;
                    const distY = obj.position.y - mouse.y * 20;
                    const distance = Math.sqrt(distX * distX + distY * distY);
                    
                    // Apply force inversely proportional to distance (magnetic effect)
                    if (distance < 10) {
                        const force = (1 - distance / 10) * mouseInfluence;
                        obj.position.x += (mouse.x * 20 - obj.position.x) * force;
                        obj.position.y += (mouse.y * 20 - obj.position.y) * force;
                    }
                }
                
                // Subtle material effects
                if (obj.material && obj.material.opacity) {
                    // Subtle opacity pulsing
                    obj.material.opacity = Math.max(0.2, obj.material.opacity + Math.sin(elapsedTime * obj.userData.pulseSpeed * 2) * 0.02);
                }
            }
        });
        
        // Render with post-processing
        composer.render();
    }
    
    // Initialize and start animation
    createObjects();
    animate();
});