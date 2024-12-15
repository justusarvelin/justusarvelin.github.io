// Function to check if the browser is Firefox
function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

// Check if the browser is Firefox
if (!isFirefox()) {
    // Get all text elements
    const texts = document.querySelectorAll('.text');

    // Calculate the angle between each text element
    const angleIncrement = 360 / texts.length;

    // Set initial rotation angle
    let rotationAngle = 0;

    // Shadow trace storage
    let shadowTimers = [];

    // Function to update rotation
    function updateRotation() {
        texts.forEach((text, index) => {
            // Calculate rotation for each text element
            const rotation = rotationAngle + index * angleIncrement;
            // Determine translation value based on window height
            const translation = window.innerHeight < 700 ? '100px' : '120px';
            // Apply rotation and translation transformations
            text.style.transform = `rotate(${rotation}deg) translate(${translation}) rotate(-${rotation}deg)`;

            // Add shadow trace effect to the text itself
            text.style.textShadow = '0px 0px 10px rgba(255, 255, 25, 1)';

            // Clear previous timers for this text
            if (shadowTimers[index]) {
                clearTimeout(shadowTimers[index]);
            }

            // Smoothly reduce shadow over time
            let shadowOpacity = 1;
            const fadeDuration = 3000; // Total fade-out duration in milliseconds
            const fadeSteps = 20; // Number of fade steps
            const fadeInterval = fadeDuration / fadeSteps;

            const fadeOut = () => {
                shadowOpacity -= 1 / fadeSteps;
                if (shadowOpacity > 0) {
                    text.style.textShadow = `0px 0px 10px rgba(255, 255, 25, ${shadowOpacity})`;
                    shadowTimers[index] = setTimeout(fadeOut, fadeInterval);
                } else {
                    text.style.textShadow = 'none';
                }
            };

            // Start fading out the shadow
            shadowTimers[index] = setTimeout(fadeOut, fadeInterval);
        });
    }

    // Function to handle wheel event
    function handleWheel(event) {
        // Calculate the amount of rotation based on wheel delta
        const delta = event.deltaY;
        const rotationSpeed = 0.2; // Adjust rotation speed as needed
        rotationAngle += delta * rotationSpeed;
        // Update rotation
        updateRotation();
    }

    // Add wheel event listener to the window
    window.addEventListener('wheel', handleWheel);

    // Simulate initial scroll value between 3 and 1000
    window.addEventListener('load', () => {
        // Generate a random number between 3 and 1000
        const initialScroll = Math.floor(Math.random() * (100000000000000 - 99999999999 + 1));
        
        // Create a new WheelEvent with the random deltaY
        const initialEvent = new WheelEvent('wheel', {
            deltaY: initialScroll
        });

        // Dispatch the WheelEvent on the window
        window.dispatchEvent(initialEvent);
    });

    // Function to handle touchmove event
    function handleTouchMove(event) {
        // Prevent default touch behavior (like scrolling)
        event.preventDefault();
        
        // Calculate the amount of rotation based on touch movement
        const touch = event.touches[0];
        const deltaY = touch.pageY - startY;
        const rotationSpeed = 0.2; // Adjust rotation speed as needed
        rotationAngle += deltaY * rotationSpeed;
        
        // Update rotation
        updateRotation();
    }

    let startY;

    // Function to handle touchstart event
    function handleTouchStart(event) {
        // Store the initial touch position
        startY = event.touches[0].pageY;
    }

    // Add touch event listeners to the window
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
}
