const { createClient } = supabase
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
console.log('Cliente de Supabase creado')