 const rotatingText = document.getElementById('rotatingText');
    const toggleButton = document.getElementById('toggleButton');

    let isRotating = true;

    toggleButton.addEventListener('click', () => {
      if (isRotating) {
        rotatingText.style.animationPlayState = 'paused';
        toggleButton.textContent = 'Start Rotation';
      } else {
        rotatingText.style.animationPlayState = 'running';
        toggleButton.textContent = 'Stop Rotation';
      }
      isRotating = !isRotating;
    });