if (typeof window.SUPABASE_CONFIG === 'undefined') {
    console.error('SUPABASE_CONFIG no está disponible. Asegúrate de cargar config.js antes que supabase.js');
    throw new Error('Configuración de Supabase no encontrada');
}

const { createClient } = supabase

const _supabase = createClient(
    window.SUPABASE_CONFIG.url,
    window.SUPABASE_CONFIG.keypub
)
console.log('Cliente de Supabase creado para GitHub Pages')

// Función de prueba de conexión
async function testConnection() {
    try {
        const { data, error } = await _supabase
            .from('reportes')
            .select('count', { count: 'exact', head: true })
        
        if (error) {
            console.error('Error de conexión:', error)
        } else {
            console.log('Conexión exitosa a Supabase')
        }
    } catch (err) {
        console.error('Error al probar conexión:', err)
    }
}

// Probar conexión al cargar
testConnection()