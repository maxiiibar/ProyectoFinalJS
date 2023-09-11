const personajesFavoritos = document.querySelector(".personajes-favoritos");
const episodiosFavoritos = document.querySelector(".episodios-favoritos");
const locacionesFavoritas = document.querySelector(".locaciones-favoritas");
const mainFav = document.querySelector(".main-favoritos")

const barraBusqueda = document.querySelector("#barraDeBusqueda")
const inputBusqueda = document.querySelector("#input-busqueda")
barraBusqueda.addEventListener("submit",(event)=>{
	event.preventDefault()
	mainFav.innerHTML = `
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

const eliminarDeFav = (tipo, funcion, funcionSingular, contenedor, claseBoton, storage, botonTipo) => {
	const cards = document.querySelectorAll(claseBoton)
	for ( let i = 0; i < cards.length; i++){
		cards[i].onclick = (e) => {
			const id = e.currentTarget.id.slice(4)
            console.log(id)
            const memoria = JSON.parse(localStorage.getItem(storage))
            const nuevaMemoria = memoria.filter( elemento => elemento!==id )
            localStorage.setItem(storage,JSON.stringify(nuevaMemoria))
            crearCardsFav(tipo,funcion,funcionSingular,contenedor,claseBoton,storage,botonTipo)
		}
	}
}
const crearCardsFav = (tipo, funcion, funcionSingular, contenedor, claseBoton, storage, botonTipo) => {
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
	        fetch (`https://rickandmortyapi.com/api/${tipo}/${memoriaFav[0]}`)
	        .then ( res => res.json() )
	        .then ( data =>  {
		        cardsAHtml(data, funcionSingular, contenedor, botonTipo)
		        eliminarDeFav(tipo, funcion, funcionSingular, contenedor, claseBoton, storage, botonTipo)
	        })
        }
        else{
            let ids = memoriaFav.reduce((acc, element ) => {return acc + `${element}, `},"")
            ids = ids.substring(0,ids.length-2)
	        fetch (`https://rickandmortyapi.com/api/${tipo}/${ids}`)
	        .then ( res => res.json() )
	        .then ( data =>  {
		        cardsAHtml(data, funcion, contenedor, botonTipo)
		        eliminarDeFav(tipo, funcion, funcionSingular, contenedor, claseBoton, storage, botonTipo)
	        })
        }
    }
}

crearCardsFav("character", cardsPersonajes, singlePCard, personajesFavoritos, ".boton-personaje", "personajes-fav", "boton-eliminar")
crearCardsFav("episode", cardsEpisodios, singleECard, episodiosFavoritos, ".boton-episodio", "episodios-fav", "boton-eliminar")
crearCardsFav("location", cardsLocaciones, singleLCard, locacionesFavoritas, ".boton-locacion", "locaciones-fav", "boton-eliminar")

