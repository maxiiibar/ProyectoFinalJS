const personajesFavoritos = document.querySelector(".personajes-favoritos");
const episodiosFavoritos = document.querySelector(".episodios-favoritos");
const locacionesFavoritas = document.querySelector(".locaciones-favoritas");

const arrayPFav = JSON.parse(localStorage.getItem("personajes-fav"))
const arrayEFav = JSON.parse(localStorage.getItem("episodios-fav"))
const arrayLFav = JSON.parse(localStorage.getItem("locaciones-fav"))
console.log(arrayPFav)
console.log(arrayEFav)
console.log(arrayLFav)