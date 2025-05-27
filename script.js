function showModal(message) {
    const modalBody = document.getElementById('modalBody');
    modalBody.textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('copyModal'));
    modal.show();
}

// Función para habilitar o deshabilitar botones y mostrar advertencia
function toggleButtons() {
    const title = document.getElementById('title').value.trim();
    const link = document.getElementById('link').value.trim();
    const buttons = [document.getElementById('redesSocialesBtn'), document.getElementById('youtubeBtn'), document.getElementById('gmailBtn')];
    const warningMessage = document.getElementById('warningMessage');

    // Habilitar botones solo si ambos campos tienen contenido
    const shouldEnable = title !== '' && link !== '';
    buttons.forEach(button => {
        button.disabled = !shouldEnable;
    });

    // Mostrar u ocultar el mensaje de advertencia
    warningMessage.style.display = shouldEnable ? 'none' : 'block';
}

// Escuchar cambios en los campos de entrada
document.getElementById('title').addEventListener('input', toggleButtons);
document.getElementById('link').addEventListener('input', toggleButtons);

// Inicializar el estado de los botones y advertencia al cargar la página
toggleButtons();

document.getElementById('redesSocialesBtn').addEventListener('click', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const link = document.getElementById('link').value;
    const textoPredefinidoRRSS = `${title}. \nLee la noticia completa aquí: ${link} \n👇DÉJANOS TUS COMENTARIOS👇\n#contraplano #contraplanotv #fyp #parati #chile #noticias #noticiashoy #mediosdecomunicacion #periodico`;

    navigator.clipboard.writeText(textoPredefinidoRRSS)
        .then(() => {
            showModal('¡El texto para redes sociales ha sido copiado al portapapeles con éxito!');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
});

document.getElementById('youtubeBtn').addEventListener('click', function (event) {
    event.preventDefault();
    const link = document.getElementById('link').value;
    const textoPredefinidoYT = `Lee la noticia completa aquí: ${link} \n👇Síguenos en nuestras redes sociales: 👇\nFacebook: / periodico.contraplano \nYouTube: / @contraplanomedios \nInstagram: / contraplano_ \nTwitter: / contraplano_ \nTikTok: / contraplano_ \n🔥DÉJANOS TUS COMENTARIOS🔥 \n#contraplano #contraplanotv #fyp #parati #chile #noticias #noticiashoy #mediosdecomunicacion #periodico`;

    navigator.clipboard.writeText(textoPredefinidoYT)
        .then(() => {
            showModal('¡El texto para YouTube ha sido copiado al portapapeles con éxito!');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
});

// Evento para el botón "Gmail"
document.getElementById('gmailBtn').addEventListener('click', function (event) {
    event.preventDefault();
    const link = document.getElementById('link').value;
    const textoPredefinidoGmail = `Muy buenas tardes,

Se envía respuesta relacionada a la publicación solicitada por usted hacia nuestro
medio digital informativo en contraplano.cl

A continuación, y muy necesario es que usted comparta el siguiente post en sus redes
sociales de Facebook, Instagram o Twitter, cualquiera sea el caso para conseguir
impulsar a una mayor audiencia.

Leer más aquí: ${link}	

********
Síguenos en nuestras redes sociales
FACEBOOK: https://www.facebook.com/periodico.contraplano
YOUTUBE: https://www.youtube.com/channel/UCcdmoMteApedm_afbbCcFjw
INSTAGRAM: https://www.instagram.com/contraplano_/
TWITER: https://x.com/ContraplanoTv
********

Agradeciendo dar acuso de recibo, me despido atentamente de usted.

Yasmín Delgado
Coordinadora de Medios contraplano.cl`;

    // Copiar al portapapeles
    navigator.clipboard.writeText(textoPredefinidoGmail)
        .then(() => {
            showModal('¡El texto para Gmail ha sido copiado al portapapeles con éxito!');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
});

// Verificar si Supabase está disponible al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    // Verificar configuración de Supabase
    if (typeof window.SUPABASE_CONFIG !== 'undefined') {
        console.log('Supabase configurado correctamente');
    } else {
        console.warn('Supabase no está configurado en esta página');
    }
});