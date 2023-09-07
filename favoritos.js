const personajesFavoritos = document.querySelector(".personajes-favoritos");
const episodiosFavoritos = document.querySelector(".episodios-favoritos");
const locacionesFavoritas = document.querySelector(".locaciones-favoritas");

const arrayPFav = JSON.parse(localStorage.getItem("personajes-fav"))
const arrayEFav = JSON.parse(localStorage.getItem("episodios-fav"))
const arrayLFav = JSON.parse(localStorage.getItem("locaciones-fav"))

const cardPFav = (elements) => {
	conts PFav = elements.reduce (( acc, element) => {
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
	return PFav
}

const generarCardsFav = (vector, tipo, funcion, contenedor) => {
	const nodos = []
	vector.forEach( (elemento) => {
		fetch (`https://rickandmortyapi.com/api/${tipo}/${elemento}`)
		.then ( res => res.json() )
		.then ( data => nodos.push(data) )
	})
	contenedor.innerHTML = funcion(nodos)
}

generarCardsFav (arrayPFav, "character", cardPFav, personajesFavoritos)