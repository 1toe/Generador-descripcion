// Variables globales para el conteo de artículos
let loadedArticlesCount = 0;
let totalArticlesCount = 0;

// Función para contar el total de artículos en la base de datos
async function getTotalArticleCount() {
    try {
        const { count, error } = await _supabase
            .from('newsletter')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Error contando artículos totales:', error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error('Error obteniendo conteo total:', error);
        return 0;
    }
}

// Función para actualizar el display del contador automáticamente
function updateCounterDisplay() {
    const counterText = document.getElementById('counter-text');
    const counterBtn = document.getElementById('article-counter-btn');

    if (counterText && counterBtn) {
        // Por si se quiere usar el conteo de artículos cargados y totales.
        // counterText.textContent = `Artículos: ${loadedArticlesCount}/${totalArticlesCount}`;
        counterText.textContent = `Artículos: ${totalArticlesCount}`;
        counterBtn.style.display = 'block';
    }
}

// Función para cargar los artículos del newsletter
async function loadNewsletterArticles() {
    const loadingElement = document.getElementById('loading');
    const contentElement = document.getElementById('newsletter-content');
    const errorElement = document.getElementById('error-message');
    const initialContainer = document.getElementById('initial-container');
    const newsletterContainer = document.getElementById('newsletter-container');

    try {
        loadingElement.style.display = 'block';
        newsletterContainer.style.display = 'none';
        errorElement.style.display = 'none';

        // Obtener todos los artículos del newsletter (article_html) de la tabla 'newsletter'
        const { data: articles, error } = await _supabase
            .from('newsletter')
            .select('article_html')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        if (!articles || articles.length === 0) {
            loadedArticlesCount = 0;
            contentElement.innerHTML = `
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-12 col-md-8">
                                                <div class="alert alert-info text-center">
                                                    <h4>No hay artículos disponibles</h4>
                                                    <p>Aún no se han publicado artículos en el newsletter.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
            initialContainer.style.display = 'none';
            newsletterContainer.style.display = 'block';
        } else {
            // Combinar todo el contenido HTML de los artículos
            let allArticlesHtml = '';
            let validArticleCount = 0;

            articles.forEach(article => {
                if (article.article_html) {
                    // Remover el texto "ARTICULO PARA NEWSLETTER:" de cada artículo
                    let cleanedHtml = article.article_html
                        .replace(/ARTICULO PARA NEWSLETTER:\s*/gi, '')
                        .replace(/ARTÍCULO PARA NEWSLETTER:\s*/gi, '');
                    allArticlesHtml += cleanedHtml;
                    validArticleCount++;
                }
            });

            loadedArticlesCount = validArticleCount;

            // Insertar el contenido combinado en la estructura del artículo
            const finalHtml = articleContent.replace('<!-- CONTENIDO DINÁMICO -->', allArticlesHtml);
            contentElement.innerHTML = finalHtml;
            initialContainer.style.display = 'none';
            newsletterContainer.style.display = 'block';

            document.getElementById('download-btn').style.display = 'block';
        }

        // Obtener conteo total y actualizar display automáticamente
        totalArticlesCount = await getTotalArticleCount();
        updateCounterDisplay();

        // Ocultar loading
        loadingElement.style.display = 'none';

    } catch (error) {
        console.error('Error cargando los artículos del newsletter:', error);

        // Ocultar loading y mostrar error
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.innerHTML = `
                                <strong>Error:</strong> ${error.message || 'No se pudieron cargar los artículos del newsletter.'}
                            `;
    }
}

// Cargar artículos cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    // Esperar un poco para que Supabase se inicialice
    setTimeout(loadNewsletterArticles, 1000);
});

// Función para descargar el newsletter como archivo HTML     
function downloadNewsletter() {
    const contentElement = document.getElementById('newsletter-content');

    if (!contentElement || !contentElement.innerHTML.trim()) {
        alert('No hay contenido para descargar');
        return;
    }

    // Obtener la fecha actual para el nombre del archivo
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const filename = `newsletter_${dateStr}.html`;

    // Crear un blob con el contenido del newsletter
    const htmlContent = contentElement.innerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });

    // Crear enlace de descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Activar descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Limpiar el objeto URL
    URL.revokeObjectURL(link.href);

    // Mostrar mensaje de éxito
    showDownloadSuccess(filename);
}

// Función para mostrar mensaje de descarga exitosa
function showDownloadSuccess(filename) {
    // Crear y mostrar un mensaje de éxito temporal
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    successDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; max-width: 300px;';
    successDiv.innerHTML = `
                    <strong>¡Descarga exitosa!</strong><br>
                    Archivo: ${filename}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}