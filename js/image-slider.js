// Auto-scrolling image slider for Hack Beyond Limits Season 1 photos

document.addEventListener('DOMContentLoaded', function() {
    initImageSlider();
});

function initImageSlider() {
    const slider = document.querySelector('.album-gallery.horizontal-scroll');
    if (!slider) return;
    
    let isScrolling = false;
    let scrollDirection = 1; // 1 for right, -1 for left
    let scrollSpeed = 1; // pixels per frame
    let animationFrameId = null;
    let isHovering = false;
    let isDragging = false;
    let startX, scrollLeft;
    
    // Clone images to create infinite scroll effect
    const originalImages = Array.from(slider.querySelectorAll('img'));
    originalImages.forEach(img => {
        const clone = img.cloneNode(true);
        slider.appendChild(clone);
    });
    
    // Auto-scroll function
    function autoScroll() {
        if (!isHovering && !isDragging) {
            slider.scrollLeft += scrollSpeed * scrollDirection;
            
            // Reset scroll position when reaching the end to create infinite loop effect
            if (scrollDirection > 0 && slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth) / 2) {
                slider.scrollLeft = 0;
            } else if (scrollDirection < 0 && slider.scrollLeft <= 0) {
                slider.scrollLeft = (slider.scrollWidth - slider.clientWidth) / 2;
            }
        }
        
        animationFrameId = requestAnimationFrame(autoScroll);
    }
    
    // Start auto-scrolling
    function startAutoScroll() {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(autoScroll);
        }
    }
    
    // Stop auto-scrolling
    function stopAutoScroll() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
    
    // Mouse/touch event handlers
    slider.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    slider.addEventListener('mouseleave', () => {
        isHovering = false;
    });
    
    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });
    
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
        slider.style.cursor = 'grab';
    });
    
    window.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Handle wheel events for manual scrolling
    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
    });
    
    // Start auto-scrolling
    startAutoScroll();
}