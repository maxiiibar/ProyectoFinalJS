const personajes = document.querySelector(".personajes");
const episodios = document.querySelector(".episodios");
const loaciones = document.querySelector(".locaciones");

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
                    <button class="boton-favorito"><i class="fa-solid fa-star fa-lg"></i></button>
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
                    <h6>Episodio: ${element.episode || "No disponible"}</h6>
                    <p>Fecha de emisión: ${element.air_date || "No disponible"}</p>
                </div>
                <div class="fav-episodio">
                    <button class="boton-favorito"><i class="fa-solid fa-star fa-lg"></i></button>
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
fetch (`https://rickandmortyapi.com/api/character`)
.then ( res => res.json() )
.then ( data => cardsAHtml(data.results.slice(0,10), cardsPersonajes, personajes))

fetch (`https://rickandmortyapi.com/api/episode`)
.then ( res => res.json() )
.then ( data => cardsAHtml(data.results.slice(0,12), cardsEpisodios, episodios))