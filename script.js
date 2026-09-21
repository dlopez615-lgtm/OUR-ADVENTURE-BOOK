// Activa la canción desde el primer clic en cualquier parte de la página
document.addEventListener('click', function iniciarMusica() {
    const musica = document.getElementById('musica-fondo');
    if (musica && musica.paused) {
        musica.volume = 0.4; // Ajusta el volumen a tu gusto (0.1 suave - 1.0 fuerte)
        musica.play().catch(err => console.log("Esperando interacción:", err));
    }
}, { once: true });

document.addEventListener("DOMContentLoaded", () => {
    const pantallaPortada = document.getElementById("portada");
    const pantallaContenido = document.getElementById("contenido");
    const btnIniciar = document.getElementById("btn-iniciar");
    const btnVolver = document.getElementById("btn-volver");
    
    const paginas = document.querySelectorAll(".pagina");
    let paginaActual = 0;

    // Abrir el libro desde la portada
    btnIniciar.addEventListener("click", () => {
        pantallaPortada.classList.add("oculto");
        pantallaContenido.classList.remove("oculto");
        mostrarPagina(0);
    });

    // Volver a la portada
    btnVolver.addEventListener("click", () => {
        pantallaContenido.classList.add("oculto");
        pantallaPortada.classList.remove("oculto");
    });

    // Función para mostrar la página actual
    function mostrarPagina(index) {
        paginas.forEach((pag, i) => {
            pag.classList.toggle("activa", i === index);
        });
        paginaActual = index;
        actualizarBotones();
    }

    // Configurar eventos en los botones de "Anterior" y "Siguiente"
    function actualizarBotones() {
        paginas.forEach((pag, i) => {
            const btnAnt = pag.querySelector(".btn-anterior");
            const btnSig = pag.querySelector(".btn-siguiente");

            if (btnAnt) {
                btnAnt.disabled = (i === 0);
                btnAnt.onclick = () => {
                    if (paginaActual > 0) mostrarPagina(paginaActual - 1);
                };
            }

            if (btnSig) {
                btnSig.disabled = (i === paginas.length - 1);
                btnSig.onclick = () => {
                    if (paginaActual < paginas.length - 1) mostrarPagina(paginaActual + 1);
                };
            }
        });
    }

    // Permitir cambiar páginas con las flechas del teclado (← / →)
    document.addEventListener("keydown", (e) => {
        if (pantallaContenido.classList.contains("oculto")) return;

        if (e.key === "ArrowRight" && paginaActual < paginas.length - 1) {
            mostrarPagina(paginaActual + 1);
        } else if (e.key === "ArrowLeft" && paginaActual > 0) {
            mostrarPagina(paginaActual - 1);
        }
    });
});