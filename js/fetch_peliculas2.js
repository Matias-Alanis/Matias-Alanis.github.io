const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const contenedor = document.getElementById("contenedor");

let pagina = 1.0;
const cargarPeliculas = async()=>{

   try{

    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`)
    console.log(respuesta);

    if(respuesta.status === 200){

        const datos = await respuesta.json();
        console.log(datos);

        let peliculas = [];

         /*<a href="./pages/detalle.html">
                    <div class="pelicula">
                        <img class="imgTendencia" src="./assets/img/peli_1.jpg" alt="The Beekeeper" loading="lazy">
                        <div class="tituloPelicula">
                            <h4>The Beekeeper</h4>
                        </div>
                    </div>
      </a>*/
        datos.results.forEach(pelicula => {
            peliculas += `
            <a href="./pages/detalle.html">
            <div class="peliculas" id="tendenciasContainer" style="width: 20rem;">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="imgTendencia" alt="..." loading="lazy">
                <div class="tituloPelicula">
                    <h4 class="tituloPelicula">${pelicula.title} </h4>
                </div>
            </div>
            </a>
            `;            
        });

        contenedor.innerHTML = peliculas;

    }

   }
   
   catch(error){
    console.log(error.message);

   }

}

cargarPeliculas();