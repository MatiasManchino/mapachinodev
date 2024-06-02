document.addEventListener('DOMContentLoaded', (event) => {
  // Función para cambiar la clase del menú de navegación en función del desplazamiento
  var myNav = document.querySelector('.main-nav');
  window.onscroll = function () {
    if (
      document.body.scrollTop >= 200 ||
      document.documentElement.scrollTop >= 200
    ) {
      myNav.classList.add('main-nav-inv');
    } else {
      myNav.classList.remove('main-nav-inv');
    }
  };

  // Variables para el menú desplegable
  let menuClose = document.querySelector('.menu-close');
  let navMenu = document.querySelector('.nav-menu');
  let fullScrMenu = document.querySelector('.fl-scr-menu');

  // Función para cerrar el menú
  menuClose.addEventListener('click', () => {
    fullScrMenu.classList.add('none');
  });

  // Función para abrir el menú
  navMenu.addEventListener('click', () => {
    fullScrMenu.classList.remove('none');
  });
});

@media (max-width:680px){
  .column-2.carta{
    grid-template-columns: repeat(1,1fr);
  }
}