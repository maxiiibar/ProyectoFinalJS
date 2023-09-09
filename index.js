const personajes = document.querySelector(".personajes")
const episodios = document.querySelector(".episodios")
const locaciones = document.querySelector(".locaciones")
const mainIndex = document.querySelector("main")
const presentacion = document.querySelector("#presentacion")

const barraBusqueda = document.querySelector("#barraDeBusqueda")
const inputBusqueda = document.querySelector("#input-busqueda")
barraBusqueda.addEventListener("submit",(event)=>{
	event.preventDefault()
	presentacion.innerHTML = ""
	mainIndex.innerHTML = `
		<section class="encontrados container">
			<h3>PERSONAJES</h3>
			<div class="boxPersonajes"></div>
		</section>
		<section class="encontrados container">
			<h3>EPISODIOS</h3>
			<div class="boxEpisodios"></div>
		</section>
		<section class="encontrados container">
			<h3>LOCACIONES</h3>
			<div class="boxLocaciones"></div>
		</section>
	`
	presentacion.classList.remove("presentacion");
	presentacion.classList.add("nuevoHeight")
	
	const contenedorPersonajes = document.querySelector(".boxPersonajes")
	const contenedorEpisodios = document.querySelector(".boxEpisodios")
	const contenedorLocaciones = document.querySelector(".boxLocaciones")
	
	
	fetch (`https://rickandmortyapi.com/api/character/?name=${inputBusqueda.value.toLowerCase()}`)
	.then ( res => res.json() )
	.then ( data => {
		if(data.error){
			contenedorPersonajes.innerHTML = `
            <div class="vacio">
                <p>No se encontraron personajes con este nombre</p>
            </div>  
            `
		}
		else{
			if (data.results.length===1){
				cardsAHtml(data.results[0], singlePCard, contenedorPersonajes,"boton-favorito")
			}
			else{
				cardsAHtml(data.results,cardsPersonajes,contenedorPersonajes,"boton-favorito")
			}
		}
        agregarAFav(".boton-personaje","personajes-fav")
	})
	
	fetch (`https://rickandmortyapi.com/api/episode/?name=${inputBusqueda.value.toLowerCase()}`)
	.then ( res => res.json() )
	.then ( data => {
		if(data.error){
			contenedorEpisodios.innerHTML = `
            <div class="vacio">
                <p>No se encontraron episodios con este nombre</p>
            </div>  
            `
		}
		else{
			if (data.results.length===1){
				cardsAHtml(data.results[0], singleECard, contenedorEpisodios,"boton-favorito")
			}
			else{
				cardsAHtml(data.results,cardsEpisodios,contenedorEpisodios,"boton-favorito")
			}
		}
        agregarAFav(".boton-episodio","episodios-fav")
	})
	
	fetch (`https://rickandmortyapi.com/api/location/?name=${inputBusqueda.value.toLowerCase()}`)
	.then ( res => res.json() )
	.then ( data => {
		if(data.error){
			contenedorLocaciones.innerHTML = `
            <div class="vacio">
                <p>No se encontraron locaciones con este nombre</p>
            </div>  
            `
		}
		else{
			if (data.results.length===1){
				cardsAHtml(data.results[0], singleLCard, contenedorLocaciones,"boton-favorito")
			}
			else{
				cardsAHtml(data.results,cardsLocaciones,contenedorLocaciones,"boton-favorito")
			}
		}
        agregarAFav(".boton-locacion","locaciones-fav")
	})
})

/* const cardsPersonajes = data => {
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

const singlePCard = element => {
    const singleP = `
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
    return singleP
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

const singleECard = element => {
    const singleE = `
        <div class="card-episodio">
            <div class="contenido-episodio">
                <h5>${ element.name || "Nombre no disponible"}</h5>
                <p>Episodio: ${element.episode || "No disponible"}</p>
                <p>Fecha de emisión: ${element.air_date || "No disponible"}</p>
            </div>
            <div class="fav-episodio">
                <button class="boton-favorito boton-personaje" id="fav-${element.id}"><i class="fa-solid fa-star fa-lg"></i></button>
            </div>
        </div>
    `
    return singleE
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

const singleLCard = element => {
    const singleL = `
        <div class="card-locacion">
            <div class="contenido-locacion">
                <h5>${ element.name || "Nombre no disponible"}</h5>
                <p>Tipo: ${element.type || "No disponible"}<p>
                <p>Dimensión: ${element.dimension || "No disponible"}</p>
            </div>
            <div class="fav-locacion">
                <button class="boton-favorito boton-personaje" id="fav-${element.id}"><i class="fa-solid fa-star fa-lg"></i></button>
            </div>
        </div>
    `
    return singleL
} */

fetch (`https://rickandmortyapi.com/api/character`)
.then ( res => res.json() )
.then ( data => {
    cardsAHtml(data.results.slice(0,10), cardsPersonajes, personajes,"boton-favorito")
    agregarAFav(".boton-personaje","personajes-fav")
})

fetch (`https://rickandmortyapi.com/api/episode`)
.then ( res => res.json() )
.then ( data => {
    cardsAHtml(data.results.slice(0,6), cardsEpisodios, episodios,"boton-favorito")
    agregarAFav(".boton-episodio","episodios-fav")
})

fetch (`https://rickandmortyapi.com/api/location`)
.then ( res => res.json() )
.then ( data => {
    cardsAHtml(data.results.slice(0,6), cardsLocaciones, locaciones,"boton-favorito")
    agregarAFav(".boton-locacion","locaciones-fav")
})

