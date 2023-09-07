const personajesFavoritos = document.querySelector(".personajes-favoritos");
const episodiosFavoritos = document.querySelector(".episodios-favoritos");
const locacionesFavoritas = document.querySelector(".locaciones-favoritas");

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
            <button class="boton-eliminar boton-personaje" id="del-${element.id}"><i class="fa-solid fa-trash fa-lg"></i></i></button>
        </div>
    </div>
`
return singleP
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

const singleECard = element => {
    const singleE = `
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
return singleE
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

const singleLCard = element => {
    const singleL = `
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
return singleL
}

const eliminarDeFav = (tipo, funcion, funcionSingular, contenedor, claseBoton, storage) => {
	const cards = document.querySelectorAll(claseBoton)
	for ( let i = 0; i < cards.length; i++){
		cards[i].onclick = (e) => {
			const id = e.currentTarget.id.slice(4)
            const memoria = JSON.parse(localStorage.getItem(storage))
            console.log(memoria)
            const nuevaMemoria = memoria.filter( elemento => elemento!==id )
            console.log(nuevaMemoria)
            localStorage.setItem(storage,JSON.stringify(nuevaMemoria))
            crearCardsFav(tipo,funcion,funcionSingular,contenedor,claseBoton,storage)
		}
	}
}

const cardsAHtml = (data, funcion, contenedor) => {
    contenedor.innerHTML = funcion(data)
}
const crearCardsFav = (tipo, funcion, funcionSingular, contenedor, claseBoton, storage) => {
    const memoriaFav = JSON.parse(localStorage.getItem(storage))
    if (!memoriaFav || memoriaFav.length===0){
        if (claseBoton === ".boton-locacion"){
            contenedor.innerHTML = `
                <div class="vacio">
                    <h3>No tienes ${claseBoton.slice(7)}es favoritas. <a href="index.html">Añadir</a></h3>
                </div>            
            `
        }
        else{
            contenedor.innerHTML = `
            <div class="vacio">
                <h3>No tienes ${claseBoton.slice(7)}s favoritos. <a href="index.html">Añadir</a></h3>
            </div>  
            `
        }
    }
	else{
        if (memoriaFav.length===1){
            console.log(memoriaFav[0])
	        fetch (`https://rickandmortyapi.com/api/${tipo}/${memoriaFav[0]}`)
	        .then ( res => res.json() )
	        .then ( data =>  {
		        cardsAHtml(data, funcionSingular, contenedor)
		        eliminarDeFav(tipo, funcion, funcionSingular, contenedor, claseBoton, storage)
	        })
        }
        else{
            let ids = memoriaFav.reduce((acc, element ) => {return acc + `${element}, `},"")
            ids = ids.substring(0,ids.length-2)
            console.log(ids)
	        fetch (`https://rickandmortyapi.com/api/${tipo}/${ids}`)
	        .then ( res => res.json() )
	        .then ( data =>  {
		        cardsAHtml(data, funcion, contenedor)
		        eliminarDeFav(tipo, funcion,funcionSingular, contenedor, claseBoton, storage)
	        })
        }
    }
}

crearCardsFav("character",cardPFav,singlePCard,personajesFavoritos,".boton-personaje","personajes-fav")
crearCardsFav("episode",cardEFav, singleECard,episodiosFavoritos,".boton-episodio","episodios-fav")
crearCardsFav("location",cardLFav, singleLCard, locacionesFavoritas,".boton-locacion","locaciones-fav")