// Centered Countdown Timer for Hack Beyond Limits

document.addEventListener('DOMContentLoaded', function() {
    // Get countdown elements
    const daysElement = document.querySelector('.hackathon-countdown-centered .days');
    const hoursElement = document.querySelector('.hackathon-countdown-centered .hours');
    const minutesElement = document.querySelector('.hackathon-countdown-centered .minutes');
    const secondsElement = document.querySelector('.hackathon-countdown-centered .seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('Countdown elements not found');
        return;
    }
    
    // Set hackathon date to August 5, 2025, 09:00 AM IST
    const hackathonDate = new Date('August 5, 2025 09:00:00 GMT+0530').getTime();
    
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
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
        
        // If countdown is over
        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            
            // Update label
            const countdownLabel = document.querySelector('.hackathon-countdown-centered .countdown-label');
            if (countdownLabel) {
                countdownLabel.textContent = 'Hackathon Started!';
            }
        }
    }
    
    // Update countdown immediately
    updateCountdown();
    
    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
});