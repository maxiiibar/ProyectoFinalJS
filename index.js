const personajes = document.querySelector(".personajes");
const episodios = document.querySelector(".episodios");
const locaciones = document.querySelector(".locaciones");

const cardsPersonajes = data => {
    const card = data.reduce((acc, element) => {
        return acc + `
            <div class="card-personaje">
                <div class="imagen-personaje">
                    <img src="${element.image || "imagen-no-disponible.png"}">
                </div>
                <div class="contenido-personaje">
                    <h5>${ element.name || "Nombre no disponible"}</h5>
                    <p>Especie: ${element.species || "No disponible"}</p>
                    <p>Genero: ${element.genre || "No disponible"}</p>
                    <p>Estado: ${element.status || "No disponible"}</p>
                </div>
                <div class="fav-personaje">
                    <button class="boton-favorito boton-personaje" id="fav-${element.id}"><i class="fa-solid fa-star fa-lg"></i></button>
                </div>
            </div>
        `
    },"")
    return card
}

const cardsEpisodios = data => {
    const card = data.reduce((acc, element) => {
        return acc + `
            <div class="card-episodio">
                <div class="contenido-episodio">
                    <h5>${ element.name || "Nombre no disponible"}</h5>
                    <p>Episodio: ${element.episode || "No disponible"}</p>
                    <p>Fecha de emisión: ${element.air_date || "No disponible"}</p>
                </div>
                <div class="fav-episodio">
                    <button class="boton-favorito boton-episodio" id="fav-${element.id}"><i class="fa-solid fa-star fa-lg"></i></button>
                </div>
            </div>
        `
    },"")
    return card
}

const cardsLocaciones = data => {
    const card = data.reduce((acc, element) => {
        return acc + `
            <div class="card-locacion">
                <div class="contenido-locacion">
                    <h5>${ element.name || "Nombre no disponible"}</h5>
                    <p>Tipo: ${element.type || "No disponible"}<p>
                    <p>Dimensión: ${element.dimension || "No disponible"}</p>
                </div>
                <div class="fav-locacion">
                    <button class="boton-favorito boton-locacion" id="fav-${element.id}"><i class="fa-solid fa-star fa-lg"></i></button>
                </div>
            </div>
        `
    },"")
    return card
}

const cardsAHtml = (data, funcion, contenedor) => {
    contenedor.innerHTML = funcion(data)
}
/* cardsAHtml(data, cardsPersonajes, personajes) */

const agregarAFav = (clase, fav) => {
    const cards = document.querySelectorAll(clase)
    console.log(cards)
    for  ( let i = 0; i < cards.length; i++ ){
        cards[i].onclick = (e) => {
            const id = e.currentTarget.id.slice(4)
            const memoria = JSON.parse(localStorage.getItem(fav))
            if (!memoria){
                localStorage.setItem(fav,JSON.stringify([id]))
                Toastify({
                    text: "Añadido a favoritos",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
            }
            else{
                const indiceItem = memoria.findIndex( elemento => elemento === id)
                const nuevaMemoria = memoria
                if (indiceItem === -1){
                    nuevaMemoria.push(id)
                    localStorage.setItem(fav,JSON.stringify(nuevaMemoria))
                    Toastify({
                        text: "Añadido a favoritos",
                        duration: 3000,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                          background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                        onClick: function(){} // Callback after click
                      }).showToast();
                }
                else{
                    Toastify({
                        text: "Ya se encuentra en favoritos",
                        duration: 3000,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                          background: "linear-gradient(90deg, rgba(255,76,76,1) 41%, rgba(255,187,91,1) 100%)",
                        },
                        onClick: function(){} // Callback after click
                      }).showToast();
                }
            }
        }
    }
}

fetch (`https://rickandmortyapi.com/api/character`)
.then ( res => res.json() )
.then ( data => {
    cardsAHtml(data.results.slice(0,10), cardsPersonajes, personajes)
    agregarAFav(".boton-personaje","personajes-fav")
})

fetch (`https://rickandmortyapi.com/api/episode`)
.then ( res => res.json() )
.then ( data => {
    cardsAHtml(data.results.slice(0,6), cardsEpisodios, episodios)
    agregarAFav(".boton-episodio","episodios-fav")
})

fetch (`https://rickandmortyapi.com/api/location`)
.then ( res => res.json() )
.then ( data => {
    cardsAHtml(data.results.slice(0,6), cardsLocaciones, locaciones)
    agregarAFav(".boton-locacion","locaciones-fav")
})