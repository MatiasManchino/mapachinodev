//--------------PANTALLA DE LOAD---------------
let loader = document.getElementById("preloader");

window.addEventListener("load", function(){
  loader.style.display = "none";

});



//--------------BOTON ---------------

jQuery('document').ready(function($){
  //                          boton pa arriba!!
    var subir = $('.ir-arriba');
    
    subir.click(function(e){
      e.preventDefault(); //elimina el comportamiento por defecto
      $('html, body').animate({scrollTop: 0}, 600); 
    });
    
    subir.hide(); 
    
    $(window).scroll(function(){ //elimine la barra de navegación  de inicio
      
      if( $(this).scrollTop() > 320 ) {
        subir.fadeIn();
        $('.main-navigation').addClass("fixedX");
      } else {
        subir.fadeOut();
        $('.main-navigation').removeClass("fixedX");
      }
      
    });
  
    
    var isMobile = window.matchMedia("(min-width: 768px)");
  
    if (isMobile.matches) { 
      $(document).ready(function(){
        $(".wp-image-1698").hover(function(){
          $(this).css("transform", "scale(107%)");
        }, function(){
          $(this).css("transform", "scale(100%)");
        });
      }); 
    
      $(document).ready(function(){
        $(".custom-logo").hover(function(){
          $(this).css("transform", "scale(107%)");
        }, function(){
          $(this).css("transform", "scale(100%)");
        });
      });
  
    }
     
});





//--------------PROGRESS-BAR---------------

let complete = document.querySelector('#complete');

function scrollComplete () {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let clientHeight = document.documentElement.clientHeight;

  let windowsHeight = scrollHeight - clientHeight;
  let porcentaje = scrollTop / windowsHeight * 100;

  complete.style.width = porcentaje + '%';

}

window.addEventListener('scroll', scrollComplete);

//--------------Active Menu---------------

const link =document.querySelectorAll('.menu-link');
const section = document.querySelectorAll('.translation');

window.addEventListener('scroll', () => {
  let current = '';
  //console.log(pageYOffset);
  section.forEach(section =>{
    const sectionTop = section.offsetTop;
    // console.log(sectionTop);
    const sectionHeight = section.clientHeight;
    if(pageYOffset >= (sectionTop - sectionHeight / 9)){
      current = section.getAttribute('id');
    }
  });
  //console.log(current);
  link.forEach( a => {
    a.classList.remove('active-link');
    if(a.classList.contains(current)){
      a.classList.add('active-link');
    }

  })
});

//--------------Menu Burger---------------

document.querySelector(".boton-menu").addEventListener("click", animateBars);
document.addEventListener("touchstart", closeMenu);
let line1__bars = document.querySelector(".linea1__barras");
let line2__bars = document.querySelector(".linea2__barras");
let line3__bars = document.querySelector(".linea3__barras");
let contain__menu = document.querySelector(".main-navigation");

function animateBars() {
  line1__bars.classList.toggle("activelinea1__barras");
  line2__bars.classList.toggle("activelinea2__barras");
  line3__bars.classList.toggle("activelinea3__barras");
  contain__menu.classList.toggle("menu__active");
}

function closeMenu(event) {
  if (!contain__menu.contains(event.target) && !document.querySelector(".boton-menu").contains(event.target)) {
    contain__menu.classList.remove("menu__active");
    line1__bars.classList.remove("activelinea1__barras");
    line2__bars.classList.remove("activelinea2__barras");
    line3__bars.classList.remove("activelinea3__barras");
  }
}

//--------------FUNCION INFORMACION ---------------
document.addEventListener("click", closeMenu);

function toggleInfoPopup() {
  var popup = document.getElementById('infoPopup');
  popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
}

//--------------ANIMACIÓN CON SCROLL ---------------

let ani1 = document.querySelectorAll(".ani1");


function animacionScroll(){
  let scrollTop = document.documentElement.scrollTop;
  for (var i=0; i < ani1.length; i++){
    let alturaAnimado = ani1[i].offsetTop;
    if(alturaAnimado - 700 < scrollTop){
      ani1[i].style.opacity = 1;
      ani1[i].classList.add("ab");
    }
  }
}

window.addEventListener('scroll', animacionScroll);

//--------------GALERIA DE FOTOS slider---------------

// API Swiperjs

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
  
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

});




//--------------FAQ---------------

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
    faq.addEventListener("click", () => {
      faq.classList.toggle("active");
    });
});


//-------------FORMULARIO-----------

var inputs = document.getElementsByClassName('form__input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', function(){
    if(this.value.length>=1) {
      this.nextElementSibling.classList.add('fijar');
    } else {
      this.nextElementSibling.classList.remove('fijar');
    }
  });
}
//------------- VALIDACIÓN FORMULARIO-----------

const formulario = document.getElementById('formulario');
const inputs2 = document.querySelectorAll('#formulario input');

const expresiones = {

/*usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.*/ //Variables sin uso todavía

  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

  asunto:/^[a-zA-ZÀ-ÿ0-9\s\_\-\.\,\:\;]{1,40}$/,
  mensaje:/^[a-zA-ZÀ-ÿ0-9\s\_\-\.\,\:\;]{1,300}$/
}

const campos = {
  nombre: false,
  correo: false,
  asunto: false,
  mensaje: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
    case "mail":
      validarCampo(expresiones.correo, e.target, 'mail');
    
		break;
    case "asunto":
      validarCampo(expresiones.asunto, e.target, 'asunto');
    
		break;
    case "mensaje":
      validarCampo(expresiones.mensaje, e.target, 'mensaje');
    
		break;
	}

}

const validarCampo = (expresion, input, campo) => {
  if(expresion.test(input.value)){
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__incorrecto')
    document.getElementById(`grupo__${campo}`).classList.add('formulario__correcto')
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle')
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle')
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
    campos[campo] = true;
  } else {
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle')
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle')
    document.getElementById(`grupo__${campo}`).classList.add('formulario__incorrecto')
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
    campos[campo] = false;
  }
}

inputs2.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

try{
  formulario.addEventListener('submit', (e) => {

    if(campos.nombre && campos.mail && campos.asunto && campos.mensaje){
      
      document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
    
      document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
      setTimeout(() => {
        document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
      }, 5000);

      document.querySelectorAll('.formulario__correcto').forEach((icono) => {
        icono.classList.remove('formulario__correcto');
      });
      document.getElementById('formu__mensaje').classList.remove('formu__mensaje-activo');
    
    } else {
      document.getElementById('formu__mensaje').classList.add('formu__mensaje-activo');
      e.preventDefault();
    }
  });
} catch{
}
//--------------COOKIES---------------


const botonAceptarCookies = document.getElementById('btn-aceptar-cookies');
const avisoCookies = document.getElementById('aviso-cookies');
const fondoAvisoCookies = document.getElementById('fondo-aviso-cookies');

dataLayer = []; //variable global para acumular capas de datos

//comprobación de aceptacion

if(!localStorage.getItem('cookies-aceptadas')){
	avisoCookies.classList.add('activo');
	fondoAvisoCookies.classList.add('activo');
} else {
	dataLayer.push({'event': 'cookies-aceptadas'});
}

botonAceptarCookies.addEventListener('click', () => {
	avisoCookies.classList.remove('activo');
	fondoAvisoCookies.classList.remove('activo');

	localStorage.setItem('cookies-aceptadas', true);

	dataLayer.push({'event': 'cookies-aceptadas'}); //activa las cookies mediante Tag Manager
});
