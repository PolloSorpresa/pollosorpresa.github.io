document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la librería js-confetti en el body
    const jsConfetti = new JSConfetti();

    // Función para disparar el confeti con atributos personalizados
    const fireConfetti = () => {
        console.log('Disparando confeti...'); 
        jsConfetti.addConfetti({
            colors: ['#f03912', '#3e1911', '#11f14e', '#ff718d', '#C70039'], // Array de colores para el confeti
            particleCount: 150, // Cantidad de partículas de confeti
            spread: 60, // Ángulo en grados para la dispersión del confeti
            startVelocity: 5, // Velocidad inicial de las partículas
            gravity: 0.80, // Fuerza de la gravedad que afecta al confeti
            drift: 0.1, // Deriva horizontal del confeti
            shapes: ['circle', 'square'], // Formas de las partículas (círculo y cuadrado)
            scalar: 1, // Escala de las partículas (1 es el tamaño normal)
            zIndex: 100, // Asegura que el confeti esté por encima de otros elementos
            origin: { x: 0.5, y: 0.6 }, // Punto de origen de la explosión (centro inferior)
        });
    };

    // Disparar el confeti al cargar la página
    fireConfetti();

    // Hacer desaparecer el confeti después de 3 segundos
    setTimeout(() => {
        const confettiCanvas = document.querySelector('canvas');
        if (confettiCanvas) {
            confettiCanvas.style.opacity = '0';
            confettiCanvas.style.transition = 'opacity 1s ease-in-out';
            setTimeout(() => {
                if (confettiCanvas && confettiCanvas.parentNode) {
                    confettiCanvas.parentNode.removeChild(confettiCanvas);
                }
            }, 1000);
        }
    }, 4000);

    // El resto de tu código para el slider de imágenes ...
    const comparisonContainers = document.querySelectorAll('.comparison-container');

    comparisonContainers.forEach(container => {
        const controllerImage = container.querySelector('.image-controller');
        const imageAfter = container.querySelector('.image-after');
        const divisor = container.querySelector('.divisor');
        let isDragging = false;
        let startX;
        let initialControllerLeft;
        const containerRect = container.getBoundingClientRect();
        const controllerWidth = controllerImage.offsetWidth;

        const handleMove = (event) => {
            if (!isDragging) return;

            const clientX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
            const offsetX = clientX - startX;
            let newControllerLeft = initialControllerLeft + offsetX;

            const minLeft = 0;
            const maxLeft = containerRect.width - controllerWidth;
            const clampedLeft = Math.min(maxLeft, Math.max(minLeft, newControllerLeft));

            controllerImage.style.left = `${clampedLeft}px`;

            const sliderValue = clampedLeft / maxLeft * 100;

            imageAfter.style.clipPath = `inset(0 ${100 - sliderValue}% 0 0)`;
            divisor.style.left = `${(clampedLeft + controllerWidth / 2) / containerRect.width * 100}%`;
        };

        const handleStart = (event) => {
            isDragging = true;
            startX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
            initialControllerLeft = controllerImage.offsetLeft;
            container.style.cursor = 'grabbing';
            containerRect.width = container.getBoundingClientRect().width;
        };

        const handleEnd = () => {
            isDragging = false;
            container.style.cursor = 'grab';
        };

        controllerImage.addEventListener('mousedown', handleStart);
        controllerImage.addEventListener('touchstart', handleStart);

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove);

        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchend', handleEnd);

        imageAfter.style.clipPath = `inset(0 85% 0 0)`; // Mantén el clipPath como está
        divisor.style.left = `15%`; // Posición inicial del divisor
        
        // Ajusta la posición del controlador para que coincida con el divisor
        const divisorLeft = containerRect.width * 0.15; // Calcula la posición del divisor en píxeles
        controllerImage.style.left = `${divisorLeft - controllerWidth / 2}px`; // Centra el controlador en el divisor
    });
});