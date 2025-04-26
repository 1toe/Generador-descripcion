const uploadedFiles = {};

async function shortenUrl(inputId) {
    const apiKey = "AVFDmGhWhf2woGmBL4Nv83ll4BlDShzsfIs9gA4IFo9SaP0Zboi6knfOSZFW"; 
    const inputElement = document.getElementById(inputId);
    const longUrl = inputElement.value.trim();

    if (!longUrl) return ""; 

    try {
        const response = await fetch("https://api.tinyurl.com/create", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: longUrl })
        });

        const data = await response.json();

        if (response.ok && data.data && data.data.tiny_url) {
            inputElement.value = data.data.tiny_url;
            console.log(`URL acortada para ${inputId}: ${data.data.tiny_url}`);
            return data.data.tiny_url; 
        } else {
            console.error(`Error al acortar ${inputId}:`, data.message || "Sin mensaje");
            return longUrl; 
        }
    } catch (error) {
        console.error(`Error en shortenUrl(${inputId}):`, error);
        return longUrl;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("savedName");
    if (savedName) {
        const nameInput = document.getElementById("name");
        if (nameInput) {
            nameInput.value = savedName; // Rellena el campo con el nombre guardado
        }
    }
});


document.getElementById("name").addEventListener("input", (event) => {
    const nameValue = event.target.value.trim();
    if (nameValue) {
        localStorage.setItem("savedName", nameValue); // Guarda el nombre en localStorage
    }
});

document.getElementById("newsTitle").addEventListener("input", (event) => {
    const input = event.target;
    input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
});


function updateFileName(inputId) {
    const input = document.getElementById(inputId);
    const label = document.getElementById(inputId + 'Label');

    if (input.files.length > 0) {
        // Almacena el archivo seleccionado en la variable temporal
        uploadedFiles[inputId] = input.files[0];

        // Actualiza el texto del botón con el nombre del archivo
        label.innerHTML = `<i class="bi bi-file-earmark"></i> ${input.files[0].name}`;
        label.classList.remove('btn-primary');
        label.classList.add('btn-success'); // Cambia el color a verde
    } else if (uploadedFiles[inputId]) {
        // Si no hay archivo seleccionado pero hay uno almacenado, restaura el nombre anterior
        label.innerHTML = `<i class="bi bi-file-earmark"></i> ${uploadedFiles[inputId].name}`;
        label.classList.remove('btn-primary');
        label.classList.add('btn-success'); // Mantiene el color verde
    } else {
        // Si no hay archivo seleccionado y no hay uno almacenado, restaura el estado inicial
        label.innerHTML = `<i class="bi bi-upload"></i> Seleccionar archivo`;
        label.classList.remove('btn-success');
        label.classList.add('btn-primary'); // Restaura el color original
    }

    console.log(`Archivo seleccionado para ${inputId}:`, uploadedFiles[inputId] ? uploadedFiles[inputId].name : "Ninguno");
}

async function uploadToCloudinary(file, folder) {
    const cloudName = 'dkyohajjd';
    const uploadPreset = 'my_preset';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    console.log('Subiendo archivo a Cloudinary:', file.name);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok && result.secure_url) {
            return result.secure_url;
        } else {
            if (!result.secure_url) {
                throw new Error('No se pudo obtener la URL segura de Cloudinary');
            }
            throw new Error(result.error.message || 'Error al subir la imagen a Cloudinary');
        }
    } catch (error) {
        console.error('Error al subir a Cloudinary:', error);
        return 'Error al subir la imagen';
    }
}

async function processReportData() {
    const form = document.getElementById('reportForm');
    const inputs = form.querySelectorAll('input[type="text"]');
    const fileInputs = form.querySelectorAll('input[type="file"]');
    const title = document.getElementById('newsTitle').value.trim() || "Título no proporcionado";
    let report = '';

    // Agrega la fecha actual al inicio del reporte
    const currentDate = new Date().toLocaleDateString(); // Fecha en formato local
    report += `Reporte ${currentDate}\n\n`; // Espacio adicional entre la fecha y el contenido

    // Agrega el bloque seleccionado debajo del título de la noticia
    const blockLabelElement = document.querySelector(`label[for="newsSection"]`);
    const blockLabel = blockLabelElement ? blockLabelElement.innerText : "Bloque";
    const selectedBlock = document.getElementById('newsSection').value;
    report += `${blockLabel.toUpperCase()}\n${selectedBlock.toUpperCase()}\n\n`; // Se asegura que el bloque esté en mayúsculas

    // Define el título de la noticia
  

    // Recorre los campos de texto
    for (const input of inputs) {
        const labelElement = form.querySelector(`label[for="${input.id}"]`);
        const label = labelElement ? labelElement.innerText : `Campo ${input.id}`;
        let inputValue = input.value.trim() || "No proporcionado";

        // Acortar la URL si es necesario
        if ([ "youtube", "linkedin", "facebook", "instagram", "tiktok1", "tiktok2", "twitter", "contraPodcast"].includes(input.id)) {
            inputValue = await shortenUrl(input.id); // Guarda el valor acortado
        }

        // Agrega el valor al reporte
        report += `${label}\n${inputValue}\n\n`;
    }

    // Recorre los campos de archivo
    for (const fileInput of fileInputs) {
        const label = form.querySelector(`label[for="${fileInput.id}"]`).innerText;
        const file = fileInput.files[0];

        if (file) {
            let folder = '';
            if (fileInput.id === 'instagramStory') {
                folder = 'historias';
            } else if (fileInput.id === 'seoCapture') {
                folder = 'SEO';
            } else if (fileInput.id === 'seoPodcast') {  // Agregado para SEO Podcast
                folder = 'SEO Podcast';
            }

            const imageUrl = await uploadToCloudinary(file, folder);
            report += `${label}\n${imageUrl}\n\n`; // Añade espacio adicional entre campos
        } else {
            report += `${label}\nNo se subió ningún archivo\n\n`; // Añade espacio adicional entre campos
        }
    }

    // Agregar el bloque HTML dinámico al final del reporte
    const link = document.getElementById('contraNews').value.trim(); // Toma el enlace del formulario
    const imageUrl = document.getElementById('imageUrl').value.trim(); // URL de la imagen fija

    const articleHtml = `
    ARTICULO PARA NEWSLETTER:

<!-- ${selectedBlock} -->

<article>
    <h2>${title}</h2>
    <div class="image-container">
        <a target="_blank" href="${link || "#"}">
            <img src="${imageUrl}" alt="Imagen del artículo" />
        </a>
    </div>
    <div class="description-container">
        <p>
            ${document.getElementById('description').value.trim() || "Descripción no proporcionada"}
        </p>
        <a target="_blank" href="${link || "#"}" class="button">Continuar leyendo</a>
    </div>
</article>
    `;

    report += `\n${articleHtml}\n`;

    return report;
}

async function generateReport() {
    const loadingModal = new bootstrap.Modal(document.getElementById("loadingModal"));
    const copyStatusModal = new bootstrap.Modal(document.getElementById("copyStatusModal"));
    let modalTimeout;

    try {
        modalTimeout = setTimeout(() => {
            loadingModal.show();
        }, 200); 

        // Procesar los datos del reporte (manteniendo tu lógica actual)
        const reportContent = await processReportData();

        // Si el procesamiento se completa antes de 2 segundos, cancela el temporizador
        clearTimeout(modalTimeout);

        // Ocultar el modal si ya se mostró
        loadingModal.hide();

        // Copiar el reporte al portapapeles
        navigator.clipboard.writeText(reportContent)
            .then(() => {
                showCopyStatusModal("El reporte ha sido copiado al portapapeles correctamente.");
            })
            .catch(() => {
                showCopyStatusModal("Hubo un error al copiar el reporte al portapapeles.");
            });
    } catch (error) {
        console.error("Error al generar el reporte:", error);

        // Ocultar el modal si ya se mostró
        loadingModal.hide();

        showCopyStatusModal("Hubo un error al generar el reporte.");
    }
    console.log("Nombre:",localStorage.getItem("savedName") ); // Para depuración
}

function showCopyStatusModal(message) {
    // Establecer el mensaje dinámico en el modal
    const modalMessage = document.getElementById("copyStatusMessage");
    modalMessage.innerText = message;

    // Mostrar el modal
    const copyStatusModal = new bootstrap.Modal(document.getElementById("copyStatusModal"));
    copyStatusModal.show();
}

// Variable para almacenar el contenido dinámico
let dynamicContent = "";

// Contador de artículos
let articleCount = 0;

// Función para añadir contenido al artículo
function addToArticle() {
    const articleInput = document.getElementById("articleInput");
    const content = articleInput.value.trim();

    if (content) {
        // Añadir el contenido al contenido dinámico
        dynamicContent += `
        <article>
            <h2>Nuevo Contenido</h2>
            <div class="description-container">
                <p>${content}</p>
            </div>
        </article>
        `;

        // Incrementar el contador de artículos
        articleCount++;

        // Actualizar el contador en la interfaz
        updateArticleCount();

        // Limpiar el campo de entrada
        articleInput.value = "";

        // Mostrar el botón para copiar el artículo
        document.getElementById("copyButtonContainer").style.display = "block";

        // Actualizar la vista previa
        updateArticlePreview();

        // Notificar al usuario
        alert("Contenido añadido al artículo.");
    } else {
        alert("Por favor, escribe algo antes de añadir.");
    }
}

// Función para actualizar la vista previa del artículo
function updateArticlePreview() {
    const articlePreview = document.getElementById("articlePreview");

    // Insertar el contenido dinámico en el marcador del HTML predefinido
    const fullArticle = articleContent.replace("<!-- CONTENIDO DINÁMICO -->", dynamicContent);

    // Mostrar el artículo completo en la vista previa
    articlePreview.innerText = fullArticle;
}

// Función para actualizar el contador de artículos
function updateArticleCount() {
    const articleCountElement = document.getElementById("articleCount");
    articleCountElement.innerText = `Artículos añadidos: ${articleCount}`;
}

// Función para copiar el artículo al portapapeles
function copyArticle() {
    // Generar el artículo completo con el contenido dinámico
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

// Asignar eventos a los botones
document.getElementById("addArticleBtn").addEventListener("click", addToArticle);
document.getElementById("copyArticleBtn").addEventListener("click", copyArticle);

// Mostrar el texto inicial en la vista previa al cargar la página
updateArticlePreview();
;
