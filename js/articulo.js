// Texto predefinido para el artículo con un marcador para contenido dinámico
let articleContent = `
<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Meta datos importantes para la codificación de caracteres y la responsividad -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Noticia</title>

    <!-- Estilos CSS para la apariencia del sitio -->
    <style>
        /* Estilos generales para el cuerpo del documento */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        /* Estilos para el contenedor principal */
        .container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 0.5rem;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Estilos para el encabezado */
        header {
            text-align: center;
            background-image: url("https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/images/4f00c656-4be2-aa44-6e8f-a10d9781deef.jpg");
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            position: relative;
            margin-bottom: 1rem;
        }

        /* Estilos para la imagen del encabezado */
        header img {
            width: 100px;
            height: auto;
            margin-bottom: 1rem;
        }

        /* Estilos para la sección introductoria */
        .intro {
            padding: 2rem;
            background-color: #bee8e4;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 2rem;
        }

        /* Estilos para el título de la introducción */
        .intro h1 {
            margin-top: 0;
            font-size: 2rem;
            color: #004d40;
        }

        /* Estilos para el párrafo de la introducción */
        .intro p {
            font-size: 1rem;
            color: #004d40;
            font-weight: bold;
        }

        /* Estilos para los artículos */
        article {
            margin-bottom: 2rem;
            padding: 1rem;
            background-color: #f5f5f5;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        /* Efecto hover para los artículos */
        article:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        /* Estilos para los títulos de los artículos */
        article h2 {
            margin-top: 0;
            color: #004d40;
            font-size: 1.8rem;
        }

        /* Estilos para el contenedor de imágenes */
        .image-container {
            margin: 1rem 0;
            border-radius: 10px;
            overflow: hidden;
        }

        /* Estilos para las imágenes dentro del contenedor */
        .image-container img {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Estilos para el contenedor de la descripción */
        .description-container {
            text-align: justify;
            margin: 1rem 0;
        }

        /* Estilos para los enlaces dentro del contenedor de descripción */
        .description-container a {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            color: #fff;
            background-color: #004d40;
            font-weight: bold;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
            white-space: nowrap;
        }

        /* Efecto hover para los enlaces */
        .description-container a:hover {
            background-color: #00362e;
        }

        /* Estilos para el pie de página */
        .footer-news {
            text-align: center;
            padding: 2rem;
            background-color: #004d40;
            color: #ffffff;
            border-radius: 0 0 10px 10px;
        }

        /* Estilos para el contenedor de iconos */
        .icons-container {
            margin: 2rem 0;
        }

        /* Estilos para los enlaces de iconos */
        .icons-container a {
            display: inline-block;
            margin: 0 10px;
        }

        /* Estilos para las imágenes de los iconos */
        .icons-container img {
            width: 40px;
            height: 40px;
            transition: transform 0.3s;
            border-radius: 5px;
        }

        /* Efecto hover para los iconos */
        .icons-container img:hover {
            transform: scale(1.2);
        }

        /* Estilos para el contenedor del sitio web */
        .web-container {
            margin-top: 2rem;
            padding: 2rem;
            background-image: url("https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/images/fb04d92c-9fe2-0a25-02ac-3fdd80676278.png");
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            text-align: center;
            color: #fff;
        }

        /* Estilos para los enlaces dentro del contenedor del sitio web */
        .web-container a {
            display: inline-block;
            margin: 0 10px;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
            white-space: nowrap;
        }

        /* Efecto hover para los enlaces del sitio web */
        .web-container a:hover {
            color: #bee8e4;
        }

        /* Media queries para ajustar el diseño en pantallas más pequeñas */
        @media (max-width: 768px) {
            .container {
                padding: 0.5rem;
                margin: 1rem;
            }

            .intro h1 {
                font-size: 1.5rem;
            }

            .intro p {
                font-size: 0.875rem;
            }

            article {
                padding: 1rem;
            }

            article h2 {
                font-size: 1.5rem;
            }

            .description-container p {
                font-size: 0.875rem;
            }

            .description-container a {
                font-size: 0.875rem;
            }

            .icons-container img {
                margin: 10px;
                width: 30px;
                height: 30px;
            }

            .web-container h1 {
                font-size: 1rem;
            }

            .web-container h3 {
                font-size: 1rem;
            }
        }
    </style>
</head>

<body>
    <!-- Contenedor principal del contenido -->
    <div class="container">
        <!-- Encabezado del sitio -->
        <header>
            <img src="https://contraplano.cl/wp-content/uploads/2024/11/logosolopajaronblanco123.png" alt="header" />
        </header>

<!-- CONTENIDO DINÁMICO -->
</html>



<footer><!-- Contenedor de enlace al sitio web -->
<div style="
            text-align: center; 
            background-color: #00362e; 
            color: white; 
            padding: 1.5rem; 
            margin-top: 1rem; 
            border-radius: 10px;
            ">
<h3 style="margin: 0; font-family: Arial, sans-serif;">Visítanos en nuestro sitio web</h3>

<p style="margin: 5px 0; font-family: Arial, sans-serif;">Mantente al tanto de todas las novedades visitando <a href="https://www.contraplano.cl" style="
                    color: #00FFAA; 
                    font-weight: bold; 
                    text-decoration: none;
                ">contraplano.cl</a></p>
<!-- Logo enlazado --><a href="https://www.contraplano.cl" rel="noopener" target="_blank"><img alt="Logo Contraplano" src="https://contraplano.cl/wp-content/uploads/2024/11/logosolopajaronblanco123.png" style="width: 100px; margin-top: 10px;" /> </a></div>

<p>¡No te pierdas ninguna actualización! Síguenos en nuestras redes sociales para estar al tanto de todas las noticias, eventos y contenido exclusivo. Únete a nuestra comunidad en Facebook, Instagram y Twitter, y forma parte de la conversación. ¡Te esperamos!</p>
<!-- Contenedor de iconos de redes sociales -->

<div class="icons-container"><a href="https://www.facebook.com/periodico.contraplano/" rel="noopener" target="_blank"><img alt="Facebook" src="https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/_thumbs/c8b4512c-fe2f-ae9d-0958-bc0b501b0ba6.png" /> </a> <a href="https://www.instagram.com/contraplano_/" rel="noopener" target="_blank"> <img alt="Instagram" src="https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/_thumbs/a3725012-b500-488f-8a7c-584fd5dfda7d.png" /> </a> <a href="https://x.com/ContraplanoTv" rel="noopener" target="_blank"> <img alt="Twitter" src="https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/_thumbs/139fc4e8-1675-e39f-18c5-7485c3934fcd.png" /> </a> <a href="https://www.youtube.com/channel/UCcdmoMteApedm_afbbCcFjw" rel="noopener" target="_blank"> <img alt="YouTube" src="https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/images/9dfc6426-88b3-c8de-b012-b5f8ca03ffd1.png" /> </a> <a href="https://www.tiktok.com/@contraplano_" rel="noopener" target="_blank"> <img alt="TikTok" src="https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/images/bb2e0c6c-1c34-a49c-713a-2eed3808461b.png" /> </a> <a href="https://www.linkedin.com/in/contraplano-medios-de-comunicacion-periodico-tv/" rel="noopener" target="_blank"> <img alt="LinkedIn" src="https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/_thumbs/93610422-da76-24a8-755c-46ba67d4c803.png" /> </a> <a href="https://www.whatsapp.com/channel/0029VaOv2xdBA1eqf5k1Gr3B" rel="noopener" target="_blank"> <img alt="WhatsApp" src="https://mcusercontent.com/7bd6796c3adf05ff4cb6235ff/images/990a6bd0-3a92-092d-a03c-53268705cadf.png" /> </a></div>
</footer>
</div>

`;

// Variable para almacenar el contenido dinámico
let dynamicContent = "";

// Contador de artículos
let articleCount = 0;

// Función para añadir contenido al artículo
function addToArticle() {
    const content = document.getElementById("articleInput").value.trim();

    if (content) {
        // Añadir el contenido al contenido dinámico
        dynamicContent += content + "\n\n\n";

        // Incrementar el contador de artículos
        articleCount++;

        // Actualizar el contador en la interfaz
        updateArticleCount();

        // Limpiar el campo de entrada
        document.getElementById("articleInput").value = "";        // Mostrar el botón para copiar el artículo
        document.getElementById("copyButtonContainer").style.display = "block";

        // Actualizar la vista previa
        updateLivePreview();

        // Mostrar el toast de éxito
        const articleAddedToast = document.getElementById("articleAddedToast");
        articleAddedToast.classList.remove("text-bg-danger");
        articleAddedToast.classList.add("text-bg-success");
        articleAddedToast.querySelector(".toast-body").innerText = "El artículo ha sido añadido exitosamente.";
        const toast = new bootstrap.Toast(articleAddedToast);
        toast.show();

    } else {
        // Mostrar el toast de error
        const articleAddedToast = document.getElementById("articleAddedToast");
        articleAddedToast.classList.remove("text-bg-success");
        articleAddedToast.classList.add("text-bg-danger");
        articleAddedToast.querySelector(".toast-body").innerText = "No se puede añadir un artículo vacío.";
        const toast = new bootstrap.Toast(articleAddedToast);
        toast.show();
    }
}

// Función para actualizar la vista previa del artículo
function updateArticlePreview() {
    const articlePreview = document.getElementById("articlePreview");

    if (dynamicContent.trim() === "") {
        // Mostrar mensaje inicial si no hay contenido
        articlePreview.innerHTML = `
            <div class="text-muted text-center p-4">
                <i class="bi bi-file-text" style="font-size: 3rem; opacity: 0.3;"></i>
                <p class="mt-2">El contenido del artículo aparecerá aquí...</p>
                <small>Escribe en el área de texto para ver la vista previa en tiempo real</small>
            </div>
        `;
    } else {
        // Insertar el contenido dinámico en el marcador del HTML predefinido
        const fullArticle = articleContent.replace("<!-- CONTENIDO DINÁMICO -->", dynamicContent);

        // Crear un iframe para mostrar el HTML renderizado
        articlePreview.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <small class="text-muted">Vista previa del artículo completo</small>
                <span class="badge bg-primary">${articleCount} secciones</span>
            </div>
            <iframe 
                srcdoc="${fullArticle.replace(/"/g, '&quot;')}" 
                style="width: 100%; height: 500px; border: 1px solid #dee2e6; border-radius: 8px;"
                sandbox="allow-same-origin">
            </iframe>
        `;
    }
}

// Función para actualizar la vista previa en tiempo real mientras el usuario escribe
function updateLivePreview() {
    const currentText = document.getElementById("articleInput").value.trim();
    const articlePreview = document.getElementById("articlePreview");

    if (currentText === "" && dynamicContent.trim() === "") {
        // Mostrar mensaje inicial si no hay contenido
        articlePreview.innerHTML = `
            <div class="text-muted text-center p-4">
                <i class="bi bi-file-text" style="font-size: 3rem; opacity: 0.3;"></i>
                <p class="mt-2">El contenido del artículo aparecerá aquí...</p>
                <small>Escribe en el área de texto para ver la vista previa en tiempo real</small>
            </div>
        `;
    } else {
        // Crear contenido temporal combinando lo que ya está añadido y lo que se está escribiendo
        const tempContent = dynamicContent + (currentText ? `
        <article style="border: 2px dashed #007bff; background-color: #f8f9fa; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
            <div style="color: #007bff; font-size: 0.8em; margin-bottom: 0.5rem; font-weight: bold;">📝 Vista previa del texto actual:</div>
            <div style="white-space: pre-wrap; line-height: 1.6; font-family: Georgia, serif;">${currentText.replace(/\n/g, '<br>').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </article>
        ` : "");

        const fullArticle = articleContent.replace("<!-- CONTENIDO DINÁMICO -->", tempContent);

        // Mostrar contador de caracteres actual
        const charCount = currentText.length;
        const wordCount = currentText.split(/\s+/).filter(word => word.length > 0).length;
        const estimatedReadTime = Math.ceil(wordCount / 200); // Asumiendo 200 palabras por minuto

        articlePreview.innerHTML = `
            <iframe 
                srcdoc="${fullArticle.replace(/"/g, '&quot;').replace(/'/g, '&#39;')}" 
                style="width: 100%; height: 500px; border: 1px solid #dee2e6; border-radius: 8px; background-color: white;"
                sandbox="allow-same-origin"
                onload="this.style.opacity = '1';"
                title="Vista previa del artículo">
            </iframe>
            ${currentText && charCount > 0 ? `
                <div class="mt-2 text-center">
                    <small class="text-muted">
                        <i class="bi bi-info-circle"></i> 
                        El texto con borde azul es la vista previa. Presiona "Añadir al Artículo" para guardarlo.
                    </small>
                </div>
            ` : ""}
        `;
    }
}

// Función para actualizar el contador de artículos
function updateArticleCount() {
    const articleCountElement = document.getElementById("articleCount");
    articleCountElement.innerText = `Artículos añadidos: ${articleCount}`;
}

// Función para copiar el artículo al portapapeles
function copyArticle() {
    const fullArticle = articleContent.replace("<!-- CONTENIDO DINÁMICO -->", dynamicContent);

    if (fullArticle) {
        navigator.clipboard.writeText(fullArticle)
            .then(() => {
                alert("El artículo ha sido copiado al portapapeles.");
            })
            .catch(err => {
                console.error("Error al copiar al portapapeles:", err);
                alert("Hubo un error al copiar el artículo.");
            });
    } else {
        alert("No hay contenido en el artículo para copiar.");
    }
}

function downloadArticle() {
    // Generar el artículo completo con el contenido dinámico
    const fullArticle = articleContent.replace("<!-- CONTENIDO DINÁMICO -->", dynamicContent);

    // Crear un blob con el contenido del artículo
    const blob = new Blob([fullArticle], { type: "text/html" });

    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "articulo.html"; // Nombre del archivo descargado
    link.style.display = "none";

    // Agregar el enlace al documento, hacer clic en él y luego eliminarlo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Asignar eventos a los botones
document.getElementById("addArticleBtn").addEventListener("click", addToArticle);
document.getElementById("copyArticleBtn").addEventListener("click", copyArticle);
document.getElementById("downloadArticleBtn").addEventListener("click", downloadArticle);

// Variable para controlar el debounce y el estado de carga
let previewTimeout;
let isUpdatingPreview = false;

// Función debounced para actualizar la vista previa
function debouncedUpdateLivePreview() {
    clearTimeout(previewTimeout);

    // Mostrar indicador de carga si el texto es largo
    const currentText = document.getElementById("articleInput").value.trim();
    if (currentText.length > 100 && !isUpdatingPreview) {
        showPreviewLoading();
    }

    previewTimeout = setTimeout(() => {
        isUpdatingPreview = true;
        updateLivePreview();
        isUpdatingPreview = false;
    }, 300); // Esperar 300ms después de que el usuario deje de escribir
}

// Función para mostrar indicador de carga en la vista previa
function showPreviewLoading() {
    const articlePreview = document.getElementById("articlePreview");
    const currentContent = articlePreview.innerHTML;

    // Solo mostrar loading si no hay contenido o si es el contenido inicial
    if (currentContent.includes("El contenido del artículo aparecerá aquí")) {
        articlePreview.innerHTML = `
            <div class="text-center p-4">
                <div class="spinner-border text-primary" role="status" style="width: 2rem; height: 2rem;">
                    <span class="visually-hidden">Actualizando vista previa...</span>
                </div>
                <p class="mt-2 text-muted">Actualizando vista previa...</p>
            </div>
        `;
    }
}

// Evento para vista previa en tiempo real con debounce
document.getElementById("articleInput").addEventListener("input", debouncedUpdateLivePreview);

// Evento para limpiar la vista previa cuando el textarea pierde el foco (opcional)
document.getElementById("articleInput").addEventListener("blur", function () {
    // Si no hay texto en el input, mostrar solo el contenido ya guardado
    const currentText = document.getElementById("articleInput").value.trim();
    if (currentText === "") {
        updateArticlePreview();
    }
});

// Evento para restaurar la vista previa en tiempo real cuando el textarea recibe el foco
document.getElementById("articleInput").addEventListener("focus", updateLivePreview);

// Mostrar el texto inicial en la vista previa al cargar la página
updateLivePreview();