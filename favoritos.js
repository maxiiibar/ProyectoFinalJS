const personajesFavoritos = document.querySelector(".personajes-favoritos");
const episodiosFavoritos = document.querySelector(".episodios-favoritos");
const locacionesFavoritas = document.querySelector(".locaciones-favoritas");

const arrayPFav = JSON.parse(localStorage.getItem("personajes-fav"))
const arrayEFav = JSON.parse(localStorage.getItem("episodios-fav"))
const arrayLFav = JSON.parse(localStorage.getItem("locaciones-fav"))

const generarCardsFav = (vector, tipo) => {
	vector.forEach( (elemento) => {
		fetch (`https://rickandmortyapi.com/api/${tipo}/${elemento}`)
		.then ( res => res.json() )
		.then ( data => console.log(data) )
	})
}