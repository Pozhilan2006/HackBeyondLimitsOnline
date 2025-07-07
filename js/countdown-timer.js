// Countdown Timer for Hack Beyond Limits

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Countdown Timer
    initCountdownTimer();
    
    function initCountdownTimer() {
        // Create countdown container
        const countdownContainer = document.createElement('div');
        countdownContainer.className = 'countdown-container holographic-card';
        countdownContainer.style.position = 'fixed';
        countdownContainer.style.bottom = '20px';
        countdownContainer.style.left = '20px';
        countdownContainer.style.padding = '15px';
        countdownContainer.style.borderRadius = '10px';
        countdownContainer.style.zIndex = '999';
        countdownContainer.style.display = 'flex';
        countdownContainer.style.flexDirection = 'column';
        countdownContainer.style.alignItems = 'center';
        countdownContainer.style.justifyContent = 'center';
        countdownContainer.style.backdropFilter = 'blur(10px)';
        countdownContainer.style.boxShadow = '0 0 20px rgba(0, 255, 209, 0.5)';
        
        // Create countdown title
        const countdownTitle = document.createElement('div');
        countdownTitle.className = 'countdown-title neon-text';
        countdownTitle.textContent = 'Hackathon Starts In:';
        countdownTitle.style.marginBottom = '10px';
        countdownTitle.style.fontSize = '14px';
        countdownContainer.appendChild(countdownTitle);
        
        // Create countdown timer
        const countdownTimer = document.createElement('div');
        countdownTimer.className = 'countdown-timer';
        countdownTimer.style.display = 'flex';
        countdownTimer.style.gap = '10px';
        countdownContainer.appendChild(countdownTimer);
        
        // Create countdown units
        const units = ['days', 'hours', 'minutes', 'seconds'];
        const countdownUnits = {};
        
        units.forEach(unit => {
            const unitContainer = document.createElement('div');
            unitContainer.className = 'countdown-unit';
            unitContainer.style.display = 'flex';
            unitContainer.style.flexDirection = 'column';
            unitContainer.style.alignItems = 'center';
            
            const unitValue = document.createElement('div');
            unitValue.className = 'countdown-value glitch-text';
            unitValue.setAttribute('data-text', '00');
            unitValue.textContent = '00';
            unitValue.style.fontSize = '24px';
            unitValue.style.fontWeight = 'bold';
            unitContainer.appendChild(unitValue);
            
            const unitLabel = document.createElement('div');
            unitLabel.className = 'countdown-label';
            unitLabel.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            unitLabel.style.fontSize = '10px';
            unitLabel.style.textTransform = 'uppercase';
            unitContainer.appendChild(unitLabel);
            
            countdownTimer.appendChild(unitContainer);
            countdownUnits[unit] = unitValue;
        });
        
        // Add to body
        document.body.appendChild(countdownContainer);
        
        // Set hackathon date (example: December 1, 2023)
        const hackathonDate = new Date('December 1, 2023 10:00:00').getTime();
        
        // Update countdown
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = hackathonDate - now;
            
            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update countdown values
            countdownUnits.days.textContent = days.toString().padStart(2, '0');
            countdownUnits.days.setAttribute('data-text', days.toString().padStart(2, '0'));
            
            countdownUnits.hours.textContent = hours.toString().padStart(2, '0');
            countdownUnits.hours.setAttribute('data-text', hours.toString().padStart(2, '0'));
            
            countdownUnits.minutes.textContent = minutes.toString().padStart(2, '0');
            countdownUnits.minutes.setAttribute('data-text', minutes.toString().padStart(2, '0'));
            
            countdownUnits.seconds.textContent = seconds.toString().padStart(2, '0');
            countdownUnits.seconds.setAttribute('data-text', seconds.toString().padStart(2, '0'));
            
            // If countdown is over
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownTitle.textContent = 'Hackathon Started!';
                countdownTimer.style.display = 'none';
                
                // Add "Join Now" button
                const joinButton = document.createElement('a');
                joinButton.href = '#register';
                joinButton.className = 'join-button orbit-button primary';
                joinButton.textContent = 'Join Now';
                joinButton.style.marginTop = '10px';
                countdownContainer.appendChild(joinButton);
            }
        }
        
        // Update countdown immediately
        updateCountdown();
        
        // Update countdown every second
        const countdownInterval = setInterval(updateCountdown, 1000);
        
        // Add close button
        const closeButton = document.createElement('div');
        closeButton.className = 'countdown-close';
        closeButton.innerHTML = '&times;';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '16px';
        closeButton.style.fontWeight = 'bold';
        countdownContainer.appendChild(closeButton);
        
        // Close countdown on click
        closeButton.addEventListener('click', function() {
            countdownContainer.style.display = 'none';
        });
    }
});