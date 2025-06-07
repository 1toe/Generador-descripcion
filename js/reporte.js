const uploadedFiles = {};
let isGeneratingReport = false; // Control para evitar múltiples clicks

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

    // Recorre los campos de texto
    for (const input of inputs) {
        const labelElement = form.querySelector(`label[for="${input.id}"]`);
        const label = labelElement ? labelElement.innerText : `Campo ${input.id}`;
        let inputValue = input.value.trim() || "No proporcionado";

        // Acortar la URL si es necesario
        if (["youtube", "linkedin", "facebook", "instagram", "tiktok1", "tiktok2", "twitter", "contraPodcast"].includes(input.id)) {
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
            if (fileInput.id === 'seoCapture') {
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
    // Verificar si ya hay un proceso en ejecución
    if (isGeneratingReport) {
        console.log('Ya hay un reporte generándose, ignorando click...');
        return;
    }

    const generateButton = document.querySelector('button[onclick="generateReport()"]');
    const loadingModal = new bootstrap.Modal(document.getElementById("loadingModal"));
    const copyStatusModal = new bootstrap.Modal(document.getElementById("copyStatusModal"));
    let modalTimeout;

    try {
        // Activar estado de procesamiento
        isGeneratingReport = true;
        setReportButtonState(true, generateButton);

        modalTimeout = setTimeout(() => {
            loadingModal.show();
        }, 200);

        // Verificar que todos los campos obligatorios estén llenos
        const requiredFields = [
            { id: 'name', label: 'Nombre' },
            { id: 'newsTitle', label: 'Título de la noticia' },
            { id: 'newsSection', label: 'Bloque' },
            { id: 'contraNews', label: 'Link Noticia Contraplano' }
        ];

        const missingFields = [];
        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element.value.trim()) {
                missingFields.push(field.label);
            }
        }

        if (missingFields.length > 0) {
            clearTimeout(modalTimeout);
            loadingModal.hide();
            showCopyStatusModal(`Por favor completa los siguientes campos obligatorios: ${missingFields.join(', ')}`);
            return;
        }

        // Procesar los datos del reporte y guardar en Supabase
        const reportContent = await processReportData();
        const savedRecord = await saveToSupabase();

        // Si el procesamiento se completa antes de 2 segundos, cancela el temporizador
        clearTimeout(modalTimeout);

        // Ocultar el modal si ya se mostró
        loadingModal.hide();

        if (savedRecord) {
            // Copiar el reporte al portapapeles
            navigator.clipboard.writeText(reportContent)
                .then(() => {
                    showCopyStatusModal("El reporte ha sido copiado al portapapeles correctamente y guardado en la base de datos.");
                })
                .catch(() => {
                    showCopyStatusModal("El reporte ha sido guardado en la base de datos, pero hubo un error al copiarlo al portapapeles.");
                });
        } else {
            // Aunque falle el guardado, seguimos copiando al portapapeles
            navigator.clipboard.writeText(reportContent)
                .then(() => {
                    showCopyStatusModal("El reporte ha sido copiado al portapapeles correctamente, pero no se pudo guardar en la base de datos.");
                })
                .catch(() => {
                    showCopyStatusModal("Hubo errores al copiar el reporte y al guardarlo en la base de datos.");
                });
        }
    } catch (error) {
        console.error("Error al generar el reporte:", error);

        // Ocultar el modal si ya se mostró
        loadingModal.hide();

        showCopyStatusModal("Hubo un error al generar el reporte.");
    } finally {
        // Desactivar estado de procesamiento
        isGeneratingReport = false;
        setReportButtonState(false, generateButton);
    }
    console.log("Nombre:", localStorage.getItem("savedName")); // Para depuración
}

// Función para controlar el estado del botón de generar reporte
function setReportButtonState(processing, buttonElement) {
    if (buttonElement) {
        if (processing) {
            buttonElement.disabled = true;
            buttonElement.innerHTML = '<i class="bi bi-hourglass-split me-1"></i> Generando...';
            buttonElement.classList.remove('btn-success');
            buttonElement.classList.add('btn-secondary');
        } else {
            buttonElement.disabled = false;
            buttonElement.innerHTML = 'Generar reporte';
            buttonElement.classList.remove('btn-secondary');
            buttonElement.classList.add('btn-success');
        }
    }
}

function showCopyStatusModal(message) {
    // Establecer el mensaje dinámico en el modal
    const modalMessage = document.getElementById("copyStatusMessage");
    modalMessage.innerText = message;

    // Mostrar el modal
    const copyStatusModal = new bootstrap.Modal(document.getElementById("copyStatusModal"));
    copyStatusModal.show();
}

// Función para guardar datos en Supabase
async function saveToSupabase() {
    try {
        // Verificar que Supabase esté disponible
        if (typeof _supabase === 'undefined') {
            console.error('Supabase client no está disponible');
            return null;
        }

        if (typeof window.SUPABASE_CONFIG === 'undefined') {
            console.error('SUPABASE_CONFIG no está disponible');
            return null;
        }

        console.log('Usando configuración:', window.SUPABASE_CONFIG.url);

        // Recopilar todos los datos del formulario
        const formData = {
            name: document.getElementById('name').value.trim(),
            news_title: document.getElementById('newsTitle').value.trim(),
            news_section: document.getElementById('newsSection').value,
            contra_news: document.getElementById('contraNews').value.trim(),
            contra_podcast: document.getElementById('contraPodcast').value.trim(),
            youtube: document.getElementById('youtube').value.trim(),
            linkedin: document.getElementById('linkedin').value.trim(),
            facebook: document.getElementById('facebook').value.trim(),
            instagram: document.getElementById('instagram').value.trim(),
            instagram_story: document.getElementById('instagramStory').value.trim(),
            tiktok1: document.getElementById('tiktok1').value.trim(),
            tiktok2: document.getElementById('tiktok2').value.trim(),
            twitter: document.getElementById('twitter').value.trim(),
            image_url: document.getElementById('imageUrl').value.trim(),
            description: document.getElementById('description').value.trim(),
            seo_podcast_url: uploadedFiles['seoPodcast'] ? 'Archivo subido' : null,
            seo_capture_url: uploadedFiles['seoCapture'] ? 'Archivo subido' : null
        };        // Insertar en la tabla reportes


        const { data: reporteData, error: reporteError } = await _supabase
            .from('reportes')
            .insert([formData])
            .select();

        if (reporteError) {
            console.error('Error al insertar en reportes:', reporteError);
            return null;
        }

        console.log('Reporte guardado:', reporteData);

        // Generar el HTML del newsletter
        const articleHtml = await generateNewsletterHTML(formData);        // Insertar en la tabla newsletter
        const { data: newsletterData, error: newsletterError } = await _supabase
            .from('newsletter')
            .insert([{
                reporte_id: reporteData[0].id,
                article_html: articleHtml,
                article_title: formData.news_title,
                block_section: formData.news_section
            }])
            .select();

        if (newsletterError) {
            console.error('Error al insertar en newsletter:', newsletterError);
            return reporteData[0];
        } console.log('Newsletter guardado:', newsletterData);
        return reporteData[0];

    } catch (error) {
        console.error('Error en saveToSupabase:', error);
        return null;
    }
}

// Función para generar el HTML del newsletter con los datos del formulario
async function generateNewsletterHTML(formData) {
    const selectedBlock = formData.news_section;
    const title = formData.news_title || "Título no proporcionado";
    const link = formData.contra_news;
    const imageUrl = formData.image_url;
    const description = formData.description || "Descripción no proporcionada";

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
            ${description}
        </p>
        <a target="_blank" href="${link || "#"}" class="button">Continuar leyendo</a>
    </div>
</article>
    `;

    return articleHtml;
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
