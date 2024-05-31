// Definimos la URL base de la API de The Movie DB
const API_SERVER = 'https://api.themoviedb.org/3';

// Opciones para las peticiones fetch a la API
const options = {
    method: 'GET', // Método de la petición (GET)
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
        
    }
};

// funcion para cargar pelis en tendencias
const cargarPeliculasTendencia = async(page = 1)=>{
    //peticion fetch a la API para obtener pelis populares
    const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
    const data = await response.json(); 
    const movies = data.results;
    console.log(movies);
    const tendenciasContainer = document.querySelector('.peliculasTendencia .peliculas');
    tendenciasContainer.innerHTML = '';
    
    movies.forEach(movie => {
        // ancla
        const ancla = document.createElement('a');
        ancla.href = './pages/detalle.html';
        //  div pelicula
        const pelicula = document.createElement('div');
        pelicula.classList.add('pelicula');
        //  imagen
        const img = document.createElement('img');
        img.classList.add('imgTendencia');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = movie.title;
        img.loading = 'lazy';
        //  div tituloPelicula
        const tituloPelicula = document.createElement('div');
        tituloPelicula.classList.add('tituloPelicula');
        //  h4
        const titulo = document.createElement('h4');
        titulo.textContent = movie.title;
        // relaciono todos los elementos
        ancla.appendChild(pelicula);
        pelicula.appendChild(img);
        pelicula.appendChild(tituloPelicula);
        tituloPelicula.appendChild(titulo);
        tendenciasContainer.appendChild(ancla);
    });
    //actualizar el data page con la pagina actual
    tendenciasContainer.parentElement.setAttribute('data-page', page);
};

//funcion para cargar pelis aclamadas
const cargarPeliculasAclamadas = async () => {
    // petición fetch a la API para obtener las pelís aclamadas
    const response = await fetch(`${API_SERVER}/movie/top_rated`, options);
    const data = await response.json();
    const movies = data.results; 
    const aclamadasContainer = document.querySelector('.aclamadas'); 

    movies.forEach(movie => {
        //  div peliculaItem
        const peliculaItem = document.createElement('div');
        peliculaItem.classList.add('peliculaItem');
        imagen
        const img = document.createElement('img');
        img.classList.add('imgAclamada');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = movie.title;
        img.loading = 'lazy';
        // relaciono los elementos
        peliculaItem.appendChild(img);
        aclamadasContainer.appendChild(peliculaItem);
    });
};

const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
const seccionTendencias = document.getElementById('tendencias');

// Event listener para el botón "Anterior"
botonAnterior.addEventListener('click', () => {
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    if (currentPage <= 1) return;
    cargarPeliculasTendencia(currentPage - 1);
});

// Event listener para el botón "Siguiente"
botonSiguiente.addEventListener('click', () => {
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    cargarPeliculasTendencia(currentPage + 1);
});

// Ejecutamos las funciones de carga de películas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPeliculasTendencia();
    cargarPeliculasAclamadas();
});