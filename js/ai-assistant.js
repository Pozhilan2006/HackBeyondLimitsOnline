// AI Assistant for Hack Beyond Limits: Online Odyssey

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AI Assistant
    initAIAssistant();
    
    function initAIAssistant() {
        const aiAssistant = document.getElementById('ai-assistant');
        const aiChatWindow = document.getElementById('ai-chat-window');
        const aiChatClose = document.getElementById('ai-chat-close');
        const aiChatSend = document.getElementById('ai-chat-send');
        const aiChatInput = document.getElementById('ai-chat-input-field');
        const aiChatMessages = document.getElementById('ai-chat-messages');
        
        if (!aiAssistant || !aiChatWindow || !aiChatClose || !aiChatSend || !aiChatInput || !aiChatMessages) {
            console.error('AI Assistant elements not found');
            return;
        }
        
        // Initial greeting after a delay
        setTimeout(() => {
            // Pulse the AI assistant to draw attention
            pulseAnimation();
        }, 10000);
        
        // Toggle chat window
        aiAssistant.addEventListener('click', function() {
            aiChatWindow.classList.add('active');
            
            // Play sound effect if audio is enabled
            if (window.audioEnabled && window.audioController) {
                window.audioController.playSound('notification');
            }
            
            // Focus input field
            setTimeout(() => {
                aiChatInput.focus();
            }, 300);
        });
        
        // Close chat window
        aiChatClose.addEventListener('click', function() {
            aiChatWindow.classList.remove('active');
        });
        
        // Send message on button click
        aiChatSend.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        aiChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Function to send message
        function sendMessage() {
            const message = aiChatInput.value.trim();
            
            if (message === '') return;
            
            // Add user message
            addUserMessage(message);
            
            // Clear input field
            aiChatInput.value = '';
            
            // Process message and get response
            processMessage(message);
        }
        
        // Add user message to chat
        function addUserMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'ai-message user';
            messageElement.textContent = message;
            aiChatMessages.appendChild(messageElement);
            
            // Scroll to bottom
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            // Play sound effect if audio is enabled
            if (window.audioEnabled && window.audioController) {
                window.audioController.playSound('message');
            }
        }
        
        // Add bot message to chat
        function addBotMessage(message) {
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'ai-message bot typing-indicator';
            typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
            aiChatMessages.appendChild(typingIndicator);
            
            // Scroll to bottom
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            // Simulate typing delay
            setTimeout(() => {
                // Remove typing indicator
                aiChatMessages.removeChild(typingIndicator);
                
                // Add actual message
                const messageElement = document.createElement('div');
                messageElement.className = 'ai-message bot';
                messageElement.textContent = message;
                aiChatMessages.appendChild(messageElement);
                
                // Scroll to bottom
                aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
                
                // Play sound effect if audio is enabled
                if (window.audioEnabled && window.audioController) {
                    window.audioController.playSound('notification');
                }
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
        }
        
        // Add pulse animation to AI assistant
        function pulseAnimation() {
            aiAssistant.classList.add('pulse');
            setTimeout(() => {
                aiAssistant.classList.remove('pulse');
            }, 1000);
        }
        
        // Pulse animation every 30 seconds to attract attention
        setInterval(pulseAnimation, 30000);
        
        // Process user message and generate response
        function processMessage(message) {
            // Convert message to lowercase for easier matching
            const lowerMessage = message.toLowerCase();
            
            // Check for keywords and return appropriate responses
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                addBotMessage("Hello! I'm your Hackathon Assistant for Hack Beyond Limits: Online Odyssey. How can I help you today?");
            } else if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('join')) {
                addBotMessage("You can register for the hackathon by filling out the form in the 'Register Now' section. Early registrants will receive exclusive digital badges and priority access to mentorship sessions!");
            } else if (lowerMessage.includes('deadline') || lowerMessage.includes('last date')) {
                addBotMessage("The registration deadline is one week before the hackathon starts. But I recommend registering early as spots fill up quickly and early registrants get special perks!");
            } else if (lowerMessage.includes('team') || lowerMessage.includes('partner') || lowerMessage.includes('group')) {
                addBotMessage("Teams can consist of 2-4 members. If you don't have a team, don't worry! We'll have a team formation session at the beginning of the event, and you can also use our Discord channel to connect with potential teammates beforehand.");
            } else if (lowerMessage.includes('prize') || lowerMessage.includes('reward') || lowerMessage.includes('win')) {
                addBotMessage("The hackathon offers exciting prizes! First prize is $5,000 plus mentorship and incubation support. Second prize is $3,000, and third prize is $1,500. We also have special category awards for Most Innovative Solution, Best Social Impact, and Best UI/UX Design, each worth $1,000 plus additional perks!");
            } else if (lowerMessage.includes('schedule') || lowerMessage.includes('timeline') || lowerMessage.includes('agenda')) {
                addBotMessage("The hackathon runs for 48 hours. Day 1 includes kickoff, team formation, and the start of hacking. Day 2 is for development and mentorship. Day 3 includes project submission, judging, and the awards ceremony. Check out the detailed schedule in the Timeline section!");
            } else if (lowerMessage.includes('domain') || lowerMessage.includes('track') || lowerMessage.includes('theme')) {
                addBotMessage("The hackathon features two exciting domains: Artificial Intelligence and Web3. You can choose to work in either domain or combine both for your project! Each domain offers unique challenges and opportunities to showcase your skills.");
            } else if (lowerMessage.includes('judge') || lowerMessage.includes('judging') || lowerMessage.includes('evaluation')) {
                addBotMessage("Projects will be evaluated based on innovation, technical complexity, practical implementation, user experience, and presentation. Our panel of judges includes industry experts from the AI and Web3 domains who will provide valuable feedback on your projects.");
            } else if (lowerMessage.includes('prepare') || lowerMessage.includes('preparation') || lowerMessage.includes('ready')) {
                addBotMessage("To prepare for the hackathon, make sure you have a stable internet connection, any software you plan to use, and a comfortable setup. It's also helpful to familiarize yourself with the domains and think about potential project ideas beforehand, though no coding should be done until the official start.");
            } else if (lowerMessage.includes('mentor') || lowerMessage.includes('help') || lowerMessage.includes('support')) {
                addBotMessage("We'll have experienced mentors available throughout the hackathon to provide guidance and support. Mentorship sessions will be scheduled during Day 2, but mentors will also be available on our Discord channel for quick questions and troubleshooting.");
            } else if (lowerMessage.includes('sponsor') || lowerMessage.includes('company')) {
                addBotMessage("Our hackathon is supported by leading tech companies and organizations. Check out the Sponsors section to see who's backing this event. They'll be providing prizes, resources, and some will even be looking to recruit top talent!");
            } else if (lowerMessage.includes('location') || lowerMessage.includes('venue') || lowerMessage.includes('where')) {
                addBotMessage("Hack Beyond Limits is a global online hackathon, so you can participate from anywhere in the world! All you need is a computer and internet connection. We'll be using Discord for communication and Zoom for workshops and presentations.");
            } else if (lowerMessage.includes('thank')) {
                addBotMessage("You're welcome! I'm here to help make your hackathon experience amazing. If you have any other questions, feel free to ask anytime!");
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
                addBotMessage("For any specific inquiries, you can reach the organizing team at info@hackbeyondlimits.com. You can also join our Discord community for real-time communication with organizers and other participants.");
            } else if (lowerMessage.includes('requirement') || lowerMessage.includes('need') || lowerMessage.includes('bring')) {
                addBotMessage("Since this is an online event, you'll need a computer with a stable internet connection, any software you plan to use, and your creativity! Make sure you have a comfortable setup as you'll be coding for 48 hours. A webcam and microphone are recommended for team collaboration.");
            } else if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('when')) {
                addBotMessage("The hackathon kicks off with an opening ceremony, followed by problem statement reveals and team formation. The actual coding begins at 1:00 PM on Day 1 and continues for 48 hours until the submission deadline at 1:00 PM on Day 3.");
            } else if (lowerMessage.includes('easter egg') || lowerMessage.includes('secret')) {
                addBotMessage("I might know about some hidden surprises on this website... Keep exploring, especially when scrolling, and try some keyboard combinations. The Konami code might reveal something special! 😉");
            } else if (lowerMessage.includes('konami') || lowerMessage.includes('up up down down')) {
                addBotMessage("Up, Up, Down, Down, Left, Right, Left, Right, B, A... Who knows what might happen if you try this? 🎮✨");
            } else {
                // Default response for unrecognized queries
                addBotMessage("I'm here to help with any questions about the Hack Beyond Limits hackathon. You can ask about registration, schedule, prizes, domains, team formation, or anything else related to the event. Is there something specific you'd like to know?");
            }
        }
    }
    
    // Get AI response based on user message
    function getAIResponse(message) {
        message = message.toLowerCase();
        
        // Check for keywords and return appropriate responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm your Hackathon Assistant for Hack Beyond Limits: Online Odyssey. How can I help you today?";
        }
        
        if (message.includes('register') || message.includes('sign up') || message.includes('join')) {
            return "You can register for the hackathon by filling out the form in the 'Register Now' section. Early registrants will receive exclusive digital badges and priority access to mentorship sessions!";
        }
        
        if (message.includes('deadline') || message.includes('last date')) {
            return "The registration deadline is one week before the hackathon starts. But I recommend registering early as spots fill up quickly and early registrants get special perks!";
        }
        
        if (message.includes('team') || message.includes('partner') || message.includes('group')) {
            return "Teams can consist of 2-4 members. If you don't have a team, don't worry! We'll have a team formation session at the beginning of the event, and you can also use our Discord channel to connect with potential teammates beforehand.";
        }
        
        if (message.includes('prize') || message.includes('reward') || message.includes('win')) {
            return "The hackathon offers exciting prizes! First prize is $5,000 plus mentorship and incubation support. Second prize is $3,000, and third prize is $1,500. We also have special category awards for Most Innovative Solution, Best Social Impact, and Best UI/UX Design, each worth $1,000 plus additional perks!";
        }
        
        if (message.includes('schedule') || message.includes('timeline') || message.includes('agenda')) {
            return "The hackathon runs for 48 hours. Day 1 includes kickoff, team formation, and the start of hacking. Day 2 is for development and mentorship. Day 3 includes project submission, judging, and the awards ceremony. Check out the detailed schedule in the Timeline section!";
        }
        
        if (message.includes('domain') || message.includes('track') || message.includes('theme')) {
            return "The hackathon features two exciting domains: Artificial Intelligence and Web3. You can choose to work in either domain or combine both for your project! Each domain offers unique challenges and opportunities to showcase your skills.";
        }
        
        if (message.includes('judge') || message.includes('judging') || message.includes('evaluation')) {
            return "Projects will be evaluated based on innovation, technical complexity, practical implementation, user experience, and presentation. Our panel of judges includes industry experts from the AI and Web3 domains who will provide valuable feedback on your projects.";
        }
        
        if (message.includes('prepare') || message.includes('preparation') || message.includes('ready')) {
            return "To prepare for the hackathon, make sure you have a stable internet connection, any software you plan to use, and a comfortable setup. It's also helpful to familiarize yourself with the domains and think about potential project ideas beforehand, though no coding should be done until the official start.";
        }
        
        if (message.includes('mentor') || message.includes('help') || message.includes('support')) {
            return "We'll have experienced mentors available throughout the hackathon to provide guidance and support. Mentorship sessions will be scheduled during Day 2, but mentors will also be available on our Discord channel for quick questions and troubleshooting.";
        }
        
        if (message.includes('sponsor') || message.includes('company')) {
            return "Our hackathon is supported by leading tech companies and organizations. Check out the Sponsors section to see who's backing this event. They'll be providing prizes, resources, and some will even be looking to recruit top talent!";
        }
        
        if (message.includes('location') || message.includes('venue') || message.includes('where')) {
            return "Hack Beyond Limits is a global online hackathon, so you can participate from anywhere in the world! All you need is a computer and internet connection. We'll be using Discord for communication and Zoom for workshops and presentations.";
        }
        
        if (message.includes('thank')) {
            return "You're welcome! I'm here to help make your hackathon experience amazing. If you have any other questions, feel free to ask anytime!";
        }
        
        if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
            return "For any specific inquiries, you can reach the organizing team at info@hackbeyondlimits.com. You can also join our Discord community for real-time communication with organizers and other participants.";
        }
        
        if (message.includes('requirement') || message.includes('need') || message.includes('bring')) {
            return "Since this is an online event, you'll need a computer with a stable internet connection, any software you plan to use, and your creativity! Make sure you have a comfortable setup as you'll be coding for 48 hours. A webcam and microphone are recommended for team collaboration.";
        }
        
        if (message.includes('start') || message.includes('begin') || message.includes('when')) {
            return "The hackathon kicks off with an opening ceremony, followed by problem statement reveals and team formation. The actual coding begins at 1:00 PM on Day 1 and continues for 48 hours until the submission deadline at 1:00 PM on Day 3.";
        }
        
        // Easter egg responses
        if (message.includes('easter egg') || message.includes('secret')) {
            return "I might know about some hidden surprises on this website... Keep exploring, especially when scrolling, and try some keyboard combinations. The Konami code might reveal something special! 😉";
        }
        
        if (message.includes('konami') || message.includes('up up down down')) {
            return "Up, Up, Down, Down, Left, Right, Left, Right, B, A... Who knows what might happen if you try this? 🎮✨";
        }
        
        // Default response for unrecognized queries
        return "I'm here to help with any questions about the Hack Beyond Limits hackathon. You can ask about registration, schedule, prizes, domains, team formation, or anything else related to the event. Is there something specific you'd like to know?";
    }
    
    // Add CSS for typing indicator
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--color-text-secondary);
            animation: typingDot 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typingDot {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.6;
            }
            30% {
                transform: translateY(-5px);
                opacity: 1;
            }
        }
        
        .user-message {
            flex-direction: row-reverse;
            align-self: flex-end;
        }
        
        .user-message .message-content {
            background: rgba(63, 0, 255, 0.2);
            border-radius: var(--radius-md);
            border-top-right-radius: 0;
        }
    `;
    
    document.head.appendChild(style);
});