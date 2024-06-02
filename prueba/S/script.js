document.addEventListener('DOMContentLoaded', function () {
    var switchInput = document.querySelector('input[name="switch"]');
    var clickSound = document.getElementById('click-sound');
    var intervalId = null; // Inicializamos intervalId como null

    switchInput.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode');
        clickSound.play();
        if (document.body.classList.contains('dark-mode')) {
            // Si no hay un intervalo en curso, creamos uno nuevo
            if (!intervalId) {
                intervalId = setInterval(createLight, 1000); // Encendido progresivo más rápido
            }
        } else {
            // Si hay un intervalo en curso, lo limpiamos y lo marcamos como null
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            fadeOutLights();
        }
    });

    switchInput.addEventListener('click', function () {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});

function createLight() {
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    var path = document.createElementNS(svgNS, "path");
    var pathData = generateRandomPath();
    var color = getRandomColor();
    path.setAttribute("d", pathData);
    path.setAttribute("style", `stroke: ${color}; filter: drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}); opacity: 0;`);
    path.classList.add('path');
    svg.appendChild(path);
    document.body.appendChild(svg);

    var length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    var fadeInInterval = setInterval(function () {
        path.style.strokeDashoffset = length;
        length -= 5; // Ajusta la velocidad de encendido progresivo
        if (length <= 0) {
            clearInterval(fadeInInterval);
        }
    }, 10); // Cambia la velocidad de la transición

    setTimeout(function () {
        fadeOutLight(path);
    }, 200); // Llamada al método para apagar las luces
}

function fadeOutLight(path) {
    var opacity = 1;
    var fadeOutInterval = setInterval(function () {
        opacity -= 0.01; // Ajusta la velocidad de apagado progresivo
        path.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeOutInterval);
            path.parentNode.remove(); // Elimina el elemento SVG del DOM
        }
    }, 30); // Cambia la velocidad de la transición
}


function fadeOutLights() {
    var svgs = document.querySelectorAll('svg');
    svgs.forEach(function(svg) {
        fadeOutLight(svg.querySelector('path'));
    });
}


function generateRandomPath() {
    var startX = Math.random() * window.innerWidth;
    var startY = Math.random() * window.innerHeight;
    var endX = Math.random() * window.innerWidth;
    var endY = Math.random() * window.innerHeight;
    var controlX1 = Math.random() * window.innerWidth;
    var controlY1 = Math.random() * window.innerHeight;
    var controlX2 = Math.random() * window.innerWidth;
    var controlY2 = Math.random() * window.innerHeight;

    return `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
}

function getRandomColor() {
    var colors = [
        'rgba(255, 255, 0, 0.8)',  // Fluorescent Yellow
        'rgba(0, 255, 0, 0.8)',    // Fluorescent Green
        'rgba(0, 0, 255, 0.8)',    // Fluorescent Blue
        'rgba(255, 0, 0, 0.8)'     // Fluorescent Red
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function removeAllLights() {
    var svgs = document.querySelectorAll('svg');
    svgs.forEach(svg => svg.remove());
}
