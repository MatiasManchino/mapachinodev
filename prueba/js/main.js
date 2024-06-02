
//**********************************************************************************
document.addEventListener("DOMContentLoaded", function() {
    // URL de la API de tarot
    const apiUrl = "https://tarot-api-es.vercel.app/api/v1/cards/type/mayor";
    const cards = document.querySelector(".cards");
    const images = document.querySelectorAll(".card__img");
    const backgrounds = document.querySelectorAll(".card__bg");
    const range = 20;
    
    const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
    //const calcValue = (a, b) => (a/b*range-range/2).toFixed(1) // thanks @alice-mx
    
    let timeout;
    document.addEventListener('mousemove', ({x, y}) => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      	
      timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(y, window.innerHeight);
        const xValue = calcValue(x, window.innerWidth);
    
        cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
    
        [].forEach.call(images, (image) => {
          image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
        });
    
        [].forEach.call(backgrounds, (background) => {
          background.style.backgroundPosition = `${xValue*.45}px ${-yValue*.45}px`;
        })
    	})
    }, false);
    // Función para obtener una carta aleatoria del tarot
    function obtenerCartaAleatoria() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Seleccionar una carta aleatoria del conjunto de cartas devueltas por la API
          const randomIndex = Math.floor(Math.random() * data.cards.length);
          const randomCard = data.cards[randomIndex];
          
          // Mostrar la carta aleatoria en el HTML
          const output = document.getElementById("output");
          output.innerHTML = `
            <h2>${randomCard.name}</h2>
            <div class="card card__one">
                <div class="card__bg"></div>
                <img class="card__img" src="${randomCard.image}" alt="${randomCard.name}">
                <div class="card__text">
                    <p class="card__title">${randomCard.meaning_up}</p>
                </div>
            </div>
          `;
            const images = document.querySelectorAll(".card__img");
            const backgrounds = document.querySelectorAll(".card__bg");
            const range = 20;
            
            const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
            //const calcValue = (a, b) => (a/b*range-range/2).toFixed(1) // thanks @alice-mx
            
            let timeout;
            document.addEventListener('mousemove', ({x, y}) => {
              if (timeout) {
                window.cancelAnimationFrame(timeout);
              }
              	
              timeout = window.requestAnimationFrame(() => {
                const yValue = calcValue(y, window.innerHeight);
                const xValue = calcValue(x, window.innerWidth);
            
                cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
            
                [].forEach.call(images, (image) => {
                  image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
                });
            
                [].forEach.call(backgrounds, (background) => {
                  background.style.backgroundPosition = `${xValue*-.45}px ${-yValue*-.45}px`;
                })
            	})
            }, false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    // Generar una carta aleatoria al cargar la página
    obtenerCartaAleatoria();
  
    // Agregar evento de clic al botón de generación
    document.getElementById('generateButton').addEventListener('click', () => {
      obtenerCartaAleatoria();
    });
  });
  
