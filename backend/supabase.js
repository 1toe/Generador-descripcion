const { createClient } = supabase

const _supabase = createClient(
    window.SUPABASE_CONFIG.url,
    window.SUPABASE_CONFIG.anonKey
)
console.log('Cliente de Supabase creado para GitHub Pages')

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

testConnection()