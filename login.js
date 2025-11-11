// ============================================================================
// LOGIN DE USUARIOS - L2H Community
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const alertDiv = document.getElementById('alert');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // Verificar si hay un token de confirmación de email en la URL
    handleEmailConfirmation();

    // Verificar si el usuario ya está autenticado
    checkIfAlreadyLoggedIn();

    // Manejar envío del formulario
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Limpiar mensajes anteriores
        hideAlert();
        
        // Obtener datos del formulario
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validar campos
        if (!email || !password) {
            showAlert('error', 'Por favor, completa todos los campos');
            return;
        }

        // Deshabilitar botón mientras se procesa
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        try {
            await loginUser(email, password);
        } catch (error) {
            showAlert('error', 'Error inesperado al iniciar sesión. Por favor, inténtalo de nuevo.');
            console.error('Error en login:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });

    // Manejar confirmación de email desde el link
    async function handleEmailConfirmation() {
        // Verificar si hay parámetros de confirmación en la URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');

        if (accessToken && type === 'signup') {
            showAlert('success', '✅ Email confirmado correctamente. Redirigiendo al dashboard...');
            
            // Limpiar la URL
            window.history.replaceState(null, '', window.location.pathname);
            
            // La sesión ya debería estar activa, redirigir al dashboard
            setTimeout(async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    window.location.href = 'dashboard.html';
                }
            }, 2000);
        } else if (type === 'recovery') {
            showAlert('info', 'Recuperación de contraseña. Introduce tu nueva contraseña.');
        }
    }

    // Verificar si ya hay sesión activa
    async function checkIfAlreadyLoggedIn() {
        const session = await checkAuth();
        if (session) {
            window.location.href = 'dashboard.html';
        }
    }

    // Función principal de login
    async function loginUser(email, password) {
        try {
            // Intentar iniciar sesión con Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                console.error('Error en signInWithPassword:', error);
                
                // Mensajes de error personalizados
                if (error.message.includes('Invalid login credentials')) {
                    showAlert('error', 'Correo electrónico o contraseña incorrectos');
                } else if (error.message.includes('Email not confirmed')) {
                    showAlert('error', 'Por favor, confirma tu correo electrónico antes de iniciar sesión');
                } else {
                    showAlert('error', `Error al iniciar sesión: ${error.message}`);
                }
                return;
            }

            console.log('Login exitoso:', data);

            // Obtener datos adicionales del propietario
            const propietarioData = await getPropietarioData(data.user.id);
            
            if (!propietarioData) {
                console.warn('No se encontraron datos del propietario');
                showAlert('warning', 'Sesión iniciada, pero no se encontraron datos de perfil');
            }

            // Guardar datos en sessionStorage para uso rápido
            sessionStorage.setItem('user', JSON.stringify(data.user));
            if (propietarioData) {
                sessionStorage.setItem('propietario', JSON.stringify(propietarioData));
            }

            // Mostrar mensaje de éxito
            showAlert('success', '¡Bienvenido a L2H!');

            // Redirigir al dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } catch (error) {
            console.error('Error inesperado:', error);
            showAlert('error', 'Error inesperado. Por favor, inténtalo de nuevo.');
        }
    }

    // Funciones auxiliares para mostrar/ocultar alertas
    function showAlert(type, message) {
        alertDiv.textContent = message;
        alertDiv.className = `alert alert-${type} show`;
        
        // Auto-ocultar después de 5 segundos para mensajes de error
        if (type === 'error') {
            setTimeout(hideAlert, 5000);
        }
    }

    function hideAlert() {
        alertDiv.className = 'alert';
        alertDiv.textContent = '';
    }

    // Limpiar errores al escribir
    document.getElementById('email').addEventListener('input', hideAlert);
    document.getElementById('password').addEventListener('input', hideAlert);
});
