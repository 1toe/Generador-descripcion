// Configuración para GitHub Pages (credenciales públicas)
const SUPABASE_CONFIG = {
    url: 'https://vwimoqgolsovjpnkmmpy.supabase.co',
    keypub: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aW1vcWdvbHNvdmpwbmttbXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTEyMDAsImV4cCI6MjA2Mzg4NzIwMH0.s3YPqUbq156HsoyFOYzLYhWOjzchxWUrGRI2NDkZ12A'
};

// Para compatibilidad con GitHub Pages, exportamos las variables globalmente
window.SUPABASE_CONFIG = SUPABASE_CONFIG;

// Log para verificar que se cargó correctamente
console.log('Configuración de Supabase cargada:', SUPABASE_CONFIG.url);
