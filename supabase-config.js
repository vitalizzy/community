// ============================================================================
// SUPABASE CONFIGURATION - L2H Community
// ============================================================================

// TODO: Reemplaza estos valores con los de tu proyecto Supabase
// Los encuentras en: Settings → API
const SUPABASE_URL = 'https://cmxtjcarkpjvjjtceiom.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteHRqY2Fya3BqdmpqdGNlaW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDgzMzcsImV4cCI6MjA3ODM4NDMzN30.iMJIR0eYlTEeg7jBxGy-7D6ep7z3mfU8ps34P3CY5rI';

// Inicializar cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para verificar si el usuario está autenticado
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

// Función para obtener el usuario actual
async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
            console.error('Error obteniendo usuario:', error);
            
            // Si es error 403, el usuario fue eliminado
            if (error.status === 403) {
                console.log('Usuario no autorizado o eliminado');
                // Limpiar sesión local
                await supabase.auth.signOut();
                return null;
            }
            throw error;
        }
        
        return user;
    } catch (error) {
        console.error('Error en getCurrentUser:', error);
        return null;
    }
}

// Función para obtener datos del propietario
async function getPropietarioData(userId) {
    const { data, error } = await supabase
        .from('propietarios')
        .select('*')
        .eq('user_id', userId)
        .single();
    
    if (error) {
        console.error('Error obteniendo datos del propietario:', error);
        return null;
    }
    
    return data;
}

// Función para cerrar sesión
async function logout() {
    try {
        // Limpiar sessionStorage
        safeClearSessionStorage();
        
        // Cerrar sesión en Supabase
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error al cerrar sesión:', error);
        }
        
        // Redirigir al index
        window.location.href = 'index.html';
        return true;
    } catch (error) {
        console.error('Error en logout:', error);
        // Aunque haya error, limpiar local y redirigir
        safeClearSessionStorage();
        window.location.href = 'index.html';
        return false;
    }
}

function safeClearSessionStorage() {
    try {
        sessionStorage.clear();
    } catch (storageError) {
        console.warn('No se pudo limpiar sessionStorage:', storageError);
    }
}

// Exportar para uso global
window.supabaseClient = supabase;
window.checkAuth = checkAuth;
window.getCurrentUser = getCurrentUser;
window.getPropietarioData = getPropietarioData;
window.logout = logout;
