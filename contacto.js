const mainCont = document.querySelector(".main-contacto")

const barraBusqueda = document.querySelector("#barraDeBusqueda")
const inputBusqueda = document.querySelector("#input-busqueda")
barraBusqueda.addEventListener("submit",(event)=>{
	event.preventDefault()
	mainCont.innerHTML = `
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
    document.querySelector("footer").classList.remove("footerContacto")
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

const inputMail = document.querySelector("#input-mail")
const inputNombre = document.querySelector("#input-nombre")
const inputApellido = document.querySelector("#input-apellido")
const mensajeError = document.querySelector("#mensajeError")
const mensajeValido = document.querySelector("#mensajeValido")
const formulario = document.querySelector(".formCon")
const botonSubmit = document.querySelector("submit-form")

let habilitado = false 

inputMail.addEventListener("input",(() => {
    const arroba = inputMail.value.indexOf('@')
    if (arroba === -1){
        mensajeError.classList.remove("hidden")
        mensajeValido.classList.add("hidden")
        habilitado=false
    }
    else {
        const str = inputMail.value.slice(0,arroba)
        if (str.length<3){
            mensajeError.classList.remove("hidden")
            mensajeValido.classList.add("hidden")
            habilitado=false
        }
        else{
            mensajeError.classList.add("hidden")
            mensajeValido.classList.remove("hidden")
            habilitado=true
        }
    }
}))


formulario.addEventListener("submit",(event)=>{
    event.preventDefault()
    if (habilitado && inputNombre.value!=="" && inputApellido.value!==""){
        Swal.fire({
            icon: 'success',
            title: 'Perfecto',
            text: 'Te registraste con éxito',
            showConfirmButton: false,
          })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal!',
            showConfirmButton: false,
          })
    }
})


