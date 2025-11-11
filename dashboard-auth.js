// ============================================================================
// DASHBOARD PROTECTION - L2H Community
// ============================================================================
// Este archivo protege el dashboard y gestiona la sesión del usuario

document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticación
    await protectDashboard();
    
    // Cargar datos del usuario
    await loadUserData();
    
    // Configurar botón de logout
    setupLogoutButton();
});

// Proteger el dashboard - redirigir si no está autenticado
async function protectDashboard() {
    const session = await checkAuth();
    
    if (!session) {
        console.log('No hay sesión activa, redirigiendo al login...');
        window.location.href = 'login.html';
        return;
    }
    
    console.log('Sesión activa:', session);
}

// Cargar datos del usuario en el dashboard
async function loadUserData() {
    try {
        const user = await getCurrentUser();
        
        if (!user) {
            console.error('No se pudo obtener el usuario');
            return;
        }

        // Obtener datos del propietario
        const propietarioData = await getPropietarioData(user.id);
        
        if (propietarioData) {
            // Mostrar datos del usuario en el dashboard
            displayUserInfo(propietarioData);
            
            // Guardar en sessionStorage
            sessionStorage.setItem('propietario', JSON.stringify(propietarioData));
        } else {
            console.error('No se encontraron datos del propietario');
        }

    } catch (error) {
        console.error('Error cargando datos del usuario:', error);
    }
}

// Mostrar información del usuario en el dashboard
function displayUserInfo(propietario) {
    // Actualizar el saludo en el dashboard
    const welcomeMessage = document.querySelector('.welcome-section h2');
    if (welcomeMessage) {
        welcomeMessage.textContent = `¡Bienvenido, ${propietario.nombre}!`;
    }

    // Mostrar información de la vivienda
    const welcomeText = document.querySelector('.welcome-section p');
    if (welcomeText) {
        welcomeText.textContent = `Bloque ${propietario.bloque} - Portal ${propietario.portal} - ${propietario.planta}º ${propietario.letra}`;
    }

    // Si existe un elemento para mostrar el email
    const userEmail = document.getElementById('userEmail');
    if (userEmail) {
        userEmail.textContent = propietario.email;
    }

    // Si existe un elemento para mostrar el tipo de propietario
    const userType = document.getElementById('userType');
    if (userType) {
        const tipos = {
            'Dueno': 'Dueño',
            'PropertyManager': 'Property Manager',
            'Inquilino': 'Inquilino'
        };
        userType.textContent = tipos[propietario.tipo_propietario] || propietario.tipo_propietario;
    }

    console.log('Datos del usuario cargados:', propietario);
}

// Configurar botón de logout
function setupLogoutButton() {
    const logoutButton = document.querySelector('.logout-btn');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', async function(e) {
            e.preventDefault();
            
            const confirmed = confirm('¿Estás seguro de que quieres cerrar sesión?');
            if (confirmed) {
                await logout();
            }
        });
    }
}

// Función para obtener datos del propietario desde sessionStorage o Supabase
async function getCachedPropietarioData() {
    // Intentar obtener desde sessionStorage primero
    const cached = sessionStorage.getItem('propietario');
    if (cached) {
        return JSON.parse(cached);
    }

    // Si no está en cache, obtener de Supabase
    const user = await getCurrentUser();
    if (user) {
        const data = await getPropietarioData(user.id);
        if (data) {
            sessionStorage.setItem('propietario', JSON.stringify(data));
        }
        return data;
    }

    return null;
}

// Exponer función para uso global
window.getCachedPropietarioData = getCachedPropietarioData;
