const personajesFavoritos = document.querySelector(".personajes-favoritos");
const episodiosFavoritos = document.querySelector(".episodios-favoritos");
const locacionesFavoritas = document.querySelector(".locaciones-favoritas");

const arrayPFav = JSON.parse(localStorage.getItem("personajes-fav"))
const arrayEFav = JSON.parse(localStorage.getItem("episodios-fav"))
const arrayLFav = JSON.parse(localStorage.getItem("locaciones-fav"))

const cardPFav = (elements) => {
	const PFav = elements.reduce (( acc, element) => {
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
                    <button class="boton-eliminar boton-personaje" id="del-${element.id}"><i class="fa-solid fa-trash fa-lg"></i></i></button>
                </div>
            </div>
        `
	},"")
	return PFav
}

const cardEFav = data => {
    const Efav = data.reduce((acc, element) => {
        return acc + `
            <div class="card-episodio">
                <div class="contenido-episodio">
                    <h5>${ element.name || "Nombre no disponible"}</h5>
                    <p>Episodio: ${element.episode || "No disponible"}</p>
                    <p>Fecha de emisión: ${element.air_date || "No disponible"}</p>
                </div>
                <div class="fav-episodio">
                    <button class="boton-eliminar boton-episodio" id="del-${element.id}"><i class="fa-solid fa-trash fa-lg"></i></button>
                </div>
            </div>
        `
    },"")
    return Efav
}

const cardLFav = data => {
    const LFav = data.reduce((acc, element) => {
        return acc + `
            <div class="card-locacion">
                <div class="contenido-locacion">
                    <h5>${ element.name || "Nombre no disponible"}</h5>
                    <p>Tipo: ${element.type || "No disponible"}<p>
                    <p>Dimensión: ${element.dimension || "No disponible"}</p>
                </div>
                <div class="fav-locacion">
                    <button class="boton-eliminar boton-locacion" id="del-${element.id}"><i class="fa-solid fa-trash fa-lg"></i></i></button>
                </div>
            </div>
        `
    },"")
    return LFav
}

const eliminarDeFav = (clase, fav) => {
	const cards = document.querySelectorAll(clase)
	for ( let i = 0; i < cards.length; i++){
		cards[i].onclick = (e) => {
			const id = e.currentTarget.id.slice(4)
			console.log(id)
            const memoria = JSON.parse(localStorage.getItem(fav))
		}
	}
}

const cardsAHtml = (data, funcion, contenedor) => {
    contenedor.innerHTML = funcion(data)
}
const crearCardsFav = (vector, tipo, funcion, contenedor, claseBoton, storage) => {
	const ids = vector.reduce ((acc, element ) => {return acc + `${element}, `},"")
	fetch (`https://rickandmortyapi.com/api/${tipo}/${ids}`)
	.then ( res => res.json() )
	.then ( data =>  {
		cardsAHtml(data, funcion, contenedor)
		eliminarDeFav(claseBoton, storage)
	})
}
crearCardsFav(arrayPFav,"character",cardPFav,personajesFavoritos,".boton-personaje","personajes-fav")
crearCardsFav(arrayEFav,"episode",cardEFav,episodiosFavoritos,".boton-episodio","episodios-fav")
crearCardsFav(arrayLFav,"location",cardLFav,locacionesFavoritas,".boton-locacion","locaciones-fav")