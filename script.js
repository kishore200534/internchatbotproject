document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
    const chatWindow = document.getElementById("chat-window");
    const currentTimeDisplay = document.getElementById("current-time");

    // Predefined responses from the bot
    const botResponses = {
        "hello": "Hi there! How can I help you?",
        "how are you": "I'm doing great, thank you for asking!",
        "bye": "Goodbye! Have a great day!"
    };

    // Update the current time
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        currentTimeDisplay.textContent = `Current time: ${hours}:${minutes}:${seconds}`;
    }

    // Add message to the chat window
    function addMessage(message, sender = "user") {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message");
        messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageDiv.innerHTML = `<p><strong>${sender === "user" ? "You" : "INTOUCH BOT"}:</strong> ${message}</p>`;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
    }

    // Handle send action (button and Enter key)
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, "user"); // Show user message
            userInput.value = ""; // Clear input field

            // Bot's response based on the message
            const lowerMessage = message.toLowerCase();
            let response = botResponses[lowerMessage] || "I'm not sure how to respond to that.";
            addMessage(response, "bot"); // Show bot response
        }
    }

    // Event listener for Send button
    sendButton.addEventListener("click", sendMessage);

    // Event listener for Enter key to send message
    userInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            sendMessage();
        }
    });

    // Update the time every second
    setInterval(updateTime, 1000);
    updateTime(); // Initial time update
});
