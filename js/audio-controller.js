// Audio Controller for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    const audioToggle = document.querySelector('.audio-toggle');
    if (!audioToggle) return;
    
    // Audio context
    let audioContext;
    let masterGain;
    let backgroundMusic;
    let isPlaying = false;
    let isInitialized = false;
    
    // Sound effects
    const soundEffects = {
        hover: null,
        click: null,
        success: null,
        notification: null
    };
    
    // Initialize audio on first user interaction
    function initAudio() {
        if (isInitialized) return;
        
        try {
            // Create audio context
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create master gain node
            masterGain = audioContext.createGain();
            masterGain.gain.value = 0.3; // Set initial volume
            masterGain.connect(audioContext.destination);
            
            // Load background music
            loadBackgroundMusic();
            
            // Load sound effects
            loadSoundEffects();
            
            // Add event listeners for interactive sounds
            addSoundEventListeners();
            
            isInitialized = true;
        } catch (error) {
            console.error('Audio initialization failed:', error);
        }
    }
    
    // Load background music
    function loadBackgroundMusic() {
        fetch('assets/audio/background.mp3')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.arrayBuffer();
            })
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                backgroundMusic = audioBuffer;
            })
            .catch(error => {
                console.error('Error loading background music:', error);
            });
    }
    
    // Load sound effects
    function loadSoundEffects() {
        const effects = [
            { name: 'hover', url: 'assets/audio/hover.mp3' },
            { name: 'click', url: 'assets/audio/click.mp3' },
            { name: 'success', url: 'assets/audio/success.mp3' },
            { name: 'notification', url: 'assets/audio/notification.mp3' }
        ];
        
        effects.forEach(effect => {
            fetch(effect.url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.arrayBuffer();
                })
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    soundEffects[effect.name] = audioBuffer;
                })
                .catch(error => {
                    console.error(`Error loading sound effect ${effect.name}:`, error);
                });
        });
    }
    
    // Play sound effect
    function playSoundEffect(effectName) {
        if (!isInitialized || !isPlaying || !soundEffects[effectName]) return;
        
        const source = audioContext.createBufferSource();
        source.buffer = soundEffects[effectName];
        
        const effectGain = audioContext.createGain();
        effectGain.gain.value = 0.2; // Lower volume for effects
        
        source.connect(effectGain);
        effectGain.connect(masterGain);
        
        source.start(0);
    }
    
    // Play background music
    function playBackgroundMusic() {
        if (!isInitialized || !backgroundMusic) return;
        
        // Create source node
        const source = audioContext.createBufferSource();
        source.buffer = backgroundMusic;
        source.loop = true;
        
        // Create specific gain for background music
        const musicGain = audioContext.createGain();
        musicGain.gain.value = 0.1; // Lower volume for background music
        
        // Connect nodes
        source.connect(musicGain);
        musicGain.connect(masterGain);
        
        // Start playback
        source.start(0);
        
        // Store source for stopping later
        return {
            source: source,
            gain: musicGain
        };
    }
    
    // Stop background music
    function stopBackgroundMusic(musicObj) {
        if (!musicObj) return;
        
        // Fade out
        const fadeTime = 1; // 1 second fade
        const currentTime = audioContext.currentTime;
        musicObj.gain.gain.setValueAtTime(musicObj.gain.gain.value, currentTime);
        musicObj.gain.gain.linearRampToValueAtTime(0, currentTime + fadeTime);
        
        // Stop after fade
        setTimeout(() => {
            try {
                musicObj.source.stop();
            } catch (e) {
                // Ignore errors if already stopped
            }
        }, fadeTime * 1000);
    }
    
    // Toggle audio
    let currentMusic = null;
    
    audioToggle.addEventListener('click', () => {
        // Initialize audio if not already
        initAudio();
        
        // Toggle state
        isPlaying = !isPlaying;
        audioToggle.classList.toggle('muted');
        
        if (isPlaying) {
            // Resume audio context if suspended
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            // Play background music
            currentMusic = playBackgroundMusic();
            
            // Play click sound
            playSoundEffect('click');
        } else {
            // Stop background music
            if (currentMusic) {
                stopBackgroundMusic(currentMusic);
                currentMusic = null;
            }
        }
    });
    
    // Add event listeners for interactive sounds
    function addSoundEventListeners() {
        // Buttons hover sound
        const buttons = document.querySelectorAll('.cta-button, .orbit-button, .submit-button, .ai-send-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                playSoundEffect('hover');
            });
            
            button.addEventListener('click', () => {
                playSoundEffect('click');
            });
        });
        
        // Navigation links hover sound
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                playSoundEffect('hover');
            });
        });
        
        // Form submission success sound
        const registrationForm = document.getElementById('registration-form');
        
        if (registrationForm) {
            registrationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Play success sound after form submission
                setTimeout(() => {
                    playSoundEffect('success');
                }, 500);
                
                // Form handling logic (already in main.js)
            });
        }
        
        // Easter egg found notification sound
        document.addEventListener('easterEggFound', () => {
            playSoundEffect('notification');
        });
    }
    
    // Create custom event for easter eggs
    window.addEventListener('scroll', () => {
        // This is just a placeholder - actual easter egg detection is in main.js
        // When an easter egg is found, dispatch the custom event:
        // document.dispatchEvent(new CustomEvent('easterEggFound'));
    });
    
    // Create ambient sound generator
    function createAmbientSounds() {
        if (!isInitialized || !isPlaying) return;
        
        // Create oscillator
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 220 + Math.random() * 880; // Random frequency
        
        // Create filter
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 500 + Math.random() * 1000;
        filter.Q.value = 10;
        
        // Create gain
        const gain = audioContext.createGain();
        gain.gain.value = 0;
        
        // Connect nodes
        oscillator.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        // Start oscillator
        oscillator.start();
        
        // Fade in
        const currentTime = audioContext.currentTime;
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.05, currentTime + 2);
        
        // Random modulation
        setInterval(() => {
            if (!isPlaying) return;
            
            const now = audioContext.currentTime;
            filter.frequency.exponentialRampToValueAtTime(
                500 + Math.random() * 1000,
                now + 3
            );
            
            oscillator.frequency.exponentialRampToValueAtTime(
                220 + Math.random() * 440,
                now + 3
            );
        }, 5000);
        
        // Schedule end
        const duration = 10 + Math.random() * 20; // 10-30 seconds
        
        // Fade out
        gain.gain.setValueAtTime(0.05, currentTime + duration - 2);
        gain.gain.linearRampToValueAtTime(0, currentTime + duration);
        
        // Stop oscillator
        setTimeout(() => {
            oscillator.stop();
            
            // Create new ambient sound if still playing
            if (isPlaying) {
                setTimeout(createAmbientSounds, Math.random() * 5000);
            }
        }, duration * 1000);
    }
    
    // Start ambient sounds occasionally when audio is playing
    setInterval(() => {
        if (isPlaying && Math.random() > 0.7) {
            createAmbientSounds();
        }
    }, 10000);
});