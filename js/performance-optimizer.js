// Performance Optimizer for Hack Beyond Limits Website

document.addEventListener('DOMContentLoaded', function() {
    // Optimize animations based on device performance
    optimizeAnimations();
    
    // Lazy load images and assets
    lazyLoadAssets();
    
    // Debounce scroll and resize events
    setupEventDebouncing();
    
    // Function to optimize animations based on device performance
    function optimizeAnimations() {
        // Check if device is low-end
        const isLowEndDevice = window.navigator.hardwareConcurrency < 4 || 
                              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isLowEndDevice) {
            // Reduce animation complexity
            document.body.classList.add('reduced-motion');
            
            // Disable particle effects or reduce their count
            window.PARTICLE_COUNT = 30; // Lower particle count
            
            // Disable or simplify complex effects
            const glitchElements = document.querySelectorAll('.glitch-text');
            glitchElements.forEach(el => {
                el.classList.remove('glitch-text');
                el.classList.add('simple-highlight');
            });
        } else {
            // Full animations for high-end devices
            window.PARTICLE_COUNT = 100;
        }
    }
    
    // Function to lazy load images and assets
    function lazyLoadAssets() {
        // Create IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load image for observed element
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Stop observing after loading
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            observer.observe(img);
        });
    }
    
    // Function to debounce scroll and resize events
    function setupEventDebouncing() {
        // Debounce function
        function debounce(func, wait) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(context, args);
                }, wait);
            };
        }
        
        // Debounce scroll event
        const scrollHandler = debounce(() => {
            // Handle scroll events
            updateScrollEffects();
        }, 10);
        
        // Debounce resize event
        const resizeHandler = debounce(() => {
            // Handle resize events
            updateLayoutElements();
        }, 100);
        
        // Add event listeners
        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', resizeHandler);
        
        // Update scroll-based effects
        function updateScrollEffects() {
            // Update scroll progress bar
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            
            const scrollProgressBar = document.getElementById('scrollProgressBar');
            if (scrollProgressBar) {
                scrollProgressBar.style.width = scrollProgress + '%';
            }
        }
        
        // Update layout elements on resize
        function updateLayoutElements() {
            // Update canvas sizes
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(canvas => {
                if (canvas.resize) {
                    canvas.resize();
                }
            });
        }
    }
});