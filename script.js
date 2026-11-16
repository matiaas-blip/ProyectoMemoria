
/* =========================================
   1. CONTADOR DE MEMORIA
========================================= */

function actualizarContador() {
    const counter = document.getElementById("counter");

    if (!counter) return;

    const fechaInicio = new Date(1976, 2, 24);
    const hoy = new Date();

    let anios = hoy.getFullYear() - fechaInicio.getFullYear();

    // Todavía no se cumplió el aniversario de este año.
    const aniversario = new Date(
        hoy.getFullYear(),
        fechaInicio.getMonth(),
        fechaInicio.getDate()
    );

    if (hoy < aniversario) {
        anios--;
    }

    counter.textContent = `${anios} años`;
}

actualizarContador();


/* =========================================
   2. ARCHIVO HISTÓRICO DE CONTENIDOS
========================================= */

// Estos registros son fichas de contexto histórico,
// no testimonios personales ni citas textuales.

const archivoHistorico = [
    {
        titulo: "El golpe de Estado de 1976",
        fecha: "24 de marzo de 1976",
        categoria: "Dictadura",
        contenido:
            "Las Fuerzas Armadas derrocaron al gobierno constitucional e instauraron una dictadura cívico-militar que ejerció el terrorismo de Estado.",
        palabras: "golpe estado dictadura militar 1976 fuerzas armadas"
    },
    {
        titulo: "Madres y Abuelas de Plaza de Mayo",
        fecha: "Desde 1977",
        categoria: "Organización y memoria",
        contenido:
            "Madres y Abuelas comenzaron a organizarse para reclamar por sus familiares desaparecidos y buscar a los niños apropiados durante la dictadura.",
        palabras: "madres abuelas plaza mayo desaparecidos nietos identidad"
    },
    {
        titulo: "El regreso de la democracia",
        fecha: "10 de diciembre de 1983",
        categoria: "Democracia",
        contenido:
            "Raúl Alfonsín asumió la presidencia y comenzó una nueva etapa democrática después de años de dictadura.",
        palabras: "democracia alfonsin elecciones 1983 libertad"
    },
    {
        titulo: "El informe Nunca Más",
        fecha: "20 de septiembre de 1984",
        categoria: "Documentación",
        contenido:
            "La CONADEP entregó su informe, que reunió documentación y testimonios sobre las desapariciones forzadas y los centros clandestinos de detención.",
        palabras: "nunca mas conadep informe desaparecidos testimonios"
    },
    {
        titulo: "El Juicio a las Juntas",
        fecha: "1985",
        categoria: "Justicia",
        contenido:
            "La justicia argentina juzgó a los integrantes de las Juntas Militares por los crímenes cometidos durante la dictadura.",
        palabras: "juicio juntas militares justicia 1985 condenas"
    },
    {
        titulo: "La reapertura de los juicios",
        fecha: "2003 — 2005",
        categoria: "Justicia",
        contenido:
            "El Congreso anuló las leyes de Punto Final y Obediencia Debida en 2003. En 2005, la Corte Suprema declaró su inconstitucionalidad.",
        palabras: "juicios lesa humanidad leyes impunidad justicia 2003 2005"
    }
];


/* =========================================
   3. GENERACIÓN DE TARJETAS DEL ARCHIVO
========================================= */

const testimonialsContainer = document.getElementById(
    "testimonialsContainer"
);

const noResults = document.getElementById("noResults");

function crearTarjetaArchivo(registro) {
    const article = document.createElement("article");
    article.classList.add("testimonial-card");

    const fecha = document.createElement("span");
    fecha.classList.add("testimonial-date");
    fecha.textContent = registro.fecha;

    const categoria = document.createElement("small");
    categoria.textContent = registro.categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = registro.titulo;

    const contenido = document.createElement("p");
    contenido.textContent = registro.contenido;

    article.appendChild(fecha);
    article.appendChild(categoria);
    article.appendChild(titulo);
    article.appendChild(contenido);

    return article;
}

function mostrarArchivo(registros) {
    if (!testimonialsContainer) return;

    // Limpiamos los resultados anteriores.
    testimonialsContainer.replaceChildren();

    registros.forEach(registro => {
        const tarjeta = crearTarjetaArchivo(registro);
        testimonialsContainer.appendChild(tarjeta);
    });

    // Mostramos un mensaje si no hay coincidencias.
    if (noResults) {
        noResults.hidden = registros.length !== 0;
    }
}

// Cargamos todos los registros al abrir la página.
mostrarArchivo(archivoHistorico);


/* =========================================
   4. BUSCADOR EN TIEMPO REAL
========================================= */

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const busqueda = this.value
            .trim()
            .toLocaleLowerCase("es");

        const resultados = archivoHistorico.filter(registro => {
            const textoCompleto = `
                ${registro.titulo}
                ${registro.fecha}
                ${registro.categoria}
                ${registro.contenido}
                ${registro.palabras}
            `.toLocaleLowerCase("es");

            return textoCompleto.includes(busqueda);
        });

        mostrarArchivo(resultados);
    });
}


/* =========================================
   5. GENERADOR DE TARJETA CONMEMORATIVA
========================================= */

const cardForm = document.getElementById("cardForm");

const cardName = document.getElementById("cardName");
const cardMessage = document.getElementById("cardMessage");

const previewName = document.getElementById("previewName");
const previewMessage = document.getElementById("previewMessage");

const cardPreview = document.getElementById("cardPreview");
const downloadCard = document.getElementById("downloadCard");

if (cardForm) {
    cardForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = cardName.value.trim();
        const mensaje = cardMessage.value.trim();

        // Validación de los campos.
        if (!nombre || !mensaje) {
            alert("Por favor, completá tu nombre y tu mensaje.");
            return;
        }

        if (nombre.length > 50) {
            alert("El nombre no puede superar los 50 caracteres.");
            return;
        }

        if (mensaje.length > 250) {
            alert("El mensaje no puede superar los 250 caracteres.");
            return;
        }

        // Actualizamos la tarjeta utilizando textContent.
        previewName.textContent = nombre;
        previewMessage.textContent = mensaje;

        // Mostramos el botón de descarga.
        downloadCard.hidden = false;

        // Desplazamos la página hacia la tarjeta.
        cardPreview.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}


/* =========================================
   6. DESCARGAR TARJETA COMO IMAGEN PNG
========================================= */

function dibujarTexto(contexto, texto, x, y, anchoMaximo, interlineado) {
    const palabras = texto.split(" ");
    let linea = "";
    let posicionY = y;

    palabras.forEach(palabra => {
        const prueba = linea ? `${linea} ${palabra}` : palabra;
        const ancho = contexto.measureText(prueba).width;

        if (ancho > anchoMaximo && linea !== "") {
            contexto.fillText(linea, x, posicionY);
            linea = palabra;
            posicionY += interlineado;
        } else {
            linea = prueba;
        }
    });

    if (linea) {
        contexto.fillText(linea, x, posicionY);
    }
}

if (downloadCard) {
    downloadCard.addEventListener("click", function () {
        const nombre = previewName.textContent;
        const mensaje = previewMessage.textContent;

        // Creamos un lienzo para dibujar la tarjeta.
        const canvas = document.createElement("canvas");

        canvas.width = 1200;
        canvas.height = 800;

        const contexto = canvas.getContext("2d");

        if (!contexto) {
            alert("No se pudo generar la tarjeta.");
            return;
        }

        // Fondo oscuro.
        contexto.fillStyle = "#191b18";
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        // Marco exterior.
        contexto.strokeStyle = "#e8d7b2";
        contexto.lineWidth = 8;
        contexto.strokeRect(25, 25, 1150, 750);

        // Segundo marco.
        contexto.lineWidth = 2;
        contexto.strokeRect(45, 45, 1110, 710);

        // Fecha.
        contexto.fillStyle = "#e8d7b2";
        contexto.textAlign = "center";
        contexto.font = "bold 30px Georgia";

        contexto.fillText(
            "24 DE MARZO · 1976 — 2026",
            600,
            150
        );

        // Titular.
        contexto.font = "bold 76px Georgia";

        contexto.fillText(
            "MEMORIA,",
            600,
            290
        );

        contexto.fillText(
            "VERDAD Y JUSTICIA",
            600,
            380
        );

        // Mensaje personalizado.
        contexto.font = "italic 34px Georgia";

        dibujarTexto(
            contexto,
            mensaje,
            600,
            490,
            900,
            48
        );

        // Nombre.
        contexto.font = "bold 30px Georgia";

        contexto.fillText(
            nombre,
            600,
            640
        );

        // Cierre.
        contexto.beginPath();
        contexto.moveTo(350, 680);
        contexto.lineTo(850, 680);
        contexto.strokeStyle = "#e8d7b2";
        contexto.lineWidth = 2;
        contexto.stroke();

        contexto.font = "bold 40px Georgia";

        contexto.fillText(
            "NUNCA MÁS",
            600,
            730
        );

        // Convertimos el canvas en una imagen descargable.
        const enlace = document.createElement("a");

        enlace.download = "tarjeta-memoria-1976-2026.png";
        enlace.href = canvas.toDataURL("image/png");

        enlace.click();
    });
}


/* =========================================
   7. FORMULARIO DE REFLEXIONES
========================================= */

const reflectionForm = document.getElementById("reflectionForm");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userReflection = document.getElementById("userReflection");

const formMessage = document.getElementById("formMessage");

if (reflectionForm) {
    reflectionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = userName.value.trim();
        const email = userEmail.value.trim();
        const reflexion = userReflection.value.trim();

        // Limpiamos el mensaje anterior.
        formMessage.textContent = "";
        formMessage.style.color = "";

        // Validamos que los campos no estén vacíos.
        if (!nombre || !email || !reflexion) {
            mostrarMensajeFormulario(
                "Por favor, completá todos los campos.",
                false
            );
            return;
        }

        // Validamos el formato del correo electrónico.
        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!expresionEmail.test(email)) {
            mostrarMensajeFormulario(
                "Ingresá una dirección de correo electrónico válida.",
                false
            );
            return;
        }

        if (nombre.length > 50) {
            mostrarMensajeFormulario(
                "El nombre no puede superar los 50 caracteres.",
                false
            );
            return;
        }

        if (reflexion.length < 10) {
            mostrarMensajeFormulario(
                "Tu reflexión debe tener al menos 10 caracteres.",
                false
            );
            return;
        }

        // Confirmación visual.
        mostrarMensajeFormulario(
            "¡Gracias por compartir tu reflexión!",
            true
        );

        // Limpiamos el formulario.
        reflectionForm.reset();
    });
}

function mostrarMensajeFormulario(mensaje, exitoso) {
    if (!formMessage) return;

    formMessage.textContent = mensaje;

    formMessage.style.color = exitoso
        ? "#315b36"
        : "#793b35";
}
