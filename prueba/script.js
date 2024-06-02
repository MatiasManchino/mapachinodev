    // Desactivar la selección de texto en dispositivos táctiles
    document.addEventListener('DOMContentLoaded', function () {
        var body = document.getElementsByTagName('body')[0];
        body.addEventListener('touchstart', function (e) {
            e.preventDefault();
        });
    });
document.addEventListener('DOMContentLoaded', function () {
    var switchInput = document.querySelector('input[name="switch"]');
    var clickSound = document.getElementById('click-sound');
    
    switchInput.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode');
        // Reproducir el sonido de clic
        clickSound.play();
    });
    
    // Para volver a tocar el sonido al hacer clic en el botón nuevamente
    switchInput.addEventListener('click', function () {
        clickSound.currentTime = 0; // Reinicia el sonido al principio
        clickSound.play();
    });
});

