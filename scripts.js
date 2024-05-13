// Datos en el input
const inputBusqueda = document.getElementById('nombreBuscar');
// Aquí van las cartas de los animales
const animalesDiv = document.getElementById('contenedorDeCartas');
// URL de la API
const APIURL = 'https://huachitos.cl/api/animales';
// fetch para mostrar los datos al inicio de la página web
fetch(APIURL)
    .then(response => response.json())
    .then(data => {
        const animales = data.data;
        animales.forEach(animal => {
            const animalDiv = document.createElement('div');
            // if para redactar de una forma correcta el genero de la mascota
            const genero = (animal.genero === 'hembra') ? 'una' : 'un';
            // Estructura del div que contiene las cartas
            animalDiv.innerHTML =   `
                                    <div class="animalito">
                                    <img src="${animal.imagen}" alt="imagen de animalito">
                                        <div class="descripcion_animalito">
                                            <h2>${animal.nombre}</h2>
                                            <p>Hola, soy ${genero} ${animal.genero}, tengo ${animal.edad} y me encuentro en ${animal.estado}, soy de ${animal.region}.</p>
                                        </div>
                                    </div>
                                    `;
            animalesDiv.appendChild(animalDiv);
        });
    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });
// Evento que al escribir una letra realice una busqueda de animales con esa o esas letras en su nombre
inputBusqueda.addEventListener('input', function() {
    // Valor del imput en minusculas para no tener inconsistencias
    const valorBusqueda = inputBusqueda.value.trim().toLowerCase();

    // Realiza una solicitud a la API, la misma que en la primera parte pero esta vez para otros fines y evitar errores
    fetch(APIURL)
      .then(response => response.json())
      .then(data => {
        // Filtro de datos para obtener datos con las letras buscadas en el nombre 
        const animalesFiltrados = data.data.filter(animal => animal.nombre.toLowerCase().includes(valorBusqueda));
        // Mostrar los animales filtrados
        mostrarAnimalesFiltrados(animalesFiltrados);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
});
// Función para mostrar animales filtrados
function mostrarAnimalesFiltrados(animales) {
    // Limpieza de contenido para evitar errores
    animalesDiv.innerHTML = '';
    animales.forEach(animal => {
        const animalDiv = document.createElement('div');
        // if para redactar de una forma correcta el genero de la mascota
        const genero = (animal.genero === 'hembra') ? 'una' : 'un';
        // Estructura del div que contiene las cartas
        animalDiv.innerHTML =   `
                                <div class="animalito">
                                <img src="${animal.imagen}" alt="imagen de animalito">
                                    <div class="descripcion_animalito">
                                        <h2>${animal.nombre}</h2>
                                        <p>Hola, soy ${genero} ${animal.genero}, tengo ${animal.edad} y me encuentro en ${animal.estado}, soy de ${animal.region}.</p>
                                    </div>
                                </div>
                                `;
        animalesDiv.appendChild(animalDiv);
    });
}